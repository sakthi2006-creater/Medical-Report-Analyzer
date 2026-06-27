import { useHealth } from '@/context/HealthContext';
import { Link } from 'react-router-dom';
import ParameterCard from '@/components/ParameterCard';
import StatusBadge from '@/components/StatusBadge';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, Scale } from 'lucide-react';

export default function ResultsPage() {
  const { healthReport, healthInput } = useHealth();

  if (!healthReport || !healthInput) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="elder-heading mb-4">No Results Yet</h1>
        <p className="elder-text text-muted-foreground mb-8">Please enter your health data first to see your results.</p>
        <Link to="/entry">
          <Button size="lg" className="bg-gradient-primary text-primary-foreground font-semibold text-lg px-8 py-6 rounded-xl">
            Enter Health Data
          </Button>
        </Link>
      </div>
    );
  }

  const bmiStatus = healthReport.bmiCategory === 'Healthy range' ? 'normal' as const
    : healthReport.bmiCategory === 'Above healthy range' ? 'warning' as const : 'warning' as const;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-critical/10 flex items-center justify-center">
          <Heart className="w-5 h-5 text-critical" />
        </div>
        <div>
          <h1 className="elder-heading">Your Health Summary</h1>
          <p className="text-muted-foreground">Easy-to-understand results</p>
        </div>
      </div>

      <DisclaimerBanner />

      {/* BMI Card */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card mt-6 animate-fade-in">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-info" />
            <h3 className="font-display font-bold text-lg">Body Mass Index (BMI)</h3>
          </div>
          <StatusBadge status={bmiStatus} />
        </div>
        <div className="bg-muted rounded-lg p-4 mb-3">
          <p className="text-3xl font-bold text-foreground font-display">{healthReport.bmi}</p>
          <p className="text-sm text-muted-foreground">{healthReport.bmiCategory}</p>
        </div>
        <p className="elder-text">{healthReport.bmiExplanation}</p>
      </div>

      {/* Parameters */}
      {healthReport.parameters.length > 0 ? (
        <div className="space-y-4 mt-6">
          {healthReport.parameters.map((p, i) => (
            <ParameterCard key={i} result={p} />
          ))}
        </div>
      ) : (
        <div className="bg-muted rounded-xl p-8 text-center mt-6">
          <p className="elder-text text-muted-foreground">No health values were entered. Go back to add your lab report values.</p>
        </div>
      )}

      {/* Navigation */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <Link to="/fitness">
          <Button variant="outline" className="w-full h-14 text-base gap-2">
            Fitness Tips <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link to="/diet-chart">
          <Button variant="outline" className="w-full h-14 text-base gap-2">
            Diet Chart <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link to="/food-guide">
          <Button variant="outline" className="w-full h-14 text-base gap-2">
            Food Guide <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
