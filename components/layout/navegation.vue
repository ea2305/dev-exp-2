<template>
  <nav class="navbar is-black" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <b-icon
            icon="view-dashboard"
            size="is-medium">
        </b-icon>
      </nuxt-link>

      <nuxt-link class="navbar-item" to="/sprint">
        Sprint
      </nuxt-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  </nav>
</template>
