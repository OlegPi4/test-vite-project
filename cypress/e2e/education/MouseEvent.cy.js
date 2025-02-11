import "cypress-iframe";
import "@4tw/cypress-drag-drop";

describe("Mouse Events", () => {
  it.skip('Hover over "Home" link', () => {
    cy.visit("https://demo.opencart.com/");
    cy.get('a[normalize-space()="Mac (1)"]').should("not.be.visible");
    cy.get(".nav > :nth-child(1) > .dropdown-toggle")
      .trigger("mouseover")
      .click();
    cy.get('a[normalize-space()="Mac (1)"]').should("be.visible");
  });

  it.skip("Right click: Contex-Menu", () => {
    cy.visit("https://swisnl.github.io/jQuery-contextMenu/demo.html");
    cy.get("li.context-menu-icon-copy").should("not.be.visible");
    // Approach 1
    cy.get(".context-menu-one.btn.btn-neutral").trigger("contextmenu");
    cy.get("li.context-menu-icon-copy").should("be.visible");
    // Approach 2
    cy.get(".context-menu-one.btn.btn-neutral").rightclick();
    cy.get("li.context-menu-icon-copy").should("be.visible");
  });

  it.skip("Double click", () => {
    cy.visit(
      "https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_ondblclick3"
    );
    cy.frameLoaded("#iframeResult");
    //Aproach 1 triger()
    cy.iframe("#iframeResult")
      .find("button[ondblclick='myFunction()']")
      .trigger("dblclick");
    cy.iframe("#iframeResult")
      .find("#field2")
      .should("have.value", "Hello World!");

    //Aproach 2 dblclick()
    cy.iframe("#iframeResult")
      .find("button[ondblclick='myFunction()']")
      .dblclick();
    cy.iframe("#iframeResult")
      .find("#field2")
      .should("have.value", "Hello World!");
  });

  it.skip("Drop & Drag using plugin", () => {
    cy.visit(
      "http://dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html"
    );
    cy.get("#box6").should("be.visible");
    cy.get("#box106").should("be.visible");
    cy.wait(1000);
    cy.get("#box6").drag("#box106", { force: true });
  });

  it("Scroll Page", () => {
    cy.visit("https://www.countries-ofthe-world.com/flags-of-the-world.html", {
      failOnStatusCode: false,
    });
    cy.get(
      ":nth-child(1) > tbody > :nth-child(18) > :nth-child(1) > img"
    ).scrollIntoView({ duration: 2000 });
    cy.get(
      ":nth-child(1) > tbody > :nth-child(18) > :nth-child(1) > img"
    ).should("be.visible");

    cy.get(
      ":nth-child(1) > tbody > :nth-child(8) > :nth-child(1) > img"
    ).scrollIntoView({ duration: 2000 });
    cy.get(
      ":nth-child(1) > tbody > :nth-child(8) > :nth-child(1) > img"
    ).should("be.visible");

    cy.get("footer").scrollIntoView({ duration: 2000 });
    cy.get("footer").should("be.visible");
  });
});
