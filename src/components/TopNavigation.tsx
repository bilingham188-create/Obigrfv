import React from 'react';
import { Play, Sparkles } from 'lucide-react';

interface TopNavigationProps {
  activeTab: 'player' | 'script' | 'chronology' | 'quiz';
  setActiveTab: (tab: 'player' | 'script' | 'chronology' | 'quiz') => void;
  onPlayMontage: () => void;
  isPlaying: boolean;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  setActiveTab,
  onPlayMontage,
  isPlaying,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 border-b border-stone-800/80 bg-stone-950/90 px-6 py-3.5 backdrop-blur-md">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#player"
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('player');
        }}
        className="font-cinzel text-lg font-bold tracking-wider text-stone-100 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
      >
        CHRONIQUES DU CATACLYSME
      </a>

      {/* Zone 2: 4 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-400">
        <button
          onClick={() => setActiveTab('player')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 text-left ${
            activeTab === 'player' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Montage Vidéo
        </button>
        <button
          onClick={() => setActiveTab('script')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 text-left ${
            activeTab === 'script' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Récit & Voix Off
        </button>
        <button
          onClick={() => setActiveTab('chronology')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 text-left ${
            activeTab === 'chronology' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Chronologie 1902
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 text-left ${
            activeTab === 'quiz' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Quiz Documentaire
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onPlayMontage}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-stone-950 hover:bg-amber-500 active:scale-95 transition-all shadow-md shadow-amber-900/20 whitespace-nowrap shrink-0"
        >
          <Play className={`h-3.5 w-3.5 fill-current ${isPlaying ? 'opacity-70' : ''}`} />
          <span>{isPlaying ? 'Reprendre la Lecture' : 'Lancer le Montage'}</span>
        </button>
      </div>
    </header>
  );
};
