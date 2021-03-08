describe('Lab 4', () => {
  it("All your HTML is valid to W3C standards: check error for details of what's wrong", () => {
    const labUrl = 'labs/lab_4/';
    cy.visit(labUrl); // change URL to match your dev URL
    cy.htmlvalidate();
  });

  it('should contain your name and lab number within the page title', () => {
    cy.fixture('test_values').then((json) => {
      cy.title().then(($title) => {
        const [name, lab, title] = [json.name, 'lab 4', $title].map((m) => m.toUpperCase());
        expect(title.includes(name), 'Did you check your test_values file is the same as your ELMS name?').to.be.true;
        expect(title.includes(lab), 'Tell me what lab this is for').to.be.true;
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
          expect(title.includes(name), 'Did you check your test_values file is the same as your ELMS name?').to.be.true;
          expect(title.includes(lab), 'Tell me what lab this is for').to.be.true;
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
        expect(id, 'All inputs need an id').to.exist;
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
        expect(id, 'All inputs need an id').to.exist;
      });

    cy.get('form ul.flex-outer li input[type=email]')
      .then(($ta) => {
        const id = $ta.attr('id');
        expect(id, 'All inputs need an id').to.exist;
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

        expect(rows, "You're missing some rows").to.be.greaterThan(4);
        expect(cols, "You're missing some columns").to.be.greaterThan(32);
      });
  });

  it('All form controls should have a name attribute, for identification of data on server', () => {
    cy.get('form textarea')
      .then(($txt) => {
        const name = $txt.attr('name');
        expect(name, 'Your textarea needs a name').to.exist;
      });
    cy.get('form input')
      .each(($txt) => {
        const name = $txt.attr('name');
        expect(name, 'Your inputs need a name').to.exist;
      });
    cy.get('form button')
      .then(($txt) => {
        const name = $txt.attr('name');
        expect(name, 'Your button needs a name').to.exist;
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
        expect(id, 'Your submit button needs an ID').to.exist;
      });
  });

  // Promisified submit checker should help with race conditions
  it('Should use the submit button to POST material to the /api endpoint and receive hello world back', () => {
    cy.get('form').should('have.attr', 'method', 'post');
    cy.get('form').should('have.attr', 'action', '/api');
    cy.get('button[type=submit]')
      .click()
      .then(() => {
        cy.contains('hello world', { matchCase: false });
      });
  });
});
