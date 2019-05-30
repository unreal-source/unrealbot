'use strict'

const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
const titleCase = require('title-case')
const getEmbedColor = require('../../lib/get-embed-color')

module.exports = class LookingForTalentCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'talent',
      aliases: ['lft'],
      group: 'jobs',
      memberName: 'talent',
      description: 'Write a post in the #looking-for-talent channel.',
      args: [
        // Employer Name
        {
          key: 'employer',
          prompt: '**What is the name of your company? For individuals, just enter your name. (Max 128 characters)**',
          type: 'string',
          validate: response => {
            if (response.length <= 128) {
              return true
            } else {
              return `That was ${response.length} characters. Please try again in 128 characters or less.`
            }
          }
        },
        // Job Role
        {
          key: 'role',
          prompt: '**What role are you hiring for? (Max 128 characters)**',
          type: 'string',
          validate: response => {
            if (response.length <= 128) {
              return true
            } else {
              return `That was ${response.length} characters. Please try again in 128 characters or less.`
            }
          }
        },
        // Job Type
        {
          key: 'type',
          prompt: '**What type of job is it? (Choose one: Permanent, Contract, Freelance)**',
          type: 'string',
          validate: response => {
            if (/^permanent$|^contract$|^freelance$/i.test(response)) {
              return true
            } else {
              return 'Invalid job type. Please choose `Permanent`, `Contract` or `Freelance`.'
            }
          }
        },
        // Compensation
        {
          key: 'compensation',
          prompt: '**How will the job be compensated? (Choose one: Paid, Royalty, Unpaid)**',
          type: 'string',
          validate: response => {
            if (/^paid$|^royalty$|^unpaid$/i.test(response)) {
              return true
            } else {
              return 'Invalid compensation type. Please choose `Paid`, `Royalty` or `Unpaid`.'
            }
          }
        },
        // Location
        {
          key: 'location',
          prompt: '**Where is the job located? (Enter `Remote` for remote jobs)**',
          type: 'string'
        },
        // Job Description
        {
          key: 'description',
          prompt: '**What is the job description? (Max 1024 characters)**\n**NOTE: Do not include skills & requirements for the applicant here. The next question will cover that.**',
          type: 'string',
          validate: response => {
            if (response.length <= 1024) {
              return true
            } else {
              return `That was ${response.length} characters. Please try again in 1024 characters or less.`
            }
          }
        },
        // Skills & Requirements
        {
          key: 'skills',
          prompt: '**What are the skills required for this job? (Max 1024 characters)**',
          type: 'string',
          validate: response => {
            if (response.length <= 1024) {
              return true
            } else {
              return `That was ${response.length} characters. Please try again in 1024 characters or less.`
            }
          }
        },
        // How to Apply
        {
          key: 'apply',
          prompt: '**Finally, add instructions for applying to this job. (Max 1024 characters)**',
          type: 'string',
          validate: response => {
            if (response.length <= 1024) {
              return true
            } else {
              return `That was ${response.length} characters. Please try again in 1024 characters or less.`
            }
          }
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
    const guild = await this.client.guilds.first()
    const member = await guild.fetchMember(message.author)
    const channel = await this.client.channels.find('name', 'looking-for-talent')
    const { employer, role, type, compensation, location, description, skills, apply } = args
    const embedColor = getEmbedColor(titleCase(compensation))
    const post = new RichEmbed()
      .setTitle(`${titleCase(role)} - ${titleCase(employer)}`)
      .setDescription(`Posted by <@${member.id}>`)
      .setColor(embedColor)
      .setTimestamp()
      .addField('Compensation', titleCase(compensation), true)
      .addField('Location', titleCase(location), true)
      .addField('Job Type', titleCase(type), true)
      .addField('Job Description', description)
      .addField('Skills & Requirements', skills)
      .addField('How to Apply', `${apply}\n─`)

    return channel.send(post).then(message.say('Your message was successfully posted in the #looking-for-talent channel.'))
  }
}
