import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, Heart, Target, Zap } from "lucide-react";

interface Question {
  id: string;
  category: 'interest' | 'personality' | 'motivation' | 'work-style';
  question: string;
  options: { value: string; label: string; score: number }[];
}

interface PsychometricSectionProps {
  onComplete: (scores: { [key: string]: number }) => void;
}

const psychometricQuestions: Question[] = [
  // Interest Scale Questions
  {
    id: "interest_1",
    category: "interest",
    question: "How interested are you in environmental sustainability and climate change issues?",
    options: [
      { value: "1", label: "Not interested at all", score: 1 },
      { value: "2", label: "Slightly interested", score: 2 },
      { value: "3", label: "Moderately interested", score: 3 },
      { value: "4", label: "Very interested", score: 4 },
      { value: "5", label: "Extremely passionate", score: 5 }
    ]
  },
  {
    id: "interest_2", 
    category: "interest",
    question: "How appealing is working with data and analytics to solve environmental problems?",
    options: [
      { value: "1", label: "Not appealing", score: 1 },
      { value: "2", label: "Slightly appealing", score: 2 },
      { value: "3", label: "Moderately appealing", score: 3 },
      { value: "4", label: "Very appealing", score: 4 },
      { value: "5", label: "Extremely appealing", score: 5 }
    ]
  },
  {
    id: "interest_3",
    category: "interest", 
    question: "How interested are you in policy development and corporate strategy?",
    options: [
      { value: "1", label: "Not interested", score: 1 },
      { value: "2", label: "Slightly interested", score: 2 },
      { value: "3", label: "Moderately interested", score: 3 },
      { value: "4", label: "Very interested", score: 4 },
      { value: "5", label: "Extremely interested", score: 5 }
    ]
  },
  // Personality Questions
  {
    id: "personality_1",
    category: "personality",
    question: "I prefer working with detailed data and systematic analysis over brainstorming sessions.",
    options: [
      { value: "1", label: "Strongly disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly agree", score: 5 }
    ]
  },
  {
    id: "personality_2",
    category: "personality",
    question: "I enjoy collaborating with diverse teams to solve complex problems.",
    options: [
      { value: "1", label: "Strongly disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly agree", score: 5 }
    ]
  },
  {
    id: "personality_3",
    category: "personality",
    question: "I am persistent when faced with challenging or unclear problems.",
    options: [
      { value: "1", label: "Strongly disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly agree", score: 5 }
    ]
  },
  // Motivation Questions
  {
    id: "motivation_1",
    category: "motivation",
    question: "Making a positive environmental impact is more important to me than salary.",
    options: [
      { value: "1", label: "Strongly disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly agree", score: 5 }
    ]
  },
  {
    id: "motivation_2",
    category: "motivation", 
    question: "I am motivated by seeing measurable results from my work.",
    options: [
      { value: "1", label: "Strongly disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly agree", score: 5 }
    ]
  },
  // Work Style Questions
  {
    id: "workstyle_1",
    category: "work-style",
    question: "I prefer structured, step-by-step approaches over open-ended exploration.",
    options: [
      { value: "1", label: "Strongly disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly agree", score: 5 }
    ]
  },
  {
    id: "workstyle_2",
    category: "work-style",
    question: "I learn best through hands-on practice rather than theoretical study.",
    options: [
      { value: "1", label: "Strongly disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly agree", score: 5 }
    ]
  }
];

const PsychometricSection = ({ onComplete }: PsychometricSectionProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const currentQuestion = psychometricQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === psychometricQuestions.length - 1;
  const canProceed = answers[currentQuestion.id];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate scores by category
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
    const categoryScores: { [key: string]: number[] } = {
      interest: [],
      personality: [],
      motivation: [],
      'work-style': []
    };

    psychometricQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          categoryScores[question.category].push(option.score);
        }
      }
    });

    // Calculate averages and convert to 0-100 scale
    const finalScores: { [key: string]: number } = {};
    Object.keys(categoryScores).forEach(category => {
      const scores = categoryScores[category];
      if (scores.length > 0) {
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        finalScores[category] = Math.round(((average - 1) / 4) * 100); // Convert 1-5 to 0-100
      }
    });

    // Calculate overall psychological fit score
    const overallAverage = Object.values(finalScores).reduce((sum, score) => sum + score, 0) / Object.keys(finalScores).length;
    finalScores.overall = Math.round(overallAverage);

    return finalScores;
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'interest': return <Heart className="h-5 w-5" />;
      case 'personality': return <Brain className="h-5 w-5" />;
      case 'motivation': return <Zap className="h-5 w-5" />;
      case 'work-style': return <Target className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'interest': return 'Interest Assessment';
      case 'personality': return 'Personality Traits';
      case 'motivation': return 'Motivation Factors';
      case 'work-style': return 'Work Style Preferences';
      default: return 'Assessment';
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
            Question {currentQuestionIndex + 1} of {psychometricQuestions.length}
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
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
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

export default PsychometricSection;