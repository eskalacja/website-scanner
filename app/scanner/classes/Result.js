const { Link, LinkTypes } = require('./Link');

/**
 * @property {Map<Link>} links
 */
class Result {
  constructor() {
    this.links = new Map();
  }

  addRootPage(url) {
    const link = Link.fromString(url);
    link.isDocument = true;
    this.links.set(link.normalizedHref, link);
  }

  addPage(url, parent) {
    const link = Link.fromString(url, parent);

    if (this.links.has(link.normalizedHref)) {
      const page = this.links.get(link.normalizedHref);
      page.parents.set(parent.normalizedHref, parent);

      return;
    }

    this.links.set(link.normalizedHref, link);
  }

  getUnchecked() {
    return this.find((link) => (
      link.isChecked === false && [LinkTypes.INTERNAL, LinkTypes.EXTERNAL].includes(link.type)
    ));
  }

  getUncrawled() {
    return this.find((link) => (
      link.type === LinkTypes.INTERNAL
      && link.isCrawled === false
      && link.isDocument === true
    ));
  }

  find(comparer) {
    for (const [, link] of this.links) {
      if (comparer(link)) {
        return link;
      }
    }

    return null;
  }

  filter(tester) {
    const result = [];

    for (const [, link] of this.links) {
      if (tester(link)) {
        result.push(link);
      }
    }

    return result;
  }

  toReportJSON() {
    const links = [...this.links].map(el => el[1]);

    const report = links.map((l) => {
      return l.toReportItem();
    });

    return report;
  }
}

module.exports = { Result };
