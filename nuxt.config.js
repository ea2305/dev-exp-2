// env configuration
require('dotenv').config()

module.exports = {
  /*
  ** Build configuration
  */
  build: {},
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {
    link: [
      { 
        rel: 'stylesheet',
        href: '//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3bn' },
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-buefy',
    '@nuxtjs/dotenv',
    {
      src: '@rafamaciel/firebase',
      options: {
        apiKey: process.env.FIREBASE_APIKEY,
        authDomain: process.env.FIREBASE_AUTHDOMAIN,
        databaseURL: process.env.FIREBASE_DATABASEURL,
        projectId: process.env.FIREBASE_PROJECTID,
        storageBucket: process.env.FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
      }
    }
  ]
}
