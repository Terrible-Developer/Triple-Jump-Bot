const commandHandler = async (interaction: any): Promise<void> => {
    switch(interaction.commandName){
            case 'test-response':
                await interaction.reply(interaction.options.getString('your-text'));
                //console.log('test response worked');
                break;
            default:
                await interaction.reply('An error has ocurred, please try again. If the error persists, try to contact the developer about it.');
                //console.log('default');
    }
    //if(interaction.commandName === 'test-response')
    //    await interaction.reply(interaction.options.getString('your-text'));
    //else
    //    console.log(interaction.commandName);
}

export{
    commandHandler
}
