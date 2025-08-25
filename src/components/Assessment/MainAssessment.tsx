import { useState } from "react";
import AssessmentIntro from "./AssessmentIntro";
import AssessmentProgress from "./AssessmentProgress";
import PsychometricSection from "./PsychometricSection";
import TechnicalSection from "./TechnicalSection";
import WiscarSection from "./WiscarSection";
import AssessmentResults from "./AssessmentResults";

type AssessmentStep = 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';

interface AssessmentScores {
  psychometric: { [key: string]: number };
  technical: { [key: string]: number };
  wiscar: { [key: string]: number };
}

const MainAssessment = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro');
  const [scores, setScores] = useState<AssessmentScores>({
    psychometric: {},
    technical: {},
    wiscar: {}
  });

  const steps = [
    'Introduction',
    'Psychometric',
    'Technical',
    'WISCAR',
    'Results'
  ];

  const getStepNumber = (step: AssessmentStep): number => {
    switch (step) {
      case 'intro': return 1;
      case 'psychometric': return 2;
      case 'technical': return 3;
      case 'wiscar': return 4;
      case 'results': return 5;
      default: return 1;
    }
  };

  const handleStartAssessment = () => {
    setCurrentStep('psychometric');
  };

  const handlePsychometricComplete = (psychometricScores: { [key: string]: number }) => {
    setScores(prev => ({
      ...prev,
      psychometric: psychometricScores
    }));
    setCurrentStep('technical');
  };

  const handleTechnicalComplete = (technicalScores: { [key: string]: number }) => {
    setScores(prev => ({
      ...prev,
      technical: technicalScores
    }));
    setCurrentStep('wiscar');
  };

  const handleWiscarComplete = (wiscarScores: { [key: string]: number }) => {
    setScores(prev => ({
      ...prev,
      wiscar: wiscarScores
    }));
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setScores({
      psychometric: {},
      technical: {},
      wiscar: {}
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
      
      case 'psychometric':
        return (
          <div className="min-h-screen bg-background p-4">
            <div className="max-w-4xl mx-auto">
              <AssessmentProgress 
                currentStep={getStepNumber(currentStep)} 
                totalSteps={5} 
                steps={steps}
              />
              <PsychometricSection onComplete={handlePsychometricComplete} />
            </div>
          </div>
        );
      
      case 'technical':
        return (
          <div className="min-h-screen bg-background p-4">
            <div className="max-w-4xl mx-auto">
              <AssessmentProgress 
                currentStep={getStepNumber(currentStep)} 
                totalSteps={5} 
                steps={steps}
              />
              <TechnicalSection onComplete={handleTechnicalComplete} />
            </div>
          </div>
        );
      
      case 'wiscar':
        return (
          <div className="min-h-screen bg-background p-4">
            <div className="max-w-4xl mx-auto">
              <AssessmentProgress 
                currentStep={getStepNumber(currentStep)} 
                totalSteps={5} 
                steps={steps}
              />
              <WiscarSection onComplete={handleWiscarComplete} />
            </div>
          </div>
        );
      
      case 'results':
        return <AssessmentResults scores={scores} onRestart={handleRestart} />;
      
      default:
        return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
    }
  };

  return renderStep();
};

export default MainAssessment;