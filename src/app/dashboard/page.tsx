import { HistoryTable } from "@/components/dashboard/history-table";
import { MotivationalQuote } from "@/components/dashboard/motivational-quote";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { ScansChart } from "@/components/dashboard/scans-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Activity, CreditCard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold font-headline mb-6">Your Health Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Scans
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  +3 since last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Safe Items
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-safe">32</div>
                <p className="text-xs text-muted-foreground">
                  71% of total scans
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unsafe Items</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-unsafe">8</div>
                <p className="text-xs text-muted-foreground">
                  -2 since last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Daily Sugar</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25g</div>
                <p className="text-xs text-muted-foreground">
                  vs. 30g recommended limit
                </p>
              </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mb-8">
            <div className="lg:col-span-5">
                <Card className="shadow-md h-full">
                    <CardHeader>
                        <CardTitle className="font-headline">Recent Scans</CardTitle>
                        <CardDescription>A log of your recently scanned products.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <HistoryTable />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                 <MotivationalQuote />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="font-headline">Scan Analysis</CardTitle>
                    <CardDescription>Breakdown of product safety from your recent scans.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScansChart />
                </CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="font-headline">Nutrient Intake Overview</CardTitle>
                    <CardDescription>Your average daily nutrient intake from scanned products.</CardDescription>
                </CardHeader>
                <CardContent>
                    <OverviewChart />
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
