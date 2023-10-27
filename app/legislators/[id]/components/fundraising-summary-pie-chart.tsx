"use client";

import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const data02 = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 },
];

interface Props {
  contributionBreakdown: FundraisingPieChartElement[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

let renderLabel = function (entry: FundraisingPieChartElement) {
  return entry.label;
};

export default function FundraisingSummaryPieChart({
  contributionBreakdown,
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={contributionBreakdown}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={renderLabel}
          legendType="square"
        >
          {contributionBreakdown.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
