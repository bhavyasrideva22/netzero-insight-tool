import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const AssessmentProgress = ({ currentStep, totalSteps, steps }: AssessmentProgressProps) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-card border shadow-soft rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Assessment Progress</h3>
        <span className="text-sm text-muted-foreground">
          {currentStep} of {totalSteps}
        </span>
      </div>
      
      <Progress value={progress} className="mb-4" />
      
      <div className="flex justify-between text-xs">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div
              key={step}
              className={cn(
                "flex flex-col items-center gap-1 flex-1",
                isCompleted && "text-success",
                isCurrent && "text-primary",
                !isCompleted && !isCurrent && "text-muted-foreground"
              )}
            >
              {isCompleted ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Circle className={cn("h-4 w-4", isCurrent && "fill-current")} />
              )}
              <span className="text-center leading-tight max-w-16">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentProgress;