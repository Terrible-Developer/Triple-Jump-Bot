import { Client, Interaction, Message } from 'discord.js';
import { generateDependencyReport } from '@discordjs/voice';
import { messageHandler } from './messageActions/messageHandler';
import { commandHandler } from './commandActions/commandHandler';
import { createCustomCommands } from './commandActions/createCommands';

// @ts-ignore
//const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.GUILD_VOICE_STATES ] });
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });

require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged as ${client!.user!.tag}`);
    createCustomCommands(client);
    console.log(generateDependencyReport());
});

client.on('shardError', error => {
    console.log('error: ', error);
});

client.on('interactionCreate',  async (interaction: Interaction): Promise<void> => {
    if(interaction.isCommand())
        commandHandler(interaction);
});

client.on('messageCreate', async (msg: Message): Promise<void> => {
    if(msg.author.bot || msg.channel.type === 'DM')
        return;
    messageHandler(msg);
});

client.login(process.env.TOKEN_BETA);
