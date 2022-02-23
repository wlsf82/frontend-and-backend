describe('Customers App UI', () => {
  const salesRepresentative = 'John Doe'

  beforeEach(() => {
    // For all tests, I'm mocking the API response.
    // The idea is just check that the frontend correctly renders what the API provides.
    cy.intercept(
      'POST',
      Cypress.env('API_URL'),
      { fixture: 'customers' }
    )
    cy.visit('/')
  })

  context('Welcome Screen', () => {
    it('alerts when no name is provided', () => {
      cy.get('[data-testid="submit-btn"]').click()

      cy.on('window:alert', alert => {
        expect(alert).to.equal('Please provide your name')
      })
    })

    it('directs the user to the Customer List Screen', () => {
      cy.get('[data-testid="name"]').type(salesRepresentative)
      cy.get('[data-testid="submit-btn"]').click()

      cy.contains(`Hi ${salesRepresentative}. It is now Wed Aug 25 2021 and here is our customer list.`)
        .should('be.visible')
      cy.contains('Click on each of them to view their contact details.')
        .should('be.visible')
      cy.get('table')
        .should('be.visible')
        .and('contain', 'Name')
        .and('contain', '# of Employees')
        .and('contain', 'Size')
        .find('tbody tr').should('have.length.gte', 1)
    })
  })

  context('Fill in the text field and submit', () => {
    beforeEach(() => {
      cy.get('[data-testid="name"]').type(salesRepresentative)
      cy.get('[data-testid="submit-btn"]').click()
    })

    context('Customer List Screen', () => {
      it('greets and shows a table with headers and four rows', () => {
        cy.contains(`Hi ${salesRepresentative}. It is now Wed Aug 25 2021 and here is our customer list.`)
          .should('be.visible')
        cy.contains('Click on each of them to view their contact details.')
          .should('be.visible')
        cy.get('table').as('table')
          .should('be.visible')
          .find('thead')
          .and('contain', 'Name')
          .and('contain', '# of Employees')
          .and('contain', 'Size')
        cy.get('@table')
          .find('tbody tr').should('have.length', 4)
      })

      it('shows the right size based on the # of employees', () => {
        cy.get('table')
          .find('tbody tr').as('tableRows')
          .eq(0)
          .should('contain', 'Small')
          .and('be.visible')
        cy.get('@tableRows')
          .eq(1)
          .should('contain', 'Medium')
          .and('be.visible')
        cy.get('@tableRows')
          .eq(2)
          .should('contain', 'Medium')
          .and('be.visible')
        cy.get('@tableRows')
          .eq(3)
          .should('contain', 'Big')
          .and('be.visible')
      })
    })

    context('Contacts Detail Screen', () => {
      it('shows contact info', () => {
        cy.get('table tbody tr')
          .first()
          .find('a')
          .click()

        cy.contains('p', 'Greg H. (customer@one.com)')
          .should('be.visible')
      })

      it('shows "No contact info available"', () => {
        cy.get('table tbody tr')
          .eq(3)
          .find('a')
          .click()

        cy.contains('p', 'No contact info available')
          .should('be.visible')
      })

      it('goes back to the Customer List Screen', () => {
        cy.get('table tbody tr')
          .first()
          .find('a')
          .click()

        cy.get('input[type="button"][value="Back to the list"]').click()

        cy.get('table').should('be.visible')
      })
    })
  })
})
