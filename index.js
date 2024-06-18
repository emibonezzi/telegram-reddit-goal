const getGoals = require("./handlers/getGoals");
const sendInline = require("./handlers/sendInline");

module.exports.handler = async function (event, context) {
  try {
    // Parse the event body
    const body = JSON.parse(event.body);
    console.log("Parsed body:", body);

    // get inline_query id
    const inlineQueryId = body.inline_query.id;

    console.log("Inline query id: ", inlineQueryId);

    // Retrieve from db list of goals
    const goals = await getGoals();
    const inlineResults = goals.map((item) => ({
      type: "video",
      id: item._id,
      video_url: item.url
        ? item.url
        : "https://streamff.com/uploads/1718640492985.mp4?autoplay=true&loop=true",
      mime_type: "video/mp4",
      thumbnail_url:
        "https://images4.sport.optus.com.au/resources/images/1920x1080/https://images.sport.optus.com.au/resources/images/link/b91e5781-848b-378f-a7f5-96c15f37a8d8/ae1676d1-f800-4906-ab70-4926d16aa1fc/1710453496729/4:0:1912:1080/2560*1440/EURO2024_HighlightsShow.jpg",
      title: item.title,
    }));

    console.log("Results", inlineResults);

    // send inline results
    await sendInline(inlineQueryId, inlineResults);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "success",
      }),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
