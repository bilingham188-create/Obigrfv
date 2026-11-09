// Web Speech API French Voiceover Service for Documentary Montage

export interface VoiceOption {
  name: string;
  lang: string;
  voice: SpeechSynthesisVoice;
}

class SpeechNarrator {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private frenchVoices: VoiceOption[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isSpeaking: boolean = false;
  private volume: number = 1.0;
  private rate: number = 0.95; // slightly slower cadence for documentary gravitas
  private pitch: number = 0.92; // deeper documentary timbre
  private onEndCallback: (() => void) | null = null;
  private onBoundaryCallback: ((charIndex: number) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const allVoices = this.synth.getVoices();
    this.frenchVoices = allVoices
      .filter(v => v.lang.startsWith('fr'))
      .map(v => ({ name: v.name, lang: v.lang, voice: v }));

    if (this.frenchVoices.length > 0 && !this.selectedVoice) {
      // Prefer standard fr-FR or natural/premium voices
      const preferred = this.frenchVoices.find(v => v.lang === 'fr-FR' || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('google')) 
        || this.frenchVoices[0];
      this.selectedVoice = preferred.voice;
    }
  }

  public getFrenchVoices(): VoiceOption[] {
    this.loadVoices();
    return this.frenchVoices;
  }

  public setSelectedVoice(voiceName: string) {
    const found = this.frenchVoices.find(v => v.name === voiceName);
    if (found) {
      this.selectedVoice = found.voice;
    }
  }

  public speak(
    text: string, 
    onEnd?: () => void, 
    onBoundary?: (charIndex: number) => void
  ) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    this.onEndCallback = onEnd || null;
    this.onBoundaryCallback = onBoundary || null;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.volume = this.volume;
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };

    utterance.onboundary = (event) => {
      if (this.onBoundaryCallback) {
        this.onBoundaryCallback(event.charIndex);
      }
    };

    this.currentUtterance = utterance;
    this.isSpeaking = true;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentUtterance) {
      this.currentUtterance.volume = this.volume;
    }
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.5, Math.min(1.8, rate));
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechNarrator = new SpeechNarrator();
