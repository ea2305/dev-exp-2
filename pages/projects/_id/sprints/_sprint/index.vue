<template>
  <div class="vpage">
    <section class="container">
      <div class="columns">
        <div class="column is-12">
          <h2>About Sprint</h2>
        </div>
      </div>
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
      this.$store.commit('setPageTitle', 'Sprint info')
      this.$store.commit('setPageDescription', "Sprint information")
    }
  }
}
</script>

