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
import { VoiceConnectionStatus } from '@discordjs/voice';
import { Interaction } from 'discord.js';
import Player from '../utils/player';

let player: Player = new Player();
player.initPlayer();

const playYoutubeMusic = async (interaction: any): Promise<void> => {

    player.addSongToQueue(interaction.options.getString('youtube-url'));

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

    if(!channelId){
        console.log(channelId);
        interaction.reply('You must be in a voice channel to perform this action!');
        return ;
    }

    //Handle audio stream to player here

    const connection = joinVoiceChannel({
        channelId: channelId,
        guildId: interaction.channel.guild.id,
        adapterCreator: interaction.channel.guild.voiceAdapterCreator,
    });

    connection.on('stateChange', (oldState, newState) => {
        console.log(`Connection changed from ${oldState.status} to ${newState.status}`);
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
        if(player.getQueueLength() > 0 && player.getState().status === AudioPlayerStatus.Idle){
            player.playNextSong();
        }
    });

    player.addStateBehavior('error', (error: AudioPlayerError) => {
        console.log(`Player error: ${error.message}`);
        interaction.channel.send('There has been an error playing the requested video. Make sure that the given URL is valid.')
        return ;
    });


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
