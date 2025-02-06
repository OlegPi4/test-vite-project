import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 240000,
    // baseUrl: "https://teamchallenge-sport-store-frontend.vercel.app/",
    baseUrl: "http://localhost:3000",
  },
});
