<template>
  <div class="vpage">
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h2>About Sprint</h2>
          {{ lists }}
          <br>
          <p>to do</p>
          {{ toDo }}
          <br>
          <p> to Fix</p>
          {{ toFix }}
          <br>
          <p>Doing</p>
          {{ doing }}
          <br>
          <p>Done</p>
          {{ done }}
          
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// libs
import TrelloParser from '~/libs/trelloParser'
const trelloParser = new TrelloParser()
export default {
  data: () => ({
    lists: [],
    toDo: [],
    doing: [],
    done: [],
    toFix: [],
    totalPoints: 0,
    pointsDoneByDay: [],
    isLoading: true
  }),
  /**
   * Ignite component
   */
  beforeMount () {
    // define page attr
    this.setPage()
    this.getLists()
  },
  methods: {
    /**
     * Set title and description
     */
    setPage () {
      this.$store.commit('setPageTitle', 'Sprint info')
      this.$store.commit('setPageDescription', "Sprint information")
    },
    /**
     * Get cards
     */
    async getLists () {
      // https://api.trello.com/1/boards/<trello_board>/lists?key=<trello_key>&token=<trello_token>
      // get trello id
      const trelloId = this.$route.params.sprint
      try {
        let lists = await this.$axios.get(`https://api.trello.com/1/boards/${trelloId}/lists?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`)
        if (lists.status === 200) {
          this.lists = trelloParser.getLists(lists.data)
          this.getScoreList()
        }
      } catch (error) {
        this.$toast.open({
          duration: 3000,
          message: 'Load error',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
    /**
     * Return values of card in list with value assigned by scrum for trello plugin
     */
    async getScoreList () {
      this.lists.forEach(async list => {
        // https://api.trello.com/1/lists/<boardId>/cards??key=<trello_key>&token=<trello_token>
        // get trello id
        const trelloId = this.$route.params.sprint
        try {
          let cards = await this.$axios.get(`https://api.trello.com/1/lists/${list.listId}/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`)
          
          if (cards.status === 200) {
            // set card on data store
            this[list.key] = trelloParser.getPointsFromList(cards.data)
          }
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
}
</script>

