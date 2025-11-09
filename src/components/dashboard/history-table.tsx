'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useFirebase,
  useCollection,
  useMemoFirebase,
  WithId,
} from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

type ScanResult = {
  productName: string;
  safetyStatus: 'safe' | 'risky' | 'unsafe';
  scanDate: string;
};

export function HistoryTable() {
  const { firestore, user } = useFirebase();

  const scanResultsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'users', user.uid, 'scanResults'),
      orderBy('scanDate', 'desc'),
      limit(10)
    );
  }, [firestore, user]);

  const {
    data: scanResults,
    isLoading,
    error,
  } = useCollection<ScanResult>(scanResultsQuery);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-safe text-safe-foreground';
      case 'risky':
        return 'bg-risky text-risky-foreground';
      case 'unsafe':
        return 'bg-unsafe text-unsafe-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-destructive">Error loading scan history.</p>
    );
  }
  
  if (!scanResults || scanResults.length === 0) {
    return (
        <p className="text-muted-foreground text-center py-8">
            No scans yet. Start scanning products to see your history!
        </p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scanResults.map((scan) => (
          <TableRow key={scan.id}>
            <TableCell className="font-medium">{scan.productName}</TableCell>
            <TableCell>
              <Badge
                className={cn(
                  'capitalize border-none',
                  getStatusClass(scan.safetyStatus)
                )}
              >
                {scan.safetyStatus}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {new Date(scan.scanDate).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
