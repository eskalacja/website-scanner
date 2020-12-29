const { Result } = require('../Result');
const { LinkTypes, Link } = require('../Link');

describe('classes/Result', () => {
  const parentUrl = 'https://example.com/';
  const pageA = 'https://example.com/en';
  const externalPage = 'https://ext.example.com/';

  let instance;
  let parentLink;
  it('create instance', () => {
    instance = new Result();
    instance.addPage(parentUrl);
    parentLink = instance.links.get(parentUrl);
    parentLink.isChecked = true;

    expect(instance).toMatchSnapshot();
  });

  it('add page', () => {
    instance.addPage(pageA, parentLink);
    expect(instance.links.has(pageA)).toBe(true);
    expect(instance.links.get(pageA).parents.size).toBe(1);
  });

  it('replace parent to already existing page', () => {
    instance.addPage(pageA, parentLink);
    expect(instance.links.has(pageA)).toBe(true);
    expect(instance.links.get(pageA).type).toBe(LinkTypes.INTERNAL);
    expect(instance.links.get(pageA).parents.size).toBe(1);
  });

  it('add parent to already existing page', () => {
    const subParentLink = Link.fromString(`${parentUrl}/2`);
    instance.addPage(pageA, subParentLink);
    expect(instance.links.has(pageA)).toBe(true);
    expect(instance.links.get(pageA).parents.size).toBe(2);
  });

  it('add external page', () => {
    instance.addPage(externalPage, parentLink);
    expect(instance.links.has(externalPage)).toBe(true);
    expect(instance.links.get(externalPage).type).toBe(LinkTypes.EXTERNAL);
  });

  it('get untested internal page', () => {
    const page = instance.getUnchecked(LinkTypes.INTERNAL);

    expect(page.type).toBe(LinkTypes.INTERNAL);
  });

  it('get no untested internal page', () => {
    const page = instance.getUnchecked(LinkTypes.INTERNAL);
    page.isChecked = true;

    expect(instance.getUnchecked(LinkTypes.INTERNAL)).toBe(null);
  });

  it('get untested external page', () => {
    const page = instance.getUnchecked(LinkTypes.EXTERNAL);

    expect(page.type).toBe(LinkTypes.EXTERNAL);
  });
});
