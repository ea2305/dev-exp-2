<template>
  <aside class="menu is-black">
    <p class="menu-label has-text-white" style="text-align: center">
      Dev2 menu
    </p>
    <nuxt-link to="/" class="menu-list">
      <img src="/icon.png" alt="dev2 icon">
    </nuxt-link>


    <p class="menu-label has-text-white" style="text-align: center">
      Content
    </p>

    <ul class="menu-list">
      <li v-for="section of $store.state.sections"
        :key="section.url">
        <nuxt-link 
          class="menu-list has-text-white" 
          :to="section.url">

          <b-icon v-if="section.icon" :icon="section.icon.name" :size="section.icon.class"></b-icon>
          <span class="has-text-white" style="padding: 0em .3em">{{ section.title }}</span>
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>
