const puppeteer = require('puppeteer');
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { Result } = require('./classes/Result');
const { LinkTypes } = require('./classes/Link');
const { Logger } = require('./classes/Logger');
const {
  visitPage,
  processUrls,
  sleep,
  processUptimeChecks,
} = require('./utils/procedures');

const scan = async (rootUrl, { sleepTime, verbose = false }) => {
  console.log(sleepTime);
  const logger = new Logger(verbose);

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox'],
  });

  logger.verbose('Browser init done');
  logger.verbose(`RootUrl is ${rootUrl}`);

  const result = new Result();
  result.addPage(rootUrl);
  await processUptimeChecks(result, logger, sleepTime);

  const [, rootLink] = result.links.entries().next().value;

  const browserPage = await browser.newPage();
  const urls = await visitPage(browserPage, rootLink, logger);

  logger.verbose(`Found ${urls.length} links on root page.`);

  processUrls(result, urls, rootLink);
  await processUptimeChecks(result, logger, sleepTime);

  let currentSubPage;
  // eslint-disable-next-line no-cond-assign
  while (currentSubPage = result.getUncrawled(LinkTypes.INTERNAL)) {
    await sleep(sleepTime);
    const subPageUrls = await visitPage(browserPage, currentSubPage, logger);
    processUrls(result, subPageUrls, rootLink);
    await processUptimeChecks(result, logger, sleepTime);
  }

  const report = result.toReportJSON();
  logger.out(report);

  const outPathname = resolve(__dirname, '../output/result.json');
  logger.verbose(`Writing to ${outPathname}`);

  writeFileSync(outPathname, JSON.stringify(report, null, 2));

  logger.verbose('Done, thank you.');

  await browser.close();
};

module.exports = {
  scan,
};
