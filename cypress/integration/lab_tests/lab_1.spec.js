describe('Lab 1', () => {
  it('Loads and contains entirely valid HTML', () => {
    // This blocks the very tricky livereload script which causes labs to take hours to grade
    cy.intercept('**livereload.js?snipver=1', {
      statusCode: 200,
      body: 'it worked!'
    });
    Cypress.on('uncaught:exception', (err, runnable) => false);
    // returning false here prevents Cypress from
    // failing the test

    cy.visit('labs/lab_1/');
    cy.htmlvalidate();
  });

  it('Contains a page title with your name in it', () => {
    cy.get('head title')
      .then(($title) => {
        cy.fixture('test_values').then((json) => {
          const nameTests = json.name.split(' ');
          const text = $title.text();
          const testString = nameTests.find((element) => text.includes(element));
          expect(testString, "We can't find your name in the page title").to.not.be.undefined;
        });
      });
  });

  it('Contains a header element with your name in it', () => {
    cy.get('body h1')
      .should('be.visible')
      .and(($h1) => {
        cy.fixture('test_values').then((json) => {
          const nameTests = json.name.split(' ');
          const text = $h1.text();
          const testString = nameTests.find((element) => text.includes(element));
          expect(testString, "We can't find your name in a header tag").to.not.be.undefined;
        });
      });
  });

  it('Contains an unordered list with three elements', () => {
    cy.get('ul')
      .find('li')
      .should('have.lengthOf.at.least', 3);
  });

  it('Contains an ordered list with five elements', () => {
    cy.get('ol')
      .find('li')
      .should('have.lengthOf.at.least', 5);
  });

  it('Contains four adorable pictures', () => {
    cy.get('img')
      .should('be.visible')
      .should('have.lengthOf.at.least', 4)
      .and(($img) => {
        expect($img[0].naturalWidth, 'Your images may not be loading').to.be.greaterThan(0);
        expect($img[0].naturalWidth, 'Your images are too wide').to.be.lessThan(481);
        expect($img[0].naturalHeight, 'Your images are too tall').to.be.lessThan(481);
      });
  });

  it('All pictures have alt text', () => {
    cy.get('img')
      .each(($el) => {
        cy.wrap($el)
          .should('have.attr', 'alt');
      });
  });

  it('Images should load correctly and be no larger than 480 pixels wide', () => {
    cy.get('img')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth, 'Your images may not be loading').to.be.greaterThan(0);
        expect($img[0].naturalWidth, 'Your images are too wide').to.be.lessThan(481);
        expect($img[0].naturalHeight, 'Your images are too tall').to.be.lessThan(481);
      });
  });

  it('Contains a hard rule at the bottom of the page', () => {
    cy.get('hr');
  });
});
