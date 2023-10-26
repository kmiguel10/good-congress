"use client";

import { calculateCongressAgeData } from "@/lib/utils";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AgeBarChart({ members }: { members: Member[] }) {
  let barChartData: barChartDataType[] = [
    {
      ageRange: "< 31",
      democrats: 0,
      republicans: 0,
      age: 0,
    },
    {
      ageRange: "31 - 41",
      democrats: 0,
      republicans: 0,
      age: 0,
    },
    {
      ageRange: "42 - 52",
      democrats: 0,
      republicans: 0,
      age: 0,
    },
    {
      ageRange: "53 - 63",
      democrats: 0,
      republicans: 0,
      age: 0,
    },
    {
      ageRange: "64 - 74",
      democrats: 0,
      republicans: 0,
      age: 0,
    },
    {
      ageRange: "75 - 85",
      democrats: 0,
      republicans: 0,
      age: 0,
    },
    {
      ageRange: "> 85",
      democrats: 0,
      republicans: 0,
      age: 0,
    },
  ];

  const congressAgeData: barChartDataType[] = calculateCongressAgeData(
    members,
    barChartData
  );

  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart width={500} height={300} data={congressAgeData}>
          <XAxis
            dataKey="ageRange"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />
          <Legend />
          <Bar
            dataKey="democrats"
            fill="#0a53e4"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="republicans"
            fill="#bf0a30"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
