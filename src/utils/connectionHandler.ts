import { DiscordGatewayAdapterCreator, getVoiceConnection, joinVoiceChannel, VoiceConnection, VoiceConnectionStatus, VoiceConnectionState, VoiceConnectionReadyState, AudioPlayer, PlayerSubscription } from "@discordjs/voice";


class ConnectionHandler {

    private voiceConnection: VoiceConnection | undefined;

    public initConnection = (channelId: string, guildId: string, adapterCreator: DiscordGatewayAdapterCreator): void => {
        if(this.voiceConnection === undefined){
            this.voiceConnection = joinVoiceChannel({
                channelId: channelId,
                guildId: guildId,
                adapterCreator: adapterCreator,
            });
        }
    }

    public addStateBehavior = (event: VoiceConnectionStatus | 'stateChange', callback: (oldState?: VoiceConnectionState, newState?: VoiceConnectionReadyState ) => void): void => {
        this.voiceConnection!.on(event, callback);
    }

    public subscribe = (player: AudioPlayer): PlayerSubscription | undefined => {
        return this.voiceConnection!.subscribe(player);
    }

    public getConnection = (guildId: string): VoiceConnection => {
        return getVoiceConnection(guildId)!;
    }

    public destroyConnection = (guildId: string): void => {
        getVoiceConnection(guildId)!.destroy();
        this.voiceConnection = undefined;
    }
}

export default ConnectionHandler;
