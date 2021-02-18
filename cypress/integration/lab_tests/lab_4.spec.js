/* eslint-disable no-unused-expressions */
describe('Lab 4', () => {
  it('Successfully loads with valid HTML', () => {
    cy.fixture('test_values').then((json) => {
      const labUrl = `${json.test_context || ''}labs/lab_4/`;
      cy.visit(labUrl); // change URL to match your dev URL
      cy.htmlvalidate();
    });
  });

  it('Should contain your name and lab number within the page title', () => {
    cy.fixture('test_values').then((json) => {
      cy.title().then(($title) => {
        const [name, lab, title] = [json.name, 'lab 4', $title].map((m) => m.toUpperCase());
        expect(title.includes(name)).to.be.true;
        expect(title.includes(lab)).to.be.true;
      });
    });
  });

  it('should correctly link to a styles.css file', () => {
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

  it('Should use the submit button to POST material to the /api endpoint', () => {
    cy.get('form').should('have.attr', 'method', 'post');
    cy.get('button[type=submit]')
      .click();
    cy.contains('hello world', { matchCase: false });
  });

  it('Should receive a string containing "Hello World" from the server - use res.send from Express docs for this', () => {
    cy.fixture('test_values').then((json) => {
      const labUrl = `${json.test_context || ''}/lab_4/`;
      cy.visit(labUrl);
      cy.get('button[type=submit]')
        .click();
      cy.contains('hello world', { matchCase: false });
    });
  });
});