/// <reference types="cypress" />

describe('Cypress basic', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        // assertivas para verificar se o título da página corresponde ao valor
        // e para verificar se o título contém um valor
        // cy.title().should('be.equal', 'Campo de Treinamento')
        // cy.title().should('contain', 'Campo')

        // O mesmo que o acima, mas em uma chamada única
        //cy.pause()
        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('contain', 'Campo')

        // O mesmo que o acima, mas em vez de repetir o should, usa o and
        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        let syncTitle

        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title
        })
        
        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })

    })

    it(`' Should find and interact with an element`, () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        // cy.get('#buttonSimple').should('have.value', 'Clique Me!')
        // cy.get('#buttonSimple').click()
        // cy.get('#buttonSimple').should('have.value', 'Obrigado!')

        cy.get('#buttonSimple')
            .should('have.value', 'Clique Me!')
            .click()
            .should('have.value', 'Obrigado!')

    })
})

describe('Validar Título login DHuO', () => {
    it('Visitar a página de login e validar o título', () => {
        cy.visit('https://iam-dhuo-data-stg.br.engineering/realms/dhuodata/protocol/openid-connect/auth?client_id=dhuo-frontend&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fdhuo-data-adm-stg.br.engineering%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=8Lo7GPsKwLpRx-Z-dJu74k4Dafy1gigLbAsm6rXdVyA&code_challenge=eJZ13nuv3EdCbeik1lyuzIlRqvKjPLy810c_41NFaaY&code_challenge_method=S256')
        cy.title().should('be.equal', 'Entrar em dhuodata');
    })
})