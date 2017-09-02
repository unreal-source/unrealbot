'use strict'

const { Command } = require('discord.js-commando')
const random = require('random-int')

module.exports = class DiceCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      aliases: ['dice'],
      group: 'fun',
      memberName: 'dice',
      description: 'Roll the dice.',
      examples: ['roll 1 d20', 'dice 4 d6'],
      throttling: {
        usages: 1,
        duration: 60
      },
      args: [
        {
          key: 'number',
          prompt: 'How many dice? (Min: 1, Max: 10)',
          type: 'integer',
          validate: number => {
            if (number > 0 && number < 11) return true
            return `${number} is not a number between 1 and 10.`
          }
        },
        {
          key: 'type',
          prompt: 'What type of dice? (Valid types: d4, d6, d8, d10, d12, d20)',
          type: 'string',
          validate: type => {
            if (type.match(/^(d4|d6|d8|d10|d12|d20)$/)) return true
            return 'That is not a valid dice type. Valid types: d4, d6, d8, d10, d12 and d20.'
          }
        }
      ]
    })
  }

  run(message, args) {
    const { number, type } = args
    const sides = parseInt(type.substr(1))
    let result = ':game_die:'

    for (let i = 0; i < number; i++) {
      result += ` [**${random(1, sides)}**]`
    }

    return message.say(result)
  }
}
