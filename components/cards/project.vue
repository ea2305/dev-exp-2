<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ title }}
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        {{ description }}
        <br>
        <time datetime="2016-1-1">{{ date }}</time>
      </div>
    </div>
    <footer class="card-footer">
      <a :href="urlView" class="card-footer-item">View</a>
      <a :href="urlEdit" class="card-footer-item">Edit</a>
      <a :href="urlDelete" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'No title',
      required: true
    },
    description: {
      type: String,
      default: 'No description',
      required: true
    },
    date: {
      type: String
    },
    urlView: {
      type: String
    },
    urlEdit: {
      type: String
    },
    urlDelete: {
      type: String
    }
  }
}
</script>

