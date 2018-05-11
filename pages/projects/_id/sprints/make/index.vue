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
              @click="create">Create</button>
            <nuxt-link to="/projects" class="button is-rounded is-danger">Cancel</nuxt-link>
          </div>

        </div>

      </div>

    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { validate } from 'indicative'

export default {
  data: () => ({
    id: 'none',
    title: '',
    description: '',
    date: null,
    trelloId: ''
  }),
  /**
   * Ignite component
   */
  beforeMount () {
    // define page attr
    this.setPage()
  },
  methods: {
    /**
     * Set title and description
     */
    setPage () {
      this.$store.commit('setPageTitle', 'Add Sprint')
      this.$store.commit('setPageDescription', "Let's do it")
    },
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
     * Create project
     */
    async create () {
      // validate fields
      const rules = {
        title: 'required|min:3|max:200',
        description: 'required|min:6|max:500',
        trelloId: 'min:3',
        date: 'required|date'
      }

      const data = {
        title: this.title,
        description: this.description,
        date: this.date
      }
      
      try {
        let validation = await validate(data, rules)
      } catch (error) {
        error.forEach(err => {
          this.$toast.open({
            duration: 3000,
            message: err.message,
            position: 'is-bottom',
            type: 'is-danger'
          })
        });
      }

      // persist data
      try {
        // get id from url
        const id = this.$route.params.id
        let date = moment(this.date).format('YYYY-MM-DD') // moment format
        // insert
        this.$firebase.database().ref(`${process.env.APP_NAME}/project/${id}/sprints/${this.trelloId}`).set({
          trelloId: this.trelloId,
          title: this.title,
          description: this.description,
          date
        })
        // notify
        this.$toast.open({
          duration: 3000,
          message: 'Saved',
          position: 'is-bottom',
          type: 'is-success'
        })
        // redirect
        this.$router.push(`/projects/${id}`)
      } catch (error) {
        console.log(error)
        this.$toast.open({
          duration: 3000,
          message: 'Save error',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>

