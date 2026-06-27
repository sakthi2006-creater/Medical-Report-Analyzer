import { ParameterResult } from '@/lib/types';
import StatusBadge from './StatusBadge';
import { Volume2 } from 'lucide-react';
import { Button } from './ui/button';

interface ParameterCardProps {
  result: ParameterResult;
}

export default function ParameterCard({ result }: ParameterCardProps) {
  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(result.voiceReadyText);
      utterance.rate = 0.85;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-card-foreground">{result.parameter}</h3>
          <p className="text-muted-foreground text-sm mt-1">Normal range: {result.normalRange}</p>
        </div>
        <StatusBadge status={result.status} />
      </div>

      <div className="bg-muted rounded-lg p-4 mb-4">
        <p className="text-2xl font-bold text-foreground font-display">{result.userValue}</p>
      </div>

      <p className="elder-text text-foreground mb-3">{result.explanation}</p>
      <p className="text-sm text-muted-foreground mb-4">💡 {result.lifestyleTips}</p>

      <Button
        variant="outline"
        size="sm"
        onClick={speak}
        className="gap-2"
      >
        <Volume2 className="w-4 h-4" />
        Listen to explanation
      </Button>
    </div>
  );
}
