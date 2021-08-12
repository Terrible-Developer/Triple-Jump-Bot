import { Client } from 'discord.js';

const createSlashCommand = async (client: Client, commandName: string, commandDescription: string, commandOptions: any): Promise<void> => {
    const data = {
        name: commandName,
        description: commandDescription,
        options: commandOptions
    };

    // /*const command*/ await client.application.commands.create(data); //Creates command in all channels where bot is present
    /*const command*/ await client?.guilds?.cache?.get('874815252322193458')?.commands.create(data); //Creates command in specified channel
}

const createCustomCommands = async (client: Client): Promise<void> => {
    await createSlashCommand(client, 'test-response', 'Basic test', [
        {
            name: 'your-text',
            type: 'STRING',
            description: 'The text to be repeated',
            required: true
        }
    ]);

    await createSlashCommand(client, 'play', 'Play the given youtube link', [
        {
            name: 'youtube-url',
            type: 'STRING',
            description: 'The URL for the video to be played',
            required: true
        }
    ]);
}

export{
    createCustomCommands
}
