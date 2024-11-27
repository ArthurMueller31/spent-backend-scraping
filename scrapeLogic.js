const puppeteer = require("puppeteer");

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch();

  try {
    throw new Error("whoops");
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto("https://developer.chrome.com/");

    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box.
    await page
      .locator(".devsite-search-field")
      .fill("automate beyond recorder");

    // Wait and click on first result.
    await page.locator(".devsite-result-item-link").click();

    // Locate the full title with a unique string.
    const textSelector = await page
      .locator("text/Customize and automate")
      .waitHandle();
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);

    // Print the full title.
    const logStatement = `The title of this blog post is ${fullTitle} `;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running puppeteer: ${e}`)
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
