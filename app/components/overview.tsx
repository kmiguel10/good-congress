"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import CardDashboard from "./card-dashboard";
import PartyTable from "./party-table/page";
import { getPartyMajorityMinorityStatus } from "@/lib/utils";

interface OverviewProps {
  activeMembers: Member[];
  democrats: Member[];
  republicans: Member[];
}

export default function Overview({
  activeMembers,
  democrats,
  republicans,
}: OverviewProps) {
  const [chamber, setChamber] = useState(0);

  const totalActiveMembers: number = activeMembers.length;
  const republicanStatus: string = getPartyMajorityMinorityStatus(
    "rep",
    democrats,
    republicans
  );
  const democratStatus: string = getPartyMajorityMinorityStatus(
    "dems",
    democrats,
    republicans
  );
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <CardDashboard
          title="Legislators"
          body={totalActiveMembers.toString()}
          subBody="Total Number of legislators"
        />
        <CardDashboard
          title="Democrats"
          body={democrats.length.toString()}
          subBody={democratStatus}
        />
        <CardDashboard
          title="Republicans"
          body={republicans.length.toString()}
          subBody={republicanStatus}
        />
        <CardDashboard
          title="Bills Passed"
          body="Number"
          subBody="Number of bills passed "
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Democrats</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PartyTable members={democrats} />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Republicans</CardTitle>
            {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <PartyTable members={republicans} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
