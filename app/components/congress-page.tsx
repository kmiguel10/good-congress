"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgeBarChart from "./age-bar-chart";
import CardDashboard from "./card-dashboard";
import DashboardDropdown from "./dashboard-dropdown";
import Overview from "./overview";
import TenureScatterPlot from "./tenure-scatter-chart";

import {
  getActiveMembers,
  getAvgAge,
  getAvgTenure,
  getDemocraticMembers,
  getRepublicanMembers,
} from "@/lib/utils";
import { useState } from "react";

// interface Props {
//   activeMembers: Member[];
//   democrats: Member[];
//   republicans: Member[];
// }

interface Props {
  congressData: CongressData;
}

export default function CongressPage({ congressData }: Props) {
  const [chamber, setChamber] = useState(1);

  const activeMembers: Member[] = getActiveMembers(congressData, chamber);

  const democrats: Member[] = getDemocraticMembers(activeMembers);
  const republicans: Member[] = getRepublicanMembers(activeMembers);

  const handleChamberChange = (newChamber: any) => {
    setChamber(newChamber);
    console.log(chamber, "chamber");
  };

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DashboardDropdown onChamberChange={handleChamberChange} />
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Overview
            activeMembers={activeMembers}
            democrats={democrats}
            republicans={republicans}
          />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
            <CardDashboard
              title="Avg Age"
              body={getAvgAge(activeMembers).toString()}
              subBody="Average age of legislators"
            />
            <CardDashboard
              title="Avg Tenure"
              body={getAvgTenure(activeMembers).toString()}
              subBody="Average tenure of legislators"
            />
          </div>
          {/**TODO: will need to fix the layout of the bar chart */}
          {/**TODO: Create separate components for Card... */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 ">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>Put Definition Here</CardDescription>
              </CardHeader>
              <CardContent>
                <AgeBarChart members={activeMembers} />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tenure</CardTitle>
                <CardDescription>Years in office</CardDescription>
              </CardHeader>
              <CardContent>
                <TenureScatterPlot members={activeMembers} />
              </CardContent>
            </Card>
            {/* <Card className="col-span-8">
              <CardHeader>
                <CardTitle>Tenure</CardTitle>
                <CardDescription>Years in office</CardDescription>
              </CardHeader>
              <CardContent>
                <TenureScatterPlot members={activeMembers} />
              </CardContent>
            </Card> */}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
