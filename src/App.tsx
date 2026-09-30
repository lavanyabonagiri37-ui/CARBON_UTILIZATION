/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { StepProgressBar } from './components/StepProgressBar';
import { Step1_IndustryInput } from './components/Step1_IndustryInput';
import { Step2_AIProcessing } from './components/Step2_AIProcessing';
import { Step3_UtilisationPrediction } from './components/Step3_UtilisationPrediction';
import { Step4_MultiObjectiveOptimisation } from './components/Step4_MultiObjectiveOptimisation';
import { Step5_BuyerMatching } from './components/Step5_BuyerMatching';
import { Step6_BestRecommendation } from './components/Step6_BestRecommendation';
import { Step7_Dashboard } from './components/Step7_Dashboard';
import { ExportReportModal } from './components/ExportReportModal';

import { IndustryInput, IndustryPreset, OptimizationWeights } from './types/carbon';
import { INDUSTRY_PRESETS } from './data/industryPresets';
import {
  evaluateCO2Characterisation,
  predictUtilisationPathways,
  matchBuyers,
  runMultiObjectiveOptimisation,
  buildRecommendationStrategy
} from './utils/calculations';

export default function App() {
  // 1. Core State
  const [selectedPresetId, setSelectedPresetId] = useState<string>(INDUSTRY_PRESETS[0].id);
  const [industryInput, setIndustryInput] = useState<IndustryInput>(INDUSTRY_PRESETS[0].data);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Optimization priority weights
  const [optimizationWeights, setOptimizationWeights] = useState<OptimizationWeights>({
    co2Utilisation: 0.85,
    carbonReduction: 0.90,
    revenue: 0.75,
    minCost: 0.70,
    minDistance: 0.65,
    minEnergy: 0.60
  });

  // 2. Reactive Calculations
  const characterisation = useMemo(() => {
    return evaluateCO2Characterisation(industryInput);
  }, [industryInput]);

  const rawPathways = useMemo(() => {
    return predictUtilisationPathways(industryInput);
  }, [industryInput]);

  const matchedBuyers = useMemo(() => {
    return matchBuyers(industryInput);
  }, [industryInput]);

  const topBuyer = useMemo(() => {
    return matchedBuyers[0] || matchBuyers(industryInput)[0];
  }, [matchedBuyers, industryInput]);

  const optimizedPathways = useMemo(() => {
    return runMultiObjectiveOptimisation(rawPathways, topBuyer, optimizationWeights);
  }, [rawPathways, topBuyer, optimizationWeights]);

  const bestPathway = useMemo(() => {
    return optimizedPathways[0] || rawPathways[0];
  }, [optimizedPathways, rawPathways]);

  const recommendationStrategy = useMemo(() => {
    return buildRecommendationStrategy(industryInput, characterisation, bestPathway as any, topBuyer);
  }, [industryInput, characterisation, bestPathway, topBuyer]);

  // Handle Preset Selection
  const handleSelectPreset = (preset: IndustryPreset) => {
    setSelectedPresetId(preset.id);
    setIndustryInput(preset.data);
    // Refresh calculations
    setCompletedSteps([1]);
  };

  const handleSelectPresetById = (presetId: string) => {
    const preset = INDUSTRY_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      handleSelectPreset(preset);
    }
  };

  // Step advancement helpers
  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const handleStep1Submit = () => {
    markStepComplete(1);
    markStepComplete(2);
    setCurrentStep(2);
  };

  const handleProceedToPrediction = () => {
    markStepComplete(2);
    markStepComplete(3);
    setCurrentStep(3);
  };

  const handleProceedToOptimisation = () => {
    markStepComplete(3);
    markStepComplete(4);
    setCurrentStep(4);
  };

  const handleProceedToBuyerMatching = () => {
    markStepComplete(4);
    markStepComplete(5);
    setCurrentStep(5);
  };

  const handleProceedToRecommendation = () => {
    markStepComplete(5);
    markStepComplete(6);
    setCurrentStep(6);
    // Subtle celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Safe fallback if blocked
    }
  };

  const handleProceedToDashboard = () => {
    markStepComplete(6);
    markStepComplete(7);
    setCurrentStep(7);
  };

  const handleReset = () => {
    const defaultPreset = INDUSTRY_PRESETS[0];
    setSelectedPresetId(defaultPreset.id);
    setIndustryInput(defaultPreset.data);
    setOptimizationWeights({
      co2Utilisation: 0.85,
      carbonReduction: 0.90,
      revenue: 0.75,
      minCost: 0.70,
      minDistance: 0.65,
      minEnergy: 0.60
    });
    setCurrentStep(1);
    setCompletedSteps([1]);
  };

  const handleRunNewAnalysis = () => {
    setCurrentStep(1);
  };

  // Scroll to top on step transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentStep={currentStep}
        onSelectStep={(step) => setCurrentStep(step)}
        onLoadPreset={handleSelectPreset}
        onReset={handleReset}
        onRunNewAnalysis={handleRunNewAnalysis}
        onOpenReport={() => setIsReportOpen(true)}
        selectedPresetId={selectedPresetId}
      />

      {/* 7-Step Workflow Progress Bar */}
      <StepProgressBar
        currentStep={currentStep}
        completedSteps={completedSteps}
        onSelectStep={(step) => setCurrentStep(step)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentStep === 1 && (
          <Step1_IndustryInput
            input={industryInput}
            onChangeInput={(newInput) => setIndustryInput(newInput)}
            onSubmitAndAnalyze={handleStep1Submit}
            onSelectPreset={handleSelectPresetById}
          />
        )}

        {currentStep === 2 && (
          <Step2_AIProcessing
            input={industryInput}
            characterisation={characterisation}
            onProceedToPrediction={handleProceedToPrediction}
          />
        )}

        {currentStep === 3 && (
          <Step3_UtilisationPrediction
            pathways={rawPathways}
            input={industryInput}
            onProceedToOptimisation={handleProceedToOptimisation}
          />
        )}

        {currentStep === 4 && (
          <Step4_MultiObjectiveOptimisation
            optimizedPathways={optimizedPathways}
            weights={optimizationWeights}
            onChangeWeights={(newWeights) => setOptimizationWeights(newWeights)}
            onProceedToBuyerMatching={handleProceedToBuyerMatching}
          />
        )}

        {currentStep === 5 && (
          <Step5_BuyerMatching
            buyers={matchedBuyers}
            input={industryInput}
            onProceedToRecommendation={handleProceedToRecommendation}
          />
        )}

        {currentStep === 6 && (
          <Step6_BestRecommendation
            strategy={recommendationStrategy}
            onProceedToDashboard={handleProceedToDashboard}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {currentStep === 7 && (
          <Step7_Dashboard
            strategy={recommendationStrategy}
            allPathways={optimizedPathways}
            allBuyers={matchedBuyers}
            onReset={handleReset}
            onRunNewAnalysis={handleRunNewAnalysis}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}
      </main>

      {/* Printable / PDF Executive Dossier Modal */}
      <ExportReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        strategy={recommendationStrategy}
        allPathways={optimizedPathways}
        allBuyers={matchedBuyers}
      />

      {/* Platform Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>AI-Driven Carbon Utilisation Platform • CCUS Intelligence Hub</span>
          </div>
          <div className="text-center sm:text-right">
            <span>Simulated thermodynamic modeling & multi-criteria optimization for industrial decarbonization.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
