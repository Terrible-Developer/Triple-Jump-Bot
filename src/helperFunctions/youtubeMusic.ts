import ytdl from 'ytdl-core';
import { AudioPlayerStatus,
         StreamType,
         createAudioPlayer,
         createAudioResource,
         joinVoiceChannel,
         VoiceConnection,
         NoSubscriberBehavior,
         entersState,
         PlayerSubscription,
         AudioResource,
         AudioPlayerError,
         AudioPlayer} from '@discordjs/voice';
/*debug*/
import { VoiceConnectionStatus } from '@discordjs/voice';
import { Interaction } from 'discord.js';
import Player from '../utils/player';

/*const addSong = (interaction: any): Promise<void> => {
    let songs: string[];

    const guild = interaction.client.guilds.cache.get(interaction.guildId!);
    const member = guild?.members.cache.get(interaction.member?.user.id!);
    const voiceChannel = member?.voice.channel;

    if(!voiceChannel){
        interaction.reply('You must be in a voice channel to perform this action!');
        interaction.channel?.send()
    }
}*/

let player: Player = new Player();
player.initPlayer();
//let songQueue: string[] = [];

const playYoutubeMusic = async (interaction: any): Promise<void> => {

    //the current interaction channel id is the text channel, need to find a way to get the voice channel id
    /*make the stream be an array of ytdl objects, or something related, and foreach stream, play through the voice, or something*/

    player.addSongToQueue(interaction.options.getString('youtube-url'));
    //songQueue.push(interaction.options.getString('youtube-url'));

    let channelId: string = '';
    //let player: Player = new Player();



    interaction.channel.guild.channels.cache.forEach((channel: any) => {
        if(channel.type === 'GUILD_VOICE'){
            channel.members.forEach((member: any) => {
                if(member.id === interaction.user.id){
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


    //const stream = ytdl(interaction.options.getString('youtube-url'), { filter: 'audioonly' });
    //const audioResource: AudioResource<null> = createAudioResource(stream, { inputType: StreamType.Arbitrary });

    /*const audioPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Stop
        }
    });*/


    //Handle audio stream to player here

    const connection = joinVoiceChannel({
        channelId: channelId,
        guildId: interaction.channel.guild.id,
        adapterCreator: interaction.channel.guild.voiceAdapterCreator,
    });

    //audioPlayer.play(audioResource);

    connection.on('stateChange', (oldState, newState) => {
        console.log(`Connection changed from ${oldState.status} to ${newState.status}`);
        /*if(player.getQueueLength() > 0 &&
            player.getState().status === AudioPlayerStatus.Idle &&
            newState.status === 'ready'
            ){
            player.playNextSong();
        }*/
        /*if(newState.status === 'ready'){
            if(songQueue.length > 0 && audioPlayer){
                const stream = ytdl(songQueue[0], { filter: 'audioonly' });
                const audioResource: AudioResource<null> = createAudioResource(stream, { inputType: StreamType.Arbitrary });
                audioPlayer.play(audioResource)
                songQueue.shift();
            }
        }*/
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
        if(player.getQueueLength() > 0 && player.getState().status === AudioPlayerStatus.Idle){
            player.playNextSong();
        }
    });

    /*audioPlayer.on('error', (error: any) => {
        console.log(`Player error: ${error.message}`);
        interaction.channel.send('There has been an error playing the requested video. Make sure that the given URL is valid.')
        return ;
    });*/

    player.addStateBehavior('error', (error: AudioPlayerError) => {
        console.log(`Player error: ${error.message}`);
        interaction.channel.send('There has been an error playing the requested video. Make sure that the given URL is valid.')
        return ;
    });

    /*audioPlayer.on(AudioPlayerStatus.Idle, () => {
        if(songQueue.length > 0){
            const stream = ytdl(songQueue[0], { filter: 'audioonly' });
            const audioResource: AudioResource<null> = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            audioPlayer.play(audioResource)
            songQueue.shift();
        }
        else{
            console.log('Stopped playing');
            audioPlayer.stop();
            interaction.channel.send('The music queue has endend. Please donate money so my creator can keep supporting his crippling crack addiction UwU')
            connection.destroy();
        }
    });*/

    player.addStateBehavior(AudioPlayerStatus.Idle, () => {
        if(player.getQueueLength() < 1){
            console.log('Stopped playing');
            player.stop();
            interaction.channel.send('The music queue has endend. Please donate money so my creator can keep supporting his crippling crack addiction UwU')
            connection.destroy();
        }
    });


    const subscription = connection.subscribe(player.getAudioPlayer());


    player.addStateBehavior(AudioPlayerStatus.Playing, () => {
        console.log('Started Playing');
        interaction.channel
            .send('Now Playing a song (if you want me to also send the song name, donate some money, otherwise, it will take a while before it\'s implemented )');
    });


}



export{
    playYoutubeMusic
}
