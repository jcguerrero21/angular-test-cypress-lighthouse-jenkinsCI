/// <reference types="Cypress" />

describe('Home Page', () => {

  beforeEach(() => {
    cy.visit('/'); // go to the home page
  });

  it('cy.title() - get the title', () => {
    cy.title().should('include', 'MyCypressApp');
  });

  it('Fill the form', () => {
    cy.get('[data-cy=nameInput]').type('mavi').should('have.value', 'mavi');

    cy.get('[data-cy=emailInput]').type('mavi@email.com').should('have.value', 'mavi@email.com');

    cy.get('#mat-radio-3').click();
    cy.get('#mat-radio-3').should('have.class', 'mat-radio-checked');

    cy.get('.mat-icon-button').click();
    cy.get('.mat-calendar-body-active').click();

    cy.get('[data-cy=select]').click();
    cy.get('.mat-option-text').contains('8th Grade').then(option => {
    option[0].click();
    // After click, mdc-select should hold the text of the selected option
    cy.get('[data-cy=select]').contains('8th Grade');
    });
    cy.get('[data-cy=subjectInput]').type('math').should('have.value', 'math');
    cy.get('[data-cy=subjectInput]').type('{downarrow}{enter}')
  }); 

  // other option @cypress/snapshot
  it('toMatchSnapshot - Body', () => {
    cy.get('body').toMatchSnapshot();
    cy.get('body').toMatchImageSnapshot();
  });

  // other option npm install --save-dev @percy/cypress -> cy.percySnapshot();
  //I try install but problem with -> Failed at puppeteer@5.0.0
  //it('percySnapshot', () => {
  // Take a snapshot for visual diffing
  //  cy.percySnapshot();
  //});

  it('click on submit button', () => {
    cy.get('[data-cy=submit]').click();
  }); 

  it('cy.reload() - reload the page', () => { 
    // reload the page without using the cache
    cy.reload(true);
  });

  it('input elements are empty', () => {
    cy.get('[data-cy=nameInput]').should('have.value', '')
    cy.get('[data-cy=emailInput]').should('have.value', '')
  });

  // specific browser
  //it('cy.screenshot() - take a screenshot 800x600 pixel image', { browser: 'firefox' }, () => {
    it('cy.screenshot() - take a screenshot 800x600 pixel image', () => {
      cy.screenshot('my-cypress-app'); //produces a 800x600 pixel image
    });

    it('cy.screenshot() - take a screenshot 1920x1080 pixel image', () => {
      cy.viewport(1920,1080);
      cy.screenshot('my-cypress-app-desktop'); 
    });

    it('cy.screenshot() - take a screenshot 360x640 pixel image', () => {
      cy.viewport(360,640);
      cy.screenshot('my-cypress-app-galaxyS5'); 
    });

    it('cy.screenshot() - take a screenshot 768x1024 pixel image', () => {
      cy.viewport(768,1024);
      cy.screenshot('my-cypress-app-ipad');
    });

    it('cy.screenshot() - take a screenshot 375x667 pixel image', () => {
      cy.viewport(375,667);
      cy.screenshot('my-cypress-app-iphone'); 
    });
});