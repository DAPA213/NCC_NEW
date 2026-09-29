/// <reference types="cypress" />

describe('NCC Additional Modules', () => {

  beforeEach(() => {
    cy.login('admin')
  })

  it('NCC-CBX-001 - Verify Checkbox Functionality in Patient Management as Admin', () => {
    cy.visit('/admin/patients')

    cy.url().should('include', '/patients')

    cy.get('input[type="checkbox"]:visible')
      .should('have.length.at.least', 3)
      .then(($checkboxes) => {
        cy.wrap($checkboxes[1]).check()
        cy.wrap($checkboxes[2]).check()

        cy.wrap($checkboxes[1]).should('be.checked')
        cy.wrap($checkboxes[2]).should('be.checked')
      })
  })

  it('NCC-PAT-REST-001 - Restore Deleted Patient Data', () => {
  cy.visit('/admin/patients?filter=trashed')

  cy.url().should('include', '/patients')

  cy.contains('button:visible', 'Restore')
    .should('be.visible')
    .first()
    .click()

  cy.url().should('include', '/admin/patients')
})

  it('NCC-REP-CNS-001 - View Counselor Performance Report', () => {
    cy.visit('/admin/reports/counselor')

    cy.url().should('include', '/reports/counselor')

    cy.contains('Counselor')
      .should('be.visible')
  })

  it('NCC-REP-CNS-002 - Filter Counselor Performance by Date Range', () => {
    cy.visit('/admin/reports/counselor')

    cy.get('input[type="date"]:visible')
      .should('have.length.at.least', 2)
      .then(($dates) => {
        cy.wrap($dates[0]).clear().type('2026-08-01')
        cy.wrap($dates[1]).clear().type('2026-08-31')
      })

    cy.contains('button', 'Filter')
      .should('be.visible')
      .click()

    cy.contains('Counselor')
      .should('be.visible')
  })

  it('NCC-ELF-002 - Create E-Leaflet Form Display', () => {
    cy.visit('/admin/leaflets/create')

    cy.url().should('include', '/leaflets/create')

    cy.get('input:visible')
      .should('have.length.at.least', 1)

    cy.get('textarea:visible')
      .should('exist')

    cy.contains('button', 'Simpan')
      .should('be.visible')
  })

  it('NCC-ELF-003 - Upload Thumbnail Image Field Display', () => {
    cy.visit('/admin/leaflets/create')

    cy.get('input[type="file"]:visible')
      .first()
      .should('exist')
  })

  it('NCC-ELF-004 - Upload PDF File Field Display', () => {
    cy.visit('/admin/leaflets/create')

    cy.get('input[type="file"]:visible')
      .last()
      .should('exist')
  })

})