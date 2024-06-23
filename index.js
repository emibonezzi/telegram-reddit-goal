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
    const inlineResults = goals
      .map((item) => ({
        type: "video",
        id: item._id,
        video_url: item.url,
        mime_type: "video/mp4",
        thumbnail_url:
          "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/8c/57/0f/8c570f5e-21c3-5042-4149-565da7fee604/AppIcon-0-0-1x_U007ephone-0-6-0-0-85-220.png/256x256bb.jpg",
        title: item.title,
      }))
      .slice()
      .reverse();

    console.log("Results", inlineResults);

    // send inline results
    await sendInline(inlineQueryId, inlineResults.slice(0, 15));

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
