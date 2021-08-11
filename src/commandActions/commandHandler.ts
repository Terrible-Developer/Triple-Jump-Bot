const commandHandler = async (interaction: any): Promise<void> => {
    if(interaction.commandName === 'test-response')
        await interaction.reply(interaction.options.getString('your-text'));
    else
        console.log(interaction.commandName);
}

export{
    commandHandler
}
