const result = require('../output/result.json');

describe('Acceptance test', () => {
  it('matches snapshot', () => {
    expect(result.length).toBe(7);
  });
});
