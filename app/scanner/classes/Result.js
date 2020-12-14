const { Link } = require('./Link');

/**
 * @property {Map<Link>} links
 */
class Result {
  constructor() {
    this.links = new Map();
  }

  addPage(url, parentUrl) {
    let parent;

    if (parentUrl) {
      parent = Link.fromString(parentUrl);
    }

    const link = Link.fromString(url, parent);

    if (this.links.has(link.normalizedHref)) {
      const page = this.links.get(link.normalizedHref);
      page.parents.set(parent.normalizedHref, parent);

      return;
    }

    this.links.set(link.normalizedHref, link);
  }
}

module.exports = { Result };
