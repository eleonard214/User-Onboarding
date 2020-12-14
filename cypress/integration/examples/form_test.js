const { iteratee } = require("lodash")

describe ('User Onboarding Test', function(){
    it('tests site', function(){
cy.visit("http://localhost:5500/");
cy.get('[name=fName]').type("Someone").should("have.value","Someone");
cy.get('[name=email]').type("someone@email.com") .should("have.value", "someone@gmail.com");
cy.get('[name=password]').type("1234five").should("have.value", "1234five");
cy.get('[name=terms]').click();
cy.contains('Submit').click();

    });
});