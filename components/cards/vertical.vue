<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ title }}
      </p>
      <a href="#" class="card-header-icon" aria-label="Icon action">
        <span class="icon">
          <i :class="classes" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="is-flex" style="justify-content: center">
          <img v-if="image" width="100" :src="image" alt="image card">
        </div>
        <hr>
        {{ body }}
        <br>
        {{ value }}
      </div>
    </div>
    <footer class="card-footer">
      <time :datetime="date"></time>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: false
    }
  }  
}
</script>

