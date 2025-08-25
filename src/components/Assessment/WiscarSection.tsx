import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Zap, Eye, Wrench, Brain, TrendingUp, Globe } from "lucide-react";

interface WiscarQuestion {
  id: string;
  dimension: 'will' | 'interest' | 'skill' | 'cognitive' | 'ability' | 'real-world';
  question: string;
  options: { value: string; label: string; score: number }[];
}

interface WiscarSectionProps {
  onComplete: (scores: { [key: string]: number }) => void;
}

const wiscarQuestions: WiscarQuestion[] = [
  // Will (Persistence & Drive)
  {
    id: "will_1",
    dimension: "will",
    question: "When working on a challenging sustainability project, how do you typically respond to setbacks?",
    options: [
      { value: "1", label: "Give up and try something else", score: 1 },
      { value: "2", label: "Take a break and reconsider", score: 2 },
      { value: "3", label: "Seek help and continue", score: 3 },
      { value: "4", label: "Persist and find alternative approaches", score: 4 },
      { value: "5", label: "Use setbacks as learning opportunities", score: 5 }
    ]
  },
  {
    id: "will_2",
    dimension: "will",
    question: "How committed would you be to a 2-3 year learning journey in sustainability?",
    options: [
      { value: "1", label: "Not very committed", score: 1 },
      { value: "2", label: "Somewhat committed", score: 2 },
      { value: "3", label: "Moderately committed", score: 3 },
      { value: "4", label: "Very committed", score: 4 },
      { value: "5", label: "Extremely committed", score: 5 }
    ]
  },
  // Interest (Curiosity & Engagement)
  {
    id: "interest_1",
    dimension: "interest",
    question: "How often do you read about or discuss environmental and climate topics?",
    options: [
      { value: "1", label: "Never", score: 1 },
      { value: "2", label: "Rarely", score: 2 },
      { value: "3", label: "Occasionally", score: 3 },
      { value: "4", label: "Frequently", score: 4 },
      { value: "5", label: "Daily", score: 5 }
    ]
  },
  {
    id: "interest_2",
    dimension: "interest",
    question: "When you encounter a complex environmental problem, what's your first reaction?",
    options: [
      { value: "1", label: "Avoid thinking about it", score: 1 },
      { value: "2", label: "Hope someone else solves it", score: 2 },
      { value: "3", label: "Wonder about basic solutions", score: 3 },
      { value: "4", label: "Want to understand the causes", score: 4 },
      { value: "5", label: "Eager to explore innovative solutions", score: 5 }
    ]
  },
  // Skill (Current Capabilities)
  {
    id: "skill_1",
    dimension: "skill",
    question: "How comfortable are you with data analysis and spreadsheet tools?",
    options: [
      { value: "1", label: "Not comfortable at all", score: 1 },
      { value: "2", label: "Basic comfort", score: 2 },
      { value: "3", label: "Moderate comfort", score: 3 },
      { value: "4", label: "Very comfortable", score: 4 },
      { value: "5", label: "Expert level", score: 5 }
    ]
  },
  {
    id: "skill_2", 
    dimension: "skill",
    question: "How would you rate your project management and organizational skills?",
    options: [
      { value: "1", label: "Poor", score: 1 },
      { value: "2", label: "Below average", score: 2 },
      { value: "3", label: "Average", score: 3 },
      { value: "4", label: "Above average", score: 4 },
      { value: "5", label: "Excellent", score: 5 }
    ]
  },
  // Cognitive (Problem-solving & Analysis)
  {
    id: "cognitive_1",
    dimension: "cognitive", 
    question: "When facing a complex problem with multiple variables, you prefer to:",
    options: [
      { value: "1", label: "Get someone else to solve it", score: 1 },
      { value: "2", label: "Use tried-and-true methods", score: 2 },
      { value: "3", label: "Break it into smaller parts", score: 3 },
      { value: "4", label: "Analyze all variables systematically", score: 4 },
      { value: "5", label: "Create models to test scenarios", score: 5 }
    ]
  },
  {
    id: "cognitive_2",
    dimension: "cognitive",
    question: "How do you approach learning new technical concepts?",
    options: [
      { value: "1", label: "Memorize key facts", score: 1 },
      { value: "2", label: "Focus on practical applications", score: 2 },
      { value: "3", label: "Understand underlying principles", score: 3 },
      { value: "4", label: "Connect to existing knowledge", score: 4 },
      { value: "5", label: "Build comprehensive mental models", score: 5 }
    ]
  },
  // Ability to Learn (Growth & Adaptation)
  {
    id: "ability_1",
    dimension: "ability",
    question: "How do you respond to feedback about your work?",
    options: [
      { value: "1", label: "Feel defensive", score: 1 },
      { value: "2", label: "Accept it reluctantly", score: 2 },
      { value: "3", label: "Listen and consider it", score: 3 },
      { value: "4", label: "Actively seek to improve", score: 4 },
      { value: "5", label: "View it as growth opportunity", score: 5 }
    ]
  },
  {
    id: "ability_2",
    dimension: "ability",
    question: "When learning something completely new, you:",
    options: [
      { value: "1", label: "Prefer familiar approaches", score: 1 },
      { value: "2", label: "Need lots of guidance", score: 2 },
      { value: "3", label: "Learn step by step", score: 3 },
      { value: "4", label: "Adapt quickly to new methods", score: 4 },
      { value: "5", label: "Thrive on novel challenges", score: 5 }
    ]
  },
  // Real-world Alignment (Practical Application)
  {
    id: "realworld_1",
    dimension: "real-world",
    question: "Which type of work environment appeals to you most?",
    options: [
      { value: "1", label: "Quiet, individual work", score: 1 },
      { value: "2", label: "Small team projects", score: 2 },
      { value: "3", label: "Cross-functional collaboration", score: 3 },
      { value: "4", label: "Client-facing consulting", score: 4 },
      { value: "5", label: "Leading organizational change", score: 5 }
    ]
  },
  {
    id: "realworld_2",
    dimension: "real-world",
    question: "How important is it that your work has measurable impact?",
    options: [
      { value: "1", label: "Not important", score: 1 },
      { value: "2", label: "Somewhat important", score: 2 },
      { value: "3", label: "Moderately important", score: 3 },
      { value: "4", label: "Very important", score: 4 },
      { value: "5", label: "Essential to my satisfaction", score: 5 }
    ]
  }
];

const WiscarSection = ({ onComplete }: WiscarSectionProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const currentQuestion = wiscarQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === wiscarQuestions.length - 1;
  const canProceed = answers[currentQuestion.id];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const scores = calculateWiscarScores(answers);
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

  const calculateWiscarScores = (answers: { [key: string]: string }) => {
    const dimensionScores: { [key: string]: number[] } = {
      will: [],
      interest: [],
      skill: [],
      cognitive: [],
      ability: [],
      'real-world': []
    };

    wiscarQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          dimensionScores[question.dimension].push(option.score);
        }
      }
    });

    // Calculate averages and convert to 0-100 scale
    const finalScores: { [key: string]: number } = {};
    Object.keys(dimensionScores).forEach(dimension => {
      const scores = dimensionScores[dimension];
      if (scores.length > 0) {
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        finalScores[dimension] = Math.round(((average - 1) / 4) * 100); // Convert 1-5 to 0-100
      }
    });

    // Calculate overall WISCAR confidence score
    const overallAverage = Object.values(finalScores).reduce((sum, score) => sum + score, 0) / Object.keys(finalScores).length;
    finalScores.overall = Math.round(overallAverage);

    return finalScores;
  };

  const getIcon = (dimension: string) => {
    switch (dimension) {
      case 'will': return <Zap className="h-5 w-5" />;
      case 'interest': return <Eye className="h-5 w-5" />;
      case 'skill': return <Wrench className="h-5 w-5" />;
      case 'cognitive': return <Brain className="h-5 w-5" />;
      case 'ability': return <TrendingUp className="h-5 w-5" />;
      case 'real-world': return <Globe className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getDimensionTitle = (dimension: string) => {
    switch (dimension) {
      case 'will': return 'Will (Drive & Persistence)';
      case 'interest': return 'Interest (Curiosity & Engagement)';
      case 'skill': return 'Skill (Current Capabilities)';
      case 'cognitive': return 'Cognitive (Problem-solving)';
      case 'ability': return 'Ability (Learning & Adaptation)';
      case 'real-world': return 'Real-world (Practical Alignment)';
      default: return 'WISCAR Assessment';
    }
  };

  const getDimensionColor = (dimension: string) => {
    switch (dimension) {
      case 'will': return 'bg-red-100 text-red-800 border-red-200';
      case 'interest': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'skill': return 'bg-green-100 text-green-800 border-green-200';
      case 'cognitive': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ability': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'real-world': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              {getIcon(currentQuestion.dimension)}
              {getDimensionTitle(currentQuestion.dimension)}
            </CardTitle>
            <Badge className={getDimensionColor(currentQuestion.dimension)}>
              {currentQuestion.dimension.charAt(0).toUpperCase() + currentQuestion.dimension.slice(1)}
            </Badge>
          </div>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {wiscarQuestions.length} | 
            WISCAR Framework Analysis
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
              {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WiscarSection;