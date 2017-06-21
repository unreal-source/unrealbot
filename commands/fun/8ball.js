'use strict'

const { Command } = require('discord.js-commando')
const random = require('unique-random-array')
const answers = require('../../data/8ball-answers')

module.exports = class EightBallCommand extends Command {
  constructor(client) {
    super(client, {
      name: '8ball',
      group: 'fun',
      memberName: '8ball',
      description: 'Get answers to your burning yes/no questions',
      examples: ['8ball is Allar the hero of the peole?'],
      args: [
        {
          key: 'question',
          prompt: 'What would you like to ask the Magic 8-Ball?',
          type: 'string'
        }
      ]
    })
  }

  run(message, args) {
    const { question } = args
    const answer = random(answers)

    return message.say(`:8ball: ${answer()}`)
  }
}
