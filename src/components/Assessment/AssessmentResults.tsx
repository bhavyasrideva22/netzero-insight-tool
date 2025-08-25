import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  TrendingUp, 
  BookOpen, 
  Users,
  Target,
  Brain,
  Heart,
  Zap,
  Eye,
  Wrench,
  Globe
} from "lucide-react";

interface AssessmentScore {
  psychometric: { [key: string]: number };
  technical: { [key: string]: number };
  wiscar: { [key: string]: number };
}

interface AssessmentResultsProps {
  scores: AssessmentScore;
  onRestart: () => void;
}

const AssessmentResults = ({ scores, onRestart }: AssessmentResultsProps) => {
  // Calculate overall recommendation
  const overallPsycho = scores.psychometric.overall || 0;
  const overallTechnical = scores.technical.overall || 0;  
  const overallWiscar = scores.wiscar.overall || 0;
  
  const finalScore = Math.round((overallPsycho + overallTechnical + overallWiscar) / 3);
  
  const getRecommendation = (score: number) => {
    if (score >= 75) return { decision: "Yes", color: "text-success", icon: CheckCircle };
    if (score >= 50) return { decision: "Maybe", color: "text-warning", icon: AlertCircle };
    return { decision: "No", color: "text-destructive", icon: XCircle };
  };

  const recommendation = getRecommendation(finalScore);

  const getScoreInterpretation = (score: number) => {
    if (score >= 80) return { level: "Excellent", color: "bg-success text-success-foreground" };
    if (score >= 65) return { level: "Good", color: "bg-info text-info-foreground" };
    if (score >= 50) return { level: "Fair", color: "bg-warning text-warning-foreground" };
    return { level: "Needs Development", color: "bg-destructive text-destructive-foreground" };
  };

  const careerRoles = [
    { 
      role: "Sustainability Analyst", 
      match: Math.max(overallTechnical, overallPsycho),
      skills: ["Data analysis", "Reporting", "Domain knowledge"],
      description: "Analyze emissions data and recommend interventions"
    },
    { 
      role: "Carbon Management Specialist", 
      match: Math.max(overallWiscar, overallTechnical),
      skills: ["Project management", "Carbon accounting", "Strategy"],
      description: "Develop & implement carbon reduction plans"
    },
    { 
      role: "Environmental Consultant", 
      match: Math.max(overallPsycho, overallWiscar),
      skills: ["Consulting", "Policy knowledge", "Communication"],
      description: "Advise organizations on environmental compliance"
    },
    { 
      role: "Energy Policy Planner", 
      match: Math.max(overallPsycho, overallTechnical),
      skills: ["Policy analysis", "Stakeholder engagement", "Research"],
      description: "Design policies for sustainable energy use"
    }
  ];

  const sortedRoles = careerRoles.sort((a, b) => b.match - a.match);

  const getWiscarIcon = (dimension: string) => {
    switch (dimension) {
      case 'will': return <Zap className="h-4 w-4" />;
      case 'interest': return <Eye className="h-4 w-4" />;
      case 'skill': return <Wrench className="h-4 w-4" />;
      case 'cognitive': return <Brain className="h-4 w-4" />;
      case 'ability': return <TrendingUp className="h-4 w-4" />;
      case 'real-world': return <Globe className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Assessment Results</h1>
          <p className="text-muted-foreground text-lg">Your personalized Net-Zero Planner readiness analysis</p>
        </div>

        {/* Overall Recommendation */}
        <Card className="bg-gradient-card shadow-strong">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <recommendation.icon className={`h-8 w-8 ${recommendation.color}`} />
                <h2 className="text-3xl font-bold">
                  <span className={recommendation.color}>{recommendation.decision}</span>
                  {" "}to Net-Zero Planner Career Path
                </h2>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-lg">Overall Confidence Score:</span>
                <Badge className="text-xl px-4 py-2" variant={finalScore >= 75 ? "default" : finalScore >= 50 ? "secondary" : "destructive"}>
                  {finalScore}%
                </Badge>
              </div>
              <Progress value={finalScore} className="w-full max-w-md mx-auto h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Psychometric Scores */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Psychological Fit
              </CardTitle>
              <CardDescription>Interest, personality, and motivation assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{overallPsycho}%</div>
                <Badge className={getScoreInterpretation(overallPsycho).color}>
                  {getScoreInterpretation(overallPsycho).level}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-3">
                {Object.entries(scores.psychometric).filter(([key]) => key !== 'overall').map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{key.replace('-', ' ')}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Scores */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-info" />
                Technical Readiness
              </CardTitle>
              <CardDescription>Aptitude and knowledge assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{overallTechnical}%</div>
                <Badge className={getScoreInterpretation(overallTechnical).color}>
                  {getScoreInterpretation(overallTechnical).level}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-3">
                {Object.entries(scores.technical).filter(([key]) => key !== 'overall').map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{key}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Scores */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                WISCAR Analysis
              </CardTitle>
              <CardDescription>Comprehensive readiness framework</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{overallWiscar}%</div>
                <Badge className={getScoreInterpretation(overallWiscar).color}>
                  {getScoreInterpretation(overallWiscar).level}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-3">
                {Object.entries(scores.wiscar).filter(([key]) => key !== 'overall').map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getWiscarIcon(key)}
                      <span className="text-sm capitalize">{key.replace('-', ' ')}</span>
                    </div>
                    <span className="text-sm font-medium">{value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Recommendations */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Career Path Recommendations
            </CardTitle>
            <CardDescription>Top roles based on your assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {sortedRoles.slice(0, 4).map((role, index) => (
                <div key={role.role} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{role.role}</h4>
                    <Badge variant={index < 2 ? "default" : "secondary"}>
                      {role.match}% match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {role.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-success" />
              Recommended Next Steps
            </CardTitle>
            <CardDescription>Personalized learning and career guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {finalScore >= 75 ? (
              <div className="space-y-3">
                <h4 className="font-semibold text-success">Strong Fit - Ready to Advance</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Enroll in advanced Net-Zero Planner certification programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Apply for sustainability analyst or consultant roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Join professional networks (CDP, WBCSD, local sustainability groups)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Start building a portfolio with case studies and projects</span>
                  </li>
                </ul>
              </div>
            ) : finalScore >= 50 ? (
              <div className="space-y-3">
                <h4 className="font-semibold text-warning">Potential Fit - Development Needed</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span>Complete foundational courses in sustainability and environmental science</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span>Strengthen technical skills in data analysis and carbon accounting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span>Gain practical experience through internships or volunteer projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span>Retake assessment in 6-12 months after skill development</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="space-y-3">
                <h4 className="font-semibold text-destructive">Consider Alternative Paths</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Explore related fields: Renewable Energy Systems, Environmental Data Science</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Consider career counseling to identify aligned sustainability roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Focus on developing core analytical and communication skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Explore other assessment tools for different sustainability careers</span>
                  </li>
                </ul>
              </div>
            )}
            
            <div className="pt-4">
              <Button 
                onClick={onRestart}
                variant="outline"
                className="w-full"
              >
                Take Assessment Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentResults;