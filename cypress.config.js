import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //require("cypress-mochawesome-reporter/plugin")(on);
    },
    pageLoadTimeout: 240000,
    baseUrl: "https://teamchallenge-sport-store-frontend.vercel.app/",
    //baseUrl: "http://localhost:3000",
  },
});
