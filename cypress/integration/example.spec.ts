import '@testing-library/cypress';

describe('Lead form', () => {
  it('should submit data as buyer successfully', () => {
    cy.url().should('contain', '/');
  });
});
