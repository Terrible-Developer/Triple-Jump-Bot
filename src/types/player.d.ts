import { AudioPlayerStatus,
         StreamType,
         createAudioPlayer,
         createAudioResource,
         joinVoiceChannel,
         VoiceConnection,
         NoSubscriberBehavior,
         entersState,
         PlayerSubscription,
         AudioPlayer,
    AudioResource,
    AudioPlayerError} from '@discordjs/voice';

class Player {

    constructor(): Player {}

    private audioPlayer: AudioPlayer;
    private queue: string[] = [];


    public initPlayer(behaviors: object  = {}): void;

    public addStateBehavior(state: string, callback: (error: AudioPlayerError) => void): void;

    public addSongToQueue(url: string): void;

    private createAudioResource(url): AudioResource;

    public playNextSong(): void;

    public clearQueue(): void;

    public stop(): void

    public skipSong(): void;

    public getState(): string;

    public getAudioPlayer(): AudioPlayer;

    public getQueueLength(): number;
}
