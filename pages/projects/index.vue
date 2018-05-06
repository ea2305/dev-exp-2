<template>
  <div class="vpage">
    <!-- Body -->
    <section class="container">
      
      <div class="columns is-multiline">
        <!--action panels-->
        <article class="column is-12">
          <button class="button is-rounded is-info">
            Create project
          </button>
        </article>

        <!--title-->
        <div class="column is-12">
          <h1 class="is-size-3">Projects</h1>
        </div>

        <!--Grid services-->
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
       <b-pagination
            :total="$store.state.projects.pagination.total"
            :current.sync="$store.state.projects.pagination.current"
            :order="'is-centered'"
            :size="'is-small'"
            :simple="true"
            :rounded="true"
            :per-page="8">
        </b-pagination>
    </section>
  </div>
</template>

<script>
// components
import cardProject from '~/components/cards/project'

export default {
  /**
   * Data app
   */
  data: () => ({
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
      // axios get ---
      const projects = [0,1,2,3,4,5,6,7,8,9]
      // asign values
      this.projects = projects.map(i => ({
        title: `Project ${i}`,
        description: `Description project ${i}`,
        date: `01-01-201${i}`,
        urlView: `/projects/${i}`,
        urlEdit: `/projects/${i}/edit`,
        urlDelete: `/projects/${i}/delete`
      }))

      // setup pagination
      this.$store.commit('setPaginationProjects', { total: projects.length, current: 1 })
    }
  },
  components: {
    cardProject
  }
}
</script>

