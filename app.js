const { WebClient } = require('@slack/web-api')
const schedule = require('node-schedule');
require("dotenv").config();

const token = process.env.SLACK_TOKEN || "No token defined";
const channelC = process.env.SLACK_CHANNELC || "No channel defined";
const messageCI = process.env.SLACK_MESSAGECI || "No message defined";
const messageBREAK = process.env.SLACK_MESSAGEBREAK || "No message defined";
const messageCO = process.env.SLACK_MESSAGECO || "No message defined";

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

async function deleteMessage(channel, timestamp) {
    try {
        await web.chat.delete({
            channel: channel,
            ts: timestamp
        });
    } catch (error) {
        console.error(error);
    }
}

schedule.scheduleJob("45 9 * * 1-5", () => {
    sendMessage(channelC, messageCI);
});

schedule.scheduleJob("30 12 * * 1-5", () => {
    sendMessage(channelC, messageBREAK);
});

schedule.scheduleJob("0 19 * * 1-5", () => {
    sendMessage(channelC, messageCO);
});

sendMessage(channelC, 'Bot is running!');

// deleteMessage(channelC, '1711262302.550629');