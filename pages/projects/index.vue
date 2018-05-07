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
    projects: []
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
      let projectRef = this.$firebase.database().ref('project');
      let vm = this
      projectRef.on('value', (snapshot) => {
        console.log(snapshot.val(), 'DATA VALUES')
        // iteration
        let projects = []
        let object = snapshot.val()
        // data to array
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key];
            projects.push({
              id: element.id,
              title: element.title,
              description: element.description,
              date: moment(element.date).format('MMM DD YYYY'),
              urlView: `/projects/${element.id}`,
              urlEdit: `/projects/${element.id}/edit`,
              urlDelete: `/projects/${element.id}/delete`
            })
          }
        }
        // state state
        this.projects = projects
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

