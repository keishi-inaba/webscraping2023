const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

// webスクレイピングアプリを作成
const URL = "https://search.rakuten.co.jp/search/mall/%E3%83%9E%E3%82%A6%E3%82%B9%E3%83%91%E3%83%83%E3%83%89/";
const data = [];

axios(URL)
.then((response) => {
  const htmlParser = response.data;
  // console.log(htmlParser);

  const $ = cheerio.load(htmlParser);

  $(".serchresultitem", htmlParser).each(function() {
    const title = $(this).find(".title").text();
    const price = $(this).find(".price--OX_YW").text();
    data.push({ title, price });
    console.log(data);
  });
})
.catch((error) => console.log(error));


app.listen(PORT, console.log("server running!"));
