/// <reference types="cypress" />

describe('NCC Home Module', () => {

  it('NCC-HOME-TST-001 - View Testimonials', () => {
    cy.visit('/')

    cy.contains('Testimoni')
      .scrollIntoView()
      .should('exist')

    cy.get('body')
      .should('contain.text', 'Testimoni')
  })

  it('NCC-HOME-TST-002 - Verify Testimonial Content', () => {
    cy.visit('/')

    cy.contains('Testimoni')
      .scrollIntoView()
      .should('exist')

    cy.get('body')
      .should('contain.text', 'Direkomendasikan')
  })
  it('NCC-HOME-TST-003 - Verify Recommended Testimonial Display', () => {
    cy.visit('/')

    cy.contains('Sangat Direkomendasikan')
      .scrollIntoView()
      .should('exist')
  })

  it('NCC-HOME-TST-004 - Verify Responsive Testimonial Section', () => {
    cy.viewport(375, 667)
    cy.visit('/')

    cy.contains('Testimoni')
      .scrollIntoView()
      .should('exist')

    cy.get('body')
      .should('contain.text', 'Testimoni')
  })

  it('NCC-HOME-FTR-001 - View Consultation Features', () => {
    cy.visit('/')

    cy.get('body')
      .should('contain.text', 'Konsultasi')
  })

  it('NCC-HOME-FTR-002 - Verify Consultation Feature Content', () => {
    cy.visit('/')

    cy.get('body')
      .should('contain.text', 'Gizi')
  })

  it('NCC-LOG-003 - Navigate to Registration Page', () => {
    cy.visit('/login')

    cy.contains('Daftar')
      .should('exist')
      .click()

    cy.url()
      .should('include', '/register')
  })
})


describe('NCC Patient Session Module', () => {

  beforeEach(() => {
    cy.login('patient')
  })

  it('NCC-SES-001 - Verify Session After Reopening Browser Tab', () => {
    cy.visit('/')

    cy.contains('Panel Saya')
      .should('exist')
      .click()

    cy.url()
      .should('not.include', '/login')
  })

  it('NCC-SES-002 - Click Mulai Konsultasi Button After Login', () => {
    cy.visit('/')

    cy.contains('Mulai Konsultasi')
      .should('exist')
      .click()

    cy.url()
      .should('not.include', '/login')
  })
})


  describe('NCC Admin Dashboard Module', () => {

    beforeEach(() => {
      cy.login('admin')
    })

      it('NCC-DASH-004 - View All Consultation from Latest Registration', () => {
    cy.contains('Lihat Semua Konsultasi')
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.url()
      .should('include', '/admin/consultations')
  })
})
