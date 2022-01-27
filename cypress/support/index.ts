declare global {
  interface Window {}
  namespace Cypress {
    interface Chainable {}
  }
}
export * from './commands';
