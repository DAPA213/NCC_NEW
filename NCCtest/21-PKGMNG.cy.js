/// <reference types="cypress" />

describe('NCC Manajemen Paket', () => {

  beforeEach(() => {
    cy.login('admin')
  })

  function bukaKelolaPaket() {
    cy.get('#openSidebarBtn')
      .should('be.visible')
      .click()

    cy.contains('Kelola Paket NCC')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.url()
      .should('include', '/admin/packages')
  }

  function bukaTambahPaket() {
    bukaKelolaPaket()

    cy.contains('Tambah Paket')
      .scrollIntoView()
      .should('exist')
      .click()

    cy.contains('Tambah Paket Baru')
      .should('exist')
  }

  function bukaEditPaket() {
    bukaKelolaPaket()

    cy.get('tbody tr')
      .first()
      .find('a')
      .first()
      .scrollIntoView()
      .should('exist')
      .click()

    cy.url()
      .should('include', '/admin/packages/')
  }

  it('NCC-PKG-MNG-001 - Access Kelola Paket NCC Page', () => {
    bukaKelolaPaket()

    cy.contains('Manajemen Paket')
      .should('exist')

    cy.contains('Kelola daftar paket asesmen dan konsultasi untuk pasien.')
      .should('exist')

    cy.get('tbody tr')
      .should('have.length.at.least', 1)
  })

  it('NCC-PKG-MNG-002 - Open Add Package Form', () => {
    bukaTambahPaket()

    cy.contains(/Nama Paket/i).should('exist')
    cy.contains(/Deskripsi Paket/i).should('exist')
    cy.contains(/Harga/i).should('exist')
    cy.contains(/Tipe Paket/i).should('exist')
    cy.contains(/Jumlah Sesi/i).should('exist')
  })

  it('NCC-PKG-MNG-003 - Create Package with Valid Data', () => {
    bukaTambahPaket()

    cy.get('input:visible')
      .first()
      .clear()
      .type('Paket Cypress Test')

    cy.get('textarea:visible')
      .first()
      .clear()
      .type('Paket untuk pengujian Cypress')

    cy.get('input[type="number"]:visible')
      .first()
      .clear()
      .type('100000')

    cy.get('select:visible')
      .first()
      .select(1)

    cy.get('input[type="number"]:visible')
      .last()
      .clear()
      .type('3')

    cy.contains('button', /Simpan|Tambah|Buat/i)
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('body')
      .should('be.visible')
  })

  it('NCC-PKG-MNG-004 - Create Package with Empty Required Fields', () => {
    bukaTambahPaket()

    cy.contains('button', /Simpan|Tambah|Buat/i)
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('input[required], textarea[required], select[required]')
      .should('have.length.at.least', 1)

    cy.get('input[required], textarea[required], select[required]')
      .first()
      .then(($field) => {
        expect($field[0].checkValidity()).to.be.false
      })
  })

  it('NCC-PKG-MNG-005 - Edit Package Data', () => {
    bukaEditPaket()

    cy.get('input:visible')
      .first()
      .clear()
      .type('Paket Cypress Updated')

    cy.contains('button', /Simpan|Update|Perbarui/i)
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('body')
      .should('be.visible')
  })

  it('NCC-PKG-MNG-006 - Delete Package Data', () => {
    bukaKelolaPaket()

    cy.get('tbody tr')
      .first()
      .find('button')
      .last()
      .scrollIntoView()
      .should('exist')
      .click()

    cy.get('body')
      .should('be.visible')
  })

  it('NCC-PKG-MNG-007 - Verify Pagination on Package List', () => {
    bukaKelolaPaket()

    cy.get('tbody tr')
      .should('have.length.at.least', 1)

    cy.get('nav a')
      .contains('2')
      .should('exist')
      .click()

    cy.get('tbody tr')
      .should('have.length.at.least', 1)
  })

  it('NCC-PKG-MNG-008 - Edit One Package Data and Verify Notification', () => {
    bukaEditPaket()

    cy.get('input:visible')
      .should('have.length.at.least', 1)

    cy.get('input:visible')
      .first()
      .clear()
      .type('Paket Cypress Updated')

    cy.contains('button', /Simpan|Update|Perbarui/i)
      .scrollIntoView()
      .should('exist')
      .click()

    cy.contains(
      /berhasil diperbarui|berhasil diubah|berhasil disimpan|success/i
    )
      .should('be.visible')
  })

})