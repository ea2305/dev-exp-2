<template>
  <div class="vpage">
    <section class="container">
      <div class="columns is-multiline">

        <div class="column is-12">
          <h2 class="is-size-3">User development credentials</h2>
        </div>

        <div class="column is-8 is-offset-2">

          <b-field label="Nick name">
            <b-input maxlength="200" v-model="nickname" placeholder="New sprint"></b-input>
          </b-field>
          <hr>
          <b-field label="Trello nickname">
            <b-input maxlength="200" v-model="trello_nickname" placeholder="@nick"></b-input>
          </b-field>
          <b-field label="Wakatime nickname">
            <b-input maxlength="200" v-model="wakatime_nickname" placeholder="@nick"></b-input>
          </b-field>
          <b-field label="Gitlab nickname">
            <b-input maxlength="200" v-model="gitlab_nickname" placeholder="@nick"></b-input>
          </b-field>
        
          <div class="is-flex">
            <button class="button is-rounded is-success" style="margin-right: 1em;"
              @click="create">Create</button>
            <nuxt-link :to="`/projects/${$route.params.id}`" class="button is-rounded is-danger">Cancel</nuxt-link>
          </div>

        </div>

      </div>
    </section>
  </div>
</template>

<script>
// libs
import moment from 'moment'
import { validate } from 'indicative'

export default {
  data: () => ({
    nickname: '',
    trello_nickname: '',
    wakatime_nickname: '',
    gitlab_nickname: ''
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
      this.$store.commit('setPageTitle', 'Add Team members')
      this.$store.commit('setPageDescription', "Credentials and nickname")
    },
    async create () {
      // validate fields
      const rules = {
        nickname: 'required|min:3|max:200',
        trello_nickname: 'required|min:3|max:200',
        wakatime_nickname: 'required|min:3|max:200',
        gitlab_nickname: 'required|min:3|max:200',
      }

      const data = {
        nickname: this.nickname,
        trello_nickname: this.trello_nickname,
        wakatime_nickname: this.wakatime_nickname,
        gitlab_nickname: this.gitlab_nickname
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
        return
      }

      // persist data
      try {
        // get id from url
        const id = this.$route.params.id
        // insert
        this.$firebase
          .database()
          .ref(`${process.env.APP_NAME}/project/${id}/team/${this.trello_nickname}`)
          .set(data)

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

