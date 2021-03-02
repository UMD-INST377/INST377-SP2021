function isDescending(a) {
  return a.slice(1)
    .map((e, i) => e < a[i])
    .every((x) => x);
}

describe('Lab 6', () => {
  before(() => {
    cy.fixture('test_values').then((json) => {
      const labUrl = `${json.test_context || ''}labs/lab_6/`;
      cy.visit(labUrl); // change URL to match your dev URL
    });
  });

  context('Special Instruction: sometimes your tests will show fewer than ten elements or non-descending elements even though your code is correct. Refresh your tests to check.', () => {});
  context('HTML Layout', () => {
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
        cy.get('.header h1')
          .contains(json.name);
      });
    });

    it('Contains a wrapper-container structure with centered page elements', () => {
      cy.fixture('test_values').then((json) => {
        cy.get('.wrapper > .container');
        cy.get('.container').should(($ul) => {
          const style = window.getComputedStyle($ul[0]);
          expect(style.marginTop).to.equal('0px');
          expect(style.marginLeft).to.not.equal('0px');
          expect(style.marginLeft).to.equal(style.marginRight);
          expect(style.marginTop).to.equal(style.marginBottom);
        });
      });
    });

    it('Contains a submit button', () => {
      cy.get('button[type="submit"]');
    });

    it('Use CSS linking to style button and page', () => {
      cy.get('.flex-outer button[type="submit"]');
    });

    it('Has no checklist before submit', () => {
      cy.get('.flex-inner li')
        .should('not.exist');
    });

    it('Links to your JS scripts in the head of your HTML', () => {
      cy.fixture('test_values').then((json) => {
        cy.get('script[src="script.js"]');
        cy.get('script[src="https://code.jquery.com/jquery-3.5.1.slim.min.js"]');
      });
    });

    it('Links to your CSS styles in the head of your HTML', () => {
      cy.fixture('test_values').then((json) => {
        cy.get('link[href="styles.css"]');
      });
    });
  });
  context('JS Results', () => {
    it('Prepend a list with class of flex-inner to your form', () => {
      cy.get('.flex-inner').should('not.exist')
        .then(() => {
          cy.get('button[type=submit]')
            .click()
            .wait(1100)
            .then(() => {
              cy.get('.flex-inner');
            });
        });
    });

    it('Load ten items into list on click', () => {
      cy.get('button[type=submit]')
        .click()
        .wait(1100)
        .then(() => {
          cy.get('.flex-inner li')
            .should('have.length', 10);
        });
    });

    it('Using dot notation, put country names in descending order in the lists', () => {
      cy.get('button[type=submit]')
        .click()
        .wait(1100)
        .then(() => {
          cy.fixture('countries').then((json) => {
            cy.get('.flex-inner li label')
              .should('have.length', 10) // there should be ten! This will sometimes mess up.
              .then(($els) => {
                const arr = Array.from($els, (el) => el.innerText);
                expect(isDescending(arr)).to.be.true;
                console.log('Check arracy for alphabetization descending', arr);
                arr.forEach((a) => {
                // is this a country name from the list?
                  expect(json.find((f) => f.name === a)).to.not.be.undefined;
                });
              });
          });
        });
    });

    it('Using dot notation, set the input value to country code', () => {
      cy.get('button[type=submit]')
        .click()
        .wait(1100)
        .then(() => {
          cy.fixture('countries').then((json) => {
            cy.get('.flex-inner li input[type="checkbox"]')
              .should('have.length', 10) // there should be ten! This will sometimes mess up.
              .then(($els) => {
                const arr = Array.from($els);
                const values = arr.map((el) => el.value);
                values.forEach((e) => {
                  expect(e).to.not.be.undefined;
                  expect(e).to.have.length(2);
                  // is this a code from the list?
                  expect(json.find((f) => f.code === e)).to.not.be.undefined;
                });
              });
          });
        });
    });
  });
});