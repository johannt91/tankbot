// const { App } = require("@slack/bolt")
import pkg from "@slack/bolt";

import { greeting } from "./source.js";

const { App } = pkg;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event("team_join", async ({ event, client }) => {
  const userId = event.user.id;
  const message = greeting;

  await client.chat.postMessage({
    channel: userId,
    text: message,
  });
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
