import { Link } from 'react-router-dom';
import { ClipboardList, Heart, Activity, Apple, UtensilsCrossed, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-illustration.jpg';

const features = [
  { icon: ClipboardList, title: "Enter Health Data", desc: "Enter your health values easily", path: "/entry", color: "bg-primary/10 text-primary" },
  { icon: Heart, title: "Understand Results", desc: "Get simple explanations", path: "/results", color: "bg-critical/10 text-critical" },
  { icon: Activity, title: "Fitness Guidance", desc: "Safe exercises for you", path: "/fitness", color: "bg-info/10 text-info" },
  { icon: UtensilsCrossed, title: "Diet Chart", desc: "Daily meal suggestions", path: "/diet-chart", color: "bg-secondary/10 text-secondary" },
  { icon: Apple, title: "Food Guide", desc: "What to prefer & limit", path: "/food-guide", color: "bg-success/10 text-success" },
  { icon: ShieldCheck, title: "Safety First", desc: "We never diagnose", path: "/disclaimer", color: "bg-warning/10 text-warning" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground leading-tight mb-4">
                Understand Your <span className="text-gradient-primary">Health</span> in Simple Words
              </h1>
              <p className="elder-text text-muted-foreground mb-8 max-w-lg">
                Enter your health report values and get easy-to-understand explanations, fitness tips, and diet guidance — designed for everyone, especially our elders.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/entry">
                  <Button size="lg" className="bg-gradient-primary text-primary-foreground font-semibold text-lg px-8 py-6 rounded-xl shadow-elevated hover:opacity-90 transition-opacity">
                    Start Health Check
                  </Button>
                </Link>
                <Link to="/disclaimer">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-scale-in">
              <img
                src={heroImage}
                alt="Happy family with healthy food and exercise illustrations"
                className="rounded-2xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="elder-heading text-center mb-2">What You Can Do</h2>
        <p className="text-center text-muted-foreground mb-10 elder-text">Simple tools for your health awareness</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Link
              key={f.path}
              to={f.path}
              className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-card-foreground mb-1">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer disclaimer */}
      <footer className="border-t border-border bg-muted/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            ⚕️ This application provides educational health information only. It does not give medical diagnosis or treatment. Please consult a qualified healthcare professional for medical advice.
          </p>
          <p className="text-xs text-muted-foreground mt-3">© 2026 HealthWise — Educational Health Awareness Platform</p>
        </div>
      </footer>
    </div>
  );
}
