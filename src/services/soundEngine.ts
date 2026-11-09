// Web Audio API procedural sound engine for cinematic documentary montage
import { SoundMood } from '../types/montage';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  // Active oscillators / noise nodes
  private activeMusicNodes: AudioNode[] = [];
  private activeWindNode: AudioNode | null = null;
  private activeRumbleNode: AudioNode | null = null;

  constructor() {
    // AudioContext will be initialized on user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
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
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.7, now, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Trigger cinematic mood sound design
  public setSceneMood(mood: SoundMood) {
    this.initContext();
    if (!this.ctx || !this.musicGain || !this.sfxGain) return;

    this.stopActiveAmbiance();

    const now = this.ctx.currentTime;

    switch (mood) {
      case 'calm-port':
        // Soft sea wind and tranquil chord (D minor airy texture)
        this.startWind(0.12, 450);
        this.playChord([146.83, 220.00, 261.63, 329.63], 0.25); // D3, A3, C4, E4
        break;

      case 'warning-rumble':
        // Deep subterranean tension with low frequency pulses
        this.startRumble(0.4, 45);
        this.startWind(0.2, 350);
        this.playChord([110.00, 164.81, 196.00, 293.66], 0.35); // A2, E3, G3, D4 (dark suspense)
        break;

      case 'cataclysm-explosion':
        // Massive volcanic eruption blast + violent ash roar
        this.playExplosionDetonation();
        this.startRumble(0.7, 55);
        this.startWind(0.45, 800);
        this.playChord([73.42, 110.00, 146.83, 174.61], 0.45); // Deep D2 power chord
        break;

      case 'eerie-silence':
        // Haunting, desolate wind and mournful solitary drone
        this.startWind(0.18, 220);
        this.startRumble(0.15, 35);
        this.playChord([98.00, 146.83, 196.00, 233.08], 0.3); // G2 sorrow chord
        break;
    }
  }

  private stopActiveAmbiance() {
    this.activeMusicNodes.forEach(node => {
      try {
        if ('stop' in node) (node as AudioScheduledSourceNode).stop();
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeMusicNodes = [];

    if (this.activeWindNode) {
      try {
        if ('stop' in this.activeWindNode) (this.activeWindNode as AudioScheduledSourceNode).stop();
        this.activeWindNode.disconnect();
      } catch {
        // ignore
      }
      this.activeWindNode = null;
    }

    if (this.activeRumbleNode) {
      try {
        if ('stop' in this.activeRumbleNode) (this.activeRumbleNode as AudioScheduledSourceNode).stop();
        this.activeRumbleNode.disconnect();
      } catch {
        // ignore
      }
      this.activeRumbleNode = null;
    }
  }

  public playExplosionDetonation() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    // 1. Heavy low impact oscillator (pitch drop from 180Hz to 25Hz)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 1.8);

    oscGain.gain.setValueAtTime(1.0, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 3.6);

    // 2. White/Brown noise burst for the searing blast shockwave
    const bufferSize = this.ctx.sampleRate * 2.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 2.5);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 2.9);
  }

  private startRumble(intensity: number, cutoffHz: number) {
    if (!this.ctx || !this.sfxGain) return;

    // Two detuned low oscillators creating sub-bass beating
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(38, this.ctx.currentTime);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(39.5, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoffHz, this.ctx.currentTime);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(intensity, this.ctx.currentTime + 1.5);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start();
    osc2.start();

    this.activeRumbleNode = gain;
  }

  private startWind(intensity: number, centerHz: number) {
    if (!this.ctx || !this.sfxGain) return;

    // Filtered noise with slow LFO modulation
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(centerHz, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    // LFO to make wind breathe
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(centerHz * 0.4, this.ctx.currentTime);
    lfo.connect(filter.frequency);
    lfo.start();

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(intensity, this.ctx.currentTime + 1.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start();
    this.activeWindNode = gain;
  }

  private playChord(frequencies: number[], volume: number) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;

    const masterChordGain = this.ctx.createGain();
    masterChordGain.gain.setValueAtTime(0, now);
    masterChordGain.gain.linearRampToValueAtTime(volume, now + 1.8);
    masterChordGain.connect(this.musicGain);

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // subtle detune for warm analog feel
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      oscGain.gain.setValueAtTime(0.25, now);
      osc.connect(oscGain);
      oscGain.connect(masterChordGain);

      osc.start(now);
      this.activeMusicNodes.push(osc);
    });

    this.activeMusicNodes.push(masterChordGain);
  }

  public stopAll() {
    this.stopActiveAmbiance();
  }
}

export const soundEngine = new SoundEngine();
