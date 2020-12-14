const puppeteer = require('puppeteer');

const scan = async (rootUrl) => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(rootUrl);
    await page.screenshot({path: 'example.png'});

    await browser.close();
}

module.exports = {
    scan,
}
