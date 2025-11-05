"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { type: "safe", value: 32, fill: "hsl(var(--safe))" },
  { type: "risky", value: 5, fill: "hsl(var(--risky))" },
  { type: "unsafe", value: 8, fill: "hsl(var(--unsafe))" },
]

const chartConfig = {
  value: {
    label: "Scans",
  },
  safe: {
    label: "Safe",
    color: "hsl(var(--safe))",
  },
  risky: {
    label: "Risky",
    color: "hsl(var(--risky))",
  },
  unsafe: {
    label: "Unsafe",
    color: "hsl(var(--unsafe))",
  },
}

export function ScansChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="type"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((entry) => (
              <Cell key={`cell-${entry.type}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
