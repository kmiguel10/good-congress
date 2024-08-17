import { Card } from "@/components/ui/card";
import {
  getFundraisingSummaryPieChartData,
  getTopContributorTableData,
  getTopIndustriesTableData,
  getTopSectorTableData,
} from "@/lib/utils";
import FundraisingBarChart from "./fundraising-bar-chart";
import FundraisingCard from "./fundraising-card";
import FundraisingSummaryPieChart from "./fundraising-summary-pie-chart";
import TopContributorsTable from "./top-contributor-table.tsx/page";

interface Props {
  params: { id: string };
}

async function fetchData(url: string) {
  const response = await fetch(url, {
    headers: {
      "X-API-Key": process.env.OPEN_SECRETS_API_KEY || "",
    },
  });

  if (!response.ok) {
    console.error(`API request failed with status ${response.status}`);
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

export default async function Fundraising({ params }: Props) {
  const currentCycle = 2024; // This will need to be updated automatically

  // Parallelize API requests
  const [candSummaryData, candContribData, candIndustryData, candSectorData] =
    await Promise.all([
      fetchData(
        `http://www.opensecrets.org/api/?method=candSummary&cid=${params.id}&cycle=${currentCycle}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
      ),
      fetchData(
        `http://www.opensecrets.org/api/?method=candContrib&cid=${params.id}&cycle=${currentCycle}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
      ),
      fetchData(
        `http://www.opensecrets.org/api/?method=candIndustry&cid=${params.id}&cycle=${currentCycle}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
      ),
      fetchData(
        `http://www.opensecrets.org/api/?method=candSector&cid=${params.id}&cycle=${currentCycle}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
      ),
    ]);

  const candidateData: CandSummaryResponse =
    candSummaryData.response.summary["@attributes"];
  const topContributorTableData: FundraisingContributorsData =
    getTopContributorTableData(candContribData);
  const topIndustriesData: FundraisingContributorsData =
    getTopIndustriesTableData(candIndustryData);
  const topSectorsData: FundraisingContributorsData =
    getTopSectorTableData(candSectorData);
  const contributionBreakdown: FundraisingPieChartElement[] =
    getFundraisingSummaryPieChartData(candSectorData);

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
