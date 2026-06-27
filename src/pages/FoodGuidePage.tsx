import { useHealth } from '@/context/HealthContext';
import { getFoodRecommendations } from '@/lib/healthAnalyzer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { Apple, ThumbsUp, AlertTriangle } from 'lucide-react';

export default function FoodGuidePage() {
  const { healthReport } = useHealth();

  if (!healthReport) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Apple className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="elder-heading mb-4">Food Guide</h1>
        <p className="elder-text text-muted-foreground mb-8">Please enter your health data first.</p>
        <Link to="/entry"><Button size="lg" className="bg-gradient-primary text-primary-foreground font-semibold text-lg px-8 py-6 rounded-xl">Enter Health Data</Button></Link>
      </div>
    );
  }

  const recommendations = getFoodRecommendations(healthReport);

  if (recommendations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ThumbsUp className="w-16 h-16 text-success mx-auto mb-4" />
        <h1 className="elder-heading mb-4">All Looking Good! 🎉</h1>
        <p className="elder-text text-muted-foreground mb-8">Your values are within the commonly observed healthy range. Keep up your good habits!</p>
        <Link to="/diet-chart"><Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl">View Diet Chart</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
          <Apple className="w-5 h-5 text-success" />
        </div>
        <div>
          <h1 className="elder-heading">Food Guide</h1>
          <p className="text-muted-foreground">What to prefer and what to limit</p>
        </div>
      </div>

      <DisclaimerBanner />

      <div className="space-y-6 mt-6">
        {recommendations.map((rec, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-6 shadow-card animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-card-foreground">Based on: {rec.parameter}</h3>
              <StatusBadge status={rec.status} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUp className="w-4 h-4 text-success" />
                  <p className="font-semibold text-success text-sm">Prefer More Often</p>
                </div>
                <ul className="space-y-1.5">
                  {rec.prefer.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-foreground">
                      <span className="text-success">✓</span>
                      <span className="elder-text">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <p className="font-semibold text-warning text-sm">Choose Less Often</p>
                </div>
                <ul className="space-y-1.5">
                  {rec.limit.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-foreground">
                      <span className="text-warning">⚠</span>
                      <span className="elder-text">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
