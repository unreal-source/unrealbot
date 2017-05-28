'use strict'

// Import dependencies
const Discord = require('discord.js')
const cli = require('commander')
const log = require('lloogg')
const glob = require('glob')
const fs = require('fs')

// Check arguments for token and owner ID
cli
  .version(require('./package.json').version)
  .option('-t, --token <token>', 'Add bot token')
  .option('-o, --owner <id>', 'Add owner ID')
  .parse(process.argv)

// Do not proceed without a token
if (!cli.token) {
  log.error('Bot token required. Run:', 'node bot.js -t bot_token_here')
  process.exit(1)
}

// Load bot config
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

// Create a Discord client instance
const client = new Discord.Client()

// Listen for messages
client.on('message', message => {
  // Do not proceed if this bot sent the message
  if (message.author.bot) return

  // Do not proceed without command prefix
  if (!message.content.startsWith(config.prefix)) return

  // Parse command
  let command = message.content.split(' ')[0].slice(config.prefix.length)

  // Parse arguments
  let args = message.content.split(' ').slice(1)

  // Find command
  glob(`commands/**/${command}.js`, (err, files) => {
    // Handle errors
    if (err) return log.error(err)

    // Load command
    let command = require(`./${files[0]}`)

    // Run command
    command.run(client, message, args)
  })
})

// Log when the bot is ready to receive information from Discord
client.on('ready', () => {
  log.success('Bot is ready!')
})

// Log in to Discord
client.login(cli.token)
