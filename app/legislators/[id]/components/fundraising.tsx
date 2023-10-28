import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getFundraisingSummaryPieChartData,
  getTopContributorTableData,
  getTopIndustriesTableData,
  getTopSectorTableData,
} from "@/lib/utils";
import FundraisingBarChart from "./fundraising-bar-chart";
import FundraisingSummaryPieChart from "./fundraising-summary-pie-chart";
import TopContributorsTable from "./top-contributor-table.tsx/page";
import { CardTooltip } from "@/app/components/tool-tip";
import FundraisingCard from "./fundraising-card";
import { TooltipContent } from "@radix-ui/react-tooltip";

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
          <FundraisingCard
            cardTitle={`Campaign Committee Fundraising for ${candidateData.cycle} Cycle`}
            cardDescription={`Last Updated ${candidateData.last_updated}`}
            cardContent={<FundraisingBarChart candidateFunds={candidateData} />}
          />
          <FundraisingCard
            cardTitle={`Source of Funds Breakdown ${candidateData.cycle}`}
            cardDescription={`Last Updated ${candidateData.last_updated}`}
            cardContent={
              <FundraisingSummaryPieChart
                contributionBreakdown={contributionBreakdown}
              />
            }
          />
        </Card>
        <Card className="col-span-4">
          <FundraisingCard
            cardTitle={`Top Contributor: ${topContributorTableData.top_contributor}`}
            cardDescription="Top 10 Biggest Contributors"
            cardContent={
              <TopContributorsTable
                data={topContributorTableData.contributors}
              />
            }
            tooltipContent={
              candContribData.response.contributors["@attributes"].notice
            }
          />
          <FundraisingCard
            cardTitle={`Top Industry: ${topIndustriesData.top_contributor}`}
            cardDescription="Top 10 Biggest Industry Contributors"
            cardContent={
              <TopContributorsTable data={topIndustriesData.contributors} />
            }
          />
          <FundraisingCard
            cardTitle={`Top Sector: ${topSectorsData.top_contributor}`}
            cardContent={
              <TopContributorsTable data={topSectorsData.contributors} />
            }
          />
        </Card>
      </div>
    </>
  );
}
