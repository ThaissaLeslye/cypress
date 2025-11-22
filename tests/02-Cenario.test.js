describe('Cenario de Teste 2', () => {

  it('Deve retornar 200 ao fazer um get', () => {
    
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