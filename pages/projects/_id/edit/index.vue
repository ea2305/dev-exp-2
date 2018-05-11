<template>
  <div class="vpage">
    <!-- Body -->
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h1 class="is-size-3">Edit your project, here</h1>
        </div>

        <!-- Form -->
        <div class="column is-8 is-offset-2">
          <!--loader-->
          <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>

          <b-field label="Project name">
            <b-input maxlength="200" v-model="title" :value="title" placeholder="New project"></b-input>
          </b-field>

          <b-field label="Description">
            <b-input maxlength="500" v-model="description" :value="description" placeholder="Awesome description"></b-input>
          </b-field>

          <b-field label="Project start on">
            <b-datepicker
                v-model="date"
                placeholder="Click to select..."
                icon="calendar-today">
            </b-datepicker>
          </b-field>

          <div class="is-flex">
            <button class="button is-rounded is-success" style="margin-right: 1em;"
              @click="update">Update</button>
            <nuxt-link to="/projects" class="button is-rounded is-danger">Cancel</nuxt-link>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    title: '',
    description: '',
    date: null,
    sprints: null,
    team: null,
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
      this.$store.commit('setPageTitle', 'Edit Project')
      this.$store.commit('setPageDescription', "Change info about your project")
    },
    /**
     * fetch project information
     */
    async fetchProject () {
      // get id
      let id = this.$route.params.id
      let snapshot = await this.$firebase.database().ref(`${process.env.APP_NAME}/project/${id}/data`).once('value')
      let data = snapshot.val()
      // set pagination
      this.title = data.title
      this.description = data.description
      this.sprints = data.sprints
      this.team = data.team
      this.date = moment(data.date).toDate()
      this.isLoading = false
    },
    update () {
      // get id
      const id = this.$route.params.id
      // persist data
      try {
        let date = moment(this.date).format('YYYY-MM-DD') // moment format
        // prepare update
        var updates = {};
        updates[`${process.env.APP_NAME}/project/${id}/data`] = {
          id,
          title: this.title,
          description: this.description,
          description: this.description,
          date
        }

        // insert
        this.$firebase.database().ref().update(updates)
        // notify
        this.$toast.open({
          duration: 3000,
          message: 'Updated',
          position: 'is-bottom',
          type: 'is-success'
        })
        // redirect
        this.$router.push('/projects')
      } catch (error) {
        this.$toast.open({
          duration: 3000,
          message: 'Update error',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>

