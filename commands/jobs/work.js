'use strict'

const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
const titleCase = require('title-case')
const getEmbedColor = require('../../lib/get-embed-color')

module.exports = class LookingForWorkCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'work',
      aliases: ['lfw'],
      group: 'jobs',
      memberName: 'work',
      description: 'Write a post in the #looking-for-work channel.',
      args: [
        // Name
        {
          key: 'name',
          prompt: '**What is your name? (Max 128 characters)**',
          type: 'string',
          validate: response => {
            if (response.length <= 128) {
              return true
            } else {
              return `That was ${response.length} characters. Please try again in 128 characters or less.`
            }
          }
        },
        // Compensation
        {
          key: 'compensation',
          prompt: '**Are you looking for paid, royalty, or unpaid work? (Choose one: Paid, Royalty, Unpaid)**',
          type: 'string',
          validate: response => {
            if (/^paid$|^royalty$|^unpaid$/i.test(response)) {
              return true
            } else {
              return 'Invalid compensation type. Please choose `Paid`, `Royalty` or `Unpaid`.'
            }
          }
        },
        // Description
        {
          key: 'description',
          prompt: `Describe your skills and what kind of work you're looking for. (Max 1024 characters)`,
          type: 'string',
          validate: response => {
            if (response.length <= 1024) {
              return true
            } else {
              return `That was ${response.length} characters. Please try again in 1024 characters or less.`
            }
          }
        },
        // Portfolio
        {
          key: 'portfolio',
          prompt: '**Please add a link to your portfolio website.**',
          type: 'string',
          validate: response => {
            const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

            if (response.match(regex)) {
              return true
            } else {
              return `Please use a valid URL, including http:// or https://.`
            }
          }
        },
        // Contact
        {
          key: 'contact',
          prompt: '**How can interested parties contact you?**',
          type: 'string'
        }
      ]
    })
  }

  // Only allow this command in DM channels
  hasPermission(message) {
    if (message.channel.type === 'dm') {
      return true
    } else {
      return
    }
  }

  async run(message, args) {
    const channel = await this.client.channels.find('name', 'looking-for-work')
    const { name, compensation, description, portfolio, contact } = args
    const embedColor = getEmbedColor(titleCase(compensation))
    const post = new RichEmbed()
      .setTitle(`${name} (${titleCase(compensation)})`)
      .setDescription(description)
      .setColor(embedColor)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTimestamp()
      .addField('Portfolio', portfolio)
      .addField('Contact', contact)

    return channel.send(post).then(message.say('Your message was successfully posted in the #looking-for-work channel.'))
  }
}
