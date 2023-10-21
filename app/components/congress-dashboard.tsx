import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  getActiveMembers,
  getDemocraticMembers,
  getPartyMajorityMinorityStatus,
  getRepublicanMembers,
} from "@/lib/utils";
import AgeBarChart from "./age-bar-chart";
import CardDashboard from "./card-dashboard";
import PartyTable from "./party-table/page";

export default async function CongressDashboard() {
  const response = await fetch(
    "https://api.propublica.org/congress/v1/118/house/members.json",
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  const data: CongressData = await response.json();

  const activeMembers: Member[] = getActiveMembers(data);
  const democrats: Member[] = getDemocraticMembers(activeMembers);
  const republicans: Member[] = getRepublicanMembers(activeMembers);
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
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <p>All,House,Senate</p>
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
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          {/**TODO: will need to fix the layout of the bar chart */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 ">
            <Card className="col-span-4">
              <AgeBarChart members={activeMembers} />
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
