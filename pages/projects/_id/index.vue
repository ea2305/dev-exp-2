<template>
  <div class="vpage">

    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <nuxt-link :to="`/projects/${$route.params.id}/sprints/make`" class="button is-rounded is-info">
            Add Sprint
          </nuxt-link>
          <nuxt-link :to="`/projects/${$route.params.id}/team/make`" class="button is-rounded is-info" style="margin-left: 1em;">
            Add Team member
          </nuxt-link>
        </div>
        <div class="column is-12">
          <h1 class="is-size-3">Sprints</h1>
        </div>

        <div class="columns is-multiline">
          <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    title: 'Name project',
    description: 'About project',
    isLoading: true
  }),
  /**
   * Ignite component
   */
  beforeMount () {
    // fetch info project
    this.fetchProject()
  },
  methods: {
    /**
     * fetch project information
     */
    async fetchProject () {
      // get id
      let id = this.$route.params.id
      let snapshot = await this.$firebase.database().ref(`${process.env.APP_NAME}/project/${id}`).once('value')
      let data = snapshot.val()
      // set pagination
      this.title = data.title
      this.description = data.description
      this.isLoading = false
      this.setPage()
    },
    /**
     * Set title and description
     */
    setPage () {
      this.$store.commit('setPageTitle', this.title)
      this.$store.commit('setPageDescription', this.description)
    },
  }
}
</script>
