import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/disastersData';
import { CheckCircle2, XCircle, Award, RotateCcw, HelpCircle } from 'lucide-react';

export const DisasterQuiz: React.FC = () => {
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
    QUIZ_QUESTIONS.forEach((q) => {
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
  const allAnswered = Object.keys(selectedAnswers).length === QUIZ_QUESTIONS.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="border-b border-stone-800 pb-4 text-center">
        <span className="text-xs font-mono-data uppercase tracking-widest text-amber-500">
          Évaluation des Connaissances
        </span>
        <h2 className="font-cinzel text-2xl font-bold text-stone-100 mt-1">
          Quiz sur le Cataclysme de 1902
        </h2>
        <p className="text-xs text-stone-400 mt-2 font-serif-display">
          Vérifiez votre compréhension des événements après avoir visionné le montage documentaire.
        </p>
      </div>

      {showResults && (
        <div className="rounded-xl border border-amber-600/40 bg-stone-900/90 p-6 text-center backdrop-blur-md shadow-xl">
          <Award className="h-12 w-12 text-amber-400 mx-auto mb-2" />
          <h3 className="font-cinzel text-xl font-bold text-stone-100">
            Votre Score : <span className="text-amber-400">{score}</span> / {QUIZ_QUESTIONS.length}
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            {score === QUIZ_QUESTIONS.length
              ? 'Félicitations ! Vous maîtrisez parfaitement l’histoire de ce cataclysme volcanique.'
              : score >= 2
              ? 'Très bon résultat ! Vous avez retenu l’essentiel des faits historiques de la Montagne Pelée.'
              : 'N’hésitez pas à revisionner le montage vidéo pour redécouvrir les détails cruciaux.'}
          </p>
          <button
            onClick={resetQuiz}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-stone-950 hover:bg-amber-500 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Recommencer le Quiz
          </button>
        </div>
      )}

      <div className="space-y-5">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="rounded-xl border border-stone-800 bg-stone-900/60 p-5 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-800 text-xs font-mono-data text-amber-400">
                  0{idx + 1}
                </span>
                <h4 className="font-cinzel text-sm font-semibold text-stone-100 leading-snug">
                  {q.question}
                </h4>
              </div>

              <div className="space-y-2 pl-9">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  let btnStyle = 'border-stone-800 bg-stone-950/60 text-stone-300 hover:bg-stone-800 hover:border-stone-700';

                  if (showResults) {
                    if (optIdx === q.correctAnswer) {
                      btnStyle = 'border-emerald-600/60 bg-emerald-950/40 text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'border-red-600/60 bg-red-950/40 text-red-200';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-amber-500 bg-stone-900 text-amber-300 ring-1 ring-amber-500/50';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={showResults}
                      className={`flex w-full items-center justify-between rounded-lg border p-3 text-left text-xs transition-colors ${btnStyle}`}
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
                <div className="mt-3 ml-9 rounded-lg bg-stone-950/80 p-3 border border-stone-800 text-xs text-stone-400">
                  <span className="font-semibold text-amber-400 block mb-0.5">Explication :</span>
                  {q.explanation}
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
            className="rounded-lg bg-amber-600 px-6 py-2.5 text-xs font-semibold text-stone-950 hover:bg-amber-500 disabled:opacity-40 disabled:hover:bg-amber-600 transition-all shadow-md"
          >
            Valider mes réponses ({Object.keys(selectedAnswers).length}/{QUIZ_QUESTIONS.length})
          </button>
        </div>
      )}
    </div>
  );
};
