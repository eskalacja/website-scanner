const { Link } = require('./Link');

/**
 * @property {Map<Link>} links
 */
class Result {
  constructor() {
    this.links = new Map();
  }

  addPage(url, parentLink) {
    let parent;

    if (parentLink) {
      parent = parentLink;
    }

    const link = Link.fromString(url, parent);

    if (this.links.has(link.normalizedHref)) {
      const page = this.links.get(link.normalizedHref);
      page.parents.set(parent.normalizedHref, parent);

      return;
    }

    this.links.set(link.normalizedHref, link);
  }

  getUnchecked(type) {
    for (const [, link] of this.links) {
      if (link.isChecked === false && link.type === type) {
        return link;
      }
    }

    return null;
  }
}

module.exports = { Result };
