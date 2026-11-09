import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Subtitles, 
  Sliders, 
  Tv, 
  Smartphone, 
  Layers,
  Mic,
  Music,
  Info
} from 'lucide-react';
import { Scene, DisasterProfile } from '../types/montage';
import { AtmosphericCanvas } from './AtmosphericCanvas';
import { soundEngine } from '../services/soundEngine';
import { speechNarrator, VoiceOption } from '../services/speechNarrator';

interface CinematicPlayerProps {
  disaster: DisasterProfile;
  activeSceneIndex: number;
  setActiveSceneIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const CinematicPlayer: React.FC<CinematicPlayerProps> = ({
  disaster,
  activeSceneIndex,
  setActiveSceneIndex,
  isPlaying,
  setIsPlaying,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '4:3'>('16:9');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [subtitleSize, setSubtitleSize] = useState<'normal' | 'large'>('normal');
  const [showAudioMixer, setShowAudioMixer] = useState(false);
  const [showHistoricalCard, setShowHistoricalCard] = useState(false);

  // Audio Mixer State
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceVolume, setVoiceVolume] = useState(1.0);
  const [sfxVolume, setSfxVolume] = useState(0.75);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');

  // Timeline & Playback
  const [sceneElapsedTime, setSceneElapsedTime] = useState(0);
  const currentScene: Scene = disaster.scenes[activeSceneIndex] || disaster.scenes[0];

  // Calculate total montage duration and scene start offsets
  const totalDuration = disaster.scenes.reduce((acc, s) => acc + s.duration, 0);
  const sceneStartOffsets = disaster.scenes.map((_, i) =>
    disaster.scenes.slice(0, i).reduce((acc, s) => acc + s.duration, 0)
  );
  const currentTotalElapsed = (sceneStartOffsets[activeSceneIndex] || 0) + sceneElapsedTime;

  // Load available voices
  useEffect(() => {
    const updateVoices = () => {
      const v = speechNarrator.getFrenchVoices();
      setVoices(v);
      if (v.length > 0 && !selectedVoiceName) {
        setSelectedVoiceName(v[0].name);
      }
    };
    updateVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [selectedVoiceName]);

  // Volume synchronization
  useEffect(() => {
    soundEngine.setVolumes(isMuted ? 0 : 0.8, sfxVolume, musicVolume);
    speechNarrator.setVolume(isMuted || !voiceEnabled ? 0 : voiceVolume);
  }, [isMuted, sfxVolume, musicVolume, voiceVolume, voiceEnabled]);

  // Handle scene change sound triggers and voiceover
  useEffect(() => {
    setSceneElapsedTime(0);

    if (isPlaying) {
      // Sound FX trigger
      soundEngine.setSceneMood(currentScene.soundMood);

      // Voiceover trigger
      if (voiceEnabled && !isMuted) {
        speechNarrator.speak(currentScene.narrationFr, () => {
          // Voice ended (will wait for scene duration or advance)
        });
      }
    } else {
      speechNarrator.stop();
      soundEngine.stopAll();
    }
  }, [activeSceneIndex, isPlaying, voiceEnabled, isMuted, currentScene]);

  // Master playback timer ticker
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSceneElapsedTime((prev) => {
        const next = prev + 0.1;
        if (next >= currentScene.duration) {
          // Advance to next scene or loop/stop
          if (activeSceneIndex < disaster.scenes.length - 1) {
            setActiveSceneIndex(activeSceneIndex + 1);
            return 0;
          } else {
            // Reached the end of montage
            setIsPlaying(false);
            return currentScene.duration;
          }
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentScene.duration, activeSceneIndex, disaster.scenes.length, setActiveSceneIndex, setIsPlaying]);

  // Format time display MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Find active subtitle
  const activeSubtitle = currentScene.subtitles.find(
    (sub) => sceneElapsedTime >= sub.start && sceneElapsedTime <= sub.end
  ) || currentScene.subtitles[0];

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Jump to specific scene
  const goToScene = (index: number) => {
    speechNarrator.stop();
    setActiveSceneIndex(index);
    setSceneElapsedTime(0);
  };

  // Timeline scrub
  const handleTimelineScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTotalSec = ratio * totalDuration;

    // Find which scene this corresponds to
    let acc = 0;
    for (let i = 0; i < disaster.scenes.length; i++) {
      const dur = disaster.scenes[i].duration;
      if (targetTotalSec <= acc + dur || i === disaster.scenes.length - 1) {
        speechNarrator.stop();
        setActiveSceneIndex(i);
        setSceneElapsedTime(Math.max(0, targetTotalSec - acc));
        break;
      }
      acc += dur;
    }
  };

  const getAnimationClass = (anim: Scene['animation']) => {
    switch (anim) {
      case 'pan-left':
        return 'animate-kenburns-pan-left';
      case 'pan-right':
        return 'animate-kenburns-pan-right';
      case 'zoom-in':
        return 'animate-kenburns-zoom-in';
      case 'zoom-out':
        return 'animate-kenburns-zoom-out';
      default:
        return 'animate-kenburns-zoom-in';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Aspect Ratio & Quick Player Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-stone-300">Format d'Affichage :</span>
          <div className="flex items-center gap-1 rounded-lg bg-stone-900 p-1 border border-stone-800">
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-medium transition-colors ${
                aspectRatio === '16:9' ? 'bg-amber-600 text-stone-950 font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Tv className="h-3.5 w-3.5" />
              <span>16:9 Cinéma</span>
            </button>
            <button
              onClick={() => setAspectRatio('9:16')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-medium transition-colors ${
                aspectRatio === '9:16' ? 'bg-amber-600 text-stone-950 font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>9:16 Vertical</span>
            </button>
            <button
              onClick={() => setAspectRatio('4:3')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-medium transition-colors ${
                aspectRatio === '4:3' ? 'bg-amber-600 text-stone-950 font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>4:3 Archives</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistoricalCard(!showHistoricalCard)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium transition-colors ${
              showHistoricalCard ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Info className="h-3.5 w-3.5" />
            <span>Témoignage d'Époque</span>
          </button>

          <button
            onClick={() => setShowAudioMixer(!showAudioMixer)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium transition-colors ${
              showAudioMixer ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Mixage Audio & Voix</span>
          </button>

          <button
            onClick={() => setShowSubtitles(!showSubtitles)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium transition-colors ${
              showSubtitles ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Subtitles className="h-3.5 w-3.5" />
            <span>Sous-titres FR {showSubtitles ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Video Viewport Screen */}
      <div
        ref={containerRef}
        className={`relative mx-auto w-full overflow-hidden rounded-xl border border-stone-800 bg-black shadow-2xl transition-all duration-300 ${
          aspectRatio === '16:9'
            ? 'aspect-video max-w-5xl'
            : aspectRatio === '9:16'
            ? 'aspect-[9/16] max-w-sm'
            : 'aspect-[4/3] max-w-3xl'
        }`}
      >
        {/* Background Visual with Ken Burns Animation & Camera Shake */}
        <div
          className={`relative h-full w-full overflow-hidden ${
            currentScene.shakeIntensity === 'intense' && isPlaying
              ? 'animate-camera-shake'
              : ''
          }`}
        >
          <img
            key={currentScene.id}
            src={currentScene.image}
            alt={currentScene.title}
            className={`h-full w-full object-cover select-none transition-opacity duration-1000 ${
              isPlaying ? getAnimationClass(currentScene.animation) : 'scale-100'
            }`}
            style={{
              filter:
                aspectRatio === '4:3'
                  ? 'sepia(0.35) contrast(1.15) brightness(0.95)'
                  : 'contrast(1.08) saturate(1.05)',
            }}
          />

          {/* Film Grain & Cinematic Vignette Overlays */}
          <div className="cinematic-vignette absolute inset-0 pointer-events-none" />
          {currentScene.soundMood === 'cataclysm-explosion' && (
            <div className="cinematic-glow absolute inset-0 pointer-events-none mix-blend-screen" />
          )}

          {/* Interactive Atmospheric Particles (Ash, Embers, Lightning) */}
          <AtmosphericCanvas
            mood={currentScene.soundMood}
            isShaking={currentScene.shakeIntensity !== 'none'}
            isPlaying={isPlaying}
          />

          {/* Top Documentary Banner: Scene Title & Historical Timecode */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-start justify-between pointer-events-none">
            <div className="rounded-md bg-stone-950/80 px-3 py-1.5 backdrop-blur-md border border-stone-800/60 shadow-lg">
              <span className="font-mono-data text-[10px] uppercase tracking-wider text-amber-400">
                {currentScene.timestampDisplay}
              </span>
              <h2 className="font-cinzel text-base font-bold text-stone-100 drop-shadow-md">
                {currentScene.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-md bg-stone-950/80 px-2.5 py-1 text-xs font-mono-data text-stone-300 backdrop-blur-md border border-stone-800/60">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span>REC · {formatTime(currentTotalElapsed)}</span>
            </div>
          </div>

          {/* Eyewitness Quote Card Modal Overlay */}
          {showHistoricalCard && currentScene.eyewitnessQuote && (
            <div className="absolute inset-x-6 top-20 z-40 rounded-lg border border-amber-600/40 bg-stone-950/90 p-4 backdrop-blur-md shadow-2xl max-w-xl mx-auto">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel">
                  Témoignage Historique Direct
                </span>
                <button
                  onClick={() => setShowHistoricalCard(false)}
                  className="text-stone-400 hover:text-stone-200 text-xs px-2 py-0.5 rounded"
                >
                  Fermer
                </button>
              </div>
              <blockquote className="font-serif-display text-sm italic text-stone-200 leading-relaxed">
                « {currentScene.eyewitnessQuote.text} »
              </blockquote>
              <div className="mt-2 text-right text-xs text-stone-400">
                — <span className="font-semibold text-stone-300">{currentScene.eyewitnessQuote.author}</span> ({currentScene.eyewitnessQuote.role})
              </div>
            </div>
          )}

          {/* Dynamic French Subtitles Overlay */}
          {showSubtitles && activeSubtitle && (
            <div className="absolute bottom-16 inset-x-4 z-30 flex justify-center pointer-events-none">
              <div
                className={`max-w-2xl rounded-lg bg-stone-950/85 px-4 py-2 text-center backdrop-blur-sm border border-stone-800/60 shadow-xl ${
                  subtitleSize === 'large' ? 'text-lg font-medium' : 'text-sm'
                } font-serif-display text-amber-200 leading-snug tracking-wide`}
              >
                {activeSubtitle.text}
              </div>
            </div>
          )}

          {/* Quick Play Trigger Overlay (on video click) */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
          >
            <div className="rounded-full bg-stone-950/80 p-4 text-amber-400 backdrop-blur-md border border-stone-700 shadow-xl">
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 fill-current" />}
            </div>
          </button>
        </div>

        {/* Integrated Player Control Bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent p-3 pt-6">
          {/* Progress Timeline Scrubber */}
          <div
            onClick={handleTimelineScrub}
            className="group relative mb-2.5 h-2 w-full cursor-pointer rounded-full bg-stone-800/80 transition-all hover:h-3"
          >
            {/* Played progress */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all"
              style={{ width: `${(currentTotalElapsed / totalDuration) * 100}%` }}
            />

            {/* Scene Markers */}
            {sceneStartOffsets.map((offset, idx) => (
              <div
                key={idx}
                className="absolute top-0 bottom-0 w-0.5 bg-stone-900 group-hover:bg-amber-200/60"
                style={{ left: `${(offset / totalDuration) * 100}%` }}
                title={disaster.scenes[idx].title}
              />
            ))}
          </div>

          {/* Controls Bottom Row */}
          <div className="flex items-center justify-between text-stone-200 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-lg bg-amber-600 p-2 text-stone-950 hover:bg-amber-500 active:scale-95 transition-all"
                title={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              </button>

              <button
                onClick={() => goToScene(Math.max(0, activeSceneIndex - 1))}
                disabled={activeSceneIndex === 0}
                className="rounded p-1.5 hover:bg-stone-800 text-stone-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Scène précédente"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                onClick={() => goToScene(Math.min(disaster.scenes.length - 1, activeSceneIndex + 1))}
                disabled={activeSceneIndex === disaster.scenes.length - 1}
                className="rounded p-1.5 hover:bg-stone-800 text-stone-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Scène suivante"
              >
                <SkipForward className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  goToScene(0);
                  setIsPlaying(true);
                }}
                className="rounded p-1.5 hover:bg-stone-800 text-stone-300 transition-colors"
                title="Recommencer depuis le début"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              <div className="font-mono-data text-stone-300 pl-2">
                <span className="text-amber-400">{formatTime(currentTotalElapsed)}</span>
                <span className="text-stone-500"> / {formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* Scene Indicator & Right Controls */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block font-medium text-stone-400">
                Scène <span className="text-amber-400 font-semibold">{activeSceneIndex + 1}</span> / {disaster.scenes.length}
              </span>

              <button
                onClick={() => setIsMuted(soundEngine.toggleMute())}
                className="rounded p-1.5 hover:bg-stone-800 text-stone-300 transition-colors"
                title={isMuted ? 'Activer le son' : 'Couper le son'}
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4" />}
              </button>

              <button
                onClick={() => setSubtitleSize(subtitleSize === 'normal' ? 'large' : 'normal')}
                className="rounded p-1.5 hover:bg-stone-800 text-stone-300 font-serif font-bold text-xs"
                title="Taille des sous-titres"
              >
                {subtitleSize === 'normal' ? 'aA' : 'AA'}
              </button>

              <button
                onClick={toggleFullscreen}
                className="rounded p-1.5 hover:bg-stone-800 text-stone-300 transition-colors"
                title="Plein Écran"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Mixer & Voice Control Panel (Expandable) */}
      {showAudioMixer && (
        <div className="rounded-xl border border-stone-800 bg-stone-900/90 p-4 backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between border-b border-stone-800 pb-2">
            <h3 className="font-cinzel text-sm font-semibold text-stone-200 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-amber-400" />
              Console de Mixage Audio du Montage
            </h3>
            <span className="text-[11px] text-stone-500 font-mono-data">Moteur Web Audio Synth & Voix Synthétique</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Track 1: Voiceover French */}
            <div className="space-y-2 rounded-lg bg-stone-950/60 p-3 border border-stone-800/80">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                  <Mic className="h-3.5 w-3.5 text-amber-400" />
                  Voix Off Narrateur (FR)
                </span>
                <input
                  type="checkbox"
                  checked={voiceEnabled}
                  onChange={(e) => setVoiceEnabled(e.target.checked)}
                  className="rounded border-stone-700 bg-stone-900 text-amber-600 focus:ring-0"
                />
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={voiceVolume}
                onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
              {voices.length > 0 && (
                <div className="pt-1">
                  <label className="text-[11px] text-stone-400 block mb-1">Voix Française Détectée :</label>
                  <select
                    value={selectedVoiceName}
                    onChange={(e) => {
                      setSelectedVoiceName(e.target.value);
                      speechNarrator.setSelectedVoice(e.target.value);
                    }}
                    className="w-full rounded bg-stone-900 px-2 py-1 text-[11px] text-stone-200 border border-stone-700"
                  >
                    {voices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Track 2: Sound FX Procedural */}
            <div className="space-y-2 rounded-lg bg-stone-950/60 p-3 border border-stone-800/80">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                  <Volume2 className="h-3.5 w-3.5 text-orange-400" />
                  Bruitages Cataclysme (SFX)
                </span>
                <span className="font-mono-data text-stone-400">{Math.round(sfxVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sfxVolume}
                onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                className="w-full accent-orange-500"
              />
              <p className="text-[11px] text-stone-500">
                Gronderie tellurique, onde de choc, souffle de cendre et foudre.
              </p>
              <button
                onClick={() => soundEngine.playExplosionDetonation()}
                className="mt-1 w-full rounded bg-stone-800 py-1 text-[11px] text-stone-200 hover:bg-stone-700 transition-colors"
              >
                Tester Détonation
              </button>
            </div>

            {/* Track 3: Cinematic Documentary Ambient Pad */}
            <div className="space-y-2 rounded-lg bg-stone-950/60 p-3 border border-stone-800/80">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                  <Music className="h-3.5 w-3.5 text-amber-400" />
                  Nappe Ambiance & Tension
                </span>
                <span className="font-mono-data text-stone-400">{Math.round(musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-[11px] text-stone-500">
                Accords mineurs harmoniques en synthèse pour la tension dramatique.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Thumbnails Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        {disaster.scenes.map((scene, idx) => {
          const isActive = idx === activeSceneIndex;
          return (
            <button
              key={scene.id}
              onClick={() => goToScene(idx)}
              className={`group relative overflow-hidden rounded-lg border text-left transition-all ${
                isActive
                  ? 'border-amber-500 shadow-md shadow-amber-950/30 ring-1 ring-amber-500/50'
                  : 'border-stone-800 opacity-70 hover:opacity-100 hover:border-stone-700'
              }`}
            >
              <div className="aspect-video w-full overflow-hidden bg-stone-900">
                <img
                  src={scene.image}
                  alt={scene.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="bg-stone-950 p-2.5">
                <div className="flex items-center justify-between text-[10px] text-stone-400 mb-0.5">
                  <span className="font-mono-data text-amber-400">Scène 0{scene.order}</span>
                  <span className="font-mono-data">{scene.duration}s</span>
                </div>
                <h4 className="font-cinzel text-xs font-semibold text-stone-200 line-clamp-1">
                  {scene.title}
                </h4>
                <p className="text-[11px] text-stone-500 line-clamp-1">{scene.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
