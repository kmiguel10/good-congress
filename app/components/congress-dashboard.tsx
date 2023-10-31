import CongressPage from "./congress-page";

async function fetchCongressData(congress: number, chamber: string) {
  const response = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`,
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  return response.json();
}

export default async function CongressDashboard() {
  const congress = 118; // Set to the desired congress dynamically

  // Use Promise.all to fetch data for both the house and senate in parallel
  const [houseData, senateData] = await Promise.all([
    fetchCongressData(congress, "house"),
    fetchCongressData(congress, "senate"),
  ]);

  const combinedCongressData: CongressData = {
    status: "Combined Data",
    copyright: "Your Copyright Info",
    results: [
      {
        congress: congress.toString(),
        chamber: "combined",
        num_results:
          houseData.results[0].num_results + senateData.results[0].num_results,
        offset: 0,
        members: [
          ...houseData.results[0].members,
          ...senateData.results[0].members,
        ],
      },
    ],
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <CongressPage congressData={combinedCongressData} />
    </div>
  );
}
