import { Client, Intents } from 'discord.js';
import { sayHello } from './messageActions/test';
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });

require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged as ${client!.user!.tag}`);
});

client.on('shardError', error => {
    console.log('error: ', error);
})

client.on('messageCreate', msg => {
    //msg.channel.send("pls respond");
    sayHello(msg);
});

client.login(process.env.TOKEN);
