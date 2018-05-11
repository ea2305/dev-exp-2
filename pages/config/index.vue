<template>
  <div class="vpage">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h3 class="is-size-3">
            Hola mundo
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount () {
    this.setPage()
  },
  methods: {
    /**
     * Set title and description
     */
    setPage () {
      this.$store.commit('setPageTitle', 'Config Monitor')
      this.$store.commit('setPageDescription', "Change configuration monitor")
    },
  }
}
</script>

