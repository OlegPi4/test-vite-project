describe("Alerts", () => {
  // 1) Javascript Alert: It will have some text on 'OK' button
  it.skip("Javascript Alert", () => {
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
    cy.get('button[onclick="jsAlert()"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("I am a JS Alert");
    });
    // alert window automatically closed by cypress
    cy.get("#result").should("have.text", "You successfully clicked an alert");
  });

  // 2) Confirm Alert: It will have some text on both 'OK' and 'Cancel' buttons
  it("Confirm Alert", () => {
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
    cy.get('button[onclick="jsConfirm()"]').click();

    // alert window automatically closed by cypress button - OK
    cy.on("window:confirm", (str) => {
      expect(str).to.equal("I am a JS Confirm");
    });
    cy.get("#result").should("have.text", "You clicked: Ok");
  });

  it("Cancel Alert", () => {
    // alert window automatically closed by cypress button - cancel
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
    cy.get('button[onclick="jsConfirm()"]').click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal("I am a JS Confirm");
    });

    cy.on("window:confirm", () => false);
    cy.get("#result").should("have.text", "You clicked: Cancel");
  });

  it("Alert with prompt text", () => {
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
    // set hendle of event prompl text
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("John Doe");
    });
    cy.get('button[onclick="jsPrompt()"]').click();
    // cypres automatically close prompted alert - OK button by default

    //cy.on("window:prompt", () => false);
    cy.get("#result").should("have.text", "You entered: John Doe");
    cy.get("#result").should("have.text", "You entered: null");
  });

  it.only("Authenticated Alert", () => {
    // Способ 1
    cy.visit("https://the-internet.herokuapp.com/basic_auth", {
      auth: { username: "admin", password: "admin" },
    });
    cy.get("div.example p").should("have.contain", "Congratulations");

    // Способ 2
    cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    cy.get("div.example p").should("have.contain", "Congratulations");
  });
});
