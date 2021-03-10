function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

describe('Lab 5 - Maps Of Food Places', () => {
  before(() => {
    const ga = cy.stub().as('ga');

    // prevent google analytics from loading
    // and replace it with a stub before every
    // single page load including all new page
    // navigations
    cy.on('window:before:load', (win) => {
      Object.defineProperty(win, 'ga', {
        configurable: false,
        get: () => ga, // always return the stub
        set: () => {} // don't allow actual google analytics to overwrite this property
      });
    });
    cy.fixture('test_values').then((json) => {
      const labUrl = `${json.test_context || ''}labs/lab_5`;
      cy.visit(labUrl); // change URL to match your dev URL
    });
  });

  context('HTML Layout', () => {
    // Standard tests
    it('Successfully loads with valid HTML', () => {
      cy.htmlvalidate();
    });

    it('Contains a page title with your name in it', () => {
      cy.fixture('test_values').then((json) => {
        cy.get('head title')
          .contains(json.name);
      });
    });

    it('Contains a header element with your name in it', () => {
      cy.fixture('test_values').then((json) => {
        cy.get('h1')
          .contains(json.name);
      });
    });
    // New tests

    it('Page links to Bulma.io', () => {
      cy.get('head link[href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"]');
    });

    it('Page is structured correctly in Bulma with two columns', () => {
      cy.get('.columns .column+.column');
    });

    it('Contains a form element with a single input', () => {
      cy.get('.columns .column:first-of-type form input[type="text"]')
        .each(($txt) => {
          const name = $txt.attr('name');
          const id = $txt.attr('id');
          const placeholder = $txt.attr('placeholder');
          expect(name, 'Your inputs need a name').to.exist;
          expect(id, 'Your inputs need an id').to.exist;
          expect(placeholder, 'Your inputs need placeholder text').to.exist;
        });
    });

    it('Contains a list element for results', () => {
      cy.get('.columns .column:first-of-type ul')
        .each(($txt) => {
          const className = $txt.attr('class');
          expect(className, 'You need a selector for this list').to.exist;
        });
    });

    // Leaflet tests

    it('Includes Leaflet correctly in the global namespace', () => {
      cy.window()
        .then((win) => {
          expect(win.L).to.not.be.undefined;
        });
    });

    it('Contains target for leaflet in div id `mapid`', () => {
      cy.get('.columns .column:nth-of-type(2) #mapid');
    });

    it('Leaflet is correctly initialized into #mapid', () => {
      cy.get('.columns .column:nth-of-type(2) #mapid')
        .should('have.class', 'leaflet-container');
    });

    it('Lists 5 restaurants by zip code', () => {
      const array = [20740, 20737, 20742];
      const select = getRandomIntInclusive(0, 2);
      cy.get('.columns .column form input[type="text"]')
        .type(array[select]);

      cy.get('button[type="submit"]')
        .click()
        .then(() => {
          cy.get('ul li')
            .should('have.length.at.least', 5);
        });
    });

    it('Puts 5 markers on the map for the zip code', () => {
      const array = [20740, 20737, 20742];
      const select = getRandomIntInclusive(0, 2);
      cy.get('form input[type="text"]')
        .clear()
        .type(array[select]);

      cy.get('button[type="submit"]')
        .click()
        .then(() => {
          cy.get('.leaflet-marker-icon')
            .should('have.length.at.least', 5);
        });
    });
  });
});
