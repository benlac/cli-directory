import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getShops } from "./scraper-shops.js";
import { Spinner } from "@topcli/spinner";

yargs(hideBin(process.argv))
  .command(
    "all <city>",
    "fetch the city's shops as an arg",
    () => {},
    async ({ city, page }) => {
      if (city) {
        const spinner = new Spinner().start(
          `Start scrapping ${city}'s shops !`
        );
        const res = await getShops(city, Number(page) || 1);
        if (res.success) {
          spinner.succeed(
            `${res.message} in ${spinner.elapsedTime.toFixed(2)}ms 🎉 `
          );
        } else {
          spinner.failed(`🔴 ${res.message}`);
        }
      }
    }
  )
  .option("page", {
    alias: "p",
    type: "string",
    description: "page to begin scraping from",
  })
  .demandCommand(1)
  .parse();
