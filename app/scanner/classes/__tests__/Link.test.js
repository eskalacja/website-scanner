const { Link } = require('../Link');

describe('classes/Link', () => {
  it('should create a root link', async () => {
    const link = await Link.fromString('https://example.com');
    expect(link).toMatchSnapshot();
  });

  it('should create a link with a parent', async () => {
    const parent = await Link.fromString('https://example.com');
    const link = await Link.fromString('https://example.com/en', parent);

    expect(link).toMatchSnapshot();
  });

  it('should handle a huge file', async () => {
    const link = await Link.fromString('https://speed.hetzner.de/1GB.bin');

    expect(link).toMatchSnapshot();
  });
});
