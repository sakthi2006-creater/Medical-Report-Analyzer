import { HealthStatus } from '@/lib/types';
import { CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

interface StatusBadgeProps {
  status: HealthStatus;
}

const config: Record<HealthStatus, { label: string; icon: typeof CheckCircle; className: string }> = {
  normal: { label: 'Normal', icon: CheckCircle, className: 'bg-success/15 text-success border-success/30' },
  warning: { label: 'Needs Attention', icon: AlertTriangle, className: 'bg-warning/15 text-warning border-warning/30' },
  critical: { label: 'Please Consult Doctor', icon: AlertOctagon, className: 'bg-critical/15 text-critical border-critical/30' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, icon: Icon, className } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${className}`}>
      <Icon className="w-4 h-4" />
      {label}
    </span>
  );
}
