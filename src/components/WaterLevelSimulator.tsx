import React, { useState } from 'react';
import { WATER_DEPTH_LEVELS } from '../data/floodData';
import { AlertOctagon, AlertTriangle, ShieldAlert, Car, User, Home } from 'lucide-react';

export const WaterLevelSimulator: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState(1); // default to 0.30m (30cm)

  const currentLevel = WATER_DEPTH_LEVELS[levelIndex];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono-data uppercase tracking-widest text-cyan-400">
          Simulateur Hydrodynamique Interactif
        </span>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100 mt-1">
          Hauteur d’Immersion & Risques Mécaniques
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed font-serif-display">
          Faites glisser le curseur pour visualiser la force destructrice de l’eau selon sa hauteur et comprendre comment quelques centimètres d’eau courante suffisent à emporter piétons et véhicules.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
        {/* Depth Slider */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
            <span>Hauteur de la nappe d’eau en crue :</span>
            <span className="font-mono-data text-base text-cyan-400 font-bold bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              {currentLevel.depthDisplay}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max={WATER_DEPTH_LEVELS.length - 1}
            step="1"
            value={levelIndex}
            onChange={(e) => setLevelIndex(parseInt(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />

          <div className="flex justify-between text-[11px] font-mono-data text-slate-400 mt-2">
            {WATER_DEPTH_LEVELS.map((lvl, idx) => (
              <button
                key={idx}
                onClick={() => setLevelIndex(idx)}
                className={`transition-colors ${idx === levelIndex ? 'text-cyan-400 font-bold' : 'hover:text-slate-200'}`}
              >
                {lvl.depthMeters}m
              </button>
            ))}
          </div>
        </div>

        {/* Visual Water Level Tank Cross-Section */}
        <div className="relative h-64 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 flex flex-col justify-end p-4">
          {/* Animated Water Body */}
          <div
            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-cyan-900/90 via-cyan-800/60 to-cyan-500/40 border-t-2 border-cyan-400/80 transition-all duration-500 flex items-start justify-center pt-2"
            style={{
              height: `${Math.min(95, Math.max(15, (currentLevel.depthMeters / 3.0) * 90))}%`,
            }}
          >
            <div className="text-[11px] font-mono-data font-bold text-cyan-200 bg-slate-950/70 px-2.5 py-0.5 rounded shadow">
              {currentLevel.depthDisplay}
            </div>
          </div>

          {/* Silhouettes in cross section */}
          <div className="relative z-10 flex items-end justify-around w-full pb-2">
            {/* Adult Pedestrian */}
            <div className={`flex flex-col items-center transition-all duration-300 ${currentLevel.sweepsAdults ? 'text-red-400 -rotate-12 translate-y-3' : 'text-slate-300'}`}>
              <User className="h-12 w-12" />
              <span className="text-[10px] font-semibold mt-1">Piéton</span>
              {currentLevel.sweepsAdults && (
                <span className="text-[9px] bg-red-950/80 text-red-300 px-1.5 py-0.5 rounded mt-0.5 border border-red-800">
                  Emporté par le courant
                </span>
              )}
            </div>

            {/* Automobile */}
            <div className={`flex flex-col items-center transition-all duration-300 ${currentLevel.sweepsVehicles ? 'text-red-400 -rotate-6 -translate-y-4 animate-bounce' : 'text-slate-300'}`}>
              <Car className="h-16 w-16" />
              <span className="text-[10px] font-semibold mt-1">Automobile</span>
              {currentLevel.sweepsVehicles && (
                <span className="text-[9px] bg-red-950/80 text-red-300 px-1.5 py-0.5 rounded mt-0.5 border border-red-800">
                  Flotte & Dérive
                </span>
              )}
            </div>

            {/* House / Structure */}
            <div className={`flex flex-col items-center transition-all duration-300 ${currentLevel.structureBreach ? 'text-orange-400' : 'text-slate-300'}`}>
              <Home className="h-20 w-20" />
              <span className="text-[10px] font-semibold mt-1">Bâtiment</span>
              {currentLevel.structureBreach && (
                <span className="text-[9px] bg-orange-950/80 text-orange-300 px-1.5 py-0.5 rounded mt-0.5 border border-orange-800">
                  RDC Submergé
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Impact Analysis & Emergency Rule */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center gap-2 mb-2">
              {currentLevel.dangerLevel === 'extreme' ? (
                <AlertOctagon className="h-4 w-4 text-red-400" />
              ) : currentLevel.dangerLevel === 'danger' ? (
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              ) : (
                <ShieldAlert className="h-4 w-4 text-cyan-400" />
              )}
              <h3 className="font-cinzel text-sm font-bold text-slate-100">
                {currentLevel.titleFr}
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-serif-display">
              {currentLevel.impactFr}
            </p>
          </div>

          <div className="rounded-xl border border-cyan-800/40 bg-cyan-950/20 p-4">
            <span className="text-[10px] font-mono-data uppercase tracking-wider text-cyan-400 block mb-1">
              Consigne Impérative de Sécurité :
            </span>
            <p className="text-xs text-cyan-100 font-semibold leading-relaxed">
              {currentLevel.actionFr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
