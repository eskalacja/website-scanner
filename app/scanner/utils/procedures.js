const uptimeCheck = require('uptime-check');

const evaluateFindLinks = () => {
  // eslint-disable-next-line no-undef
  const links = document.querySelectorAll('a');

  const hrefs = Array.from(links).filter((el) => el.href).map(el => el.href);

  return hrefs;
};

const visitPage = async (page, link, logger) => {
  logger.verbose(`Visiting ${link.href}`);
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const processUptimeChecks = async (result, logger, sleepTime) => {
  let currentUnchecked;

  // eslint-disable-next-line no-cond-assign
  while (currentUnchecked = result.getUnchecked()) {
    await sleep(sleepTime);
    logger.verbose(`Checking ${currentUnchecked.normalizedHref}`);
    await checkUptime(currentUnchecked);
  }
};

module.exports = {
  evaluateFindLinks,
  visitPage,
  processUrls,
  checkUptime,
  sleep,
  processUptimeChecks,
};
