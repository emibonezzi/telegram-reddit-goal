const axios = require("axios");
const { header } = require("express/lib/request");
require("dotenv").config();

const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/answerInlineQuery`;

module.exports = async function (inlineQueryId, results) {
  const res = await axios.post(url, {
    inline_query_id: inlineQueryId,
    results: results,
    cache_time: 0,
  });
};
