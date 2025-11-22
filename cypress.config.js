
const { defineConfig } = require("cypress");
 
module.exports = defineConfig({
  video: false,
  responseTimeout: 60000,
  defaultCommandTimeout: 20000,
  watchForFileChanges: false,
  screenshotOnRunFailure: false,
  viewportWidth: 1600,
  viewportHeight: 900,
  screenshotsFolder: 'cypress/results/screenshot',
  reporter: 'mochawesome',
  reporterOptions: {
    enableCode: false,
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    charts: true
  },
  env: {
    token: '',
    caminhoCredenciais: '/var/lib/jenkins/credenciais/credenciais.json',
  },
  e2e: {
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'electron' && browser.isHeadless) {
          launchOptions.preferences.width = 1920;
          launchOptions.preferences.height = 1080;
        }
        return launchOptions;
      })
    },
    baseUrl: 'https://www.google.com/',
    specPattern: 'tests/*.test.js',
    experimentalRunAllSpecs: true,
    experimentalModifyObstructiveThirdPartyCode: true
  }
});
    