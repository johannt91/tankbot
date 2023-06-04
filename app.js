const { App } = require("@slack/bolt");

const dotenv = require("dotenv");

const { greeting } = require("./source.js");

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event("team_join", async ({ event, client }) => {
  try {
    const userId = event.user.id;
    const message = greeting;

    await client.chat.postMessage({
      channel: userId,
      text: message,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports.handler = async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
};