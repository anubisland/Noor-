import { Audio, AVPlaybackStatus } from 'expo-av';
import { AUDIO_BASE_URL } from '../constants/config';

type StatusCallback = (status: { isPlaying: boolean; didJustFinish: boolean }) => void;

class AudioService {
  private sound: Audio.Sound | null = null;
  private currentGlobalId: number = 0;
  private statusCallback?: StatusCallback;
  private initialized = false;

  async init() {
    if (this.initialized) return;
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
    this.initialized = true;
  }

  setStatusCallback(callback: StatusCallback) {
    this.statusCallback = callback;
  }

  private handleStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      this.statusCallback?.({
        isPlaying: status.isPlaying,
        didJustFinish: (status as any).didJustFinish ?? false,
      });
    }
  };

  async playAyah(globalAyahId: number): Promise<void> {
    await this.init();
    await this.stop();

    const url = `${AUDIO_BASE_URL}${globalAyahId}.mp3`;

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true },
        this.handleStatus
      );

      this.sound = sound;
      this.currentGlobalId = globalAyahId;
    } catch (e) {
      console.error('Error playing audio:', e);
      this.statusCallback?.({ isPlaying: false, didJustFinish: false });
    }
  }

  async pause(): Promise<void> {
    if (this.sound) {
      await this.sound.pauseAsync();
    }
  }

  async resume(): Promise<void> {
    if (this.sound) {
      await this.sound.playAsync();
    }
  }

  async stop(): Promise<void> {
    if (this.sound) {
      try {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
      } catch (e) {
        // ignore cleanup errors
      }
      this.sound = null;
      this.currentGlobalId = 0;
    }
  }

  isLoaded(): boolean {
    return this.sound !== null;
  }

  getCurrentId(): number {
    return this.currentGlobalId;
  }
}

export const audioService = new AudioService();
