<template>
  <div class="vpage">
    <!-- Body -->
    <section class="container">
      
      <div class="columns is-multiline">

        <div class="column is-12">
          <h1 class="is-size-3">Setup your Sprint</h1>
        </div>

        <!-- Form -->
        <div class="column is-8 is-offset-2">
          <b-field label="Extract infor with Trello board ID*">
            <b-input maxlength="500" v-model="trelloId" placeholder="00xxxxxx00"></b-input>
          </b-field>

          <b-field label="Project start on*">
            <b-datepicker
                v-model="date"
                placeholder="Click to select..."
                icon="calendar-today">
            </b-datepicker>
          </b-field>

          <div class="is-flex">
            <button class="button is-rounded is-success" style="margin-right: 1em;"
              @click="extract">Extract</button>
          </div>

          <hr>
          
          <b-field label="Project name">
            <b-input maxlength="200" v-model="title" placeholder="New sprint"></b-input>
          </b-field>

          <b-field label="Description">
            <b-input maxlength="500" v-model="description" placeholder="Awesome description"></b-input>
          </b-field>


          <div class="is-flex">
            <button class="button is-rounded is-success" style="margin-right: 1em;"
              @click="update">Update</button>
            <nuxt-link :to="`/projects/${$route.params.id}`" class="button is-rounded is-danger">Cancel</nuxt-link>
          </div>

        </div>

      </div>

    </section>
    <!--loader-->
    <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>
  </div>
</template>

<script>
// lib
import moment from 'moment'

export default {
  data: () => ({
    title: '',
    description: '',
    date: null,
    trelloId: '',
    isLoading: true
  }),
  /**
   * Ignite component
   */
  beforeMount () {
    this.fetchSprint()
    // define page attr
    this.setPage()
  },
  methods: {
    /**
     * Set title and description
     */
    setPage () {
      this.$store.commit('setPageTitle', 'Edit Sprint')
      this.$store.commit('setPageDescription', "Update sprint information")
    },
    /**
     * fetch trello data from board
     */
    async extract () {
      if (!this.trelloId) {
        this.$toast.open({
          duration: 3000,
          message: 'Provide Trello Board ID',
          position: 'is-bottom',
          type: 'is-warning'
        })
        return
      }
      try {
        let result = await this.$axios.get(
          `https://api.trello.com/1/boards/${this.trelloId}?fields=name,desc&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
        )
        if (result.status === 200) {
          this.$toast.open({
            duration: 3000,
            message: 'Data Loaded',
            position: 'is-bottom',
            type: 'is-success'
          })
          // fill data
          this.title = result.data.name
          this.description = result.data.desc
        }
      } catch (error) {
        this.$toast.open({
          duration: 3000,
          message: 'Not found',
          position: 'is-bottom',
          type: 'is-warning'
        })
      }
    },
    /**
     * fetch sprint current information
     */
    async fetchSprint () {
      // get id
      let id = this.$route.params.id
      let sprintId = this.$route.params.sprint
      let snapshot = await this.$firebase.database().ref(`${process.env.APP_NAME}/project/${id}/sprints/${sprintId}`).once('value')
      let data = snapshot.val()
      
      // set pagination
      this.title = data.title
      this.description = data.description
      this.date = moment(data.date).toDate()
      this.trelloId = data.trelloId
      this.isLoading = false
    },
    update () {
      // get id
      const id = this.$route.params.id
      const sprintId = this.$route.params.sprint
      // persist data
      try {
        let date = moment(this.date).format('YYYY-MM-DD') // moment format
        // prepare update
        var updates = {};
        updates[`${process.env.APP_NAME}/project/${id}/sprints/${sprintId}`] = {
          trelloId: this.trelloId,
          title: this.title,
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

