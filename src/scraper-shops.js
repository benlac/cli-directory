import puppeteer from "puppeteer";
import { insert } from "./db.js";

export async function getShops(city, currentPage) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.annuairevert.com/magasins/ville/${city}?page=${currentPage}`
    );

    const lastPageNumber = await page.$$eval(".pagination .page a", (links) => {
      return links[links.length - 1].innerText;
    });

    const nameLinkList = await page.$$eval(
      ".container .row:nth-child(2) .item-list .row a",
      (links) =>
        links.map((link) => ({
          link: link.href,
        }))
    );

    const linkList = nameLinkList.filter(
      (link) => link.link !== "https://www.annuairevert.com/contact"
    );

    for (const { link } of linkList) {
      await Promise.all([
        page.waitForNavigation(),
        page.goto(link, { waitUntil: "networkidle2" }, { timeout: 0 }),
        page.waitForSelector("#main-wrapper", { timeout: 0 }),
      ]);

      const title = await page
        .$eval(".title", (e) => e.innerText)
        .catch((_) => null);

      const adress =
        (await page
          .$eval(".venue .venue-name", (e) => e.innerText)
          .catch((_) => null)) ??
        (await page.$eval(".aos-init", (e) => e.innerText).catch((_) => null));

      const phone = await page
        .$eval(".contact-phone .phone", (e) => e.innerText)
        .catch((_) => null);

      insert({ title, adress: adress.replace(/\n/g, " "), phone });
    }
    await browser.close();

    if (currentPage < lastPageNumber) {
      return getShops(city, currentPage + 1);
    }

    return { success: true, message: `Scraping for ${city} is done` };
  } catch (error) {
    return { success: false, message: `Scraping for ${city} has failed!` };
  }
}
