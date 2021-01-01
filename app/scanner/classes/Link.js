const LinkTypes = {
  INTERNAL: 1,
  EXTERNAL: 2,
  OTHER: 3,
};

const LinkTypesByKey = {
  1: 'INTERNAL',
  2: 'EXTERNAL',
  3: 'OTHER'
};

const getLinkType = (link, parent) => {
  switch (true) {
    case link.error:
      return LinkTypes.OTHER;
    case (['http:', 'https:'].includes(link.protocol) === false):
      return LinkTypes.OTHER;
    case (!parent || link.origin === parent.origin):
      return LinkTypes.INTERNAL;
    default:
      return LinkTypes.EXTERNAL;
  }
};

/**
 * @property {string} href
 * @property {string|undefined} origin
 * @property {string|undefined} pathname
 * @property {string|undefined} hash
 * @property {string|undefined} protocol
 * @property {Error|undefined} error
 * @property {Set} parents
 * @property {boolean} isChecked
 * @property {Map<Link>} parents
 */
class Link {
  constructor({
    href,
    origin,
    pathname,
    hash,
    protocol,
    search,
    error,
    parent,
  }) {
    this.href = href;
    this.origin = origin;
    this.pathname = pathname;
    this.hash = hash;
    this.protocol = protocol;
    this.search = search;
    this.error = error;
    this.normalizedHref = `${this.origin || this.protocol}${this.pathname}${this.search}`;

    this.parents = new Map();

    if (parent) {
      this.parents.set(parent.normalizedHref, parent);
    }

    this.isChecked = false;
    this.isCrawled = false;
    this.type = getLinkType(this, parent);
    this.uptimeReport = null;
  }

  toReportItem() {
    return {
      href: this.href,
      normalizedHref: this.normalizedHref,
      parents: [...this.parents].map(el => el[1]).map(el => el.toReportItem()),
      type: LinkTypesByKey[this.type],
      ...this.uptimeReport,
    };
  }

  static get types() {
    return LinkTypes;
  }

  static urlToNormalObject(u) {
    // Yes, this is real.
    // @link https://twitter.com/sz_nowicki/status/1338549612651667457
    const obj = {};

    // eslint-disable-next-line guard-for-in
    for (const key in u) {
      const value = u[key];
      if (value === 'null') {
        obj[key] = null;
        // eslint-disable-next-line no-continue
        continue;
      }

      if (typeof value !== 'string') {
        // eslint-disable-next-line no-continue
        continue;
      }
      obj[key] = `${u[key]}`;
    }

    return obj;
  }

  static fromParsedUrl(parsedUrl, parent) {
    const normalizedUrl = this.urlToNormalObject(parsedUrl);

    return new this({
      ...normalizedUrl,
      parent,
    });
  }

  static fromError(href, parent, error) {
    return new this({
      href,
      parent,
      error,
    });
  }

  static fromString(url, parent) {
    try {
      const parsed = new URL(url);

      return Link.fromParsedUrl(parsed, parent);
    } catch (error) {
      return Link.fromError(url, parent, error);
    }
  }
}

module.exports = {
  LinkTypes,
  Link,
};
