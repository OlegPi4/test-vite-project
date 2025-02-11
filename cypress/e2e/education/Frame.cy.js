import "cypress-iframe";

describe("Hendle IFrame", () => {
  it("Iframe approach 1", () => {
    cy.visit("https://the-internet.herokuapp.com/iframe");
    const iframe = cy
      .get("#mce_0_ifr")
      .its("0.contentDocument.body")
      .should("be.visible")
      .then(cy.wrap);

    iframe.clear().type("Welcome {cmd+a}");
    cy.get('[aria-label="Bold"]').click();
  });

  it.only("Using cypress-iframe plugin ", () => {
    cy.visit("https://the-internet.herokuapp.com/iframe");
    cy.frameLoaded("#mce_0_ifr");
    cy.iframe("#mce_0_ifr").clear().type("Welcome {cmd+a}");
    cy.get('[aria-label="Bold"]').click();
  });
});
