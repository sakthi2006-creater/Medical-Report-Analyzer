import { useHealth } from '@/context/HealthContext';
import { getDietChart } from '@/lib/healthAnalyzer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { UtensilsCrossed } from 'lucide-react';

const mealEmojis: Record<string, string> = {
  'Early Morning': '🌅',
  'Breakfast': '🍳',
  'Mid-Morning Snack': '🍎',
  'Lunch': '🍛',
  'Evening Snack': '☕',
  'Dinner': '🌙',
};

export default function DietChartPage() {
  const { healthInput } = useHealth();

  if (!healthInput) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <UtensilsCrossed className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="elder-heading mb-4">Diet Chart</h1>
        <p className="elder-text text-muted-foreground mb-8">Please enter your health data first.</p>
        <Link to="/entry"><Button size="lg" className="bg-gradient-primary text-primary-foreground font-semibold text-lg px-8 py-6 rounded-xl">Enter Health Data</Button></Link>
      </div>
    );
  }

  const chart = getDietChart(healthInput.dietPreference);
  const showNonVeg = healthInput.dietPreference === 'non-vegetarian';

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <UtensilsCrossed className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h1 className="elder-heading">Daily Diet Chart</h1>
          <p className="text-muted-foreground">A sample meal plan for your preference</p>
        </div>
      </div>

      <DisclaimerBanner />

      <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mt-4 mb-6">
        <p className="text-sm text-warning-foreground text-center font-medium">
          📋 This is a general food guide, not a medical diet.
        </p>
      </div>

      <div className="space-y-4">
        {chart.map((entry, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-6 shadow-card animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{mealEmojis[entry.meal] || '🍽️'}</span>
                <h3 className="font-display font-bold text-lg text-card-foreground">{entry.meal}</h3>
              </div>
              <span className="text-sm text-muted-foreground font-medium bg-muted px-3 py-1 rounded-full">{entry.time}</span>
            </div>

            <div className={showNonVeg ? 'grid sm:grid-cols-2 gap-4' : ''}>
              <div>
                {showNonVeg && <p className="text-xs font-semibold text-success mb-1 uppercase tracking-wider">🟢 Veg Options</p>}
                <ul className="space-y-1">
                  {entry.vegOptions.map((opt, j) => (
                    <li key={j} className="flex items-center gap-2 elder-text text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
              {showNonVeg && entry.nonVegOptions.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-critical mb-1 uppercase tracking-wider">🔴 Non-Veg Options</p>
                  <ul className="space-y-1">
                    {entry.nonVegOptions.map((opt, j) => (
                      <li key={j} className="flex items-center gap-2 elder-text text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-critical flex-shrink-0" />
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
