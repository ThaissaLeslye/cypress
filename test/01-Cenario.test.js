describe('Cenario de Teste 1', () => {

  it('Deve retornar status 200 ao consultar um post existente', () => {
    
    // Faz a requisição HTTP do tipo GET
    cy.request({
      method: 'GET', 
      url: 'https://jsonplaceholder.typicode.com/posts/1'
    })
    .then((response) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;
    })
  })
})