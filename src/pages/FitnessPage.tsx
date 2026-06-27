import { useHealth } from '@/context/HealthContext';
import { getFitnessGuidance } from '@/lib/healthAnalyzer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { Activity, AlertCircle } from 'lucide-react';

export default function FitnessPage() {
  const { healthInput } = useHealth();

  if (!healthInput) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="elder-heading mb-4">Fitness Guidance</h1>
        <p className="elder-text text-muted-foreground mb-8">Please enter your health data first.</p>
        <Link to="/entry"><Button size="lg" className="bg-gradient-primary text-primary-foreground font-semibold text-lg px-8 py-6 rounded-xl">Enter Health Data</Button></Link>
      </div>
    );
  }

  const guidance = getFitnessGuidance(healthInput.age, healthInput.activityLevel);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
          <Activity className="w-5 h-5 text-info" />
        </div>
        <div>
          <h1 className="elder-heading">Fitness Guidance</h1>
          <p className="text-muted-foreground">Safe activities for your age and lifestyle</p>
        </div>
      </div>

      <DisclaimerBanner />

      <div className="space-y-4 mt-6">
        {guidance.activities.map((act, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-6 shadow-card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{act.icon}</span>
              <div>
                <h3 className="font-display font-bold text-lg text-card-foreground">{act.name}</h3>
                <p className="text-sm text-info font-medium">{act.duration}</p>
              </div>
            </div>
            <p className="elder-text text-muted-foreground">{act.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-muted rounded-xl p-6 mt-8">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-warning" />
          <h3 className="font-display font-bold text-lg">Important Tips</h3>
        </div>
        <ul className="space-y-2">
          {guidance.generalTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary mt-1">•</span>
              <span className="elder-text">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
