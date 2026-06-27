import { ShieldCheck, Heart, X, Check } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-warning" />
        </div>
        <div>
          <h1 className="elder-heading">Important Information</h1>
          <p className="text-muted-foreground">Please read before using this application</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-8 shadow-card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-primary" />
          <h2 className="font-display font-bold text-xl text-card-foreground">About HealthWise</h2>
        </div>
        <p className="elder-text text-muted-foreground leading-relaxed">
          HealthWise is an educational health awareness platform. It helps you understand your health report values in simple language. 
          It also provides general fitness and diet guidance to support your well-being.
        </p>
      </div>

      <div className="bg-critical/5 border border-critical/20 rounded-xl p-6 mb-6">
        <h3 className="font-display font-bold text-lg text-critical mb-4 flex items-center gap-2">
          <X className="w-5 h-5" /> What This App Does NOT Do
        </h3>
        <ul className="space-y-3">
          {[
            "Does NOT diagnose any disease or condition",
            "Does NOT prescribe any medicine or medication",
            "Does NOT suggest any medical treatment",
            "Does NOT replace your doctor or healthcare provider",
            "Does NOT provide emergency medical advice",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 elder-text text-foreground">
              <X className="w-5 h-5 text-critical flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-success/5 border border-success/20 rounded-xl p-6 mb-6">
        <h3 className="font-display font-bold text-lg text-success mb-4 flex items-center gap-2">
          <Check className="w-5 h-5" /> What This App DOES Do
        </h3>
        <ul className="space-y-3">
          {[
            "Explains your health values in simple, friendly language",
            "Shows whether your values are within commonly observed ranges",
            "Provides general fitness and movement suggestions",
            "Offers balanced food and diet awareness",
            "Uses calm, supportive language suitable for all ages",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 elder-text text-foreground">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-warning/10 border-2 border-warning/30 rounded-xl p-6 text-center">
        <p className="font-display font-bold text-lg text-foreground mb-2">⚕️ Medical Disclaimer</p>
        <p className="elder-text text-muted-foreground">
          This application provides educational health information only. It does not give medical diagnosis or treatment. 
          Please consult a qualified healthcare professional for medical advice. In case of a medical emergency, 
          please contact your local emergency services immediately.
        </p>
      </div>
    </div>
  );
}
