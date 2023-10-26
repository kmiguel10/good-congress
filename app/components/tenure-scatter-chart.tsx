"use client";

import { getAgeAndTenureData } from "@/lib/utils";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Cell,
  ZAxis,
} from "recharts";

const COLORS = [
  { party: "R", color: "#bf0a30" },
  { party: "D", color: "#0a53e4" },
];

export default function TenureScatterPlot({ members }: { members: Member[] }) {
  const congressData: AgeTenureDataType[] = getAgeAndTenureData(members);
  const getColorForParty = (party: any) => {
    const partyColor = COLORS.find((item) => item.party === party);
    return partyColor ? partyColor.color : "#8884d8"; // Default to a color if party is not found
  };
  return (
    <div>
      <ScatterChart
        width={577}
        height={400}
        margin={{
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="age"
          name="age"
          unit="yrs"
          fontSize={12}
        />
        <YAxis
          type="number"
          dataKey="tenure"
          name="tenure"
          unit="yrs"
          hide={true}
          axisLine={false}
          fontSize={12}
        />
        <ZAxis type="number" dataKey="name" name="name" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={congressData} fill="#8884d8">
          {congressData.map((member) => (
            <Cell
              key={`cell-${member.id}`}
              fill={getColorForParty(member.party)}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </div>
  );
}
