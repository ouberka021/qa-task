import { test, Page, expect } from "@playwright/test";
import { count } from "console";

test.describe("Test Group", () => {
  // navigate to the test page https://news.ycombinator.com/newest
  test.beforeEach("", async ({ page }) => {
    await page.goto("https://news.ycombinator.com/newest");
  });

  test("Newest to Oldest", async ({ page }) => {
    // find all the elements.
    let allTimes = await page.locator("//span[@class='age']/a").all();

    // create an empty array to store the minutes.
    const minutesArray = Array();

    // function convert hours to minutes.
    function convertHoursToMinutes(timeString) {
      const match = timeString.match(/(\d+)\s*hour/);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = hours * 60;
        return `${minutes} minutes`;
      }
      return timeString;
    }

    for (let i = 0; i < 4; i++) {

      for (let time of allTimes) {
        let containText = await time.innerText();
        
        // convert hours to minutes using the function convertHoursToMinutes().
        containText = convertHoursToMinutes(containText);
       
        containText = containText.replace(/[^0-9]/g, "");
        

        // convert the string to number and push it to the array.
        let eachNum = Number(containText);

        minutesArray.push(eachNum);
        // break the loop if we have 100 elements.
        if (minutesArray.length == 100) {
          break;
        }
      }

      await page.locator("//a[@class='morelink']").click();

    }

    //actual array from UI.
    console.log("actual array from UI.");
    console.log(minutesArray);
    //sorted expected  array.
    console.log("Ascending order: expected array.");
    console.log(minutesArray.sort((a, b) => a - b));

    expect(await minutesArray).toBe(minutesArray.sort((a, b) => a - b));
  });
});
