import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, TrendingUp, Users } from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  const careers = [
    "Sustainability Analyst",
    "Environmental Consultant", 
    "Carbon Management Specialist",
    "Energy Policy Planner",
    "CSR Manager"
  ];

  const traits = [
    "Analytical mindset",
    "Problem-solving skills",
    "Environmental passion",
    "Data interpretation",
    "Collaborative approach",
    "Growth mindset"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Net-Zero Planner
          </h1>
          <h2 className="text-xl md:text-2xl text-primary-foreground/90 mb-2">
            Learning & Career Readiness Assessment
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover your fit, readiness, and potential career paths in sustainability and carbon management
          </p>
        </div>

        <Card className="bg-card/95 backdrop-blur-sm shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Target className="h-6 w-6 text-primary" />
              Assessment Overview
            </CardTitle>
            <CardDescription className="text-base">
              A comprehensive 20-30 minute assessment to evaluate your psychological fit, 
              technical readiness, and career alignment with Net-Zero planning roles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* What is Net-Zero Planner */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                What is Net-Zero Planner?
              </h3>
              <p className="text-muted-foreground mb-3">
                A digital tool focused on planning and managing carbon neutrality goals in businesses 
                and urban planning. Used for calculating emissions, setting reduction targets, 
                tracking progress, and scenario modeling.
              </p>
            </div>

            {/* Career Paths */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-info" />
                Potential Career Paths
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {careers.map((career) => (
                  <Badge key={career} variant="secondary" className="justify-start p-2">
                    {career}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Success Traits */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Success Traits We'll Assess
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
                {traits.map((trait) => (
                  <Badge key={trait} variant="outline" className="justify-start p-2">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Assessment Sections Preview */}
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-3">What You'll Complete:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>Psychometric Section:</strong> Interest, personality, and motivation assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>Technical & Aptitude:</strong> General reasoning and domain knowledge quiz</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>WISCAR Framework:</strong> Comprehensive readiness analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>Personalized Results:</strong> Career guidance and learning recommendations</span>
                </li>
              </ul>
            </div>

            <Button 
              onClick={onStartAssessment}
              size="lg" 
              className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6"
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentIntro;