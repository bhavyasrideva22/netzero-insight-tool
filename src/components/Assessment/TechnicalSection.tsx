import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calculator, BookOpen, Lightbulb } from "lucide-react";

interface TechnicalQuestion {
  id: string;
  category: 'aptitude' | 'knowledge' | 'domain';
  question: string;
  options: { value: string; label: string; correct?: boolean }[];
}

interface TechnicalSectionProps {
  onComplete: (scores: { [key: string]: number }) => void;
}

const technicalQuestions: TechnicalQuestion[] = [
  // General Aptitude
  {
    id: "apt_1",
    category: "aptitude",
    question: "If Company A reduces emissions by 25% and Company B by 40%, and both started with the same baseline, what's the ratio of A's remaining emissions to B's?",
    options: [
      { value: "a", label: "1.25:1", correct: true },
      { value: "b", label: "0.75:1", correct: false },
      { value: "c", label: "1.5:1", correct: false },
      { value: "d", label: "0.6:1", correct: false }
    ]
  },
  {
    id: "apt_2",
    category: "aptitude",
    question: "A pattern shows: 2, 8, 32, 128, ... What's the next number?",
    options: [
      { value: "a", label: "256", correct: false },
      { value: "b", label: "512", correct: true },
      { value: "c", label: "384", correct: false },
      { value: "d", label: "640", correct: false }
    ]
  },
  // Prerequisite Knowledge
  {
    id: "know_1",
    category: "knowledge",
    question: "Which statistical measure is most appropriate for understanding the central tendency of a highly skewed dataset?",
    options: [
      { value: "a", label: "Mean", correct: false },
      { value: "b", label: "Median", correct: true },
      { value: "c", label: "Mode", correct: false },
      { value: "d", label: "Standard deviation", correct: false }
    ]
  },
  {
    id: "know_2",
    category: "knowledge",
    question: "What does a correlation coefficient of -0.85 indicate?",
    options: [
      { value: "a", label: "Strong positive relationship", correct: false },
      { value: "b", label: "Weak negative relationship", correct: false },
      { value: "c", label: "Strong negative relationship", correct: true },
      { value: "d", label: "No relationship", correct: false }
    ]
  },
  {
    id: "know_3",
    category: "knowledge",
    question: "In environmental science, what is the primary cause of the greenhouse effect?",
    options: [
      { value: "a", label: "Ozone depletion", correct: false },
      { value: "b", label: "Solar radiation increase", correct: false },
      { value: "c", label: "Atmospheric gases trapping heat", correct: true },
      { value: "d", label: "Ocean temperature rise", correct: false }
    ]
  },
  // Domain-Specific
  {
    id: "domain_1",
    category: "domain",
    question: "In carbon accounting, what are Scope 2 emissions?",
    options: [
      { value: "a", label: "Direct emissions from owned sources", correct: false },
      { value: "b", label: "Indirect emissions from purchased energy", correct: true },
      { value: "c", label: "Indirect emissions from value chain", correct: false },
      { value: "d", label: "Emissions from waste disposal", correct: false }
    ]
  },
  {
    id: "domain_2",
    category: "domain",
    question: "What is the primary purpose of Science-Based Targets (SBTs)?",
    options: [
      { value: "a", label: "To comply with government regulations", correct: false },
      { value: "b", label: "To align with climate science for 1.5°C warming", correct: true },
      { value: "c", label: "To reduce operating costs", correct: false },
      { value: "d", label: "To improve brand reputation", correct: false }
    ]
  },
  {
    id: "domain_3",
    category: "domain",
    question: "Which framework is most commonly used for corporate sustainability reporting?",
    options: [
      { value: "a", label: "ISO 9001", correct: false },
      { value: "b", label: "GRI Standards", correct: true },
      { value: "c", label: "IFRS", correct: false },
      { value: "d", label: "GAAP", correct: false }
    ]
  },
  {
    id: "domain_4",
    category: "domain",
    question: "What does 'net-zero' mean in the context of carbon emissions?",
    options: [
      { value: "a", label: "Zero emissions produced", correct: false },
      { value: "b", label: "Balance between emissions produced and removed", correct: true },
      { value: "c", label: "50% reduction in emissions", correct: false },
      { value: "d", label: "Compliance with Paris Agreement", correct: false }
    ]
  }
];

const TechnicalSection = ({ onComplete }: TechnicalSectionProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const currentQuestion = technicalQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === technicalQuestions.length - 1;
  const canProceed = answers[currentQuestion.id];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const scores = calculateScores(answers);
      onComplete(scores);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScores = (answers: { [key: string]: string }) => {
    const categoryScores: { [key: string]: { correct: number; total: number } } = {
      aptitude: { correct: 0, total: 0 },
      knowledge: { correct: 0, total: 0 },
      domain: { correct: 0, total: 0 }
    };

    technicalQuestions.forEach(question => {
      const answer = answers[question.id];
      const category = question.category;
      
      categoryScores[category].total++;
      
      if (answer) {
        const selectedOption = question.options.find(opt => opt.value === answer);
        if (selectedOption?.correct) {
          categoryScores[category].correct++;
        }
      }
    });

    // Calculate percentage scores
    const finalScores: { [key: string]: number } = {};
    Object.keys(categoryScores).forEach(category => {
      const { correct, total } = categoryScores[category];
      finalScores[category] = total > 0 ? Math.round((correct / total) * 100) : 0;
    });

    // Calculate overall technical score
    const overallAverage = Object.values(finalScores).reduce((sum, score) => sum + score, 0) / Object.keys(finalScores).length;
    finalScores.overall = Math.round(overallAverage);

    return finalScores;
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'aptitude': return <Lightbulb className="h-5 w-5" />;
      case 'knowledge': return <BookOpen className="h-5 w-5" />;
      case 'domain': return <Calculator className="h-5 w-5" />;
      default: return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'aptitude': return 'General Aptitude';
      case 'knowledge': return 'Prerequisite Knowledge';
      case 'domain': return 'Net-Zero Domain Knowledge';
      default: return 'Technical Assessment';
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            {getIcon(currentQuestion.category)}
            {getCategoryTitle(currentQuestion.category)}
          </CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {technicalQuestions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            
            <RadioGroup 
              value={answers[currentQuestion.id] || ""} 
              onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.value} id={`${currentQuestion.id}_${option.value}`} />
                  <Label htmlFor={`${currentQuestion.id}_${option.value}`} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
            >
              {isLastQuestion ? 'Complete Section' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalSection;