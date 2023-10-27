import CardDashboard from "@/app/components/card-dashboard";
import PartyTable from "@/app/components/party-table/page";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import React from "react";
import FundraisingBarChart from "./fundraising-bar-chart";
import {
  getFundraisingSummaryPieChartData,
  getTopContributorTableData,
  getTopIndustriesTableData,
  getTopSectorTableData,
} from "@/lib/utils";
import TopContributorsTable from "./top-contributor-table.tsx/page";
import FundraisingSummaryPieChart from "./fundraising-summary-pie-chart";
import { CardTooltip } from "@/app/components/tool-tip";

interface Props {
  params: { id: string };
}

export default async function Fundraising({ params }: Props) {
  const currentCycle = 2024; //this will need to be updated automatically getElectionCycle in utils

  /// -----  API Calls -----  ///
  //TODO: consolidate in a single file

  /** Candidate summary:
   * Returns summary contribution information on a candidate for indicated cycle
   *
   */
  const candSummaryresponse = await fetch(
    `http://www.opensecrets.org/api/?method=candSummary&cid=${params.id}&cycle=${currentCycle}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
  );

  const candSummaryData: CandidateFundraisingSummaryData =
    await candSummaryresponse.json();

  const candidateData: CandSummaryResponse =
    candSummaryData.response.summary["@attributes"];

  /** Candidate Contributions: Returns the top contributors to a candidate/member for indicated period candContrib */
  const candContribresponse = await fetch(
    `http://www.opensecrets.org/api/?method=candContrib&cid=${params.id}&cycle=${currentCycle}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
  );

  const candContribData: FundraisingContributors =
    await candContribresponse.json();

  const topContributorTableData: FundraisingContributorsData =
    getTopContributorTableData(candContribData);

  /** candIndustry: Returns the top industries to a candidate/member for indicated period (last updated */
  const candIndustryresponse = await fetch(
    `http://www.opensecrets.org/api/?method=candIndustry&cid=${params.id}&cycle=${currentCycle}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
  );

  const candIndustryData: FundraisingIndustries =
    await candIndustryresponse.json();

  const topIndustriesData: FundraisingContributorsData =
    getTopIndustriesTableData(candIndustryData);

  /** candSector: Returns the top sectors to a candidate/member for indicated period (last updated: */
  // I can also break down contributions by pacs, indv,

  const candSectorresponse = await fetch(
    `http://www.opensecrets.org/api/?method=candSector&cid=${params.id}&cycle=${currentCycle}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
  );

  const candSectorData: FundraisingSectors = await candSectorresponse.json();

  const topSectorsData: FundraisingContributorsData =
    getTopSectorTableData(candSectorData);

  const contributionBreakdown: FundraisingPieChartElement[] =
    getFundraisingSummaryPieChartData(candSectorData);

  /// -----  API Calls End -----  ///

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>
              Campaign Committee Fundraising {candidateData.cycle}
            </CardTitle>
            <CardDescription>
              Last Update: {candidateData.last_updated}
            </CardDescription>
          </CardHeader>
          {/* <CardTooltip content="TEST" /> */}
          <CardContent className="pl-2">
            <FundraisingBarChart candidateFunds={candidateData} />
          </CardContent>
          <CardHeader>
            <CardTitle>
              Source of Funds Breakdown {candidateData.cycle}
            </CardTitle>
            <CardDescription>
              Last Update: {candidateData.last_updated}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <FundraisingSummaryPieChart
              contributionBreakdown={contributionBreakdown}
            />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>
              Top Contributor: {topContributorTableData.top_contributor}
            </CardTitle>
            <CardDescription>
              Last Update: {candidateData.last_updated}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <TopContributorsTable data={topContributorTableData.contributors} />
          </CardContent>
          <CardHeader>
            <CardTitle>
              Top Industry: {topIndustriesData.top_contributor}
            </CardTitle>
            <CardDescription>
              Last Update: {candidateData.last_updated}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <TopContributorsTable data={topIndustriesData.contributors} />
          </CardContent>
          <CardHeader>
            <CardTitle>Top Sector: {topSectorsData.top_contributor}</CardTitle>
            <CardDescription>
              Last Update: {candidateData.last_updated}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <TopContributorsTable data={topSectorsData.contributors} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
