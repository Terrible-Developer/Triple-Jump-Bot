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
         AudioPlayerError,
         AudioResource} from '@discordjs/voice';
import ytdl from 'ytdl-core';

class Player {

    constructor() {}

    private audioPlayer: AudioPlayer = new AudioPlayer();
    private queue: string[] = [];


    public initPlayer(behaviors: object  = {}): void {
        this.audioPlayer = createAudioPlayer({
            behaviors: behaviors
        });
    }

    public addStateBehavior(state: AudioPlayerStatus | "error", callback: (error: AudioPlayerError) => void): void {
        this.audioPlayer.on(state, callback);
    }

    public addSongToQueue(url: string): void {
        this.queue.push(url);
    }

    private createAudioResource(url: string): AudioResource {
        const stream = ytdl(url, { filter: 'audioonly' });
        return createAudioResource(stream, { inputType: StreamType.Arbitrary });
    }

    public playNextSong(): void {
        if(this.queue.length < 1){
            return;
        }
        const audioResource = this.createAudioResource(this.queue.shift()!);
        this.audioPlayer.play(audioResource);
    }

    public clearQueue(): void {
        this.queue = [];
    }

    public stop(): void {
        this.audioPlayer.stop();
    }

    public skipSong(): void {
        this.audioPlayer.pause();
        this.playNextSong();
    }

    public getState(){
        return this.audioPlayer.state;
    }

    public getAudioPlayer(): AudioPlayer {
        return this.audioPlayer;
    }

    public getQueueLength(): number {
        return this.queue.length;
    }
}

export default Player;
