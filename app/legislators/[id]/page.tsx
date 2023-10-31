import CardDashboard from "@/app/components/card-dashboard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getBillsPassedByMember,
  getCommitteeTableData,
  getHeaderInfo,
  getVotingBehaviorDataType,
} from "@/lib/utils";
import CommitteeTable from "./components/committee-table.tsx/committee-table";
import LegislatorHeader from "./components/legislator-header";
import VotingBehavior from "./components/voting-behavior-table";
import Fundraising from "./components/fundraising";

interface Props {
  params: { id: string };
}

async function fetchData(url: string) {
  const response = await fetch(url, {
    headers: {
      "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
    },
  });

  if (!response.ok) {
    console.error(`API request failed with status ${response.status}`);
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

export default async function LegislatorInformation({ params }: Props) {
  const congress = 118; // Set to the desired congress dynamically

  const [memberData, billDatabyMember] = await Promise.all([
    fetchData(
      `https://api.propublica.org/congress/v1/members/${params.id}.json`
    ),
    fetchData(
      `https://api.propublica.org/congress/v1/members/${params.id}/bills/passed.json`
    ),
  ]);

  const headerInfo = getHeaderInfo(memberData.results);
  const legislatorCommittees: CommitteeTableDataType[] = getCommitteeTableData(
    memberData.results[0].roles[0].committees
  );
  const legislatorSubcommittees: CommitteeTableDataType[] =
    getCommitteeTableData(memberData.results[0].roles[0].subcommittees);
  const votingData = getVotingBehaviorDataType(memberData.results[0].roles[0]);

  const billsPassed = getBillsPassedByMember(billDatabyMember);

  return (
    <div className="container relative">
      <div className="overflow-hidden rounded-lg border bg-background shadow space-y-4">
        <div className="flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <LegislatorHeader headerInfo={headerInfo} />
          </div>
          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="privately_funded_travel">
                Privately Funded Travel
              </TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
                <CardDashboard
                  title="Seniority"
                  body={memberData.results[0].roles[0].seniority.toString()}
                  subBody="Years of service"
                  tooltipContent=""
                />
                <CardDashboard
                  title="Sponsored Bills"
                  body={memberData.results[0].roles[0].bills_sponsored.toString()}
                  subBody="Total Sponsored Bills in current congress"
                  tooltipContent=""
                />
                <CardDashboard
                  title="Cosponsored Bills"
                  body={memberData.results[0].roles[0].bills_cosponsored.toString()}
                  subBody="Total Cosponsored Bills in current congress"
                  tooltipContent=""
                />
                <CardDashboard
                  title="Sponsored Bills Passed"
                  body={billsPassed}
                  subBody="Passed by House and Congress"
                  tooltipContent="Passed during entire career in congress"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="col-span-5">
                  <CardHeader>
                    <CardTitle>Committees</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <CommitteeTable committees={legislatorCommittees} />
                  </CardContent>
                  <CardHeader>
                    <CardTitle>Subcommittees</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <CommitteeTable committees={legislatorSubcommittees} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Voting Behavior</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <VotingBehavior votingData={votingData} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="fundraising" className="space-y-4">
              <Fundraising
                params={{
                  id: memberData.results[0].crp_id,
                }}
              />
            </TabsContent>
            <TabsContent value="expenses" className="space-y-4">
              Work in progress...
            </TabsContent>
            <TabsContent value="privately_funded_travel" className="space-y-4">
              Work in progress...
            </TabsContent>
          </Tabs>
          {/* <div className="flex-1 space-y-4 p-8 pt-6">
            <LegislatorsTable />
          </div> */}
        </div>
      </div>
    </div>
  );
}
