import { Client, Intents } from 'discord.js';
import { messageHandler } from './messageActions/messageHandler';
import { commandHandler } from './commandActions/commandHandler';
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });

require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged as ${client!.user!.tag}`);
});

client.on('shardError', error => {
    console.log('error: ', error);
})

client.on('messageCreate', msg => {
    messageHandler(msg);
});

client.login(process.env.TOKEN);
