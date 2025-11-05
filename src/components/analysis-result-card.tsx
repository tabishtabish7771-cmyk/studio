import { cn } from '@/lib/utils';
import { ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type AnalysisStatus = 'safe' | 'risky' | 'unsafe';

interface AnalysisResultCardProps {
  status: AnalysisStatus;
  explanation: string;
}

const statusConfig = {
  safe: {
    title: 'Safe For You',
    icon: <ShieldCheck className="h-8 w-8" />,
    cardClass: 'bg-safe text-safe-foreground',
  },
  risky: {
    title: 'Risky',
    icon: <ShieldAlert className="h-8 w-8" />,
    cardClass: 'bg-risky text-risky-foreground',
  },
  unsafe: {
    title: 'Unsafe',
    icon: <ShieldX className="h-8 w-8" />,
    cardClass: 'bg-unsafe text-unsafe-foreground',
  },
};

export function AnalysisResultCard({ status, explanation }: AnalysisResultCardProps) {
  const config = statusConfig[status];

  return (
    <Card className={cn('shadow-lg', config.cardClass)}>
      <CardHeader>
        <div className="flex items-center gap-4">
          {config.icon}
          <CardTitle className="font-headline text-3xl">{config.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg">{explanation}</p>
      </CardContent>
    </Card>
  );
}
