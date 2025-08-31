const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: 'https://playground.bondaracademy.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'cypress/results/results-[hash].xml',
      toConsole: false,
    },
    specPattern: 'test/**/*.cy.{js,jsx,ts,tsx}',
  },
  viewportWidth: 1280,
  viewportHeight: 720
});
