<template>
  <nav class="navbar is-black" role="navigation" aria-label="main navigation">
    <div class="navbar-brand container">

      <nuxt-link 
        class="navbar-item" 
        :to="section.url" 
        v-for="section of $store.state.sections"
        :key="section.url">

        <b-icon v-if="section.icon" :icon="section.icon.name" :size="section.icon.class"></b-icon>
        <span style="padding: 0em .3em">{{ section.title }}</span>
      </nuxt-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  </nav>
</template>
