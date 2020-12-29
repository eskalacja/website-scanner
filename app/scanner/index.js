const puppeteer = require('puppeteer');
const { Result } = require('./classes/Result');
const { LinkTypes } = require('./classes/Link');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const evaluateFindLinks = () => {
  const links = document.querySelectorAll('a');

  const hrefs = Array.from(links).filter((el) => el.href).map(el => el.href);

  return hrefs;
};

const visitPage = async (page, link) => {
  await page.goto(link.href);
  link.isChecked = true;

  const links = await page.evaluate(evaluateFindLinks);

  return links;
};

const processUrls = (result, urls, rootLink) => {
  for (const u of urls) {
    result.addPage(u, rootLink);
  }
};

const scan = async (rootUrl, sleepTime = 25) => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox'],
  });

  const result = new Result();
  result.addPage(rootUrl);

  const [, rootLink] = result.links.entries().next().value;

  const browserPage = await browser.newPage();
  const urls = await visitPage(browserPage, rootLink);

  processUrls(result, urls, rootLink);

  let currentSubPage;
  // eslint-disable-next-line no-cond-assign
  while (currentSubPage = result.getUnchecked(LinkTypes.INTERNAL)) {
    await sleep(sleepTime);
    const subPageUrls = await visitPage(browserPage, currentSubPage);
    processUrls(result, subPageUrls, rootLink);
  }

  console.log(result);

  await browser.close();
};

module.exports = {
  scan,
};
