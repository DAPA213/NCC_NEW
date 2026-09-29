describe('NCC Login Testing', () => {

  it('NCC-LOG-001 Access Login Page', () => {
    cy.visit('/login')

    cy.contains('Selamat datang kembali')
      .should('be.visible')

    cy.get('input[type="email"]')
      .should('exist')

    cy.get('input[type="password"]')
      .should('exist')

    cy.contains('Masuk Ke Akun')
      .should('exist')
  })

  it('NCC-LOG-002 Login sebagai Admin', () => {
    cy.login('admin')
  })

  it('NCC-LOG-003 Login sebagai Officer', () => {
    cy.login('officer')
  })

  it('NCC-LOG-004 Login sebagai Counselor', () => {
    cy.login('counselor')
  })

  it('NCC-LOG-005 Login sebagai Patient', () => {
    cy.login('patient')
  })

})