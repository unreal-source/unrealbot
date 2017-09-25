'use strict'

const cli = require('commander')
const { CommandoClient } = require('discord.js-commando')
const log = require('lloogg')
const fs = require('fs')
const path = require('path')

// Check arguments for token and owner ID
cli
  .version(require('./package.json').version)
  .option('-t, --token <token>', 'Add bot token')
  .option('-o, --owner <id>', 'Add owner ID')
  .parse(process.argv)

// If no CLI arguments are provided, check for environment variables
const token = cli.token ? cli.token : process.env.BOT_TOKEN
const owner = cli.owner ? cli.owner : process.env.OWNER_ID

// Stop if token & owner ID are not provided
if (!token || !owner) {
  log.error('Bot token and owner ID are required')
  process.exit(1)
}

// Set up the client
const client = new CommandoClient({
  commandPrefix: '!',
  owner: owner,
  disableEveryone: true,
  unknownCommandResponse: false
})

// Register commands
client.registry
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerGroups([
    ['fun', 'Fun Commands'],
    ['admin', 'Admin Commands'],
    ['jobs', 'Job Board Commands']
  ])
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.login(token)

client.on('ready', () => {
  log.info('Logged in!')
  client.user.setGame('Discord')
})

// Announce when new members join the guild
client.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', 'general')

  console.log(channel)

  channel.sendMessage(`Please welcome ${member} to the community! :beers:`)
})

// NOTE: Temporarily restore old job post detection until the new features are done
client.on('message', message => {
  if (message.channel.name === 'jobs') {
    const prefix = /^\[(paid|unpaid|royalty|contract)\]$/i

    if (message.content.split(' ')[0].match(prefix)) {
      message.pin()
    }
  } else {
    return
  }
})
