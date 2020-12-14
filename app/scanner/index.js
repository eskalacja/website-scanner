const puppeteer = require('puppeteer');
const { Result } = require('./classes/Result');

const evaluateFindLinks = () => {
  const links = document.querySelectorAll('a');

  const hrefs = Array.from(links).filter((el) => el.href).map(el => el.href);

  return hrefs;
};

const visitPage = async (page, link) => {
  await page.goto(link.href);

  const links = await page.evaluate(evaluateFindLinks);

  return links;
};

const scan = async (rootUrl) => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox'],
  });

  const result = new Result();
  result.addPage(rootUrl);

  const [, rootLink] = result.links.entries().next().value;

  const page = await browser.newPage();
  const urls = await visitPage(page, rootLink, result);

  for (const u of urls) {
    result.addPage(u, rootLink);
  }

  console.log(result);

  await browser.close();
};

module.exports = {
  scan,
};
