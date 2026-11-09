export type FloodSoundMood = 'flash-flood' | 'storm-surge' | 'aerial-inundation' | 'barrier-defense';
export type CameraAnimation = 'pan-left' | 'pan-right' | 'zoom-in' | 'zoom-out';
export type Language = 'ar' | 'fr';

export interface SubtitleCue {
  id: string;
  start: number;
  end: number;
  textAr: string;
  textFr: string;
}

export interface FloodScene {
  id: string;
  order: number;
  titleAr: string;
  titleFr: string;
  subtitleAr: string;
  subtitleFr: string;
  timestampDisplay: string;
  duration: number;
  image: string;
  animation: CameraAnimation;
  soundMood: FloodSoundMood;
  narrationAr: string;
  narrationFr: string;
  subtitles: SubtitleCue[];
  scientificFactAr: string;
  scientificFactFr: string;
  waterSpeedKmh: number;
  threatLevel: 'medium' | 'high' | 'catastrophic';
}

export interface HistoricalFlood {
  id: string;
  nameAr: string;
  nameFr: string;
  year: string;
  locationAr: string;
  locationFr: string;
  deathTollAr: string;
  deathTollFr: string;
  causeAr: string;
  causeFr: string;
  summaryAr: string;
  summaryFr: string;
  economicDamageAr: string;
  economicDamageFr: string;
  keyLessonAr: string;
  keyLessonFr: string;
}

export interface FloodTypeInfo {
  id: string;
  nameAr: string;
  nameFr: string;
  speedAr: string;
  speedFr: string;
  warningTimeAr: string;
  warningTimeFr: string;
  causeAr: string;
  causeFr: string;
  descriptionAr: string;
  descriptionFr: string;
  lethalityAr: string;
  lethalityFr: string;
}

export interface WaterDepthLevel {
  depthMeters: number;
  depthDisplay: string;
  titleAr: string;
  titleFr: string;
  impactAr: string;
  impactFr: string;
  dangerLevel: 'caution' | 'danger' | 'extreme';
  actionAr: string;
  actionFr: string;
  sweepsVehicles: boolean;
  sweepsAdults: boolean;
  structureBreach: boolean;
}
