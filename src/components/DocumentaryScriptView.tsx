import React, { useState } from 'react';
import { Scene, DisasterProfile } from '../types/montage';
import { Play, Download, Copy, Check, FileText, Camera, Volume2, Sparkles } from 'lucide-react';
import { speechNarrator } from '../services/speechNarrator';

interface DocumentaryScriptViewProps {
  disaster: DisasterProfile;
  scenes: Scene[];
  onPlayScene: (index: number) => void;
}

export const DocumentaryScriptView: React.FC<DocumentaryScriptViewProps> = ({
  disaster,
  scenes,
  onPlayScene,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const content = `DOCUMENTAIRE : ${disaster.frenchTitle.toUpperCase()}
Date du Cataclysme : ${disaster.date}
Lieu : ${disaster.location}
Bilan Humain : ${disaster.deathToll}

SYNOPSIS :
${disaster.summaryFr}

=======================================================
FEUILLE DE ROUTE & DÉCOUPAGE TECHNIQUE DU MONTAGE VIDÉO
=======================================================

${scenes
  .map(
    (s) => `[SCÈNE 0${s.order} : ${s.title.toUpperCase()}]
Indicateur temporel : ${s.timestampDisplay}
Mouvement caméra : ${s.animation} | Durée : ${s.duration} secondes
Ambiance sonore : ${s.soundMood}

VOIX OFF (FRANÇAIS) :
« ${s.narrationFr} »

SOUS-TITRES SYNCHRONISÉS :
${s.subtitles.map((sub) => `  [${sub.start}s - ${sub.end}s] ${sub.text}`).join('\n')}

NOTES HISTORIQUES & ARCHIVES :
${s.historicalFact}
${s.eyewitnessQuote ? `Témoin : « ${s.eyewitnessQuote.text} » — ${s.eyewitnessQuote.author}` : ''}
`
  )
  .join('\n-------------------------------------------------------\n\n')}`;

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = `DOCUMENTAIRE : ${disaster.frenchTitle.toUpperCase()}\n\n` +
      scenes.map(s => `[PLAN ${s.order}] ${s.title}\nVoix Off : ${s.narrationFr}\n`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `montage_cataclysme_1902_script.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <span className="text-xs font-mono-data uppercase tracking-widest text-amber-500">
            Dossier de Production & Scénario
          </span>
          <h2 className="font-cinzel text-xl font-bold text-stone-100 mt-1">
            Scénario Intégral & Découpage Voix Off
          </h2>
          <p className="text-xs text-stone-400 mt-1 font-serif-display">
            Transcription complète du documentaire audio-visuel avec repères temporels et didascalies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs text-stone-300 hover:border-amber-500/50 hover:text-amber-300 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copié !' : 'Copier'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-stone-950 hover:bg-amber-500 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Télécharger TXT</span>
          </button>
        </div>
      </div>

      {/* Narrative cue sheets */}
      <div className="space-y-6">
        {scenes.map((scene, idx) => (
          <div
            key={scene.id}
            className="overflow-hidden rounded-xl border border-stone-800 bg-stone-900/60 shadow-lg"
          >
            {/* Cue Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 bg-stone-950/60 px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="rounded bg-amber-600/20 px-2 py-0.5 text-xs font-mono-data font-semibold text-amber-400">
                  Plan 0{scene.order}
                </span>
                <h3 className="font-cinzel text-sm font-bold text-stone-100">
                  {scene.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-400 font-mono-data">
                <span className="flex items-center gap-1">
                  <Camera className="h-3 w-3 text-stone-500" />
                  {scene.animation}
                </span>
                <span>·</span>
                <span>{scene.duration}s</span>
                <button
                  onClick={() => onPlayScene(idx)}
                  className="rounded bg-stone-800 px-2 py-1 text-stone-200 hover:bg-amber-600 hover:text-stone-950 transition-colors flex items-center gap-1"
                >
                  <Play className="h-3 w-3 fill-current" />
                  Visionner
                </button>
              </div>
            </div>

            {/* Cue Body Split */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
              {/* Left Column: Visual Thumbnail and Technical Didascalies */}
              <div className="space-y-3">
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-stone-800 bg-black">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-1 text-[11px] text-stone-400 font-mono-data">
                  <div className="flex justify-between border-b border-stone-800/60 pb-1">
                    <span>Lieu / Date :</span>
                    <span className="text-stone-200">{scene.timestampDisplay}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800/60 pb-1">
                    <span>Ambiance :</span>
                    <span className="text-amber-400 capitalize">{scene.soundMood}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Secousse :</span>
                    <span className="text-stone-200 capitalize">{scene.shakeIntensity}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Voiceover text & Historical Quote */}
              <div className="md:col-span-2 space-y-4">
                <div className="rounded-lg bg-stone-950/70 p-4 border border-stone-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 flex items-center gap-1.5">
                      <Volume2 className="h-3.5 w-3.5" />
                      Voix Off (Français)
                    </span>
                    <button
                      onClick={() => speechNarrator.speak(scene.narrationFr)}
                      className="text-[11px] text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                    >
                      <Play className="h-2.5 w-2.5 fill-current" />
                      Écouter
                    </button>
                  </div>
                  <p className="font-serif-display text-sm text-stone-100 leading-relaxed italic">
                    « {scene.narrationFr} »
                  </p>
                </div>

                {/* Subtitles breakdown */}
                <div>
                  <span className="text-[11px] font-mono-data uppercase tracking-wider text-stone-500 block mb-1.5">
                    Sous-titres séquencés :
                  </span>
                  <div className="space-y-1">
                    {scene.subtitles.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-start gap-2 text-xs text-stone-300 font-sans"
                      >
                        <span className="font-mono-data text-[10px] text-amber-500/80 shrink-0 pt-0.5">
                          {sub.start}s-{sub.end}s
                        </span>
                        <span>{sub.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {scene.eyewitnessQuote && (
                  <div className="border-l-2 border-stone-700 pl-3 pt-1">
                    <p className="text-xs text-stone-400 italic">
                      « {scene.eyewitnessQuote.text} »
                    </p>
                    <span className="text-[10px] text-stone-500 font-semibold block mt-0.5">
                      — {scene.eyewitnessQuote.author} ({scene.eyewitnessQuote.role})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
