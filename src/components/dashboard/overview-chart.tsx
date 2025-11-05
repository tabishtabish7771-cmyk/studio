"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { nutrient: "Calories", value: 1800, fill: "var(--color-calories)" },
  { nutrient: "Sugar", value: 25, fill: "var(--color-sugar)" },
  { nutrient: "Sodium", value: 1500, fill: "var(--color-sodium)" },
  { nutrient: "Fat", value: 60, fill: "var(--color-fat)" },
]

const chartConfig = {
  value: {
    label: "Value",
  },
  calories: {
    label: "Calories (kcal)",
    color: "hsl(var(--chart-1))",
  },
  sugar: {
    label: "Sugar (g)",
    color: "hsl(var(--chart-2))",
  },
  sodium: {
    label: "Sodium (mg)",
    color: "hsl(var(--chart-3))",
  },
  fat: {
    label: "Fat (g)",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function OverviewChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="nutrient"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="value" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
