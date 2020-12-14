const { Link } = require('../Link');

describe('classes/Link', () => {
  it('should create a root link', () => {
    const link = Link.fromString('https://example.com');
    expect(link).toMatchSnapshot();
  });

  it('should create a link with a parent', () => {
    const parent = Link.fromString('https://example.com');
    const link = Link.fromString('https://example.com/en', parent);

    expect(link).toMatchSnapshot();
  });
});
