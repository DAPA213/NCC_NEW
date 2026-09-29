/// <reference types="cypress" />

describe('NCC Counselor Handling & Status', () => {

  beforeEach(() => {
    cy.login('counselor')
  })

  function bukaMenu(menu) {
    cy.get('#openSidebarBtn')
      .click({ force: true })
    
    cy.contains('a', menu)
      .scrollIntoView()
      .should('exist')
      .click({ force: true })
  }

  function bukaStatus() {
    bukaMenu('Dashboard')

    cy.contains('span', /Status:\s*(Aktif \(Tersedia\)|Nonaktif \(Offline\))/i)
      .should('exist')
      .next('button')
      .click({ force: true })

    cy.contains('Konfirmasi Ubah Status')
      .should('be.visible')
  }

  it('NCC-CNS-HAND-002 - Save Consultation Result Without Required Fields', () => {
    bukaMenu('Sesi Hari Ini')

    cy.contains('Tangani')
      .first()
      .click({ force: true })

    cy.contains('Simpan Hasil Konsultasi')
      .click({ force: true })
  })

  it('NCC-CNS-HAND-003 - Save Consultation Result Without Image File', () => {
    bukaMenu('Sesi Hari Ini')

    cy.contains('Tangani')
      .first()
      .click({ force: true })

    cy.get('input[type="file"]')
      .should('exist')

    cy.contains('Simpan Hasil Konsultasi')
      .click({ force: true })
  })

  it('NCC-CNS-STS-001 - Verify Counselor Availability Status Display', () => {
    bukaMenu('Dashboard')

    cy.contains('span', /Status:\s*(Aktif \(Tersedia\)|Nonaktif \(Offline\))/i)
      .should('exist')
  })

  it('NCC-CNS-STS-002 - Verify Change Counselor Status from Aktif to Nonaktif', () => {
    bukaStatus()

    cy.contains('button', 'Ya, Ubah Status')
      .click({ force: true })

    cy.contains('Status: Nonaktif (Offline)')
      .should('exist')
  })

  it('NCC-CNS-STS-003 - Verify Change Counselor Status from Nonaktif to Aktif', () => {
    bukaStatus()

    cy.contains('button', 'Ya, Ubah Status')
      .click({ force: true })

    cy.contains('Status: Aktif (Tersedia)')
      .should('exist')
  })

  it('NCC-CNS-STS-004 - Verify Cancel Status Change', () => {
  bukaStatus()

  cy.contains('button', 'Batal')
    .should('be.visible')
    .click({ force: true })

  cy.contains('Konfirmasi Ubah Status')
    .should('not.exist')
})

})