"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPartyMajorityMinorityStatus } from "@/lib/utils";
import CardDashboard from "./card-dashboard";
import PartyTable from "./party-table/page";

interface OverviewProps {
  activeMembers: Member[];
  democrats: Member[];
  republicans: Member[];
  independents: Member[];
  chamber: number;
}

export default function Overview({
  activeMembers,
  democrats,
  republicans,
  independents,
  chamber,
}: OverviewProps) {
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
        {chamber === 3 && (
          <CardDashboard
            title="Independents"
            body={independents.length.toString()}
            subBody={republicanStatus}
          />
        )}

        {chamber !== 3 && (
          <CardDashboard
            title="Bills Passed"
            body="Number"
            subBody="Number of bills passed "
          />
        )}
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
