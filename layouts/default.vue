<template>
  <main>
    <!-- nav -->
    <navegation />

    <!--header -->
    <title-base :title="$store.state.page.title" :description="$store.state.page.description"/>

    <!-- Divider-->
    <hr>

    <!-- Content -->
    <nuxt/>

    <!-- footer -->
    <footer-base />
  </main>
</template>

<script>
// components
import navegation from '~/components/layout/navegation'
import footerBase from '~/components/layout/footer'
import titleBase from '~/components/layout/title'
export default {
  components: {
    navegation,
    footerBase,
    titleBase
  }
}
</script>

<style lang="postcss">
.vpage {
  min-height: 100vh;
  height: auto;
}
</style>
