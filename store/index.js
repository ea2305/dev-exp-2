// main store app
'use strict'

export const state = () => ({
  // page title and description configuration
  /**{ 
    title: 'Dashboard', 
    url: '/', 
    icon: {
      name: 'monitor',
      class: 'is-medium'
    }
  },*/
  sections: [
    { title: 'Home', url: '/' },
    { title: 'Project', url: '/projects' },
    { title: 'Configuration', url: '/config' }
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