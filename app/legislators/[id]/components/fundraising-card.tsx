import { CardTooltip } from "@/app/components/tool-tip";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import FundraisingBarChart from "./fundraising-bar-chart";

interface Props {
  cardTitle: string;
  cardDescription?: string;
  cardContent: React.ReactNode;
  tooltipContent?: string;
}
export default function FundraisingCard({
  cardTitle,
  cardDescription,
  cardContent,
  tooltipContent,
}: Props) {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </div>
        {tooltipContent && (
          <div>
            <CardTooltip content={tooltipContent} />
          </div>
        )}
      </CardHeader>
      <CardContent className="pl-2">{cardContent}</CardContent>
    </>
  );
}
