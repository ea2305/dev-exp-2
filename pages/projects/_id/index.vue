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

        <!--Grid sprints-->
        <div class="columns is-multiline vwidth">
          
          <div class="column is-3" v-for="sprint of sprints" :key="sprint.title">
            <card-project 
              :title="sprint.title"
              :description="sprint.description"
              :date="sprint.date"
              :urlView="sprint.urlView"
              :urlEdit="sprint.urlEdit"
              :urlDelete="sprint.urlDelete"/>
          </div>

        </div>

        <!--pagination-->
        <div class="column is-12">
          <no-ssr>
            <b-pagination
              :total="sprintTotalPages"
              :current.sync="sprintCurrentPage"
              :order="'is-centered'"
              :size="'is-small'"
              :simple="false"
              :rounded="true"
              :per-page="8"
              @change="updatePaginationSprint">
          </b-pagination>
          </no-ssr>
        </div>

        <hr>

        <div class="column is-12">
          <h1 class="is-size-3">Team members</h1>
        </div>

        <!--Grid sprints-->
        <div class="columns is-multiline vwidth">
          
          <div class="column is-3" v-for="member of teamMembers" :key="member.title">
            <card-project 
              :title="member.title"
              :description="member.description"
              :date="member.date"
              :urlView="member.urlView"
              :urlEdit="member.urlEdit"
              :urlDelete="member.urlDelete"/>
          </div>

        </div>

        <!--pagination-->
        <div class="column is-12">
          <no-ssr>
            <b-pagination
              :total="teamTotalPages"
              :current.sync="teamCurrentPage"
              :order="'is-centered'"
              :size="'is-small'"
              :simple="false"
              :rounded="true"
              :per-page="8"
              @change="updatePaginationTeamMembers">
          </b-pagination>
          </no-ssr>
        </div>
        

        <div class="columns is-multiline">
          <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// lib 
import moment from 'moment'
// components
import cardProject from '~/components/cards/project'

export default {
  data: () => ({
    title: 'Name project',
    description: 'About project',
    isLoading: true,
    sprints: [], // store sprints
    sprintCurrentPage: 1,
    sprintTotalPages: 0,
    teamMembers: [], // store members team
    teamCurrentPage: 1,
    teamTotalPages: 0,
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
      // get id project
      const id = this.$route.params.id
      // get data from firebase
      // get data from firebase
      let projectRef = this.$firebase.database().ref(`${process.env.APP_NAME}/project/${id}`);

      projectRef.on('value', (snapshot) => {
        // iteration
        let project = null
        let object = snapshot.val()

        // basic description
        this.title = object.title
        this.description = object.description
        // setup title
        this.setPage()

        // array data
        let sprints = []
        // data to array
        for (const key in object.sprints) {
          if (object.sprints.hasOwnProperty(key)) {
            const element = object.sprints[key];

            sprints.push({
              date: moment(element.date).format('MMM DD YYYY'),
              description: element.description,
              title: element.title,
              trelloId: element.trelloId,
              urlView: `/project/${id}/sprints/${element.trelloId}`,
              urlEdit: `/project/${id}/sprints/${element.trelloId}/edit`,
              urlDelete: `/project/${id}/sprints/${element.trelloId}/delete`
            })
          }
        }

        // set sprints
        this.sprints = sprints
        this.setPageSprints(1, sprints.length)

        // Members
        let teamMembers = []
        // data to array
        for (const key in object.team) {
          if (object.team.hasOwnProperty(key)) {
            const element = object.team[key];

            teamMembers.push({
              title: element.nickname,
              description: `User ${element.nickname}`,
              date: '',
              gitlab_nickname: element.gitlab_nickname,
              nickname: element.nickname,
              trello_nickname: element.trello_nickname,
              wakatime_nickname: element.wakatime_nickname,
              urlView: `/project/${id}/team/${element.trello_nickname}`,
              urlEdit: `/project/${id}/team/${element.trello_nickname}/edit`,
              urlDelete: `/project/${id}/team/${element.trello_nickname}/delete`
            })
          }
        }

        // set team members
        this.teamMembers = teamMembers
        this.setPageTeamMembers(1, teamMembers.length)

        this.isLoading = false
      })

    },
    setPageSprints (current, total) {
      this.sprintCurrentPage = current 
      this.sprintTotalPages = total
    },
    updatePaginationSprint (change) {
      this.setPageSprints(change, this.sprintTotalPages)
    },
    setPageTeamMembers (current, total) {
      this.teamCurrentPage = current
      this.teamTotalPages = total
    },
    updatePaginationTeamMembers (change) {
      this.setPageTeamMembers(change, this.teamTotalPages)
    },
    /**
     * Set title and description
     */
    setPage () {
      this.$store.commit('setPageTitle', this.title)
      this.$store.commit('setPageDescription', this.description)
    },
  },
  components: {
    cardProject
  }
}
</script>
