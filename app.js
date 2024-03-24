const { WebClient } = require('@slack/web-api')
const schedule = require('node-schedule')
require('dotenv').config()

const token = process.env.SLACK_TOKEN || 'No token defined'
const channelC = process.env.SLACK_CHANNELC || 'No channel defined'
const messageCI = process.env.SLACK_MESSAGECI || 'No message defined'
const messageBREAK = process.env.SLACK_MESSAGEBREAK || 'No message defined'
const messageCO = process.env.SLACK_MESSAGECO || 'No message defined'
const tenorKey = process.env.TENOR_API || 'No key defined'

const web = new WebClient(token)
const sendMessage = async (channel, message, gifQuery) => {
  try {
    if (!message) throw new Error('No message defined')

    if (!gifQuery) {
      return await web.chat.postMessage({
        channel: channel,
        text: message,
      })
    }

    const { gif, title } = await getGif(gifQuery)

    await web.chat.postMessage({
      channel,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message,
          },
        },
        {
          type: 'image',
          title: {
            type: 'plain_text',
            text: title || 'No title :(',
            emoji: true,
          },
          image_url: gif,
          alt_text: title,
        },
      ],
    })
  } catch (error) {
    console.error(error)
  }
}

const deleteMessage = async (channel, timestamp) => {
  try {
    await web.chat.delete({
      channel: channel,
      ts: timestamp,
    })
  } catch (error) {
    console.error(error)
  }
}

const getGif = async (query = '') => {
  try {
    const response = await fetch(
      `https://tenor.googleapis.com/v2/search?key=${tenorKey}&q=${query}&client_key=Slack Integration&country=KR&random=true&limit=1`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const { results } = await response.json()

    return {
      gif: results[0].media_formats.gif.url,
      title: results[0].content_description,
    }
  } catch {
    console.error(error)
  }
}

schedule.scheduleJob('45 9 * * 1-5', () => {
  sendMessage(channelC, messageCI, 'go to work')
})

schedule.scheduleJob('30 12 * * 1-5', () => {
  sendMessage(channelC, messageBREAK, 'lunch time')
})

schedule.scheduleJob('0 19 * * 1-5', () => {
  sendMessage(channelC, messageCO, 'go to home')
})

// sendMessage(channelC, messageCI, 'go to work')
// deleteMessage(channelC, '1711271795.020139');

console.log('Bot is running!')
