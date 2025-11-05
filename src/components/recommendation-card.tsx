import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface RecommendationCardProps {
  recommendations: string[];
}

export function RecommendationCard({ recommendations }: RecommendationCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Smart Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-base text-muted-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
