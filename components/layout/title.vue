<template>
  <!-- Header -->
  <section class="hero is-white">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-size-1 has-text-info">{{ title }}</h1>
        <h2 class="subtitle"> {{ description }}</h2>
      </div>
    </div>
  </section>    
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

