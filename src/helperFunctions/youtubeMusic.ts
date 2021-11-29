import ytdl from 'ytdl-core';
//import path from 'path';
import { AudioPlayerStatus,
         StreamType,
         createAudioPlayer,
         createAudioResource,
         joinVoiceChannel,
         VoiceConnection,
         NoSubscriberBehavior,
         entersState,
         PlayerSubscription } from '@discordjs/voice';
/*debug*/
import { VoiceConnectionStatus } from '@discordjs/voice';

/*NOT WORKING, NEEDS FIX*/


const playYoutubeMusic = async (interaction: any): Promise<void> => {

    //the current interaction channel id is the text channel, need to find a way to get the voice channel id
    /*make the stream be an array of ytdl objects, or something related, and foreach stream, play through the voice, or something*/

    let channelId: string = '';


    interaction.channel.guild.channels.cache.forEach((channel: any) => {
        if(channel.type === 'GUILD_VOICE'){
            channel.members.forEach((member: any) => {
                if(member.id === interaction.user.id){
                    //console.log(channel.id)
                    channelId = channel.id;
                }
            });
        }
    });

    if(!channelId){
        console.log(channelId);
        interaction.reply('You must be in a voice channel to perform this action!');
        return ;
    }


    const stream = ytdl(interaction.options.getString('youtube-url'), { filter: 'audioonly' });
    const audioResource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    //const audioResource = createAudioResource(path.join(__dirname, '../../assets/Persona 5 Royal OST - Gentle Madman.wav'));

    const audioPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Stop
        }
    });


    //Handle audio stream to player here

    const connection = joinVoiceChannel({
        channelId: channelId,
        guildId: interaction.channel.guild.id,
        adapterCreator: interaction.channel.guild.voiceAdapterCreator,
    });

    //console.log(connection.state);

    //try {
    //    await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
    //}
    //catch (error) {
    //    console.log(error);
    //    console.log('did not work');
    //    connection.destroy();
    //}


    audioPlayer.play(audioResource);
    //console.log(connection.state);

    audioPlayer.on('error', (error: any) => {
        console.log(`Player error: ${error.message}`); //|| resource: ${error.resource.metadata.title}`);
        interaction.reply('There has been an error playing the requested video. Make sure that the given URL is valid.');
        return ;
    });

    const subscription = connection.subscribe(audioPlayer);

    connection.on('stateChange', (oldState, newState) => {
        console.log(`Connection changed from ${oldState} to ${newState}`);
    });


    audioPlayer.on(AudioPlayerStatus.Playing, () => {
        console.log('Started Playing');
        //console.log(subscription?.connection);
    });

    audioPlayer.on(AudioPlayerStatus.Idle, () => {
        console.log('Stopped playing');
        audioPlayer.stop();
        connection.destroy();
    });

    interaction.reply('Now playing music');
}



export{
    playYoutubeMusic
}
