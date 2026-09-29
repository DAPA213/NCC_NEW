/// <reference types="cypress" />

describe('NCC Admin - Counselor Management', () => {

  beforeEach(() => {
    cy.login('admin')
  })


  it('NCC-CNS-ADD-001 - Verify Add Counselor Form Display', () => {

    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Kelola Konselor')
      .should('exist')
      .click()

    cy.contains('Tambah Konselor')
      .should('exist')
      .click()

    cy.contains('Tambah Konselor')
      .should('exist')

    cy.get('input:visible')
      .should('have.length.at.least', 1)

    cy.contains('Simpan Data Konselor')
      .should('exist')

    cy.contains('Batal & Kembali')
      .should('exist')
  })


  it('NCC-CNS-ADD-002 - Verify Placeholder and Label Display', () => {

    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Kelola Konselor')
      .should('exist')
      .click()

    cy.contains('Tambah Konselor')
      .should('exist')
      .click()

    cy.get('label:visible')
      .should('have.length.at.least', 1)

    cy.get('input:visible')
      .should('have.length.at.least', 1)
      .each(($input) => {
        cy.wrap($input)
          .should('be.visible')
      })
  })


  it('NCC-CNS-ADD-003 - Verify Cancel Button Navigation', () => {

    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Kelola Konselor')
      .should('exist')
      .click()

    cy.contains('Tambah Konselor')
      .should('exist')
      .click()

    cy.contains('Batal & Kembali')
      .should('exist')
      .click()

    cy.url()
      .should('include', '/counselors')
  })

})


describe('NCC Counselor - Konsultasi Hari Ini', () => {

  beforeEach(() => {
    cy.login('counselor')
  })


    it('NCC-CNS-007 - Filter Consultation by Date', () => {

    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Sesi Hari Ini')
      .should('be.visible')
      .click()

    cy.url()
      .should('include', '/counselor/consultations')

    cy.contains('Konsultasi Hari Ini')
      .should('exist')

    cy.get('input[type="date"]:visible')
      .should('be.visible')
      .clear()
      .type('2026-08-20')

    cy.get('input[type="date"]:visible')
      .should('have.value', '2026-08-20')

    cy.contains('Filter')
      .should('be.visible')
      .click()

    cy.contains('Konsultasi Hari Ini')
      .should('exist')
  })


  it('NCC-CNS-008 - Access Konsultasi Hari Ini Page', () => {

  cy.visit('/counselor/consultations')

  cy.get('body')
    .should('be.visible')
})

})


describe('NCC Login Module', () => {


  it('NCC-LOG-007 - Verify Remember Device for 30 Days Functionality', () => {

    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/login')

    cy.get('input[type="checkbox"]:visible')
      .first()
      .should('exist')
      .check()

    cy.get('input[type="checkbox"]:visible')
      .first()
      .should('be.checked')

    cy.get('input:visible')
      .eq(0)
      .type(Cypress.env('admin_email'))

    cy.get('input:visible')
      .eq(1)
      .type(Cypress.env('admin_password'))

    cy.contains('Masuk Ke Akun')
      .should('be.visible')
      .click()

    cy.url()
      .should('include', '/admin')
  })


  it('NCC-LOG-008 - Verify Forgot Password Navigation', () => {

    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/login')

    cy.get('a[href*="/password/reset"]')
      .should('be.visible')
      .click()

    cy.url()
      .should('include', '/password/reset')
  })

}) 