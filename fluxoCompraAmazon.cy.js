describe('fluxoCompraAmazon', () => {

  //Constantes que serão utilizadas em todos os casos de testes
  const url = 'https://www.amazon.com.br/'
  const produto = 'Xbox Series S'

  const loginAmazon = {
    usuario: 'suitedetestsamazon@gmail.com',
    senha: 'Daniel@123456'
  }

  const dadosFinalizarCompra = {
    telefone: '31999998888',
    cep: '32113410',
    endereco: 'Rua Juventino',
    numeroResidencia: '111',
    complemento: 'casa',
    bairro: 'Ressaca'
  }
 
it('Adicionar Produto no Carrinho', () => {
  cy.visit(url);
  cy.title().should('be.equal', 'Amazon.com.br | Tudo pra você, de A a Z.');
  cy.wait(5000);
  cy.get('#twotabsearchtextbox').type(produto);
  cy.wait(5000);
  cy.get('#nav-search-submit-button').click();
  cy.contains('Console Xbox Series S').should('be.visible').click();
  cy.wait(5000);
  cy.get('#add-to-cart-button').click();
  cy.wait(1000);
  cy.get('body').then(($body) => {
      if ($body.find('#attachSiNoCoverage').length > 0) {
          cy.get('#attachSiNoCoverage').then(($element) => {
              if ($element.is(':visible')) {
                  cy.wrap($element).find('input.a-button-input').click({ force: true });
              }
          });
      }
  });
  cy.wait(1000);
  cy.contains('Adicionado ao carrinho').should('be.visible');
});

  it('Remover Produto do Carrinho', () => {
    cy.visit(url)
    cy.title().should('be.equal', 'Amazon.com.br | Tudo pra você, de A a Z.')
    cy.wait(5000)
    cy.get('#twotabsearchtextbox').type(produto)
    cy.wait(5000)
    cy.get('#nav-search-submit-button').click()
    cy.contains('Console Xbox Series S').should('be.visible')
    cy.contains('Console Xbox Series S').click()
    cy.wait(5000)
    cy.get('#add-to-cart-button').click()
    cy.get('body').then(($body) => {
      if ($body.find('#attachSiNoCoverage').length > 0) {
          cy.get('#attachSiNoCoverage').then(($element) => {
              if ($element.is(':visible')) {
                  cy.wrap($element).find('input.a-button-input').click({ force: true });
              }
          });
      }
  });
    cy.contains(' Adicionado ao carrinho ').should('be.visible')
    cy.get('#nav-cart-count-container').click()
    cy.wait(5000)
    cy.get('.sc-action-delete > .a-declarative > .a-color-link').click()
    cy.contains('foi removido de Carrinho de compras.').should('be.visible')
  })

  it('Salvar produto para comprar mais tarde', () => {
    cy.visit(url)
    cy.title().should('be.equal', 'Amazon.com.br | Tudo pra você, de A a Z.')
    cy.wait(5000)
    cy.get('#twotabsearchtextbox').type(produto)
    cy.wait(5000)
    cy.get('#nav-search-submit-button').click()
    cy.contains('Console Xbox Series S').should('be.visible')
    cy.contains('Console Xbox Series S').click()
    cy.wait(5000)
    cy.get('#add-to-cart-button').click()
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('#attachSiNoCoverage').length > 0) {
          cy.get('#attachSiNoCoverage').then(($element) => {
              if ($element.is(':visible')) {
                  cy.wrap($element).find('input.a-button-input').click({ force: true });
              }
          });
      }
  });
    cy.wait(5000)
    cy.contains(' Adicionado ao carrinho ').should('be.visible')
    cy.get('#nav-cart-count-container').click()
    cy.wait(5000)
    cy.get('.sc-action-links > .sc-action-save-for-later > .a-declarative > .a-color-link').click()
    cy.contains('foi salvo para mais tarde.').should('be.visible')
  })

  it('Clicar no botão comprar e validar redirecionamento', () => {
    cy.visit(url)
    cy.title().should('be.equal', 'Amazon.com.br | Tudo pra você, de A a Z.')
    cy.wait(5000)
    cy.get('#twotabsearchtextbox').type(produto)
    cy.wait(5000)
    cy.get('#nav-search-submit-button').click()
    cy.contains('Console Xbox Series S').should('be.visible')
    cy.contains('Console Xbox Series S').click()
    cy.wait(5000)
    cy.get('#buy-now-button').click().should('be.visible')
    cy.get('#ap_email').type(loginAmazon.usuario)
    cy.get('.a-button-inner > #continue').click()
    cy.get('#ap_password').type(loginAmazon.senha)
    cy.get('#signInSubmit').click()
    cy.contains('Finalizar a compra').should('be.visible')
  })

  it('Preencher endereço na página de finalização de compra', () => {
    cy.visit(url)
    cy.title().should('be.equal', 'Amazon.com.br | Tudo pra você, de A a Z.')
    cy.wait(5000)
    cy.get('#twotabsearchtextbox').type(produto)
    cy.wait(5000)
    cy.get('#nav-search-submit-button').click()
    cy.contains('Console Xbox Series S').should('be.visible')
    cy.contains('Console Xbox Series S').click()
    cy.wait(5000)
    cy.get('#buy-now-button').click()
    cy.get('#ap_email').type(loginAmazon.usuario)
    cy.get('.a-button-inner > #continue').click()
    cy.get('#ap_password').type(loginAmazon.senha)
    cy.get('#signInSubmit').click()
    cy.contains('Finalizar a compra').should('be.visible')
    cy.get('.a-span2 > .a-declarative > [data-testid]').click()
    cy.get('.a-spacing-extra-large > [data-action="trigger-modal-dialog"] > [data-testid]').click()
    cy.get('#address-ui-widgets-enterAddressPhoneNumber').type(dadosFinalizarCompra.telefone)
    cy.get('#address-ui-widgets-enterAddressPostalCode').type(dadosFinalizarCompra.cep, 'Cypress.io{enter}')
    cy.get('#address-ui-widgets-streetName').click()
    cy.wait(5000)
    cy.get('#address-ui-widgets-buildingNumber').type(dadosFinalizarCompra.numeroResidencia)
    cy.get('#address-ui-widgets-complement').type(dadosFinalizarCompra.complemento)
  })

  it('Alterar a quantidade de produtos no Carrinho', () => {
    cy.visit(url)
    cy.title().should('be.equal', 'Amazon.com.br | Tudo pra você, de A a Z.')
    cy.wait(5000)
    cy.get('#twotabsearchtextbox').type(produto)
    cy.wait(5000)
    cy.get('#nav-search-submit-button').click()
    cy.contains('Console Xbox Series S').should('be.visible')
    cy.contains('Console Xbox Series S').click()
    cy.wait(5000)
    cy.get('#add-to-cart-button').click()
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('#attachSiNoCoverage').length > 0) {
          cy.get('#attachSiNoCoverage').then(($element) => {
              if ($element.is(':visible')) {
                  cy.wrap($element).find('input.a-button-input').click({ force: true });
              }
          });
      }
  });
    cy.wait(5000)
    cy.contains(' Adicionado ao carrinho ').should('be.visible')
    cy.get('#nav-cart-count-container').click()
    cy.wait(5000)
    cy.get('#a-autoid-0-announce').click()
    cy.get('#quantity_2').click()
    cy.contains('Subtotal (2 produtos)').should('be.visible')
  })
})

