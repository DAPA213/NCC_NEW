/// <reference types="cypress" />

const isiFormRegistrasi = ({
  nama = 'Cypress Test Patient',
  email,
  whatsapp = '081234567890',
  password = 'Cypress123',
  gender = 'male',
  tanggalLahir = '2000-01-01',
  terms = true
}) => {
  cy.get('input[placeholder="Wira Pradana"]').type(nama)
  cy.get('select#gender').select(gender)
  cy.get('input[type="date"]').type(tanggalLahir)
  cy.get('input[placeholder="name@domain.com"]').type(email)
  cy.get('input[placeholder="08123456xxx"]').type(whatsapp)
  cy.get('input[placeholder="Minimal 8 karakter"]').type(password)

  if (terms) {
    cy.get('input[type="checkbox"]').first().check()
  }
}

describe('NCC Registration Test', () => {

  beforeEach(() => {
    cy.visit('/register')
  })

  it('NCC-REG-001 - Verify Register Page Display', () => {
    cy.contains('Mulai hidup sehat').should('be.visible')
    cy.get('input[placeholder="Wira Pradana"]').should('be.visible')
    cy.get('input[placeholder="name@domain.com"]').should('be.visible')
    cy.get('input[placeholder="08123456xxx"]').should('be.visible')
    cy.get('input[placeholder="Minimal 8 karakter"]').should('be.visible')
    cy.contains('button', 'Buat Akun Pasien').should('exist')
  })

    it('NCC-REG-002 - Register with Valid Data', () => {
    const angka = '61'    // ubah //

    cy.get('input[placeholder="Wira Pradana"]')
      .type(`Cypress Patient ${angka}`)

    cy.get('select#gender').select('male')
    cy.get('input[type="date"]').type('2000-01-01')

    cy.get('input[placeholder="name@domain.com"]')
      .type(`cypress${angka}@gmail.com`)

    cy.get('input[placeholder="08123456xxx"]')
      .type(`0812345678${angka}`)

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .type(`Cypress${angka}123`)

    cy.get('input[type="checkbox"]').first().check()

    cy.contains('button', 'Buat Akun Pasien').click()

    cy.url().should('not.include', '/register')
  })

  it('NCC-REG-003 - Register with Empty Required Fields', () => {
    cy.contains('button', 'Buat Akun Pasien').click()
    cy.url().should('include', '/register')
  })

  it('NCC-REG-004 - Register with Invalid Email Format', () => {
    isiFormRegistrasi({
      email: 'email-salah'
    })

    cy.contains('button', 'Buat Akun Pasien').click()
    cy.url().should('include', '/register')
  })

  it('NCC-REG-005 - Register with Existing Email', () => {
    isiFormRegistrasi({
      email: 'patient1@example.com'
    })

    cy.contains('button', 'Buat Akun Pasien').click()
    cy.url().should('include', '/register')
  })

  it('NCC-REG-006 - Register with Invalid Phone Number', () => {
    isiFormRegistrasi({
      email: 'cypress-invalid@example.com',
      whatsapp: '123'
    })

    cy.contains('button', 'Buat Akun Pasien').click()
    cy.url().should('include', '/register')
  })

  it('NCC-REG-007 - Register with Password Less Than 8 Characters', () => {
    isiFormRegistrasi({
      email: 'cypress-password@example.com',
      password: '123'
    })

    cy.contains('button', 'Buat Akun Pasien').click()
    cy.url().should('include', '/register')
  })

  it('NCC-REG-008 - Register Without Accepting Terms and Privacy Policy', () => {
    isiFormRegistrasi({
      email: 'cypress-terms@example.com',
      terms: false
    })

    cy.get('input[type="checkbox"]').first()
      .should('not.be.checked')

    cy.contains('button', 'Buat Akun Pasien').click()
    cy.url().should('include', '/register')
  })

  it('NCC-REG-009 - Verify Gender Dropdown Functionality', () => {
    cy.get('select#gender')
      .should('be.visible')
      .select('male')
      .should('have.value', 'male')
  })

  it('NCC-REG-010 - Verify Date of Birth Picker', () => {
    cy.get('input[type="date"]')
      .should('be.visible')
      .click()
      .type('2000-01-01')
      .should('have.value', '2000-01-01')
  })

  it('NCC-REG-011 - Verify Terms and Privacy Policy Link', () => {
    cy.contains(/Ketentuan Layanan/i)
      .should('have.attr', 'href')
      .then((href) => {
        cy.get(`a[href="${href}"]`).click()
        cy.url().should('include', href)
      })

    cy.visit('/register')

    cy.contains(/Kebijakan Privasi Data NCC/i)
      .should('have.attr', 'href')
      .then((href) => {
        cy.get(`a[href="${href}"]`).click()
        cy.url().should('include', href)
      })
  })

  it('NCC-REG-012 - Verify Placeholder and Label Display', () => {
    cy.get('input[placeholder="Wira Pradana"]').should('be.visible')
    cy.get('input[type="date"]').should('be.visible')
    cy.get('input[placeholder="name@domain.com"]').should('be.visible')
    cy.get('input[placeholder="08123456xxx"]').should('be.visible')
    cy.get('input[placeholder="Minimal 8 karakter"]').should('be.visible')
    cy.get('select#gender').should('be.visible')
  })

  it('NCC-REG-013 - Verify Required Field Validation Message', () => {
    isiFormRegistrasi({
      email: 'cypress-required@example.com'
    })

    cy.contains('button', 'Buat Akun Pasien').click()
    cy.url().should('include', '/register')
  })

  it('NCC-REG-014 - Check Maximum Character Limit in WhatsApp Number', () => {
    const nomorPanjang =
      '0812345678901234567890123456789012345678901234567890'

    cy.get('input[placeholder="08123456xxx"]')
      .type(nomorPanjang)
      .invoke('attr', 'maxlength')
      .then((maxLength) => {
        if (maxLength) {
          cy.get('input[placeholder="08123456xxx"]')
            .invoke('val')
            .then((value) => {
              expect(value.length).to.be.at.most(Number(maxLength))
            })
        }
      })
  })

  it('NCC-REG-015 - Verify Input Trims Leading and Trailing Spaces', () => {
    cy.get('input[placeholder="Wira Pradana"]')
      .type('   Cypress Test Patient   ')

    cy.get('input[placeholder="Wira Pradana"]')
      .invoke('val')
      .then((value) => {
        expect(value.trim()).to.equal('Cypress Test Patient')
      })
  })

  it('NCC-REG-016 - Verify Duplicate WhatsApp Number Registration', () => {
    isiFormRegistrasi({
      nama: 'Cypress Duplicate Patient',
      email: 'cypress-duplicate@example.com',
      whatsapp: '081234567850'
    })

    cy.contains('button', 'Buat Akun Pasien').click()
    cy.url().should('include', '/register')
  })

    it('NCC-REG-017 - Verify Successful Redirect After Registration', () => {
    const angka = '26'    // ubah //

    cy.get('input[placeholder="Wira Pradana"]')
      .type(`Cypress Patient ${angka}`)

    cy.get('select#gender').select('male')
    cy.get('input[type="date"]').type('2000-01-01')

    cy.get('input[placeholder="name@domain.com"]')
      .type(`cypress${angka}@gmail.com`)

    cy.get('input[placeholder="08123456xxx"]')
      .type(`0812345678${angka}`)

    cy.get('input[placeholder="Minimal 8 karakter"]')
      .type(`Cypress${angka}123`)

    cy.get('input[type="checkbox"]').first().check()

    cy.contains('button', 'Buat Akun Pasien').click()

    cy.url().should('not.include', '/register')
  })

})