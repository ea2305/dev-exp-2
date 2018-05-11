<template>
  <div class="vpage">
    <!-- Body -->
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-3" v-for="element of report" :key="element.title">
          <card-info :title="element.title" 
            :body="element.body" 
            :image="element.image" 
            :date="element.date" 
            :value="element.value"/>
        </div>
      </div>
    </section>
    <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>
  </div>
</template>

<script>
// components
import CardInfo from '~/components/cards/info'

export default {
  data: () => ({
    report: [],
    isLoading: true
  }),
  /**
   * Ignite component
   */
  beforeMount () {
    // define page attr
    this.setPage()
    this.fetchAppInfo()
  },
  methods: {
    /**
     * Set title and description
     */
    setPage () {
      this.$store.commit('setPageTitle', 'Dashboard')
      this.$store.commit('setPageDescription', 'Base route dashboard')
    },
    fetchAppInfo () {
      // get data from firebase
      let projectRef = this.$firebase.database().ref(`${process.env.APP_NAME}/project`);

      let vm = this
      projectRef.on('value', (snapshot) => {
        // iteration
        
        let object = snapshot.val()
        let projects = 0
        // data to array projects
        for (const key in object) 
          if (object.hasOwnProperty(key)) 
            projects++

        this.report.push({
          title: 'Projects',
          body: 'Number of projects stored',
          image: 'icon.png',
          date: '',
          value: `${projects} Projects`
        })

      })
      this.isLoading = false
    }
  }, 
  components: {
    CardInfo
  }
}
</script>
