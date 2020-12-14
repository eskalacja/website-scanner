const puppeteer = require('puppeteer');

const evaluateFindLinks = () => {
  const links = document.querySelectorAll('a');

  const hrefs = Array.from(links).filter((el) => el.href).map(el => el.href);

  return hrefs;
};

const visitPage = async (page, url) => {
  await page.goto(url);
  const currentUrl = page.url();
  const currentUrlElement = new URL(currentUrl);
  console.log(currentUrlElement);

  const links = await page.evaluate(evaluateFindLinks);
  const urls = links.map((href) => {
    try {
      const urlElement = new URL(href);

      return {
        href: urlElement.href,
        origin: urlElement.origin,
        pathname: urlElement.pathname,
        hash: urlElement.hash,
        protocol: urlElement.protocol,
      };
    } catch (error) {
      return {
        href,
        error,
      };
    }
  });

  const { samePage, local, external, other, errored } = urls.reduce((acc, curr) => {
    switch (true) {
      case curr.error:
        acc.errored.push(curr);
        break;
      case (['http:', 'https:'].includes(curr.protocol) === false):
        acc.other.push(curr);
        break;
      case (curr.origin !== currentUrlElement.origin):
        acc.external.push(curr);
        break;
      case (`${curr.origin}${curr.pathname}` === `${currentUrlElement.origin}${currentUrlElement.pathname}`):
        acc.samePage.push(curr);
        break;
      default:
        acc.local.push(curr);
    }

    return acc;
  }, {
    samePage: [],
    local: [],
    external: [],
    other: [],
    errored: [],
  });

  console.log({ samePage, local, external, other });
  return urls;
};

const scan = async (rootUrl) => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await visitPage(page, rootUrl);

  await browser.close();
};

module.exports = {
  scan,
};
