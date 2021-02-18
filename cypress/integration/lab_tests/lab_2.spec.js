describe('Lab 2', () => {
  let labUrl;
  // TODO: WRITE OUT VALIDATION ERRORS IN A LEGIBLE FORMAT
  // Guidelines: https://docs.cypress.io/api/cypress-api/cypress-log.html#Examples\

  it('Successfully loads with valid HTML', () => {
    cy.fixture('test_values').then((json) => {
      labUrl = `${json.test_context || ''}labs/lab_2/`;
      cy.visit(labUrl); // change URL to match your dev URL
      cy.htmlvalidate();
    });
  });

  it('Has meta content to reflect the page author', () => {
    cy.fixture('test_values').then((json) => {
      cy.get('meta[name="author"]')
        .should(
          'have.attr',
          'name',
          'author'
        )
        .should(
          'have.attr',
          'content',
          json.name
        );
    });
  });

  it('Contains the correct number of address blocks', () => {
    cy.get('address')
      .should('have.length', 2);
  });

  it('First address block contains links for phone and e-mail information', () => {
    const addressCheck = cy.get('address a');
    addressCheck.should('have.length', 2);
    addressCheck.each(($el, i) => {
      expect($el).to.have.attr('href');
      if (i === 0) {
        expect($el).to.have.attr('href').match(/tel:/g);
      } else {
        expect($el).to.have.attr('href').match(/mailto:/g);
      }
    });
  });

  it('Contains appropriate use of strong tags in address block', () => {
    cy.get('address strong')
      .should('exist');
  });

  it('Contains a datetime stamp within a paragraph', () => {
    cy.get('address p time')
      .should('exist')
      .should('have.attr', 'datetime');
  });

  it('Contains a top-level page header', () => {
    cy.get('h1').contains('Re:');
    cy.get('h1').contains('university application');
  });

  it('Contains at least two secondary page headers', () => {
    cy.get('h2').should('have.length.greaterThan', 2);
    cy.get('h2').first().contains('dates');
    cy.get('h2').last().contains('Animals');
  });

  it('Contains an unordered list with three dateTimes', () => {
    cy.get('ul').children().should('have.length', 3);
  });

  it('Contains an ordered list with three sub-entries', () => {
    cy.get('ol').children().should('have.length', 3);
  });

  it('Uses subtext tags appropriately', () => {
    cy.get('ol li').first()
      .contains('Turning H2O into wine, and the health benefits of Resveratrol (C14H12O3.)');

    cy.get('ol li').first()
      .children('sub').should('have.length', 4);
  });

  it('Uses supertext tags appropriately', () => {
    cy.get('ol li')
      .contains('at temperatures exceeding 33°C (91.4°F)')
      .children('sup').should('have.length', 2);
  });

  it('Uses abbreviation tags appropriately', () => {
    cy.get('ol li')
      .contains('HTML and CSS');

    cy.get('ol li').children('abbr').should('have.length', 2);
    cy.get('ol li abbr').first().should(($abbr) => {
      const test = 'Hypertext Markup Language';
      expect($abbr.attr('title').toUpperCase()).to.equal(test.toUpperCase());
    });
    cy.get('ol li abbr').last().should(($abbr) => {
      const test = 'Cascading Style Sheets';
      expect($abbr.attr('title').toUpperCase()).to.equal(test.toUpperCase());
    });
  });

  it('Uses an emphasis tag appropriately', () => {
    cy.get('em').should('have.length', 2);
  });

  it('Does not use old-format emphasis tags', () => {
    cy.get('i').should('have.length', 0);
    cy.get('b').should('have.length', 0);
  });

  it('Contains a blockquote footer', () => {
    cy.get('blockquote').should(($bq) => {
      const text = 'fear the turtle';
      expect($bq.text().replace(/"/g, '').toUpperCase()).to.equal(text.toUpperCase());
    });
  });

  it('Has a correctly-formatted link to a research page', () => {
    cy.get('a').last().should('have.attr', 'href', 'http://umd.edu');
  });

  it('Contains a definition list with three entries', () => {
    cy.get('dl')
      .children()
      .should('have.length', 6)
      .get('dl dt')
      .should('have.length', 3)
      .get('dl dd:nth-of-type(3)')
      .contains('the screaming noise')
      .get('dl dt:nth-of-type(1)')
      .contains('Polar');
  });

  it('Uses paragraph tags to structure all loose page text', () => {
    cy.get('p').should('have.length', 13);
  });
});
