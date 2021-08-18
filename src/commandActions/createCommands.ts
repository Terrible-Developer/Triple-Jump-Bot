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
    /*test-response command. Self-explanatory, it's a command to test if the bot is working correctly, and it just replies whatever text the user sent.*/
    await createSlashCommand(client, 'test-response', 'Basic test', [
        {
            name: 'your-text',
            type: 'STRING',
            description: 'The text to be repeated',
            required: true
        }
    ]);

    /*play command. Calls for the bot to play music from a given url, for now just youtube (still not working, already losing my mind)*/
    await createSlashCommand(client, 'play', 'Play the given youtube link', [
        {
            name: 'youtube-url',
            type: 'STRING',
            description: 'The URL for the video to be played',
            required: true
        }
    ]);

    /*FGO subset of commands*/
    await createSlashCommand(client, 'fgo', 'FGO Commands', [
        {
            name: 'rolls',
            type: 'SUB_COMMAND_GROUP',
            description: 'Commands related to gacha rolls',
            options: [
                {
                    name: 'single-roll',
                    type: 'SUB_COMMAND',
                    description: 'Perform a single gacha roll'
                },
                {
                    name: 'multi-roll',
                    type: 'SUB_COMMAND',
                    description: 'Perform a multi gacha roll'
                }
            ]
        }
    ]);
}

export{
    createCustomCommands
}
