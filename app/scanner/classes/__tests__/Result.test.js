const { Result } = require('../Result');
const { LinkTypes, Link } = require('../Link');

describe('classes/Result', () => {
  const parentUrl = 'https://agentslug.com/';
  const pageA = 'https://agentslug.com/en';
  const externalPage = 'http://example.com/';

  let instance;
  let parentLink;
  it('create instance', async () => {
    instance = new Result();
    instance.addPage(parentUrl);
    parentLink = instance.links.get(parentUrl);
    parentLink.isChecked = true;

    expect(instance).toMatchSnapshot();
  });

  it('add page', async () => {
    instance.addPage(pageA, parentLink);
    // Mark it as document
    instance.links.get(pageA).isDocument = true;
    expect(instance.links.has(pageA)).toBe(true);
    expect(instance.links.get(pageA).parents.size).toBe(1);
  });

  it('replace parent to already existing page', async () => {
    instance.addPage(pageA, parentLink);
    expect(instance.links.has(pageA)).toBe(true);
    expect(instance.links.get(pageA).type).toBe(LinkTypes.INTERNAL);
    expect(instance.links.get(pageA).parents.size).toBe(1);
  });

  it('add parent to already existing page', async () => {
    const subParentLink = await Link.fromString(`${parentUrl}/2`);
    instance.addPage(pageA, subParentLink);
    expect(instance.links.has(pageA)).toBe(true);
    expect(instance.links.get(pageA).parents.size).toBe(2);
  });

  it('add external page', async () => {
    instance.addPage(externalPage, parentLink);
    expect(instance.links.has(externalPage)).toBe(true);
    expect(instance.links.get(externalPage).type).toBe(LinkTypes.EXTERNAL);
  });

  it('get untested internal page', () => {
    const page = instance.getUnchecked();

    expect(page.isChecked).toBe(false);
  });

  it('.filter', () => {
    const externals = instance.filter((link) => link.type === LinkTypes.EXTERNAL);

    expect(externals.length).toBe(1);
    expect(externals[0].type).toBe(LinkTypes.EXTERNAL);
  });

  it('.getUncrawled', () => {
    const uncrawled = instance.getUncrawled();
    expect(uncrawled.type).toBe(LinkTypes.INTERNAL);
  });
});
