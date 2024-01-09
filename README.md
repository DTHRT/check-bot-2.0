# Slack-Check-Bot

A 🔥 simple and efficient bot to automate daily check-ins and check-outs on Slack!

## Features

- 🕒 Schedule daily check-in and check-out messages
- 📅 Customizable messages for each day of the week
- 🤖 Easy to set up bot user on Slack
- 🚀 Quick installation and start-up

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js installed on your local machine
- A Slack account with permissions to create apps

### Installation

1. **Create a New Slack App**: Follow [Slack's official guide](https://api.slack.com/start) to create a new app.
2. **Add a Bot User**: In your app settings, add a new bot user.
3. **Install App to Your Workspace**: Install your Slack app to your workspace to get the SLACK_TOKEN.
4. **Invite the Bot to a Channel**: Invite your new bot to a Slack channel.
5. **Set Up Environment Variables**:
    - Copy the Bot Token and Channel ID.
    - Create a `.env` file in the root directory and populate it with your Slack credentials:
      ```
      SLACK_TOKEN=your-bot-token
      SLACK_CHANNELC=your-channel-id
      ```
6. **Install Dependencies**: Run `npm install` to install all necessary dependencies.
7. **Start the Bot**: Execute `node app.js` to start the bot.
