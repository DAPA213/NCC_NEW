Cypress.Commands.add('login', (role = 'admin') => {

  const creds = {
    admin: {
      email: Cypress.env('admin_email'),
      password: Cypress.env('admin_password'),
      url: '/admin'
    },

    officer: {
      email: Cypress.env('officer_email'),
      password: Cypress.env('officer_password'),
      url: '/admin'
    },

    counselor: {
      email: Cypress.env('counselor_email'),
      password: Cypress.env('counselor_password'),
      url: '/counselor'
    },

    patient: {
      email: Cypress.env('patient_email'),
      password: Cypress.env('patient_password'),
      url: '/patient'
    }
  }

  const { email, password, url } = creds[role]

  cy.visit('/login')

  cy.get('input[type="email"]')
    .should('be.visible')
    .clear()
    .type(email)

  cy.get('input[type="password"]')
    .should('be.visible')
    .clear()
    .type(password)

  cy.contains('button', 'Masuk Ke Akun')
    .should('be.visible')
    .click()

  cy.url({ timeout: 15000 })      
    .should('include', url)
})