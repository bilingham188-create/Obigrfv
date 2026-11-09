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
  Zap, 
  Waves, 
  Activity,
  Music,
  Info
} from 'lucide-react';
import { FloodScene } from '../types/flood';
import { WaterRainCanvas } from './WaterRainCanvas';
import { floodAudio } from '../services/floodAudio';

interface FloodVideoPlayerProps {
  scenes: FloodScene[];
  activeSceneIndex: number;
  setActiveSceneIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const FloodVideoPlayer: React.FC<FloodVideoPlayerProps> = ({
  scenes,
  activeSceneIndex,
  setActiveSceneIndex,
  isPlaying,
  setIsPlaying,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '4:3'>('16:9');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showMixer, setShowMixer] = useState(false);
  const [showFactCard, setShowFactCard] = useState(false);

  // Volumes for pure ambient sound design (NO VOICEOVER as requested)
  const [sfxVolume, setSfxVolume] = useState(0.85);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  // Timeline
  const [sceneElapsedTime, setSceneElapsedTime] = useState(0);
  const currentScene = scenes[activeSceneIndex] || scenes[0];

  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);
  const sceneOffsets = scenes.map((_, i) =>
    scenes.slice(0, i).reduce((acc, s) => acc + s.duration, 0)
  );
  const currentTotalElapsed = (sceneOffsets[activeSceneIndex] || 0) + sceneElapsedTime;

  // Sound sync (pure ambiance + music, no speech synthesis)
  useEffect(() => {
    floodAudio.setVolumes(isMuted ? 0 : 0.85, sfxVolume, musicVolume);
  }, [isMuted, sfxVolume, musicVolume]);

  // Scene change audio mood trigger
  useEffect(() => {
    setSceneElapsedTime(0);

    if (isPlaying) {
      floodAudio.setMood(currentScene.soundMood);
    } else {
      floodAudio.stopAll();
    }
  }, [activeSceneIndex, isPlaying, currentScene]);

  // Master timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSceneElapsedTime((prev) => {
        const next = prev + 0.1;
        if (next >= currentScene.duration) {
          if (activeSceneIndex < scenes.length - 1) {
            setActiveSceneIndex(activeSceneIndex + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return currentScene.duration;
          }
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentScene.duration, activeSceneIndex, scenes.length, setActiveSceneIndex, setIsPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeSubtitle = currentScene.subtitles.find(
    (sub) => sceneElapsedTime >= sub.start && sceneElapsedTime <= sub.end
  ) || currentScene.subtitles[0];

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleTimelineScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSec = ratio * totalDuration;

    let acc = 0;
    for (let i = 0; i < scenes.length; i++) {
      const dur = scenes[i].duration;
      if (targetSec <= acc + dur || i === scenes.length - 1) {
        setActiveSceneIndex(i);
        setSceneElapsedTime(Math.max(0, targetSec - acc));
        break;
      }
      acc += dur;
    }
  };

  const getAnimationClass = (anim: FloodScene['animation']) => {
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
      {/* Viewport Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-300">Format d'Affichage :</span>
          <div className="flex items-center gap-1 rounded-lg bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-medium transition-colors ${
                aspectRatio === '16:9' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tv className="h-3.5 w-3.5" />
              <span>16:9 Cinéma</span>
            </button>
            <button
              onClick={() => setAspectRatio('9:16')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-medium transition-colors ${
                aspectRatio === '9:16' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>9:16 Vertical</span>
            </button>
            <button
              onClick={() => setAspectRatio('4:3')}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-medium transition-colors ${
                aspectRatio === '4:3' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>4:3 Archives</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Fait Scientifique */}
          <button
            onClick={() => setShowFactCard(!showFactCard)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium transition-colors ${
              showFactCard ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300' : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="h-3.5 w-3.5" />
            <span>Fiche Technique</span>
          </button>

          {/* Thunder button */}
          <button
            onClick={() => floodAudio.playThunderclap()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-medium text-amber-300 hover:bg-slate-800 hover:border-amber-500/40 transition-colors"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Coup de Tonnerre</span>
          </button>

          {/* Audio mixer toggle */}
          <button
            onClick={() => setShowMixer(!showMixer)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium transition-colors ${
              showMixer ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300' : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Mixage Sonore</span>
          </button>

          {/* Subtitles toggle */}
          <button
            onClick={() => setShowSubtitles(!showSubtitles)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium transition-colors ${
              showSubtitles ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300' : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Subtitles className="h-3.5 w-3.5" />
            <span>Sous-titres {showSubtitles ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Video Screen */}
      <div
        ref={containerRef}
        className={`relative mx-auto w-full overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl transition-all duration-300 ${
          aspectRatio === '16:9'
            ? 'aspect-video max-w-5xl'
            : aspectRatio === '9:16'
            ? 'aspect-[9/16] max-w-sm'
            : 'aspect-[4/3] max-w-3xl'
        }`}
      >
        <div className="relative h-full w-full overflow-hidden">
          <img
            key={currentScene.id}
            src={currentScene.image}
            alt={currentScene.titleFr}
            className={`h-full w-full object-cover select-none transition-opacity duration-1000 ${
              isPlaying ? getAnimationClass(currentScene.animation) : 'scale-100'
            }`}
          />

          {/* Atmospheric Water & Rain Canvas Overlay */}
          <WaterRainCanvas mood={currentScene.soundMood} isPlaying={isPlaying} />

          {/* Cinematic Vignette */}
          <div className="cinematic-vignette absolute inset-0 pointer-events-none" />
          <div className="water-glow absolute inset-0 pointer-events-none mix-blend-screen" />

          {/* Scene Header Badge */}
          <div className="absolute top-4 inset-x-4 z-30 flex items-start justify-between pointer-events-none">
            <div className="rounded-md bg-slate-950/85 px-3 py-1.5 backdrop-blur-md border border-slate-800/80 shadow-lg">
              <span className="font-mono-data text-[10px] uppercase tracking-wider text-cyan-400">
                {currentScene.timestampDisplay}
              </span>
              <h2 className="font-cinzel text-sm sm:text-base font-bold text-slate-100">
                {currentScene.titleFr}
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-md bg-slate-950/85 px-2.5 py-1 text-xs font-mono-data text-slate-300 backdrop-blur-md border border-slate-800/80">
              <span className="flex items-center gap-1 text-cyan-400">
                <Activity className="h-3 w-3" />
                {currentScene.waterSpeedKmh} km/h
              </span>
              <span className="text-slate-600">·</span>
              <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>{formatTime(currentTotalElapsed)}</span>
            </div>
          </div>

          {/* Overlay Fiche Technique Modal */}
          {showFactCard && (
            <div className="absolute inset-x-6 top-20 z-40 rounded-lg border border-cyan-500/40 bg-slate-950/95 p-4 backdrop-blur-md shadow-2xl max-w-lg mx-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-cinzel">
                  Analyse Hydrologique de la Séquence
                </span>
                <button
                  onClick={() => setShowFactCard(false)}
                  className="text-slate-400 hover:text-slate-200 text-xs px-2 py-0.5 rounded"
                >
                  Fermer
                </button>
              </div>
              <p className="font-serif-display text-xs text-slate-200 leading-relaxed italic">
                « {currentScene.scientificFactFr} »
              </p>
              <div className="mt-2 text-right text-[11px] font-mono-data text-slate-400">
                Vitesse du courant : <span className="text-cyan-400 font-bold">{currentScene.waterSpeedKmh} km/h</span> · Risque : <span className="text-red-400 uppercase font-bold">{currentScene.threatLevel}</span>
              </div>
            </div>
          )}

          {/* Dynamic Subtitles Overlay */}
          {showSubtitles && activeSubtitle && (
            <div className="absolute bottom-16 inset-x-4 z-30 flex justify-center pointer-events-none">
              <div className="max-w-2xl rounded-lg bg-slate-950/90 px-4 py-2 text-center backdrop-blur-md border border-slate-800 text-xs sm:text-sm font-medium text-cyan-100 leading-relaxed shadow-xl">
                {activeSubtitle.textFr}
              </div>
            </div>
          )}

          {/* Click to Play/Pause overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <div className="rounded-full bg-slate-950/80 p-4 text-cyan-400 backdrop-blur-md border border-slate-700 shadow-xl">
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 fill-current" />}
            </div>
          </button>
        </div>

        {/* Player Bottom Control Bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-3 pt-6">
          {/* Progress Timeline Scrubber */}
          <div
            onClick={handleTimelineScrub}
            className="group relative mb-2.5 h-2 w-full cursor-pointer rounded-full bg-slate-800/80 transition-all hover:h-3"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all"
              style={{ width: `${(currentTotalElapsed / totalDuration) * 100}%` }}
            />
            {sceneOffsets.map((offset, idx) => (
              <div
                key={idx}
                className="absolute top-0 bottom-0 w-0.5 bg-slate-950 group-hover:bg-cyan-200/60"
                style={{ left: `${(offset / totalDuration) * 100}%` }}
                title={scenes[idx].titleFr}
              />
            ))}
          </div>

          {/* Bottom row buttons */}
          <div className="flex items-center justify-between text-slate-200 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-lg bg-cyan-600 p-2 text-slate-950 hover:bg-cyan-500 active:scale-95 transition-all"
                title={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              </button>

              <button
                onClick={() => setActiveSceneIndex(Math.max(0, activeSceneIndex - 1))}
                disabled={activeSceneIndex === 0}
                className="rounded p-1.5 hover:bg-slate-800 text-slate-300 disabled:opacity-30 transition-colors"
                title="Séquence précédente"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                onClick={() => setActiveSceneIndex(Math.min(scenes.length - 1, activeSceneIndex + 1))}
                disabled={activeSceneIndex === scenes.length - 1}
                className="rounded p-1.5 hover:bg-slate-800 text-slate-300 disabled:opacity-30 transition-colors"
                title="Séquence suivante"
              >
                <SkipForward className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  setActiveSceneIndex(0);
                  setIsPlaying(true);
                }}
                className="rounded p-1.5 hover:bg-slate-800 text-slate-300 transition-colors"
                title="Recommencer depuis le début"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              <div className="font-mono-data text-slate-300 pl-2">
                <span className="text-cyan-400">{formatTime(currentTotalElapsed)}</span>
                <span className="text-slate-500"> / {formatTime(totalDuration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block font-medium text-slate-400">
                Séquence <span className="text-cyan-400 font-bold">{activeSceneIndex + 1}</span> / {scenes.length}
              </span>

              <button
                onClick={() => setIsMuted(floodAudio.toggleMute())}
                className="rounded p-1.5 hover:bg-slate-800 text-slate-300 transition-colors"
                title={isMuted ? 'Activer le son' : 'Couper le son'}
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4" />}
              </button>

              <button
                onClick={toggleFullscreen}
                className="rounded p-1.5 hover:bg-slate-800 text-slate-300 transition-colors"
                title="Plein Écran"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Mixer (Pure Environmental Sound Design, No Voiceover) */}
      {showMixer && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-xs font-bold text-slate-200 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-cyan-400" />
              <span>Console d’Ambiance Sonore Pure (Sans Voix Off)</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono-data">Moteur Web Audio Synthétisé · 100% Sons Réels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 rounded-lg bg-slate-950/60 p-3 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Waves className="h-3.5 w-3.5 text-blue-400" />
                  Bruitages Hydrodynamiques (Pluie torrentielle & Rapides)
                </span>
                <span className="font-mono-data text-slate-400">{Math.round(sfxVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sfxVolume}
                onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
              <p className="text-[11px] text-slate-500">
                Génération procédurale de bruine, vagues déferlantes et rotor de sauvetage.
              </p>
            </div>

            <div className="space-y-2 rounded-lg bg-slate-950/60 p-3 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Music className="h-3.5 w-3.5 text-indigo-400" />
                  Nappe Musicale Dramatique & Tension
                </span>
                <span className="font-mono-data text-slate-400">{Math.round(musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <p className="text-[11px] text-slate-500">
                Accords mineurs harmoniques créant l'intensité émotionnelle sans encombrement vocal.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Séquences Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        {scenes.map((scene, idx) => {
          const isActive = idx === activeSceneIndex;
          return (
            <button
              key={scene.id}
              onClick={() => setActiveSceneIndex(idx)}
              className={`group relative overflow-hidden rounded-lg border text-start transition-all ${
                isActive
                  ? 'border-cyan-500 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                  : 'border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
              }`}
            >
              <div className="aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={scene.image}
                  alt={scene.titleFr}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="bg-slate-950 p-2.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                  <span className="font-mono-data text-cyan-400">0{scene.order}</span>
                  <span className="font-mono-data">{scene.duration}s</span>
                </div>
                <h4 className="font-cinzel text-xs font-bold text-slate-200 line-clamp-1">
                  {scene.titleFr}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {scene.subtitleFr}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
