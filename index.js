const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { prefix } = require('./config.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// get command files
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.cjs'));

// parse command files into the client commands
commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    // const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
})

// bot is loaded and ready
client.once('ready', () => {
    console.log("Crit Apparel Bot online")
})

// code to run on message
client.on('messageCreate', message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    console.log("commandName", commandName);
    console.log("commands", JSON.stringify(client.commands))
    if (!client.commands.has(commandName)) return;

    if (message.channel.name === undefined) {
        message.reply("Your commands must be within the server, not through DMs.");
        return;
    }

    try {
        command.execute(message, args);
    }
    catch (e) {
        console.error(e);
        message.reply("There was an error executing that command. Please try again or alert the admin team.");
    }
})

client.login(process.env.BOT_TOKEN);