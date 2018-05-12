<template>
  <div class="vpage">
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h1 class="is-size-3 has-text-danger">Do you want to delete: {{ title }}?</h1>
        </div>

        <div class="column is-12">
          <!-- loader -->
          <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>
          <button class="button is-rounded is-danger" style="margin-right: 1em;"
            @click="deleteSprint">Delete</button>
          <nuxt-link :to="`/projects/${$route.params.id}`" class="button is-rounded is-info">Cancel</nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: 'Name project',
    isLoading: true
  }),
  /**
   * Ignite component
   */
  beforeMount () {
    // define page attr
    this.setPage()
    this.fetchProject()
  },
  methods: {
    /**
     * Set title and description
     */
    setPage () {
      this.$store.commit('setPageTitle', 'Delete Sprint')
      this.$store.commit('setPageDescription', "Warning zone")
    },
    /**
     * fetch project information
     */
    async fetchProject () {
      // get id
      const id = this.$route.params.id
      const sprintId = this.$route.params.sprint
      console.log(sprintId, 'o')
      let snapshot = await this.$firebase.database().ref(`${process.env.APP_NAME}/project/${id}/sprints/${sprintId}`).once('value')
      let data = snapshot.val()
      // set pagination
      this.title = data.title
      this.isLoading = false
    },
    /**
     * delete current sprint
     */
    async deleteSprint () {
      // get id
      const id = this.$route.params.id
      const sprintId = this.$route.params.sprint
      try {
        let result = await this.$firebase.database().ref(`${process.env.APP_NAME}/project/${id}/sprints/${sprintId}`).remove()
        this.$toast.open({
          duration: 3000,
          message: 'Deleted',
          position: 'is-bottom',
          type: 'is-success'
        })
        // redirect
        this.$router.push(`/projects/${id}`)
      } catch (error) {
        console.log(error)
        this.$toast.open({
          duration: 3000,
          message: 'Something went wrong',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>

