import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CommitteeHeader from "../components/committee-header";
import {
  getCommitteeHeaderData,
  getCommitteeMembersTableData,
} from "@/lib/utils";
import CommitteeMembersTable from "../components/committee-members-table.tsx/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PartyTable from "@/app/components/party-table/page";

export default async function Committee({
  params,
}: {
  params: { id: string; congress: number; chamber: string };
}) {
  const id = params.id[0];
  const congress = params.id[1];
  const chamber = params.id[2];

  console.log("TEST", id, congress, chamber);

  //the parameters are not working properly
  /** API Call */
  const responseIndivCommittee = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/${chamber}/committees/${id}.json`,
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  const committeeData: CommitteeAPIResponse =
    await responseIndivCommittee.json();

  //get CID of members to use for opensecrets api call
  //traverse members => return cid array
  const committeeMembersURI: string[] = [];

  committeeData.results[0].current_members.forEach((member) => {
    committeeMembersURI.push(member.api_uri);
  });

  console.log(committeeMembersURI);

  //traverse cid array and use opensecrets api
  // return an object membersFundraising[]

  async function fetchMemberData(url: string): Promise<string> {
    const response = await fetch(url, {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }

    const data = await response.json();
    const crpId: string = data.results[0].crp_id;
    return crpId;
  }

  async function fetchAllCrpIds(urls: string[]): Promise<string[]> {
    const crpIdPromises: Promise<string>[] = urls.map((url) =>
      fetchMemberData(url)
    );

    try {
      const crpIds: string[] = await Promise.all(crpIdPromises);
      return crpIds;
    } catch (error) {
      console.error("Error fetching CRP IDs:", error);
      return [];
    }
  }

  fetchAllCrpIds(committeeMembersURI)
    .then((crpIds) => {
      // Use crpIds array, which contains the CRP IDs of each member
      //use crpids to for API call to
      console.log(crpIds);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const headerInfo = getCommitteeHeaderData(committeeData);
  const committeeMembersData = getCommitteeMembersTableData(
    committeeData.results[0].current_members
  );

  return (
    <div className="container relative">
      <div className="overflow-hidden rounded-lg border bg-background shadow space-y-4">
        <div className="flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <CommitteeHeader headerInfo={headerInfo} />
          </div>

          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="Members">Fundraising</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Members</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <CommitteeMembersTable data={committeeMembersData} />
                  </CardContent>
                </Card>
                <Card className="col-span-4">
                  <CommitteeMembersTable data={committeeMembersData} />
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
