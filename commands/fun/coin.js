'use strict'

const { Command } = require('discord.js-commando')
const random = require('random-item')

module.exports = class CoinCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'coin',
      aliases: ['flip', 'coinflip'],
      group: 'fun',
      memberName: 'coin',
      description: 'Flip a coin.',
      examples: ['coin', 'flip', 'coinflip']
    })
  }

  run(message) {
    return message.say(random(['Heads', 'Tails']))
  }
}
