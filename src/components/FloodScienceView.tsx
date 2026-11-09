import React, { useState } from 'react';
import { FLOOD_TYPES } from '../data/floodData';
import { Waves, ThermometerSun } from 'lucide-react';

export const FloodScienceView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>(FLOOD_TYPES[0].id);
  const activeType = FLOOD_TYPES.find((t) => t.id === selectedType) || FLOOD_TYPES[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono-data uppercase tracking-widest text-cyan-400">
          Études Hydrologiques & Météorologiques
        </span>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100 mt-1">
          Encyclopédie Scientifique des Inondations
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed font-serif-display">
          Comprendre les mécanismes physiques de genèse des crues, leurs différentes typologies et l’influence de la thermodynamique atmosphérique sur leur violence accrue.
        </p>
      </div>

      {/* Types Segmented Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {FLOOD_TYPES.map((t) => {
          const isSelected = t.id === selectedType;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`rounded-xl border p-3.5 text-start transition-all ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500/50 text-cyan-200'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] font-mono-data text-cyan-400 block mb-1">
                {t.id.toUpperCase()}
              </span>
              <h3 className="font-cinzel text-xs sm:text-sm font-bold line-clamp-1">
                {t.nameFr}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Detailed Type Dossier */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono-data uppercase tracking-wider text-cyan-400">
              Dossier Technique & Mécanismes
            </span>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-100 mt-0.5">
              {activeType.nameFr}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono-data text-slate-400">
            <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
              Délai d’alerte : <span className="text-cyan-400 font-semibold">{activeType.warningTimeFr}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-cyan-400 font-cinzel mb-1">
                Mécanisme d’apparition :
              </h4>
              <p className="font-serif-display text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeType.descriptionFr}
              </p>
            </div>

            <div className="rounded-lg bg-slate-950/70 p-4 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-300 font-cinzel mb-1">
                Facteurs déclenchants :
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-serif-display">
                {activeType.causeFr}
              </p>
            </div>
          </div>

          <div className="space-y-3 font-mono-data text-xs">
            <div className="rounded-lg bg-slate-950/80 p-3 border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Vitesse de Déferlement</span>
              <span className="text-amber-400 font-bold text-sm">{activeType.speedFr}</span>
            </div>

            <div className="rounded-lg bg-slate-950/80 p-3 border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Niveau de Létalité</span>
              <span className="text-red-400 font-bold text-xs">{activeType.lethalityFr}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Climate Change & Atmospheric Rivers Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-cinzel text-sm font-bold">
            <ThermometerSun className="h-4 w-4" />
            <span>Thermodynamique : Loi de Clausius-Clapeyron</span>
          </div>
          <p className="font-serif-display text-xs text-slate-300 leading-relaxed">
            Pour chaque degré Celsius de réchauffement mondial (+1°C), l’atmosphère peut contenir environ 7 % de vapeur d’eau additionnelle. Cette concentration accrue alimente des épisodes cévenols et moussons d’une intensité pluviométrique inédite dans l’histoire moderne.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-cinzel text-sm font-bold">
            <Waves className="h-4 w-4" />
            <span>Rivières Atmosphériques (Atmospheric Rivers)</span>
          </div>
          <p className="font-serif-display text-xs text-slate-300 leading-relaxed">
            Véritables fleuves de vapeur invisibles dans la troposphère, ces corridors transportent un débit d’humidité jusqu’à 15 fois supérieur à l’embouchure du Mississippi. Lorsqu’ils frappent le relief côtier, ils déclenchent des inondations éclair catastrophiques en quelques heures.
          </p>
        </div>
      </div>
    </div>
  );
};
