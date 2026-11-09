import React, { useState, useEffect } from 'react';
import { FLOOD_SCENES } from './data/floodData';
import { FloodScene } from './types/flood';
import { FloodTopBar } from './components/FloodTopBar';
import { FloodVideoPlayer } from './components/FloodVideoPlayer';
import { FloodMontageEditor } from './components/FloodMontageEditor';
import { FloodScienceView } from './components/FloodScienceView';
import { FloodHistoryView } from './components/FloodHistoryView';
import { WaterLevelSimulator } from './components/WaterLevelSimulator';
import { FloodSafetyView } from './components/FloodSafetyView';
import { FloodQuizView } from './components/FloodQuizView';
import { 
  Film, 
  BookOpen, 
  Clock, 
  HelpCircle, 
  Sliders, 
  ShieldCheck, 
  Gauge, 
  Droplets,
  Waves,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const [scenes, setScenes] = useState<FloodScene[]>(FLOOD_SCENES);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'science' | 'history' | 'simulator' | 'safety' | 'quiz'>('video');
  const [showStudio, setShowStudio] = useState(false);

  // Set document to French and LTR
  useEffect(() => {
    document.documentElement.lang = 'fr';
    document.documentElement.dir = 'ltr';
  }, []);

  const handleUpdateScene = (sceneId: string, updatedFields: Partial<FloodScene>) => {
    setScenes((prev) =>
      prev.map((s) => (s.id === sceneId ? { ...s, ...updatedFields } : s))
    );
  };

  const handlePlayDocumentary = () => {
    setActiveTab('video');
    setActiveSceneIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-600/30 selection:text-cyan-200">
      {/* 3-Zone Top Navigation Bar */}
      <FloodTopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPlayDocumentary={handlePlayDocumentary}
        isPlaying={isPlaying}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 space-y-8">
        {/* Disaster Presentation Strip */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data text-slate-400">
                <span className="flex items-center gap-1 text-cyan-400 font-bold">
                  <Droplets className="h-3.5 w-3.5" />
                  Dossier Catastrophes Hydrologiques
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-blue-400 font-semibold">
                  <Waves className="h-3.5 w-3.5" />
                  Crues, Submersions & Ondes de Tempête
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-red-400 font-semibold">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  +60% Décès en Véhicule
                </span>
              </div>

              <h1 className="font-cinzel text-2xl sm:text-3xl font-black tracking-wide text-slate-100">
                DÉLUGE : Encyclopédie & Vidéothèque des Inondations
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif-display">
                Portail documentaire complet dédié à la compréhension des crues majeures et submersions marines : montage vidéo cinématographique avec ambiance sonore immersive sans voix off, simulateur hydrodynamique interactif, archives historiques et guide de sécurité civile.
              </p>
            </div>

            {/* Quick Actions & Montage Studio Switcher */}
            <div className="flex flex-row md:flex-col gap-2 shrink-0">
              <button
                onClick={() => setShowStudio(!showStudio)}
                className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-bold transition-all ${
                  showStudio
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 shadow-lg'
                    : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
                }`}
              >
                <Sliders className="h-4 w-4 text-cyan-400" />
                <span>{showStudio ? 'Fermer le Studio' : 'Studio de Montage'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Montage Studio Drawer */}
          {showStudio && (
            <div className="mt-6 pt-6 border-t border-slate-800">
              <FloodMontageEditor
                scenes={scenes}
                onUpdateScene={handleUpdateScene}
                activeSceneIndex={activeSceneIndex}
                setActiveSceneIndex={setActiveSceneIndex}
              />
            </div>
          )}
        </section>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 border-b-2 px-3 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === 'video'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Film className="h-4 w-4" />
              <span>Vidéothèque & Montage</span>
            </button>

            <button
              onClick={() => setActiveTab('science')}
              className={`flex items-center gap-2 border-b-2 px-3 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === 'science'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Typologie & Mécanismes</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 border-b-2 px-3 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === 'history'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Grandes Inondations</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 border-b-2 px-3 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Gauge className="h-4 w-4" />
              <span>Simulateur d’Immersion</span>
            </button>

            <button
              onClick={() => setActiveTab('safety')}
              className={`flex items-center gap-2 border-b-2 px-3 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === 'safety'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Guide de Survie</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 border-b-2 px-3 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>Quiz & Réflexes</span>
            </button>
          </div>
        </div>

        {/* Tab View Content */}
        {activeTab === 'video' && (
          <section className="space-y-6">
            <FloodVideoPlayer
              scenes={scenes}
              activeSceneIndex={activeSceneIndex}
              setActiveSceneIndex={setActiveSceneIndex}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </section>
        )}

        {activeTab === 'science' && (
          <section>
            <FloodScienceView />
          </section>
        )}

        {activeTab === 'history' && (
          <section>
            <FloodHistoryView />
          </section>
        )}

        {activeTab === 'simulator' && (
          <section>
            <WaterLevelSimulator />
          </section>
        )}

        {activeTab === 'safety' && (
          <section>
            <FloodSafetyView />
          </section>
        )}

        {activeTab === 'quiz' && (
          <section>
            <FloodQuizView />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-cinzel font-bold text-slate-300">
              DÉLUGE : Encyclopédie Documentaire des Inondations
            </span>
            <span>·</span>
            <span>Documentation Scientifique & Sécurité Civile</span>
          </div>
          <div className="font-mono-data text-[11px] text-slate-400">
            Centre International de Veille Hydrologique & Risques Naturels
          </div>
        </div>
      </footer>
    </div>
  );
}
