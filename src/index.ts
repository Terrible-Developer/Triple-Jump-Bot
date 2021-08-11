import { Client, Intents } from 'discord.js';
import { messageHandler } from './messageActions/messageHandler';
import { commandHandler } from './commandActions/commandHandler';
import { createCustomCommands } from './commandActions/createCommands';
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });

require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged as ${client!.user!.tag}`);
    createCustomCommands(client);
});

client.on('shardError', error => {
    console.log('error: ', error);
});

client.on('interactionCreate', async interaction => {
    if(interaction.isCommand())
        commandHandler(interaction);
});

client.on('messageCreate', async msg => {
    if(msg.author.bot || msg.channel.type === 'DM')
        return;
    messageHandler(msg);
});

client.login(process.env.TOKEN_BETA);
