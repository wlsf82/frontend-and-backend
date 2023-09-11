const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    API_URL: 'http://localhost:3001/',
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    supportFile: false,
  },
})
