'use strict'

const { Command } = require('discord.js-commando')
const ms = require('ms')

module.exports = class SilenceCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'silence',
      group: 'admin',
      memberName: 'silence',
      description: 'Temporarily ban a user from sending messages',
      examples: ['silence @notatroll66', 'silence @ihateu123 1h'],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want me to silence?',
          type: 'member'
        },
        {
          key: 'duration',
          prompt: 'For how long?',
          type: 'string'
          // validate: duration => {
          //   if (duration.match(/^(5|15|30)m$|^1h$/)) {
          //     return true
          //   } else {
          //     return 'Invalid duration. Please use 5m, 15m, 30m or 1h.'
          //   }
          // }
        }
      ]
    })
  }

  hasPermission(message) {
    return message.member.hasPermission('BAN_MEMBERS')
  }

  run(message, args) {
    const { member, duration } = args
    // NOTE: Switch to this one when the new onboarding goes live
    // const role = message.guild.roles.find('name', 'Member')
    //
    // if (member.roles.has(role.id)) {
    //   member.removeRole(role).catch(console.error)
    //   setTimeout(() => {
    //     member.addRole(role).catch(console.error)
    //   }, ms(duration))
    // } else {
    //   return message.say(`${member} is already silenced.`)
    // }

    if (member.hasPermission('SEND_MESSAGES')) {
      member.permissions.remove('SEND_MESSAGES')
      setTimeout(() => {
        member.permissions.add('SEND_MESSAGES')
        console.log(`${member} is no longer silenced.`)
      }, ms(duration))
    } else {
      return message.say(`${member} is already silenced.`)
    }
  }
}
