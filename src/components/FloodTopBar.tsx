import React from 'react';
import { Play } from 'lucide-react';

interface FloodTopBarProps {
  activeTab: 'video' | 'science' | 'history' | 'simulator' | 'safety' | 'quiz';
  setActiveTab: (tab: 'video' | 'science' | 'history' | 'simulator' | 'safety' | 'quiz') => void;
  onPlayDocumentary: () => void;
  isPlaying: boolean;
}

export const FloodTopBar: React.FC<FloodTopBarProps> = ({
  activeTab,
  setActiveTab,
  onPlayDocumentary,
  isPlaying,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 border-b border-slate-800/80 bg-slate-950/90 px-6 py-3.5 backdrop-blur-md">
      {/* Zone 1: Brand Wordmark (Single text element in display face) */}
      <a
        href="#video"
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('video');
        }}
        className="font-cinzel text-lg font-bold tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
      >
        DÉLUGE
      </a>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-400">
        <button
          onClick={() => setActiveTab('video')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'video' ? 'text-cyan-400 font-bold' : ''
          }`}
        >
          Vidéothèque & Montage
        </button>
        <button
          onClick={() => setActiveTab('science')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'science' ? 'text-cyan-400 font-bold' : ''
          }`}
        >
          Encyclopédie Scientifique
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'history' ? 'text-cyan-400 font-bold' : ''
          }`}
        >
          Grandes Inondations
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'simulator' ? 'text-cyan-400 font-bold' : ''
          }`}
        >
          Simulateur d’Immersion
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'safety' ? 'text-cyan-400 font-bold' : ''
          }`}
        >
          Guide de Survie
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'quiz' ? 'text-cyan-400 font-bold' : ''
          }`}
        >
          Quiz & Réflexes
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onPlayDocumentary}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-500 active:scale-95 transition-all shadow-md shadow-cyan-900/30 whitespace-nowrap shrink-0"
        >
          <Play className={`h-3.5 w-3.5 fill-current ${isPlaying ? 'opacity-70' : ''}`} />
          <span>{isPlaying ? 'Reprendre le Film' : 'Lancer le Film'}</span>
        </button>
      </div>
    </header>
  );
};
