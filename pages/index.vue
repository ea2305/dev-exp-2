<template>
  <div class="vpage">
    <!-- Body -->
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-3">
          <card-info :title="'titulo'" :body="'aksjdf'" :image="'/icon.png'" :date="'2018-01-01'" :value="'1 project'"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// components
import CardInfo from '~/components/cards/info'

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
      this.$store.commit('setPageTitle', 'Dashboard')
      this.$store.commit('setPageDescription', 'Base route dashboard')
    }
  }, 
  components: {
    CardInfo
  }
}
</script>
