/// <reference types="cypress" />

describe('NCC Payment, NLK, Contact Module', () => {

  beforeEach(() => {
    cy.login('admin')
  })

  it('NCC-PAY-ADM-001 - Verify Cash Payment Confirmation for Assessment', () => {

    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Riwayat Medis Pasien')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('a[href*="tab=assessment"]')
      .should('exist')
      .click()

    cy.url()
      .should('include', 'tab=assessment')

    cy.contains('5')
    .should('exist')
    .click()

    cy.contains(/Konfirmasi Bayar/i)
    .first()
    .should('exist')
    .click()

  cy.contains('h3:visible', 'Konfirmasi Pembayaran')
    .should('exist')

    cy.contains('Lanjutkan')
      .should('be.visible')
      .click()

    cy.get('body')
      .should('contain.text', 'Lunas')
  })


 it('NCC-PAY-ADM-003 - Verify Cancel Payment Confirmation', () => {
  cy.get('#openSidebarBtn')
    .should('be.visible')
    .click()

  cy.contains('Riwayat Medis Pasien')
    .scrollIntoView()
    .should('exist')
    .click()

  cy.get('a[href*="tab=assessment"]')
      .should('exist')
      .click()


  cy.contains(/Konfirmasi Bayar/i)
    .first()
    .should('exist')
    .click()

  cy.contains('h3:visible', 'Konfirmasi Pembayaran')
    .should('exist')

  cy.contains('button:visible', 'Batal')
    .should('exist')
    .click()

  cy.contains('h3:visible', 'Konfirmasi Pembayaran')
    .should('not.exist')
  })

  it('NCC-NLK-002 - View NLK Reconciliation Dashboard', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Rekonsiliasi Dana NLK')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.url()
      .should('include', 'nlk-reconciliation')

    cy.get('body')
      .should('contain.text', 'Total Dana')
      .and('contain.text', 'Sudah Ditransfer')
      .and('contain.text', 'Sisa Hutang')
  })

  it('NCC-NLK-003 - Record Transfer to NLK', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Rekonsiliasi Dana NLK')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.contains('Rekam Transfer')
      .should('be.visible')
      .click()

    cy.contains('Rekam Transfer Baru')
      .should('be.visible')

    cy.get('input[placeholder*="500000"]')
      .should('be.visible')
      .type('100000')

    cy.get('textarea')
      .should('be.visible')
      .type('Transfer otomatis Cypress')

    cy.contains('Simpan Rekaman')
      .should('be.visible')
      .click()

    cy.get('body')
      .should('contain.text', '100.000')
  })

   it('NCC-NLK-004 - View Transfer Proof', () => {

    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Rekonsiliasi Dana NLK')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.url()
      .should('include', 'nlk-reconciliation')

    cy.contains('Lihat Bukti')
      .first()
      .should('exist')
      .click()

    cy.get('body')
      .should('be.visible')
  })

  it('NCC-NLK-005 - Save Transfer Record Without Uploading Proof', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Rekonsiliasi Dana NLK')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.contains('Rekam Transfer ke NLK')
      .should('be.visible')
      .click()

    cy.contains('Jumlah Transfer')
      .should('exist')

    cy.contains('Tanggal Transfer')
      .should('exist')

    cy.contains('Catatan Tambahan')
      .should('exist')

    cy.contains('Bukti Transfer')
      .should('exist')

    cy.get('input[type="number"]:visible')
      .first()
      .type('100000')

    cy.get('input[type="date"]:visible')
      .first()
      .type('2026-09-02')

    cy.get('textarea:visible')
      .first()
      .type('Transfer NLK tanpa bukti transfer')

    cy.contains('Simpan Rekaman')
      .should('be.visible')
      .click()

    cy.contains('Histori Transfer')
      .should('exist')
  })

  it('NCC-CTC-003 - View Contact Message List', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pesan Kontak')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.url()
      .should('include', '/contacts')

    cy.contains('Pesan Kontak')
      .should('exist')

    cy.get('table')
      .should('exist')
  })

  it('NCC-CTC-004 - View Contact Message Detail', () => {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Pesan Kontak')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.url()
      .should('include', '/contacts')

    cy.get('table tbody tr')
      .first()
      .find('button')
      .first()
      .should('be.visible')
      .click()

    cy.get('body')
      .should('be.visible')
  })
})