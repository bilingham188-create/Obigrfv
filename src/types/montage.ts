export interface SubtitleCue {
  id: string;
  start: number; // in seconds relative to scene
  end: number;
  text: string;
}

export type AnimationType = 'pan-left' | 'pan-right' | 'zoom-in' | 'zoom-out';
export type ShakeIntensity = 'none' | 'light' | 'intense';
export type SoundMood = 'calm-port' | 'warning-rumble' | 'cataclysm-explosion' | 'eerie-silence';

export interface Scene {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  timestampDisplay: string;
  duration: number; // default seconds (e.g. 10s)
  image: string;
  animation: AnimationType;
  shakeIntensity: ShakeIntensity;
  soundMood: SoundMood;
  narrationFr: string;
  subtitles: SubtitleCue[];
  historicalFact: string;
  eyewitnessQuote?: {
    author: string;
    text: string;
    role: string;
  };
}

export interface DisasterProfile {
  id: string;
  title: string;
  frenchTitle: string;
  date: string;
  location: string;
  type: string;
  deathToll: string;
  vei: string; // Volcanic Explosivity Index
  summaryFr: string;
  scenes: Scene[];
}
