const axios = require("axios").default;
var unzipper = require("unzipper");
const fs = require("fs");
const request = require("request");
const Path = require("path");

fs.access("./data", (err) => {
  if (!err) {
    console.error("Data folder exists , downloading");
  } else {
    fs.mkdir(Path.join(__dirname, "data"), (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("Directory created successfully, downloading!");
    });
  }
});
(function dload() {
  let i = 1;
  let year = "2020";
  let months = [
    "JAN",

  ];
  while (months.length > 0) {
    let mon = months.pop();

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
        response.data.pipe(unzipper.Extract({ path: "./data/" }));
      //if need them zipped
      // response.data.pipe(fs.createWriteStream("./data/" + urly.slice(-21)));
    })
    .catch((error) => {
      //you can check if any data is skipped except holidays
    });
}
