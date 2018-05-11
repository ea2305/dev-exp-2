<template>
  <div class="vpage">
    <!-- Body -->
    <section class="container">
      
      <div class="columns is-multiline">
        <!--action panels-->
        <article class="column is-12">
          <nuxt-link to="/projects/make" class="button is-rounded is-info">
            Create project
          </nuxt-link>
        </article>

        <!--title-->
        <div class="column is-12">
          <h1 class="is-size-3">Projects</h1>
        </div>

        <!--Grid services-->
        <div class="columns is-multiline vwidth">
          
          <!-- loader -->
          <b-loading :is-full-page="true" :active.sync="isLoading" :canCancel="false"></b-loading>
          <div class="column is-3" v-for="project of projects" :key="project.title">
            <card-project 
              :title="project.title"
              :description="project.description"
              :date="project.date"
              :urlView="project.urlView"
              :urlEdit="project.urlEdit"
              :urlDelete="project.urlDelete"/>
          </div>
        </div>
      </div>

      <!--pagination-->
      <div class="column is-12">
        <no-ssr>
          <b-pagination
            :total="totalPagination"
            :current.sync="currentPage"
            :order="'is-centered'"
            :size="'is-small'"
            :simple="false"
            :rounded="true"
            :per-page="8"
            @change="updatePagination">
        </b-pagination>
        </no-ssr>
      </div>
    </section>
  </div>
</template>

<script>
// tootls
import moment from 'moment'
// components
import cardProject from '~/components/cards/project'

export default {
  /**
   * Data app
   */
  data: () => ({
    currentPage: 1,
    totalPagination: 0,
    projects: [],
    isLoading: true
  }),
  /**
   * Ignite component
   */
  beforeMount () {
    // define page attr
    this.setPage()
    this.fetchProjects()
  },
  methods: {
    /**
     * Set title and description
     */
    setPage () {
      this.$store.commit('setPageTitle', 'Project')
      this.$store.commit('setPageDescription', 'Manage projects')
    },
    async fetchProjects () {
      // get data from firebase
      let projectRef = this.$firebase.database().ref(`${process.env.APP_NAME}/project`);

      let vm = this
      projectRef.on('value', (snapshot) => {
        // iteration
        let projects = []
        let object = snapshot.val()
        // data to array
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key];
            projects.push({
              id: element.data.id,
              title: element.data.title,
              description: element.data.description,
              date: moment(element.data.date).format('MMM DD YYYY'),
              urlView: `/projects/${element.data.id}`,
              urlEdit: `/projects/${element.data.id}/edit`,
              urlDelete: `/projects/${element.data.id}/delete`
            })
          }
        }
        // state state
        this.projects = projects
        this.isLoading = false
        // setup pagination
        this.totalPagination = this.projects.length
        this.currentPage = 1
      });
    },
    /**
     * @param {Number} page : current pagination update
     */
    updatePagination (page) {
      alert(page)
    }
  },
  components: {
    cardProject
  }
}
</script>

