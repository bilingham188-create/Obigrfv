import React, { useState } from 'react';
import { FloodScene, CameraAnimation, FloodSoundMood } from '../types/flood';
import { Film, Clock, Volume2, Wand2, Check } from 'lucide-react';
import { floodAudio } from '../services/floodAudio';

interface FloodMontageEditorProps {
  scenes: FloodScene[];
  onUpdateScene: (sceneId: string, updatedFields: Partial<FloodScene>) => void;
  activeSceneIndex: number;
  setActiveSceneIndex: (index: number) => void;
}

export const FloodMontageEditor: React.FC<FloodMontageEditorProps> = ({
  scenes,
  onUpdateScene,
  activeSceneIndex,
  setActiveSceneIndex,
}) => {
  const selectedScene = scenes[activeSceneIndex] || scenes[0];
  const [copied, setCopied] = useState(false);

  const handleTestSound = (mood: FloodSoundMood) => {
    floodAudio.setMood(mood);
  };

  const copyScript = () => {
    const fullText = scenes
      .map(
        (s) =>
          `[SÉQUENCE 0${s.order} : ${s.titleFr.toUpperCase()}]\nPlan : ${s.subtitleFr}\nDurée : ${s.duration} secondes\nCaméra : ${s.animation}\nAmbiance sonore : ${s.soundMood}\n\nSous-titres :\n${s.subtitles.map(sub => `  [${sub.start}s - ${sub.end}s] ${sub.textFr}`).join('\n')}\n\nFait Hydrologique :\n${s.scientificFactFr}`
      )
      .join('\n\n----------------------------------------------------\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-slate-100 flex items-center gap-2">
            <Film className="h-5 w-5 text-cyan-400" />
            <span>Studio de Montage & Personnalisation des Séquences</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ajustez la durée des plans, le cadrage dynamique (Ken Burns) et les sous-titres descriptifs du film.
          </p>
        </div>

        <button
          onClick={copyScript}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Wand2 className="h-3.5 w-3.5 text-cyan-400" />}
          <span>{copied ? 'Scénario Copié !' : 'Copier le Découpage Technique'}</span>
        </button>
      </div>

      {/* Multi-track timeline preview */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
        <span className="text-[11px] font-mono-data uppercase tracking-wider text-cyan-400 block mb-3">
          Timeline des Séquences (Bande Visuelle & Effets) :
        </span>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {scenes.map((scene, idx) => {
            const isSelected = idx === activeSceneIndex;
            return (
              <button
                key={scene.id}
                onClick={() => setActiveSceneIndex(idx)}
                className={`relative flex flex-col justify-between rounded-lg p-3 text-start transition-all border ${
                  isSelected
                    ? 'border-cyan-500 bg-slate-900 ring-1 ring-cyan-500/40'
                    : 'border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-400 mb-2">
                  <span className="text-cyan-400 font-bold">0{scene.order}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {scene.duration}s
                  </span>
                </div>

                <div className="aspect-video w-full overflow-hidden rounded mb-2 bg-slate-950">
                  <img
                    src={scene.image}
                    alt={scene.titleFr}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h4 className="font-cinzel text-xs font-bold text-slate-200 line-clamp-1">
                  {scene.titleFr}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scene Details Editor */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <span className="text-[10px] font-mono-data uppercase tracking-wider text-cyan-400">
              Configuration du Plan 0{selectedScene.order}
            </span>
            <h3 className="font-cinzel text-base font-bold text-slate-100">
              {selectedScene.titleFr}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTestSound(selectedScene.soundMood)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <Volume2 className="h-3.5 w-3.5 text-blue-400" />
              <span>Tester l’Ambiance Sonore</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Durée d’exposition ({selectedScene.duration} secondes)
              </label>
              <input
                type="range"
                min="6"
                max="25"
                step="1"
                value={selectedScene.duration}
                onChange={(e) =>
                  onUpdateScene(selectedScene.id, { duration: parseInt(e.target.value) })
                }
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono-data mt-1">
                <span>6 sec</span>
                <span>15 sec</span>
                <span>25 sec</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Mouvement de Caméra (Ken Burns)
              </label>
              <select
                value={selectedScene.animation}
                onChange={(e) =>
                  onUpdateScene(selectedScene.id, { animation: e.target.value as CameraAnimation })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200"
              >
                <option value="zoom-in">Zoom Avant Lent (Intensification)</option>
                <option value="zoom-out">Zoom Arrière (Révélation d’ensemble)</option>
                <option value="pan-left">Panoramique vers la Gauche</option>
                <option value="pan-right">Panoramique vers la Droite</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Texte Descriptif & Sous-titres (Français)
              </label>
              <textarea
                rows={3}
                value={selectedScene.narrationFr}
                onChange={(e) =>
                  onUpdateScene(selectedScene.id, { narrationFr: e.target.value })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs sm:text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="rounded-lg bg-slate-950/70 p-3 border border-slate-800">
              <span className="text-[10px] font-mono-data uppercase tracking-wider text-cyan-400 block mb-1">
                Donnée Hydrologique Clé :
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedScene.scientificFactFr}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
