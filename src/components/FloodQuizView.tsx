import React, { useState } from 'react';
import { FLOOD_QUIZ } from '../data/floodData';
import { CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';

export const FloodQuizView: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    FLOOD_QUIZ.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(selectedAnswers).length === FLOOD_QUIZ.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="border-b border-slate-800 pb-4 text-center">
        <span className="text-xs font-mono-data uppercase tracking-widest text-cyan-400">
          Évaluation des Réflexes & Connaissances
        </span>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100 mt-1">
          Quiz de Survie & Prévention des Inondations
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-serif-display">
          Testez vos réflexes face à la montée des eaux et vérifiez votre préparation aux aléas hydrologiques extrêmes.
        </p>
      </div>

      {showResults && (
        <div className="rounded-2xl border border-cyan-600/40 bg-slate-900/90 p-6 text-center backdrop-blur-md shadow-xl">
          <Award className="h-12 w-12 text-cyan-400 mx-auto mb-2" />
          <h3 className="font-cinzel text-xl font-bold text-slate-100">
            Votre Score : <span className="text-cyan-400">{score}</span> / {FLOOD_QUIZ.length}
          </h3>
          <p className="text-xs text-slate-300 mt-1 font-serif-display">
            {score === FLOOD_QUIZ.length
              ? 'Excellent ! Vous possédez les réflexes parfaits pour réagir efficacement face au risque d’inondation.'
              : score >= 2
              ? 'Bon résultat ! Vos bases de sécurité civile sont solides et vous saurez éviter les pièges mortels.'
              : 'Prenez le temps de relire les fiches pratiques du guide pour renforcer vos réflexes vitaux.'}
          </p>
          <button
            onClick={resetQuiz}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-500 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Recommencer le Quiz</span>
          </button>
        </div>
      )}

      <div className="space-y-5">
        {FLOOD_QUIZ.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;
          const options = q.optionsFr;

          return (
            <div
              key={q.id}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-mono-data text-cyan-400 font-bold">
                  0{idx + 1}
                </span>
                <h4 className="font-cinzel text-sm font-bold text-slate-100 leading-snug">
                  {q.questionFr}
                </h4>
              </div>

              <div className="space-y-2 ps-9">
                {options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  let btnStyle = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800 hover:border-slate-700';

                  if (showResults) {
                    if (optIdx === q.correctAnswer) {
                      btnStyle = 'border-emerald-600/60 bg-emerald-950/40 text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'border-red-600/60 bg-red-950/40 text-red-200';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-cyan-500 bg-slate-900 text-cyan-300 ring-1 ring-cyan-500/50';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={showResults}
                      className={`flex w-full items-center justify-between rounded-lg border p-3 text-start text-xs transition-colors ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showResults && optIdx === q.correctAnswer && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      )}
                      {showResults && isSelected && !isCorrect && (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-3 ms-9 rounded-lg bg-slate-950/80 p-3 border border-slate-800 text-xs text-slate-400 font-serif-display">
                  <span className="font-bold text-cyan-400 block mb-0.5">
                    Explication Scientifique :
                  </span>
                  {q.explanationFr}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!showResults && (
        <div className="text-center pt-2">
          <button
            onClick={() => setShowResults(true)}
            disabled={!allAnswered}
            className="rounded-lg bg-cyan-600 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-500 disabled:opacity-40 disabled:hover:bg-cyan-600 transition-all shadow-md"
          >
            Valider mes réponses ({Object.keys(selectedAnswers).length}/{FLOOD_QUIZ.length})
          </button>
        </div>
      )}
    </div>
  );
};
