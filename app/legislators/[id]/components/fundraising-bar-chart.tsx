"use client";

import { getFundraisingBarChartData } from "@/lib/utils";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  candidateFunds: CandSummaryResponse;
}
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
export default function FundraisingBarChart({ candidateFunds }: Props) {
  const candidateData = getFundraisingBarChartData(candidateFunds);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={candidateData} layout="vertical">
        <XAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          type="number"
          hide
        />
        <YAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          type="category"
        />
        <Bar dataKey="value" fill="#61bf93" label={{}}>
          <LabelList
            dataKey="dollarValue"
            position="end"
            style={{
              textAnchor: "middle",
              fontSize: "80%",
              fill: "rgba(0, 0, 0, 0.87)",
            }}
          />
          {candidateData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
