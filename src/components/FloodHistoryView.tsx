import React, { useState } from 'react';
import { HISTORICAL_FLOODS } from '../data/floodData';
import { Calendar, MapPin, Skull, DollarSign, BookOpen } from 'lucide-react';

export const FloodHistoryView: React.FC = () => {
  const [selectedDisasterId, setSelectedDisasterId] = useState<string>(HISTORICAL_FLOODS[0].id);
  const activeFlood = HISTORICAL_FLOODS.find((f) => f.id === selectedDisasterId) || HISTORICAL_FLOODS[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono-data uppercase tracking-widest text-cyan-400">
          Archives & Mémoire des Catastrophes
        </span>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100 mt-1">
          Les Plus Grandes Inondations de l’Histoire
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed font-serif-display">
          Rétrospective des cataclysmes hydrologiques majeurs ayant bouleversé les populations, redessiné les territoires et fondé l’ingénierie moderne de défense.
        </p>
      </div>

      {/* Grid of Disaster Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {HISTORICAL_FLOODS.map((flood) => {
          const isSelected = flood.id === selectedDisasterId;
          return (
            <button
              key={flood.id}
              onClick={() => setSelectedDisasterId(flood.id)}
              className={`rounded-xl border p-4 text-start transition-all ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500/50 shadow-lg'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono-data text-slate-400 mb-2">
                <span className="text-cyan-400 font-bold">{flood.year}</span>
                <span className="text-red-400 font-semibold">{flood.deathTollFr}</span>
              </div>
              <h3 className="font-cinzel text-sm font-bold text-slate-100 line-clamp-1 mb-1">
                {flood.nameFr}
              </h3>
              <p className="font-serif-display text-xs text-slate-400 line-clamp-2">
                {flood.locationFr}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Disaster Deep Dive Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-data text-cyan-400 mb-1">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {activeFlood.year}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {activeFlood.locationFr}
              </span>
            </div>
            <h3 className="font-cinzel text-xl font-bold text-slate-100">
              {activeFlood.nameFr}
            </h3>
          </div>

          <div className="rounded-lg bg-red-950/60 px-3 py-1.5 border border-red-900/80 text-red-200 text-xs font-mono-data font-bold flex items-center gap-1.5">
            <Skull className="h-4 w-4 text-red-400" />
            <span>{activeFlood.deathTollFr}</span>
          </div>
        </div>

        {/* Cause & Summary */}
        <div className="space-y-4">
          <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800">
            <span className="text-[10px] font-mono-data uppercase tracking-wider text-amber-400 block mb-1">
              Causes directes du cataclysme :
            </span>
            <p className="font-serif-display text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeFlood.causeFr}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono-data uppercase tracking-wider text-cyan-400 block mb-1">
              Chronologie & Conséquences Humanitaires :
            </span>
            <p className="font-serif-display text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeFlood.summaryFr}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-lg bg-slate-950/80 p-3.5 border border-slate-800">
              <span className="text-[10px] font-mono-data uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                <DollarSign className="h-3 w-3 text-emerald-400" />
                Dévastation Économique :
              </span>
              <p className="font-serif-display text-xs text-slate-300">
                {activeFlood.economicDamageFr}
              </p>
            </div>

            <div className="rounded-lg bg-slate-950/80 p-3.5 border border-slate-800">
              <span className="text-[10px] font-mono-data uppercase tracking-wider text-cyan-400 flex items-center gap-1 mb-1">
                <BookOpen className="h-3 w-3 text-cyan-400" />
                Enseignements Techniques Retenus :
              </span>
              <p className="font-serif-display text-xs text-slate-300">
                {activeFlood.keyLessonFr}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
