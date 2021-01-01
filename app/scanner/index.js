const puppeteer = require('puppeteer');
const uptimeCheck = require('uptime-check');
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { Result } = require('./classes/Result');
const { LinkTypes } = require('./classes/Link');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const evaluateFindLinks = () => {
  const links = document.querySelectorAll('a');

  const hrefs = Array.from(links).filter((el) => el.href).map(el => el.href);

  return hrefs;
};

const visitPage = async (page, link, logger) => {
  logger(`Visiting ${link.href}`);
  await page.goto(link.href);
  link.isCrawled = true;

  const links = await page.evaluate(evaluateFindLinks);

  return links;
};

const processUrls = (result, urls, rootLink) => {
  for (const u of urls) {
    result.addPage(u, rootLink);
  }
};

const checkUptime = async (link) => {
  const report = await uptimeCheck({
    url: link.normalizedHref,
  });

  const { httpCode, totalTime, status } = report;

  link.uptimeReport = {
    httpCode,
    totalTime,
    status,
  };

  link.isChecked = true;
};

const verboseLogger = (verbose) => {
  if (verbose) {
    return console.log;
  }

  return () => {};
};

const processUptimeChecks = async (result, logger) => {
  let currentUnchecked;

  // eslint-disable-next-line no-cond-assign
  while (currentUnchecked = result.getUnchecked()) {
    await sleep();
    logger(`Checking ${currentUnchecked.normalizedHref}`);
    await checkUptime(currentUnchecked);
  }
};

const scan = async (rootUrl, { sleepTime = 25, verbose = false }) => {
  const logger = verboseLogger(verbose);

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox'],
  });

  logger('Browser init done');
  logger(`RootUrl is ${rootUrl}`);

  const result = new Result();
  result.addPage(rootUrl);
  await processUptimeChecks(result, logger);

  const [, rootLink] = result.links.entries().next().value;

  const browserPage = await browser.newPage();
  const urls = await visitPage(browserPage, rootLink, logger);

  logger(`Found ${urls.length} links on root page.`);

  processUrls(result, urls, rootLink);
  await processUptimeChecks(result, logger);

  let currentSubPage;
  // eslint-disable-next-line no-cond-assign
  while (currentSubPage = result.getUncrawled(LinkTypes.INTERNAL)) {
    await sleep(sleepTime);
    const subPageUrls = await visitPage(browserPage, currentSubPage, logger);
    processUrls(result, subPageUrls, rootLink);
    await processUptimeChecks(result, logger);
  }

  const report = result.toReportJSON();
  console.log(report);

  const outPathname = resolve(__dirname, '../result.json');
  logger(`Writing to ${outPathname}`);

  writeFileSync(outPathname, JSON.stringify(report, null, 2));

  logger('Done, thank you.');

  await browser.close();
};

module.exports = {
  scan,
};
