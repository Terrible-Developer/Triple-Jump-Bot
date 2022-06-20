import { playYoutubeMusic } from '../helperFunctions/youtubeMusic';
import { rollSingleGacha, roll10Gacha } from '../helperFunctions/fgo';
import { MessageAttachment } from 'discord.js';
import fs from 'fs';

const commandHandler = async (interaction: any): Promise<void> => {
    switch(interaction.commandName){
            case 'test-response':
                await interaction.reply(interaction.options.getString('your-text'));
                break;

            case 'play':
                await playYoutubeMusic(interaction);
                break;

            case 'fgo':
                if(interaction.options._subcommand === 'single-roll')
                    await interaction.reply(await rollSingleGacha());
                else
                    await interaction.reply(await roll10Gacha());
                break;

            default:
                await interaction.reply('An error has ocurred, please try again. If the error persists, please contact the developer about it.');
                //console.log('default');
    }
}

export{
    commandHandler
}
