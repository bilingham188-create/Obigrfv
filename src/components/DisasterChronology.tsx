import React from 'react';
import { HISTORICAL_CHRONOLOGY } from '../data/disastersData';
import { Clock, AlertTriangle, ShieldCheck, Flame, Compass } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export const DisasterChronology: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-stone-800 pb-4">
        <span className="text-xs font-mono-data uppercase tracking-widest text-amber-500">
          Archives & Reconstitution Historique
        </span>
        <h2 className="font-cinzel text-2xl font-bold text-stone-100 mt-1">
          La Tragédie Minute par Minute : 8 Mai 1902
        </h2>
        <p className="text-sm text-stone-400 mt-2 font-serif-display leading-relaxed">
          Chronologie détaillée de l’anéantissement de Saint-Pierre, depuis les premiers signes précurseurs jusqu'à l’émergence de la volcanologie contemporaine.
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
          <span className="text-[11px] font-mono-data text-stone-400">Pertes Humaines</span>
          <p className="font-cinzel text-xl font-bold text-red-400 mt-1">~30 000</p>
          <span className="text-[10px] text-stone-500">habitants en 3 minutes</span>
        </div>

        <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
          <span className="text-[11px] font-mono-data text-stone-400">Vitesse Nuée</span>
          <p className="font-cinzel text-xl font-bold text-amber-400 mt-1">500 km/h</p>
          <span className="text-[10px] text-stone-500">avalanche pyroclastique</span>
        </div>

        <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
          <span className="text-[11px] font-mono-data text-stone-400">Température Gaz</span>
          <p className="font-cinzel text-xl font-bold text-orange-400 mt-1">&gt; 1 000 °C</p>
          <span className="text-[10px] text-stone-500">gaz et cendres en fusion</span>
        </div>

        <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
          <span className="text-[11px] font-mono-data text-stone-400">Survivant Urbain</span>
          <p className="font-cinzel text-xl font-bold text-emerald-400 mt-1">1 Unique</p>
          <span className="text-[10px] text-stone-500">L.-A. Cyparis (cellule)</span>
        </div>
      </div>

      {/* Timeline items */}
      <div className="relative border-l border-stone-800 ml-4 space-y-8 pl-6 pt-2">
        {HISTORICAL_CHRONOLOGY.map((item, index) => {
          const isBlast = item.time.includes('07:52');
          return (
            <div key={index} className="relative group">
              {/* Dot on line */}
              <div
                className={`absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-stone-950 ${
                  isBlast
                    ? 'bg-red-500 ring-4 ring-red-950 animate-pulse'
                    : 'bg-amber-500 ring-2 ring-stone-800'
                }`}
              />

              <div
                className={`rounded-xl border p-5 transition-all ${
                  isBlast
                    ? 'border-red-900/60 bg-gradient-to-r from-red-950/40 to-stone-900/80 shadow-lg shadow-red-950/20'
                    : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 hover:bg-stone-900/80'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="flex items-center gap-1.5 font-mono-data text-xs font-semibold text-amber-400">
                    <Clock className="h-3.5 w-3.5" />
                    {item.time}
                  </span>

                  {isBlast && (
                    <button
                      onClick={() => soundEngine.playExplosionDetonation()}
                      className="flex items-center gap-1 rounded bg-red-900/70 px-2.5 py-1 text-[11px] font-medium text-red-200 hover:bg-red-800 transition-colors"
                    >
                      <Flame className="h-3 w-3" />
                      Écouter l'Explosion
                    </button>
                  )}
                </div>

                <h3 className="font-cinzel text-base font-bold text-stone-100 mb-2">
                  {item.title}
                </h3>

                <p className="font-serif-display text-sm text-stone-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
