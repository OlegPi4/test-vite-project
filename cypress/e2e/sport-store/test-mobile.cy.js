import {
  sizes,
  user,
  setSuccessSignup,
  userChange,
} from "../../data-test/data";

const mainPagePath = "/";
describe("Mobile v. Module authentication ", () => {
  beforeEach(() => {
    cy.viewport(sizes[1]);
    cy.loadMainPage(mainPagePath);
    cy.loadLoginPage();
  });
  setSuccessSignup.forEach((el) => {
    it(`TC01-R-001 Successful user registration ${el.set}`, () => {
      cy.get("button").contains("Зареєструватись").click();
      cy.get("h1").should("have.text", "Реєстрація");
      cy.get("div input").as("input-fields");
      cy.get("@input-fields").should("have.length", 7);
      cy.get("@input-fields").eq(0).type(el.name);
      cy.get("@input-fields").eq(1).type(el.surename);
      cy.get("@input-fields").eq(2).type(el.secname);
      cy.get("@input-fields").eq(3).type(el.phone);
      cy.get("@input-fields").eq(4).type(el.email);
      cy.get("@input-fields").eq(5).type(el.password);
      cy.get("@input-fields").eq(6).type(el.confpassword);
      cy.get("@input-fields").eq(0).should("have.value", el.name.trim());
      cy.get("@input-fields").eq(1).should("have.value", el.surename.trim());
      cy.get("@input-fields").eq(2).should("have.value", el.secname.trim());
      cy.get("@input-fields").eq(3).should("have.value", `+380${el.phone}`);
      cy.get("@input-fields").eq(4).should("have.value", el.email.trim());
      cy.get("@input-fields").eq(5).should("have.value", el.password.trim());
      cy.get("@input-fields")
        .eq(6)
        .should("have.value", el.confpassword.trim());
      cy.intercept("POST", "/user/registration/").as("signup");
      cy.get("button").contains("Зареєструватись").click();
      cy.wait("@signup").its("response.statusCode").should("eq", 201);
      cy.get("div")
        .contains("Підтвердіть свою електронну пошту")
        .should("be.visible");
    });
  });

  it("TC01-R-002 Successful user authentication", () => {
    cy.get('[name="email"]').type(user.email);
    cy.get('[name="password"]').type(user.password);
    cy.get('[name="email"]').should("have.value", user.email);
    cy.get('[name="password"]').should("have.value", user.password);
    cy.intercept("POST", "/user/login").as("login");
    cy.get('[type="submit"]').click();
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.location("pathname").should("eq", "/auth/profile");
    cy.get("input").should("have.value", user.surename);
    cy.intercept("GET", mainPagePath).as("move-main-page");
    cy.get("header a img")
      .should("have.attr", "alt", "Logo")
      .eq(0)
      .as("move-main-page");
    cy.get("@move-main-page").click();
    cy.contains("Топ продажів");
    cy.get("header li svg circle").eq(1).as("icon-user");
    cy.get("@icon-user").should("have.attr", "fill");
    cy.wait(3);
    cy.get("header button img")
      .should("have.attr", "alt", "menu")
      .as("burger-button");
    cy.get("@burger-button").click();
    cy.intercept("POST", "/user/logout").as("logout");
    cy.get("div").contains("Вихід").click();
    cy.wait("@logout").its("response.statusCode").should("eq", 200);
    cy.get("header li").eq(1).get("svg").should("not.have", "circle");
    cy.get("header li").eq(1).click();
    cy.url().should("include", "/auth/login");
    cy.wait(4);
  });

  it.only("TC01-R-004 Successful changing user’s profile data", () => {
    cy.get('[name="email"]').type(user.email);
    cy.get('[name="password"]').type(user.password);
    cy.get('[name="email"]').should("have.value", user.email);
    cy.get('[name="password"]').should("have.value", user.password);
    cy.intercept("POST", "/user/login").as("login");
    cy.get('[type="submit"]').click();
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.location("pathname").should("eq", "/auth/profile");
    cy.get("header li svg circle").eq(1).as("icon-user");
    cy.get("@icon-user").should("have.attr", "fill");
    cy.get("div input").as("input-fields");
    cy.get("@input-fields").should("have.length", 7);
    cy.get("@input-fields").eq(0).clear();
    cy.get("@input-fields").eq(1).clear();
    cy.get("@input-fields").eq(2).clear();
    cy.get("@input-fields").eq(3).clear();
    cy.get("@input-fields").eq(0).type("Surename");
    cy.get("@input-fields").eq(1).type("Name ");
    cy.get("@input-fields").eq(2).type(" Secname");
    cy.get("@input-fields").eq(3).type("335620011");
    cy.get("@input-fields").eq(0).should("have.value", "Surename".trim());
    cy.get("@input-fields").eq(1).should("have.value", "Name ".trim());
    cy.get("@input-fields").eq(2).should("have.value", " Secname".trim());
    cy.get("@input-fields").eq(3).should("have.value", `+380335620011`);
    cy.intercept("PUT", "/user/profile/*").as("update");
    cy.get("button").contains("Зберегти").click();
    cy.wait("@update").its("response.statusCode").should("eq", 200);
    cy.get("p").contains("Інформація успішно оновлена").should("be.visible");
    cy.wait(6);
    cy.get("button").contains("Редагувати").click();
    cy.get("div input").as("input-fields");
    cy.get("@input-fields").should("have.length", 7);
    cy.get("@input-fields").eq(0).clear();
    cy.get("@input-fields").eq(1).clear();
    cy.get("@input-fields").eq(2).clear();
    cy.get("@input-fields").eq(3).clear();
    cy.get("@input-fields").eq(0).type(user.surename);
    cy.get("@input-fields").eq(1).type(user.name);
    cy.get("@input-fields").eq(2).type(user.secname);
    cy.get("@input-fields").eq(3).type(user.phone);
    cy.get("@input-fields").eq(0).should("have.value", user.surename.trim());
    cy.get("@input-fields").eq(1).should("have.value", user.name.trim());
    cy.get("@input-fields").eq(2).should("have.value", user.secname.trim());
    cy.get("@input-fields").eq(3).should("have.value", `+380${user.phone}`);
    cy.intercept("PUT", "/user/profile/*").as("update");
    cy.get("button").contains("Зберегти").click();
    cy.wait("@update").its("response.statusCode").should("eq", 200);
    cy.get("p").contains("Інформація успішно оновлена").should("be.visible");
  });
  // it("Authorization with fake email", () => {
  //   cy.get('[name="email"]').type(faker.internet.email());
  //   cy.get('[name="password"]').type(user.password);
  //   cy.get('[type="submit"]').click();
  //   cy.get("div").contains("Неправильна адреса електронної пошти або пароль");
  // });
  // it("Authorization with fake password", () => {

  //   cy.get('[name="email"]').type(user.email);
  //   cy.get('[name="password"]').type("klfRFGF01");
  //   cy.get('[type="submit"]').click();
  //   cy.get("div").contains("Неправильна адреса електронної пошти або пароль");
  // });
  // it("Authorization invalid password (Cyrillic)", () => {

  //   cy.get('[name="email"]').type(user.email);
  //   cy.get('[name="password"]').type("k#lюlfRFGF01");
  //   cy.get('[type="submit"]').click();
  //   cy.get("div").contains(
  //     "Пароль може містити латинські літери, цифри та символи !@#$%^&*"
  //   );
  // });
  // it.only("Authorization invalid password (length less 6)", () => {
  //
  //   cy.get('[name="email"]').type(user.email);
  //   cy.get('[name="password"]').type("k#01");
  //   cy.get('[type="submit"]').click();
  //   cy.get("div").contains("Пароль повинен містити не менше 6 символів");
  // });
  // it("Authorization with empty email & password", () => {
  //
  //   cy.get('[name="email"]').clear();
  //   cy.get('[name="password"]').clear();
  //   cy.get('[type="submit"]').click();
  //   cy.get("div").contains("Це поле обов'язкове");
  // });

  // it("Authorization with space value email & password", () => {
  //
  //   cy.get('[name="email"]').type(" ");
  //   cy.get('[name="password"]').type(" ");
  //   cy.get('[type="submit"]').click();
  //   cy.get("div").contains("Це поле обов'язкове");
  // });
});
