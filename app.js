const { WebClient } = require('@slack/web-api')
const schedule = require('node-schedule');
require("dotenv").config();

const token = process.env.SLACK_TOKEN || "No token defined";
const channelC = process.env.SLACK_CHANNELC || "No channel defined";
const channelA = process.env.SLACK_CHANNELA || "No channel defined";
const messageCI = process.env.SLACK_MESSAGECI || "No message defined";
const messageCO = process.env.SLACK_MESSAGECO || "No message defined";
const messageMe = process.env.SLACK_MESSAGEME || "No message defined";
const messageSc = process.env.SLACK_MESSAGESC || "No message defined";
const messageTe = process.env.SLACK_MESSAGETE || "No message defined";

const web = new WebClient(token);
async function sendMessage(channel, message) {
    try {
        await web.chat.postMessage({
            channel: channel,
            text: message,
        });
    } catch (error) {
        console.error(error);
    }
}

schedule.scheduleJob("45 9 * * 1-5", () => {
    sendMessage(channelC, messageCI);
});

schedule.scheduleJob("0 19 * * 1-5", () => {
    sendMessage(channelC, messageCO);
});

schedule.scheduleJob("55 13 * * 1", () => {
    sendMessage(channelA, messageMe);
});


schedule.scheduleJob("55 9 * * 2-4", () => {
    sendMessage(channelA, messageSc);
});

schedule.scheduleJob("55 13 * * 5", () => {
    sendMessage(channelA, messageTe);
});
