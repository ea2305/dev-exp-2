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
      this.$store.commit('setPageTitle', 'Add Sprint')
      this.$store.commit('setPageDescription', "Let's do it")
    }
  }
}
</script>

