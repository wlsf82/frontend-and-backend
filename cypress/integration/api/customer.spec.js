describe('Customers App API', function() {
  const salesRepresentative = 'Jonny'
  const currentTimestamp = (new Date()).toDateString()

  context('POST', function() {
    beforeEach(function() {
      cy.request(
        'POST',
        Cypress.env('API_URL'),
        { name: salesRepresentative }
      ).as('postRes')
    })

    it('returns a 200 status code', function() {
      expect(this.postRes.status).to.equal(200)
    })

    it('returns "name", "timestamp", and "customer" properties on response body', function() {
      const { name, timestamp, customers } = this.postRes.body

      expect(name).to.equal(salesRepresentative)
      expect(timestamp).to.equal(currentTimestamp)
      customers.forEach(customer => {
        expect(customer.id).to.exist
        expect(customer.name).to.exist
        expect(customer.employees).to.exist
        expect(customer.size).to.exist
      })
    })

    it('returns the right size based on the number of employees', function() {
      const { customers } = this.postRes.body

      customers.forEach((customer) => {
        if (customer.employees <= 100) {
          expect(customer.size).to.equal('Small', `Customer id: ${customer.id} - small`)
        } else if (customer.employees <= 1000) {
          expect(customer.size).to.equal('Medium', `Customer id: ${customer.id} - Medium`)
        } else {
          expect(customer.size).to.equal('Big', `Customer id: ${customer.id} - BIG`)
        }
      })
    })

    it('returns customer\'s contact info', function() {
      const { customers } = this.postRes.body

      expect(customers[0].contactInfo).to.exist
      expect(customers[1].contactInfo).to.exist
      expect(customers[2].contactInfo).to.exist
      expect(customers[4].contactInfo).to.exist
      expect(customers[5].contactInfo).to.exist
    })

    it('doesn\'t return customer\'s contact info if there\'s none', function() {
      const { customers } = this.postRes.body

      expect(customers[3].contactInfo).not.to.exist
    })
  })
})
