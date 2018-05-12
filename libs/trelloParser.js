import moment from 'moment'
/**
 * Trello (Plugin Score) Parser from API 
 * @author Elihu A. Cruz
 * @version 0.1.1
 */

class TrelloParser {
  constructor (labels) {
    this.listLabels = labels || [
      { tag:'TO DO', key: 'toDo', final: false },
      { tag:'TO FIX', key: 'toFix', final: false },
      { tag:'DOING', key: 'doing', final: false },
      { tag:'DONE', key: 'done', final: true}
    ]
  }
  /**
   * Get Usefull list from trello
   * @param {Object} rawJson : Trello List array request
   */
  getLists (rawJson) {
    let data = []
    // list iteration
    rawJson.forEach((list) => {
      // get element from tags
      this.listLabels.forEach(label => {
        // verfy matching
        if (list.name.toUpperCase() === label.tag)
          data.push({ key: label.key, name: list.name, listId: list.id })
      })
    })
    return data
  }
  /**
   * Get points of estimation, by scrum for trello plugin
   * @param {Array} list : array of card from trello
   */
  getPointsFromList (list) {
    // list iteration
    let listPoints = list.map(card => {
      let name = card.name
      let date = card.dateLastActivity
      // validate schema title
      let isValid = this.expresionCard(name)
      if (isValid) {
        // extract points
        let estimated = this.getEstimationPoints(name)
        let consumed = this.getConsumedPoints(name)
        return { name, estimated, consumed, date}
      } else {
        return { name, estimated: 0, consumed: 0, date }
      }
    })
    return listPoints
  }
  /**
   * Get array with burndown chart by date
   * @param {Object} scrumList : cards from trello
   */
  getBurndownChart ( scrumList ) {
    let joinedList = []
    let chart = []
    let finalKey = ''

    // iteration list scrum configuration
    this.listLabels.forEach( list => {
      joinedList = joinedList.concat(scrumList[list.key])
      if (list.final)
        finalKey = list.key // done table
    })

    // get total points
    let totalPoints = joinedList.reduce((prev, card) => (prev + card.estimated), 0)
    
    // group by date and reduce total by day to chart
    let grouped = {}
    scrumList[finalKey].forEach(task => {
      let date = moment(task.date).format('YYYY-MM-DD')
      if (grouped[date] === undefined) {
        grouped[date] = [task]
      } else {
        grouped[date].push(task)
      }
    })
    // Get points by date and burndown points by date
    let currenPoints = totalPoints
    for (const key in grouped) {
      if (grouped.hasOwnProperty(key)) {
        const element = grouped[key];
        let points = element.reduce((prev, task) => ( prev + task.estimated), 0)
        chart.push({
          date: key,
          estimated: points,
          total: totalPoints,
          burndown: (currenPoints - points)
        })
        currenPoints -= points
      }
    }
    return chart
  }
  /**
   * Validation of title with score
   * @param {String} title : Title from trello card
   */
  expresionCard (title) {
    const regex = /\([-+]?[0-9]*\.?[0-9]*\)[\sa-zA-Z0-9]+\[[-+]?[0-9]*\.?[0-9]*\]|\([-+]?[0-9]*\.?[0-9]*\)[\sa-zA-Z0-9]+/g;
    return (regex.exec(title) != null)
  }
  /**
   * Extract estimation from trello card title
   * @param {String} title : Card title with score from scrum for trello plugin
   */
  getEstimationPoints (title) {
    const regex = /\([-+]?[0-9]*\.?[0-9]*\)/gm
    let m
    let values = []

    // find matchs
    while ((m = regex.exec(title)) !== null) {
      if (m.index === regex.lastIndex)
          regex.lastIndex++
      // assign value estimation
      m.forEach((match, groupIndex) => {
        values.push(match.replace('(','').replace(')',''))
      });
    }
    return (values.length > 0) ? parseFloat(values.shift()) : 0
  }
  /**
   * Extract Point from title card description
   * @param {String} title : Card title with score from scrum for trello plugin
   */
  getConsumedPoints (title) {
    const regex = /\[[-+]?[0-9]*\.?[0-9]*\]/gm
    let m
    let values = []

    // find matchs
    while ((m = regex.exec(title)) !== null) {
      if (m.index === regex.lastIndex)
          regex.lastIndex++
      // assign value worked
      m.forEach((match, groupIndex) => {
        values.push(match.replace('[','').replace(']',''))
      });
    }
    return (values.length > 0) ? parseFloat(values.shift()) : 0
  }

}

export default TrelloParser