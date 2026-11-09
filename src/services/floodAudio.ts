import { FloodSoundMood } from '../types/flood';

class FloodAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  private activeNodes: AudioNode[] = [];
  private chopperNode: AudioNode | null = null;
  private rainNode: AudioNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setVolumes(master: number, sfx: number, music: number) {
    if (!this.ctx || !this.masterGain || !this.sfxGain || !this.musicGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : Math.max(0, Math.min(1, master)), now, 0.05);
    this.sfxGain.gain.setTargetAtTime(Math.max(0, Math.min(1, sfx)), now, 0.05);
    this.musicGain.gain.setTargetAtTime(Math.max(0, Math.min(1, music)), now, 0.05);
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.75, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setMood(mood: FloodSoundMood) {
    this.init();
    this.stopAll();

    switch (mood) {
      case 'flash-flood':
        // Heavy torrential rain + roaring rapids
        this.startRain(0.35, 1200);
        this.startRapids(0.45, 180);
        this.playChord([98.0, 146.83, 196.0, 246.94], 0.25); // G minor / suspense
        break;

      case 'storm-surge':
        // Violent ocean surge, howling wind and periodic thunder
        this.startRain(0.25, 800);
        this.startRapids(0.55, 140);
        this.playThunderclap();
        this.playChord([73.42, 110.0, 130.81, 164.81], 0.35); // Deep D minor
        break;

      case 'aerial-inundation':
        // Helicopter blades hovering over submerged vast plains
        this.startRain(0.18, 900);
        this.startChopper(0.4);
        this.playChord([110.0, 164.81, 220.0, 261.63], 0.3); // A minor melancholic
        break;

      case 'barrier-defense':
        // Hydraulic mechanical hum & rushing controlled water
        this.startRain(0.12, 600);
        this.startRapids(0.25, 240);
        this.playChord([130.81, 196.0, 261.63, 329.63], 0.3); // C major / resilience
        break;
    }
  }

  public playThunderclap() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    // Sub-bass rumble
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 1.6);

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 2.6);

    // Filtered noise crack
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 2;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 2.0);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 2.3);
  }

  private startRain(intensity: number, filterFreq: number) {
    if (!this.ctx || !this.sfxGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(filterFreq, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(intensity, this.ctx.currentTime + 1.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start();
    this.rainNode = gain;
    this.activeNodes.push(noise, filter, gain);
  }

  private startRapids(intensity: number, centerHz: number) {
    if (!this.ctx || !this.sfxGain) return;

    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (last + 0.04 * white) / 1.04;
      last = data[i];
      data[i] *= 4;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(centerHz, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(intensity, this.ctx.currentTime + 1.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start();
    this.activeNodes.push(noise, filter, gain);
  }

  private startChopper(intensity: number) {
    if (!this.ctx || !this.sfxGain) return;

    // Helicopter rotor blade rhythmic thump (~13Hz AM modulation)
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(65, this.ctx.currentTime);

    const amLfo = this.ctx.createOscillator();
    amLfo.frequency.setValueAtTime(12.5, this.ctx.currentTime); // Rotor blade rate

    const amGain = this.ctx.createGain();
    amGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    amLfo.connect(amGain.gain);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, this.ctx.currentTime);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(intensity, this.ctx.currentTime + 1.0);

    osc.connect(amGain);
    amGain.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.sfxGain);

    osc.start();
    amLfo.start();

    this.chopperNode = masterGain;
    this.activeNodes.push(osc, amLfo, amGain, filter, masterGain);
  }

  private playChord(freqs: number[], volume: number) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;

    const masterChordGain = this.ctx.createGain();
    masterChordGain.gain.setValueAtTime(0, now);
    masterChordGain.gain.linearRampToValueAtTime(volume, now + 1.5);
    masterChordGain.connect(this.musicGain);

    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      oscGain.gain.setValueAtTime(0.25, now);

      osc.connect(oscGain);
      oscGain.connect(masterChordGain);
      osc.start(now);
      this.activeNodes.push(osc, oscGain);
    });

    this.activeNodes.push(masterChordGain);
  }

  public stopAll() {
    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node) (node as AudioScheduledSourceNode).stop();
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
    this.chopperNode = null;
    this.rainNode = null;
  }
}

export const floodAudio = new FloodAudioEngine();
