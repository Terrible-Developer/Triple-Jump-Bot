import { AudioPlayerStatus,
         AudioPlayerError,
         PlayerSubscription
    } from '@discordjs/voice';
import { VoiceConnectionStatus } from '@discordjs/voice';
import { Interaction } from 'discord.js';
import Player from '../utils/player';
import ConnectionHandler from '../utils/connectionHandler';

let player: Player = new Player();
let connectionHandler: ConnectionHandler = new ConnectionHandler();
player.initPlayer();

const playYoutubeMusic = async (interaction: any): Promise<void> => {

    player.addSongToQueue(interaction.options.getString('youtube-url'));

    let channelId: string = '';
    let guildId = interaction.channel.guild.id;


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

    if(connectionHandler.getConnection(guildId) === undefined){
        connectionHandler.initConnection(channelId, guildId, interaction.channel.guild.voiceAdapterCreator);
    }

    connectionHandler.addStateBehavior('stateChange', (oldState, newState) => {
        console.log(`Connection changed from ${oldState!.status} to ${newState!.status}`);
    })

    connectionHandler.addStateBehavior(VoiceConnectionStatus.Ready, () => {
        if(player.getQueueLength() > 0 && player.getState().status === AudioPlayerStatus.Idle){
            let songInfo: unknown = player.playNextSong();
            console.log(songInfo);
        }
    })

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
            connectionHandler.destroyConnection(guildId);
        }
    });


    const subscription: PlayerSubscription | undefined = connectionHandler.subscribe(player.getAudioPlayer());


    player.addStateBehavior(AudioPlayerStatus.Playing, () => {
        console.log('Started Playing');
        interaction.channel
            .send('Now Playing a song');
    });

}

export{
    playYoutubeMusic
}
