import React from 'react';
import {
  UploadCloud,
  Cpu,
  Sparkles,
  SlidersHorizontal,
  Users,
  Award,
  LayoutDashboard,
  CheckCircle2
} from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  completedSteps: number[];
  onSelectStep: (step: number) => void;
}

const STEPS = [
  { id: 1, title: '1. Industry CO₂ Input', icon: UploadCloud, short: 'Upload CO₂' },
  { id: 2, title: '2. Data Processing', icon: Cpu, short: 'AI Processing' },
  { id: 3, title: '3. Utilisation Prediction', icon: Sparkles, short: 'AI Prediction' },
  { id: 4, title: '4. Optimisation Engine', icon: SlidersHorizontal, short: 'Optimisation' },
  { id: 5, title: '5. Buyer Matching', icon: Users, short: 'Buyer Match' },
  { id: 6, title: '6. AI Recommendation', icon: Award, short: 'Strategy' },
  { id: 7, title: '7. Final Dashboard', icon: LayoutDashboard, short: 'Dashboard' }
];

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  completedSteps,
  onSelectStep
}) => {
  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between overflow-x-auto no-scrollbar py-1 gap-2 sm:gap-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = currentStep === step.id;
              const isCompleted = completedSteps.includes(step.id);
              const isClickable = isCompleted || step.id <= Math.max(...completedSteps, 1) + 1;

              return (
                <li key={step.id} className="flex-1 min-w-[110px] sm:min-w-[130px]">
                  <button
                    disabled={!isClickable}
                    onClick={() => onSelectStep(step.id)}
                    className={`w-full group flex flex-col items-center text-left py-1.5 px-2 rounded-xl transition-all duration-200 ${
                      isCurrent
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm'
                        : isCompleted
                        ? 'hover:bg-slate-800/80 text-slate-300 border border-transparent cursor-pointer'
                        : isClickable
                        ? 'hover:bg-slate-800/40 text-slate-400 border border-transparent cursor-pointer'
                        : 'opacity-40 cursor-not-allowed border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          isCurrent
                            ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20'
                            : isCompleted
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/60'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isCompleted && !isCurrent ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Icon className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Step 0{step.id}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-medium truncate w-full text-center ${
                        isCurrent
                          ? 'text-emerald-300 font-semibold'
                          : isCompleted
                          ? 'text-slate-200'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.short}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
