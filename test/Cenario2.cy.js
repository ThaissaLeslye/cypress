describe('Teste de API (Backend)', () => {

  it('Deve retornar status 200 ao consultar um post existente', () => {
    
    // Faz a requisição HTTP do tipo GET
    cy.request({
      method: 'GET', 
      url: 'https://jsonplaceholder.typicode.com/posts/1'
    })
    .then((response) => {
      // Loga a resposta no console do navegador (opcional, ajuda a debugar)
      cy.log(JSON.stringify(response.body))

      // --- Validações ---
      
      // 1. Verifica se o Status Code é 200 (OK)
      expect(response.status).to.eq(200)

      // 2. (Extra) Verifica se a resposta não veio vazia
      expect(response.body).to.not.be.null
    })
  })
  it('Deve testar algo', () => {
    
    // Faz a requisição HTTP do tipo GET
    cy.request({
      method: 'GET', 
      url: 'https://jsonplaceholder.typicode.com/posts/1666'
    })
    .then((response) => {
      // Loga a resposta no console do navegador (opcional, ajuda a debugar)
      cy.log(JSON.stringify(response.body))

      // --- Validações ---
      
      // 1. Verifica se o Status Code é 200 (OK)
      expect(response.status).to.eq(200,`Retornou: ${response.status}`)

      // 2. (Extra) Verifica se a resposta não veio vazia
      expect(response.body).to.not.be.null
    })
  })
})