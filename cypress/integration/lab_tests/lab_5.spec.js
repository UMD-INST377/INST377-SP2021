function hasDuplicates(array) {
  console.log(new Set(array));
  return (new Set(array)).size !== array.length;
}

describe('Lab 5', () => {
  let initialBG;
  const initialCheckboxVals = [];

  context('Initial Lab 4 Success', () => {
    it('Successfully loads with valid HTML', () => {
      cy.fixture('test_values').then((json) => {
        const labUrl = `${json.test_context || ''}labs/lab_5/`;
        cy.visit(labUrl); // change URL to match your dev URL
        cy.htmlvalidate();
      });
    });

    it('should contain your name and lab number within the page title', () => {
      cy.fixture('test_values').then((json) => {
        cy.title().then(($title) => {
          const [name, lab, title] = [json.name, 'lab 4', $title].map((m) => m.toUpperCase());
          expect(title.includes(name)).to.be.true;
          expect(title.includes(lab)).to.be.true;
        });
      });
    });

    it('should correctly link to supplied lab styles.css', () => {
      cy.get('head link[href="styles.css"]');
    });

    it('Your lab should have a headline with your name and the lab number in it', () => {
      cy.fixture('test_values').then((json) => {
        cy.get('h1')
          .then(($hh1) => {
            const [name, lab, title] = [json.name, 'lab 4', $hh1.text()].map((m) => m.toUpperCase());
            expect(title.includes(name)).to.be.true;
            expect(title.includes(lab)).to.be.true;
          });
      });
    });

    it('Should include an HTML form', () => {
      cy.get('form');
    });

    it('Should wrap form elements in an unordered list with a flex-outer class, for styling', () => {
      cy.get('form ul.flex-outer');
    });

    it('Should have inputs for first and last name, with id of fname and lname', () => {
      cy.get('form ul.flex-outer li input[type=text]')
        .then(($ta) => {
          const id = $ta.attr('id');
          expect(id).to.exist;
        });

      cy.get('form ul.flex-outer li label[for="fname"]')
        .contains('First Name');

      cy.get('form ul.flex-outer li label[for="lname"]')
        .contains('Last Name');
    });

    it('Should have inputs for email and phone', () => {
      cy.get('form ul.flex-outer li input[type=tel]')
        .then(($ta) => {
          const id = $ta.attr('id');
          expect(id).to.exist;
        });

      cy.get('form ul.flex-outer li input[type=email]')
        .then(($ta) => {
          const id = $ta.attr('id');
          expect(id).to.exist;
        });
    });

    it('Should wrap checkbox elements in a separate list for styling', () => {
      cy.get('form ul.flex-outer li ul.flex-inner li input[type="checkbox"]');
    });

    it('Should include a Textarea field that has 5 rows and 33 columns, labelled for messages', () => {
      cy.get('form textarea[name="message"]')
        .then(($ta) => {
          const rows = Number($ta.attr('rows'));
          const cols = Number($ta.attr('cols'));

          expect(rows).to.be.greaterThan(4);
          expect(cols).to.be.greaterThan(32);
        });
    });

    it('All form controls should have a name attribute, for identification of data on server', () => {
      cy.get('form textarea')
        .then(($txt) => {
          const name = $txt.attr('name');
          expect(name).to.exist;
        });
      cy.get('form input')
        .each(($txt) => {
          const name = $txt.attr('name');
          expect(name).to.exist;
        });
      cy.get('form button')
        .then(($txt) => {
          const name = $txt.attr('name');
          expect(name).to.exist;
        });
    });

    it('All form controls should have appropriate labels and ID tags, for identification on the client', () => {
      cy.get('form textarea')
        .then(($txt) => {
          const id = $txt.attr('id');
          cy.get(`form label[for=${id}]`);
        });
      cy.get('form input')
        .each(($txt) => {
          const id = $txt.attr('id');
          cy.get(`form label[for=${id}]`);
        });
      cy.get('form button')
        .then(($txt) => {
          const id = $txt.attr('id');
          expect(id).to.exist;
        });
    });

    // CSS TESTS START HERE

    it('Your ul CSS - both .flex-outer and .flex-inner - should be set to flexbox display values', () => {
      cy.get('.flex-outer li').should('have.css', 'display', 'flex');
      cy.get('.flex-outer li').should('have.css', 'flex-wrap', 'wrap');
      cy.get('.flex-outer li').should('have.css', 'align-items', 'center');

      cy.get('.flex-inner').should('have.css', 'display', 'flex');
      cy.get('.flex-inner').should('have.css', 'flex-wrap', 'wrap');
      cy.get('.flex-inner').should('have.css', 'align-items', 'center');
    });

    it('Your .flex-outer element should have a constrained width and reset padding to fit nicely on a screen', () => {
      cy.get('.flex-outer').should(($ul) => {
        const style = window.getComputedStyle($ul[0]);
        expect(style.marginLeft).to.equal('0px');
        expect(style.marginLeft).to.equal(style.marginRight);
        expect(style.marginTop).to.equal(style.marginBottom);
      });
      cy.get('.flex-outer').should('have.css', 'max-width', '800px');
      cy.get('.flex-outer').should('have.css', 'padding', '0px 16px');
    });

    it('Your label CSS - p and label both - should be set to flex up to 130px, with a max width of 225px', () => {
      cy.get('.flex-outer > li > label').should('have.css', 'flex', '1 0 125px');
      cy.get('.flex-outer > li > label').should('have.css', 'max-width', '225px');

      cy.get('.flex-outer li p').should('have.css', 'flex', '1 0 125px');
      cy.get('.flex-outer li p').should('have.css', 'max-width', '225px');
    });

    it('Your CSS should let your form elements should stack vertically in a nice way', () => {
      cy.get('.flex-outer > li > label + *').should('have.css', 'flex', '1 0 225px');
      cy.get('.flex-inner').should('have.css', 'flex', '1 0 225px');
    });

    it('Your form button should be carefully styled to match these rules', () => {
      cy.get('.flex-outer > li > button').should('have.css', 'margin-left', '0px');
      cy.get('.flex-outer > li > button').should('have.css', 'padding', '6px 12px');
      cy.get('.flex-outer button').should('have.css', 'text-transform', 'uppercase');
      cy.get('.flex-outer button').should('have.css', 'letter-spacing', '1.2px');
      cy.get('.flex-outer button').should('have.css', 'border-radius', '3px');
    });

    it('Your checkboxes should have space between them', () => {
      cy.get('.flex-inner').should('have.css', 'justify-content', 'space-between');
      cy.get('.flex-inner label')
        .each(($el) => {
          initialCheckboxVals.push($el.text());
        });
    });

    it('Your label elements should have enough padding to space out your form elements', () => {
      cy.get('.flex-outer > li > label').should('have.css', 'padding', '8px');
      cy.get('.flex-outer li p').should('have.css', 'padding', '8px');
    });

    it('Pick a nice color for your page background', () => {
      cy.get('body').then(($bdy) => {
        expect($bdy.css('background-color')).to.not.equal('rgba(0, 0, 0, 0)');
        initialBG = $bdy.css('background-color');
      });
    });
  });
  context('Lab 5 Goals 1', () => {
    it('Add some margins to the right side of your buttons', () => {
      cy.get('button')
        .should('have.css', 'margin-right', '10px');
    });

    it('Set a fresh width on your checkbox list items', () => {
      cy.get('.flex-inner li')
        .then(($li) => {
          expect($li.width()).to.be.greaterThan(80);
        });
    });

    it('Add a new button for activation', () => {
      cy.get('button')
        .should('have.length', 2);

      cy.get('button')
        .contains('Activate');
    });
  });
  context('Lab 5 Goals 2', () => {
    it('Has a script tag', () => {
      cy.get('script')
        .should('have.length.greaterThan', 0);
    });

    it('Clicking the Activate button changes the background color', () => {
      cy.get('button')
        .contains('Activate')
        .click()
        .then(() => {
          cy.get('body').then(($bdy) => {
            expect($bdy.css('background-color')).to.not.equal(initialBG);
          });
        });
    });

    it('And your page title', () => {
      cy.fixture('test_values').then((json) => {
        cy.get('title')
          .contains(json.name);
      });
    });

    it('Your page header now contains your name', () => {
      cy.fixture('test_values').then((json) => {
        cy.get('h1')
          .contains(json.name);
        cy.get('h1')
          .contains('Lab 5 for');
      });
    });

    it('And your checkbox list label is now "Fruits"', () => {
      cy.get('.checkbox-list-label')
        .then(($el) => {
          const test = 'fruits'.toUpperCase();
          const elText = $el.text().toUpperCase();
          expect(test).to.equal(elText);
        });
    });

    it('And all your checkbox labels are fruits', () => {
      cy.get('.flex-inner label')
        .each(($el) => {
          expect(initialCheckboxVals.includes($el.text())).to.be.false;
        });

      // each label is different than the other
      cy.get('.flex-inner label')
        .then(($el) => {
          const arr = Array.from($el);
          const test = arr.map((m) => m.innerText);
          const testDupes = hasDuplicates(test);
          expect(hasDuplicates(test)).to.be.false;
        });
    });

    it('And your form is now centered', () => {
      cy.get('.flex-outer')
        .then(($el) => {
          const marginT = parseFloat($el.css('marginTop'));
          const marginR = parseFloat($el.css('marginRight'));
          const marginB = parseFloat($el.css('marginBottom'));
          const marginL = parseFloat($el.css('marginLeft'));
          expect(marginR).to.equal(marginL);
          expect(marginT).to.equal(marginB);
          expect(marginR).to.be.greaterThan(0);
        });
    });
  });
});
