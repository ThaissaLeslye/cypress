const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: 'https://playground.bondaracademy.com/',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: true,
    json: true
  },
    specPattern: 'test/**/*.cy.{js,jsx,ts,tsx}',
  },
  viewportWidth: 1280,
  viewportHeight: 720
});

