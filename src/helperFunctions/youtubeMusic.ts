import ytdl from 'ytdl-core';
import { AudioPlayerStatus, StreamType, createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior, PlayerSubscription } from '@discordjs/voice';


//channelid guildid voiceAdapterCreator(??)

const playYoutubeMusic = async (interaction: any): Promise<void> => {

    console.log('DEBUG: ', interaction.options.getString('youtube-url'));

    /*make the stream be an array of ytdl objects, or something related, and foreach stream, play through the voice, or something*/
    const stream = ytdl(interaction.options.getString('youtube-url'), { filter: 'audioonly' });

    const audioResource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

    const audioPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Stop
        }
    });

    //Handle audio stream to player here

    const connection = joinVoiceChannel({
        channelId: interaction.channel.id,
        guildId: interaction.channel.guild.id,
        adapterCreator: interaction.channel.guild.voiceAdapterCreator
    });

    const subscription = connection.subscribe(audioPlayer);

    audioPlayer.play(audioResource);
    connection.subscribe(audioPlayer);

    audioPlayer.on(AudioPlayerStatus.Idle, () => connection.destroy());

    //audioPlayer.stop();
    // connection.destroy();
}



export{
    playYoutubeMusic
}
