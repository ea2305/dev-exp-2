<template>
  <div class="vpage">
    <!-- Body -->
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h1 class="is-size-3 has-text-danger">Do you want to delete: {{ title }}?</h1>
        </div>

        <div class="column is-12">
          <!-- loader -->
          <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>
          <button class="button is-rounded is-danger" style="margin-right: 1em;"
            @click="deleteProject">Delete</button>
          <nuxt-link to="/projects" class="button is-rounded is-info">Cancel</nuxt-link>
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
     * fetch project information
     */
    async fetchProject () {
      // get id
      let id = this.$route.params.id
      let snapshot = await this.$firebase.database().ref(`${process.env.APP_NAME}/project/${id}`).once('value')
      let data = snapshot.val()
      // set pagination
      this.title = data.title
      this.isLoading = false
    },
    /**
     * Set title and description
     */
    setPage () {
      this.$store.commit('setPageTitle', 'Delete Project')
      this.$store.commit('setPageDescription', "Danger zone!")
    },
    /**
     * delete current project
     */
    async deleteProject () {
      // get id
      const id = this.$route.params.id
      try {
        let result = await this.$firebase.database().ref(`${process.env.APP_NAME}/project/${id}`).remove()
        this.$toast.open({
          duration: 3000,
          message: 'Deleted',
          position: 'is-bottom',
          type: 'is-success'
        })
        // redirect
        this.$router.push('/projects')
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

