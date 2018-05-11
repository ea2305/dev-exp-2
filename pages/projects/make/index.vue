<template>
  <div class="vpage">

    <div class="container">

      <div class="columns is-multiline">

        <div class="column is-12">
          <h1 class="is-size-3">About your project</h1>
        </div>

        <!-- Form -->
        <div class="column is-8 is-offset-2">
          
          <b-field label="Project name">
            <b-input maxlength="200" v-model="title" placeholder="New project"></b-input>
          </b-field>

          <b-field label="Description">
            <b-input maxlength="500" v-model="description" placeholder="Awesome description"></b-input>
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
              @click="create">Create</button>
            <nuxt-link to="/projects" class="button is-rounded is-danger">Cancel</nuxt-link>
          </div>

        </div>

      </div>

    </div>

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
    date: null
  }),
  /**
   * component preparation
   */
  beforeMount () {
    this.setPage()
  },
  methods: {
    /**
     * page title and description configuration
     */
    setPage () {
      this.$store.commit('setPageTitle', 'Create project')
      this.$store.commit('setPageDescription', 'Follow the instructions bellow')
    },
    /**
     * Create project
     */
    async create () {
      // validate fields
      const rules = {
        title: 'required|min:3|max:200',
        description: 'required|min:6|max:500',
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
        console.log(error, 'err')
        error.forEach(err => {
          this.$toast.open({
            duration: 3000,
            message: err.message,
            position: 'is-bottom',
            type: 'is-danger'
          })
        });
        return
      }

      // persist data
      try {
        let id = moment().unix()
        let date = moment(this.date).format('YYYY-MM-DD') // moment format
        // insert
        this.$firebase.database().ref(`${process.env.APP_NAME}/project/${id}`).set({
          id,
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
        this.$router.push('/projects')
      } catch (error) {
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

