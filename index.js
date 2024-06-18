const getGoals = require("./handlers/getGoals");
require("dotenv").config();

module.exports.handler = async function (event, context) {
  try {
    // Parse the event body
    const body = JSON.parse(event.body);
    console.log("Parsed body:", body);

    // if is inline_query
    if (body.inline_query) {
      // Retrieve from db list of goals
      const goals = await getGoals();
      console.log(goals);
    }

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
