// main store app
'use strict'

export const state = () => ({
  // page title and description configuration
  sections: [
    { 
      title: 'Dashboard', 
      url: '/', 
      icon: {
        name: 'view-dashboard',
        class: 'is-large'
      }
    },
    { title: 'Project', url: '/projects' },
    { title: 'Sprint', url: '/sprints' }
  ],
  page: {
    title: 'No title',
    description: 'No description'
  }
})

export const mutations = {
  /**
   * Base title description
   * @param {Object} state 
   * @param {String} title : title page
   */
  setPageTitle (state, title) {
    state.page.title = title
  },
  /**
   * Base description page
   * @param {Object} state 
   * @param {String} description : description about page
   */
  setPageDescription (state, description) {
    state.page.description = description
  }
}