import React, { useState } from 'react';
import { SAFETY_CHECKLIST } from '../data/floodData';
import { ShieldCheck, CheckSquare, Square, AlertOctagon } from 'lucide-react';

export const FloodSafetyView: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const emergencyKit = [
    { id: 'kit-1', text: '3 litres d’eau potable par personne et par jour (réserve minimale de 3 jours)' },
    { id: 'kit-2', text: 'Nourriture non périssable en conserve, barres énergétiques et ouvre-boîte manuel' },
    { id: 'kit-3', text: 'Lampe torche étanche à LED, piles de rechange neuves et radio à manivelle/piles' },
    { id: 'kit-4', text: 'Trousse complète de premiers secours et traitements médicaux pour un mois' },
    { id: 'kit-5', text: 'Papiers d’identité, titres de propriété et liquidités sous pochette hermétique étanche' },
    { id: 'kit-6', text: 'Sifflet de détresse sans bille pour alerter les secours sans s’épuiser la voix' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono-data uppercase tracking-widest text-cyan-400">
          Protocoles de Sécurité Civile & Survie
        </span>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100 mt-1">
          Guide de Survie & Réflexes Face à la Crue
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed font-serif-display">
          Consignes opérationnelles validées par les experts pour préserver votre vie et celle de vos proches avant, pendant et après une montée soudaine des eaux.
        </p>
      </div>

      {/* The Golden Rule Callout */}
      <div className="rounded-2xl border border-red-600/40 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-600/20 border border-red-500 text-red-400">
          <AlertOctagon className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono-data uppercase tracking-wider text-red-400 font-bold">
            Règle Fondamentale Internationale de Sécurité
          </span>
          <h3 className="font-cinzel text-lg font-bold text-slate-100">
            « Turn Around, Don’t Drown » — Faites Demi-Tour, Ne Vous Noyez Pas
          </h3>
          <p className="font-serif-display text-xs sm:text-sm text-slate-300 leading-relaxed">
            Plus de 60 % des décès par inondation surviennent à bord de véhicules piégés. Ne forcez jamais une route inondée ou un passage submersible : la chaussée peut être littéralement effondrée sous la turbidité de l'eau, et seulement 30 centimètres d'eau courante suffisent à faire flotter une berline et l'emporter vers un gouffre.
          </p>
        </div>
      </div>

      {/* Safety Phases Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAFETY_CHECKLIST.map((phase, pIdx) => (
          <div
            key={phase.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4"
          >
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-mono-data text-cyan-400 font-bold">0{pIdx + 1}</span>
              <h4 className="font-cinzel text-sm font-bold text-slate-100 mt-0.5">
                {phase.categoryFr}
              </h4>
            </div>

            <ul className="space-y-3 font-serif-display text-xs text-slate-300">
              {phase.itemsFr.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Interactive Emergency Go-Bag Checklist */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-cinzel text-base font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyan-400" />
              <span>Checklist du Sac d’Évacuation d’Urgence (Go-Bag)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cochez chaque élément présent et vérifié dans votre kit de survie à domicile :
            </p>
          </div>
          <span className="font-mono-data text-xs bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-cyan-400">
            {Object.values(checkedItems).filter(Boolean).length} / {emergencyKit.length} Prêts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {emergencyKit.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-start gap-3 rounded-lg border p-3 text-start transition-all text-xs ${
                  isChecked
                    ? 'border-emerald-600/60 bg-emerald-950/20 text-emerald-200'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                )}
                <span className={isChecked ? 'line-through opacity-80' : ''}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
