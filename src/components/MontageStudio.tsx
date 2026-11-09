import React, { useState } from 'react';
import { Scene, AnimationType, ShakeIntensity, SoundMood } from '../types/montage';
import { Play, Volume2, Film, Clock, Activity, Wand2, Check } from 'lucide-react';
import { speechNarrator } from '../services/speechNarrator';
import { soundEngine } from '../services/soundEngine';

interface MontageStudioProps {
  scenes: Scene[];
  onUpdateScene: (sceneId: string, updatedFields: Partial<Scene>) => void;
  activeSceneIndex: number;
  setActiveSceneIndex: (index: number) => void;
}

export const MontageStudio: React.FC<MontageStudioProps> = ({
  scenes,
  onUpdateScene,
  activeSceneIndex,
  setActiveSceneIndex,
}) => {
  const selectedScene = scenes[activeSceneIndex] || scenes[0];
  const [copiedScript, setCopiedScript] = useState(false);

  const handleTestVoice = (text: string) => {
    speechNarrator.speak(text);
  };

  const handleTestSound = (mood: SoundMood) => {
    soundEngine.setSceneMood(mood);
  };

  const copyFullScript = () => {
    const fullText = scenes
      .map(
        (s) =>
          `[SCÈNE ${s.order} : ${s.title.toUpperCase()}]\nPlan : ${s.subtitle}\nDurée : ${s.duration} secondes\nVoix-Off :\n« ${s.narrationFr} »\n`
      )
      .join('\n---\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-stone-100 flex items-center gap-2">
            <Film className="h-5 w-5 text-amber-500" />
            Studio de Montage & Personnalisation
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Ajustez le découpage, les mouvements de caméra (Ken Burns), les effets de secousse et le texte de la voix off française.
          </p>
        </div>

        <button
          onClick={copyFullScript}
          className="flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs font-medium text-stone-300 hover:border-amber-500/50 hover:text-amber-300 transition-colors"
        >
          {copiedScript ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Wand2 className="h-3.5 w-3.5 text-amber-400" />}
          <span>{copiedScript ? 'Script Copié !' : 'Copier le Script Intégral'}</span>
        </button>
      </div>

      {/* Interactive Multi-track Timeline */}
      <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-4">
        <span className="text-[11px] font-mono-data uppercase tracking-wider text-amber-400 block mb-3">
          Chronologie des Pistes (Timeline Multi-Pistes)
        </span>

        <div className="grid grid-cols-4 gap-2">
          {scenes.map((scene, idx) => {
            const isSelected = idx === activeSceneIndex;
            return (
              <button
                key={scene.id}
                onClick={() => setActiveSceneIndex(idx)}
                className={`relative flex flex-col justify-between rounded-lg p-3 text-left transition-all border ${
                  isSelected
                    ? 'border-amber-500 bg-stone-900 ring-1 ring-amber-500/40'
                    : 'border-stone-800/80 bg-stone-900/50 hover:bg-stone-900/80 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono-data text-stone-400 mb-2">
                  <span className="text-amber-400 font-bold">0{scene.order}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {scene.duration}s
                  </span>
                </div>

                <div className="aspect-video w-full overflow-hidden rounded mb-2 bg-stone-950">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h4 className="text-xs font-semibold text-stone-200 line-clamp-1">{scene.title}</h4>
                <div className="mt-2 flex items-center justify-between text-[10px] text-stone-500">
                  <span className="capitalize">{scene.animation.replace('-', ' ')}</span>
                  {scene.shakeIntensity !== 'none' && (
                    <span className="text-amber-400 flex items-center gap-0.5">
                      <Activity className="h-2.5 w-2.5" /> Séisme
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scene Inspector & Editor */}
      <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
          <div>
            <span className="text-[10px] font-mono-data uppercase tracking-wider text-amber-500">
              Édition de la Scène 0{selectedScene.order}
            </span>
            <h3 className="font-cinzel text-base font-bold text-stone-100">{selectedScene.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTestVoice(selectedScene.narrationFr)}
              className="flex items-center gap-1.5 rounded-lg bg-stone-800 px-3 py-1.5 text-xs text-stone-200 hover:bg-stone-700 transition-colors"
            >
              <Play className="h-3.5 w-3.5 text-amber-400 fill-current" />
              <span>Tester la Voix Off</span>
            </button>
            <button
              onClick={() => handleTestSound(selectedScene.soundMood)}
              className="flex items-center gap-1.5 rounded-lg bg-stone-800 px-3 py-1.5 text-xs text-stone-200 hover:bg-stone-700 transition-colors"
            >
              <Volume2 className="h-3.5 w-3.5 text-orange-400" />
              <span>Tester l'Ambiance</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Controls Column 1: Duration & Motion */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                Durée d'affichage du plan ({selectedScene.duration} secondes)
              </label>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={selectedScene.duration}
                onChange={(e) =>
                  onUpdateScene(selectedScene.id, { duration: parseInt(e.target.value) })
                }
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono-data mt-1">
                <span>5 sec</span>
                <span>15 sec</span>
                <span>25 sec</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                Mouvement Caméra Cinématographique
              </label>
              <select
                value={selectedScene.animation}
                onChange={(e) =>
                  onUpdateScene(selectedScene.id, { animation: e.target.value as AnimationType })
                }
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200"
              >
                <option value="zoom-in">Zoom Avant Lente (Impact dramatique)</option>
                <option value="zoom-out">Zoom Arrière (Révélation d'échelle)</option>
                <option value="pan-left">Panoramique vers la gauche</option>
                <option value="pan-right">Panoramique vers la droite</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                Secousses Sismiques & Onde de Choc
              </label>
              <select
                value={selectedScene.shakeIntensity}
                onChange={(e) =>
                  onUpdateScene(selectedScene.id, { shakeIntensity: e.target.value as ShakeIntensity })
                }
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200"
              >
                <option value="none">Aucune (Image stable)</option>
                <option value="light">Légère (Frémissement tellurique)</option>
                <option value="intense">Intense (Cataclysme & nuée ardente)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                Ambiance Sonore Associée
              </label>
              <select
                value={selectedScene.soundMood}
                onChange={(e) =>
                  onUpdateScene(selectedScene.id, { soundMood: e.target.value as SoundMood })
                }
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200"
              >
                <option value="calm-port">Calme de la rade & brise marine</option>
                <option value="warning-rumble">Gronderie sourde & menace</option>
                <option value="cataclysm-explosion">Détonation explosive & fournaise</option>
                <option value="eerie-silence">Désolation & souffle des cendres</option>
              </select>
            </div>
          </div>

          {/* Controls Column 2 & 3: French Voiceover Script Editing */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                Texte de la Narration Voix Off (Français)
              </label>
              <textarea
                rows={4}
                value={selectedScene.narrationFr}
                onChange={(e) =>
                  onUpdateScene(selectedScene.id, { narrationFr: e.target.value })
                }
                className="w-full rounded-lg border border-stone-700 bg-stone-950 p-3 font-serif-display text-sm text-stone-100 focus:border-amber-500 focus:outline-none"
                placeholder="Rédigez le texte que prononcera la voix off..."
              />
              <p className="text-[11px] text-stone-500 mt-1">
                La synthèse vocale lira ce texte en rythme avec le plan du montage.
              </p>
            </div>

            <div className="rounded-lg bg-stone-950/70 p-3.5 border border-stone-800">
              <span className="text-[11px] font-mono-data uppercase tracking-wider text-amber-500 block mb-1">
                Contexte & Faits Historiques Associés
              </span>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                {selectedScene.historicalFact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
