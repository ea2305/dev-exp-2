<template>
  <div class="vpage">
    <!-- Body -->
    <section class="container">
      <p>stuff</p>
    </section>
  </div>
</template>

<script>
export default {
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
      this.$store.commit('setPageTitle', 'Project')
      this.$store.commit('setPageDescription', 'Manage projects')
    }
  }
}
</script>

