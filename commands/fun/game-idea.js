'use strict'

const { Command } = require('discord.js-commando')
const random = require('unique-random-array')
const game = require('../../data/game-ingredients')

module.exports = class GameIdeaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'gameidea',
      group: 'fun',
      memberName: 'gameidea',
      description: 'Generate a random, unique game idea.',
      examples: ['gameidea']
    })
  }

  run(message) {
    const genre = random(game.genre)()
    const verb = random(game.verb)()
    const thing = random(game.thing)()
    const transit = random(game.transit)()
    const goal = random(game.goal)()
    const setting = random(game.setting)()
    const diversifier = random(game.diversifier)()

    // Arrange the game idea differently for racing games
    const arrangement = {
      base: [
        `${genre} where you ${verb} ${thing} ${goal}.`,
        `${genre} where you ${verb} ${thing} ${goal} ${diversifier}.`,
        `${genre} where you ${verb} ${thing} ${goal} ${setting}.`,
        `${genre} where you ${verb} ${thing} ${goal} ${setting} ${diversifier}.`,
        `${genre} where you ${verb} ${thing} ${setting}.`,
        `${genre} where you ${verb} ${thing} ${setting} ${diversifier}.`
      ],
      racing: [
        `${genre} where you ${transit} ${goal}.`,
        `${genre} where you ${transit} ${goal} ${diversifier}.`,
        `${genre} where you ${transit} ${setting}.`,
        `${genre} where you ${transit} ${setting} ${diversifier}.`
      ]
    }

    let idea

    if (genre === 'A racing game') {
      idea = random(arrangement.racing)()
    } else {
      idea = random(arrangement.base)()
    }

    return message.say(idea)
  }
}
