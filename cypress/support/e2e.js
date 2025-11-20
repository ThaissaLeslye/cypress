// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';

Cypress.on('fail', (error, runnable) => {
  // Verifica se o erro veio de um cy.request()
  if (error.message.includes('cy.request() failed on')) {
    
    // Tenta extrair as informações vitais usando Regex
    const matchUrl = error.message.match(/URL: (.*?)\n/);
    const matchStatus = error.message.match(/Status: (\d+)/);
    const matchMethod = error.message.match(/Method: (.*?)\n/);

    const url = matchUrl ? matchUrl[1] : 'URL desconhecida';
    const status = matchStatus ? matchStatus[1] : 'Erro';
    const method = matchMethod ? matchMethod[1] : 'REQ';

    // Reescreve a mensagem de erro para ficar limpa no Jenkins
    error.message = `FALHA API: [${method}] ${url} respondeu com Status ${status}`;
    
    // (Opcional) Limpa o stacktrace gigante para não poluir o log
    // error.stack = error.message; 
  }

  // Lança o erro modificado para falhar o teste
  throw error;
});