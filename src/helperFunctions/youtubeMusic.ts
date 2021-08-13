import ytdl from 'ytdl-core';
//import path from 'path';
import { AudioPlayerStatus, StreamType, createAudioPlayer, createAudioResource, joinVoiceChannel, VoiceConnection, NoSubscriberBehavior, PlayerSubscription } from '@discordjs/voice';
/*debug*/
import { VoiceConnectionStatus } from '@discordjs/voice';

//channelid guildid voiceAdapterCreator(??)

const playYoutubeMusic = async (interaction: any): Promise<void> => {

    //the current interaction channel id is the text channel, need to find a way to get the voice channel id
    /*make the stream be an array of ytdl objects, or something related, and foreach stream, play through the voice, or something*/

    let channelId: string = '';


    interaction.channel.guild.channels.cache.forEach((channel: any) => {
        if(channel.type === 'GUILD_VOICE'){
            channel.members.forEach((member: any) => {
                if(member.id === interaction.user.id){
                    channelId = channel.id;
                }
            });
        }
    });


    const stream = ytdl(interaction.options.getString('youtube-url'), { filter: 'audioonly' });
    //const stream = createAudioResource('/home/victor/Music/persona_5/Persona 5 Royal - Our Light_僕らの光 - Ending song-41UPk-OeYQU.wav');
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
        adapterCreator: interaction.channel.guild.voiceAdapterCreator
    });


    audioPlayer.play(audioResource);
    const subscription = connection.subscribe(audioPlayer);
    //console.log(connection.state);


    if(subscription){
        //console.log('SUBSCRIPTIONS: ', subscription?.connection.receiver.subscriptions);
        console.log('technically exists');
    }

    //console.log(subscription?.connection);
    //console.log('STATE: ', subscription?.connection);

    console.log('PLAYABLE: ', audioPlayer.playable);
    console.log('STATE: ', audioPlayer.state);

    connection.on(VoiceConnectionStatus.Signalling, () => {
        console.log('SIGNALLING');
    })

    connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('THE CONNECTION IS READY');
    })

    connection.on(VoiceConnectionStatus.Destroyed, () => {
        console.log('Now destroyed!');
    });

    audioPlayer.on('error', (error: any) => {
        console.log(`player error: ${error.message} || resource: ${error.resource.metadata.title}`);
    });

    audioPlayer.on(AudioPlayerStatus.Playing, () => {
        console.log('Started Playing');
        //console.log(subscription?.connection);
    });

    //audioPlayer.on(AudioPlayerStatus.Idle, () => connection.destroy());
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
