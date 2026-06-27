import { ShieldCheck } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 flex items-start gap-3">
      <ShieldCheck className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
      <p className="text-sm text-warning-foreground leading-relaxed">
        This application provides educational health information only. It does not give medical diagnosis or treatment. Please consult a qualified healthcare professional for medical advice.
      </p>
    </div>
  );
}
