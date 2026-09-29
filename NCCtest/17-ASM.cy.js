/// <reference types="cypress" />

describe('NCC Assessment Management', () => {

  beforeEach(() => {
    cy.login('admin')
  })

  function bukaAsesmen() {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('a', 'Asesmen Hari Ini')
      .should('exist')
      .click({ force: true })

    cy.url()
      .should('include', '/officer/consultations/today')
  }

  function filterTanggal(tanggal) {
    cy.get('input[type="date"]')
      .first()
      .should('exist')
      .clear()
      .type(tanggal)

    cy.contains('button', /^Filter$/i)
      .should('be.visible')
      .click()

    cy.get('tbody tr')
      .should('have.length.at.least', 1)
  }

  function klikTangani() {
    cy.contains('Tangani')
      .first()
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('body')
      .should('be.visible')
  }


  it('NCC-ASM-001 - Verify Display of Assessment List', () => {
    bukaAsesmen()
    filterTanggal('2026-09-01')

    cy.get('table')
      .should('exist')

    cy.contains('Tanggal')
      .should('exist')

    cy.contains('Pasien')
      .should('exist')

    cy.contains('Paket')
      .should('exist')

    cy.contains('Status Data')
      .should('exist')

    cy.contains('Aksi')
      .should('exist')

    cy.contains('Tangani')
      .should('exist')
  })

  
 it('NCC-ASM-002 - Verify Status Data SUDAH DIISI', () => {
  bukaAsesmen()

  cy.get('input[type="date"]')
    .first()
    .clear()
    .type('2026-09-04')

  cy.contains('button', /^Filter$/i)
    .click()

  cy.contains(/SUDAH DIISI/i)
    .should('exist')
})

  it('NCC-ASM-003 - Verify Assessment Data After Date Filter', () => {
  bukaAsesmen()

    cy.get('input[type="date"]')
    .first()
    .clear()
    .type('2026-09-04')

  cy.contains('button', /^Filter$/i)
    .click()

  cy.contains(/SUDAH DIISI/i)
    .should('exist')
})


  it('NCC-ASM-004 - Verify Status Data After Assessment Update', () => {
    bukaAsesmen()
    filterTanggal('2026-09-04')

    cy.get('tbody tr')
      .first()
      .contains('Tangani')
      .should('exist')
      .click()

    cy.contains('Simpan Data Asesmen')
      .should('exist')
  })


  it('NCC-ASM-005 - Verify Handle Assessment Button', () => {
    bukaAsesmen()
    filterTanggal('2026-09-04')

    cy.contains('Tangani')
      .first()
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('body')
      .should('be.visible')
  })


  it('NCC-ASM-006 - Verify Previous Record Information Display', () => {
    bukaAsesmen()
    filterTanggal('2026-09-09')
    klikTangani()

    cy.get('input:visible')
      .filter(function () {
        const value = Cypress.$(this).val()
        return value !== null && value !== ''
      })
      .should('have.length.at.least', 1)

    cy.contains('Kembali ke Daftar')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('body')
      .should('be.visible')
  })


  it('NCC-ASM-007 - Verify Assessment Klinis Form Display', () => {
    bukaAsesmen()
    filterTanggal('2026-09-09')
    klikTangani()

    cy.contains('InBody Score')
      .should('exist')

    cy.contains('Berat Badan')
      .should('exist')

    cy.contains('Tinggi Badan')
      .should('exist')

    cy.contains('Lingkar Lengan Atas')
      .should('exist')

    cy.contains('Lingkar Perut')
      .should('exist')

    cy.contains('Hemoglobin')
      .should('exist')

    cy.contains('Gula Darah')
      .should('exist')

    cy.contains('Kolesterol')
      .should('exist')

    cy.get('input[type="file"]')
      .should('exist')
  })


  it('NCC-ASM-008 - Verify Upload InBody File', () => {
    bukaAsesmen()
    filterTanggal('2026-09-09')
    klikTangani()

    cy.get('input[type="file"]')
      .should('exist')
      .and('have.attr', 'required')

    cy.contains('button', 'Simpan Data Asesmen')
      .should('exist')
      .click({ force: true })

    cy.get('input[type="file"]')
      .then(($input) => {
        expect($input[0].checkValidity())
          .to.be.false
      })
  })


  it('NCC-ASM-009 - Verify Numeric Input Validation', () => {
    bukaAsesmen()
    filterTanggal('2026-09-09')
    klikTangani()

    cy.get('input[type="number"]')
      .first()
      .should('exist')
      .type('abc')

    cy.get('input[type="number"]')
      .first()
      .invoke('val')
      .then((value) => {
        expect(value)
          .to.not.include('abc')
      })
  })


  it('NCC-ASM-010 - Verify Empty Assessment Form Validation', () => {
    bukaAsesmen()
    filterTanggal('2026-09-09')
    klikTangani()

    cy.contains('button', 'Simpan Data Asesmen')
      .should('exist')
      .click({ force: true })

    cy.get('input[required], select[required], textarea[required]')
      .should('have.length.at.least', 1)

    cy.get('input[required], select[required], textarea[required]')
      .first()
      .then(($field) => {
        expect($field[0].checkValidity())
          .to.be.false
      })
  })

})