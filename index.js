import fs from 'fs';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { prefix } from './config.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// get command files
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// parse command files into the client commands
commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
})

// bot is loaded and ready
client.once('ready', () => {
    console.log("Crit Apparel Bot online")
})

// code to run on message
client.on('message', message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

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