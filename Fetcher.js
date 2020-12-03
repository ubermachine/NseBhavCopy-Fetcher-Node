const axios = require("axios").default;
var unzipper = require("unzipper");
const fs = require("fs");
const request = require("request");
const Path = require("path");

(function dload() {
  let i = 1;
  let year = "2020";
  let mons = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  while (mons.length > 0) {
    let mon = mons.pop();

    while (i < 32) {
      if (i < 10) {
        let url =
          "https://www1.nseindia.com/content/historical/EQUITIES/" +
          year +
          "/" +
          mon +
          "/cm0" +
          i +
          mon +
          year +
          "bhav.csv.zip";
        loader(url);

        i++;
      } else {
        url =
          "https://www1.nseindia.com/content/historical/EQUITIES/" +
          year +
          "/" +
          mon +
          "/cm" +
          i +
          mon +
          year +
          "bhav.csv.zip";

        loader(url);
        i++;
      }
    }
    i = 0;
  }
})();

function loader(urly) {
  axios({
    method: "get",
    url: urly,
    responseType: "stream",
  })
    .then(function (response) {
      response.data.pipe(fs.createWriteStream("./data/" + urly.slice(-21)));
      //if need them unzipped
      // response.data.pipe(unzipper.Extract({ path: "./data/" }));
    })
    .catch((error) => {
      //you can check if any data is skipped except holidays
    });
}
