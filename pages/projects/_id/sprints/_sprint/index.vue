<template>
  <div class="vpage">
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h2 class="is-size-3">Sprint: Burndown chart</h2>
        </div>
        <div class="column is-12">
          <div class="is-flex" style="justify-content: center;">
            <line-chart v-if="!isLoading" 
              :data="graph" 
              :options="{
                responsive: false, maintainAspectRatio: false,
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero:true
                    }
                  }]
                }
              }"
              :width="600"
              :height="350"/>
          </div>
        </div>
      </div>
      <!--loader-->
      <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>
    </section>
  </div>
</template>

<script>
// components
import LineChart from '~/components/charts/line'
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
    isLoading: true,
    graph: null
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
      this.lists.forEach(async (list, index) => {
        // https://api.trello.com/1/lists/<boardId>/cards??key=<trello_key>&token=<trello_token>
        // get trello id
        const trelloId = this.$route.params.sprint
        try {
          let cards = await this.$axios.get(`https://api.trello.com/1/lists/${list.listId}/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`)
          
          if (cards.status === 200) {
            // set card on data store
            this[list.key] = trelloParser.getPointsFromList(cards.data)
            if (index === this.lists.length - 1) {
              this.graph = trelloParser.getBurndownChart({
                toDo: this.toDo,
                toFix: this.toFix,
                done: this.done,
                doing: this.doing
              })
              this.isLoading = false
              // notify
              this.$toast.open({
                duration: 3000,
                message: 'Loaded',
                position: 'is-bottom',
                type: 'is-success'
              })
            }
          }
        } catch (error) {
          console.log(error)
        }
      })
    }
  },
  components: {
    LineChart
  }
}
</script>

