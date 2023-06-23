import "./commands";

import { mount } from "cypress/react18";
import "../../src/styles/index.scss";
import mountWithRouter from "./mountWithRouter";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add(`mount`, mountWithRouter);
