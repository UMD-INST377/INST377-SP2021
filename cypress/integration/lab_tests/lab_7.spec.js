describe('Lab 7', () => {
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
      const labUrl = `${json.test_context || ''}labs/lab_7/`;
      cy.visit(labUrl); // change URL to match your dev URL
    });
  });

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

    it('Has a space to display your chart', () => {
      cy.get('#chartContainer');
    });

    it('Links to your JS scripts in the head and body of your HTML', () => {
      cy.fixture('test_values').then((json) => {
        cy.get('head script[src="https://code.jquery.com/jquery-3.5.1.slim.min.js"]');
        cy.get('body script[src="script.js"]');
        cy.get('body script[src="canvasjs.min.js"]');
      });
    });

    it('Links to your CSS styles in the head of your HTML', () => {
      cy.get('link[href="styles.css"]');
    });
  });

  context('JS Results', () => {
    it('Successfully load restaurant list', () => {
      cy.get('button[type=submit]')
        .click()
        .wait(1100)
        .then(() => {
          const list = JSON.parse(sessionStorage.getItem('restaurantList'));
          expect(list).to.have.length.greaterThan(900);
        });
    });

    it('Converts array of restaurants into an array of restaurants by category', () => {
      cy.window().then((win) => {
        const list = JSON.parse(sessionStorage.getItem('restaurantList'));
        const convertedList = win.convertRestaurantsToCategories(list);
        expect(convertedList).to.have.length.greaterThan(35);
        expect(convertedList[0].label).to.not.be.undefined;
        const categories = convertedList.map((m) => m.label);

        // TODO: replace with separate list fetch, convert, and compare
        expect(categories.includes('Casino')).to.be.true;
        expect(categories.includes('Dollar Store')).to.be.true;
        expect(categories.includes('Grocery Store')).to.be.true;
      });
    });

    it('Instantiates a chart into your HTML', () => {
      cy.window().then((win) => {
        cy.get('.canvasjs-chart-container');
      });
    });

    it('Pass a properly-shaped configuration object to your chart method', () => {
      cy.window().then((win) => {
        const list = JSON.parse(sessionStorage.getItem('restaurantList'));
        const convertedList = win.convertRestaurantsToCategories(list);
        const chartObject = win.makeYourOptionsObject(convertedList);

        // This is effectively breaking down the things you have to tweak in your object
        expect(chartObject.animationEnabled).to.be.true;
        expect(chartObject.colorSet).to.have.length.greaterThan(0);
        expect(chartObject.title.text).to.equal('Places To Eat Out In Future');
        expect(chartObject.axisX.labelFontSize).to.equal(12);
        expect(chartObject.axisX).to.not.be.undefined;
        expect(chartObject.axisY2).to.not.be.undefined;
        expect(chartObject.axisX.labelFontSize).to.equal(12);
        expect(chartObject.axisY2.labelFontSize).to.equal(12);
        expect(chartObject.axisY2.title).to.not.be.undefined;
        expect(chartObject.axisY2.scaleBreaks).to.not.be.undefined;
        expect(chartObject.axisY2.scaleBreaks.customBreaks).to.not.be.undefined;
        expect(chartObject.axisY2.scaleBreaks.customBreaks).to.have.length(3);
        expect(chartObject.axisY2.scaleBreaks.customBreaks[0].startValue).to.equal(40);
        expect(chartObject.axisY2.scaleBreaks.customBreaks[0].endValue).to.equal(50);
        expect(chartObject.axisY2.scaleBreaks.customBreaks[0].color).to.not.be.undefined;

        expect(chartObject.data).to.not.be.undefined;
        expect(chartObject.data).to.have.length(1);
        expect(chartObject.data[0].axisYType).to.equal('secondary');
        expect(chartObject.data[0].dataPoints).to.not.be.undefined;
        expect(chartObject.data[0].dataPoints.length).to.be.greaterThan(35);
        expect(chartObject.data[0].dataPoints.length).to.equal(convertedList.length);
      });
    });
  });
});
