import { AudioPlayer,
         DiscordGatewayAdapterCreator,
         PlayerSubscription,
         VoiceConnection,
         VoiceConnectionReadyState,
         VoiceConnectionState,
         VoiceConnectionStatus } from "@discordjs/voice";


class ConnectionHandler {
    private voiceConnection: VoiceConnection | undefined;

    public initConnection(channelId: string, guildId: string, adapterCreator: DiscordGatewayAdapterCreator): void;

    public addStateBehavior(event: VoiceConnectionStatus | 'stateChange', callback: (oldState?: VoiceConnectionState, newState?: VoiceConnectionReadyState ) => void): void;

    public subscribe(player: AudioPlayer): PlayerSubscription | undefined;

    public getConnection(guildId: string): VoiceConnection;

    public destroyConnection(guildId: string): void;
}
