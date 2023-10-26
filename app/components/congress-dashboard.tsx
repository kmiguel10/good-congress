import CongressPage from "./congress-page";

export default async function CongressDashboard() {
  const responseHouse = await fetch(
    "https://api.propublica.org/congress/v1/118/house/members.json",
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  const responseSenate = await fetch(
    "https://api.propublica.org/congress/v1/118/senate/members.json",
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  const houseData: CongressData = await responseHouse.json();
  const senateData: CongressData = await responseSenate.json();

  const combinedCongressData: CongressData = {
    status: "Combined Data",
    copyright: "Your Copyright Info",
    results: [
      {
        congress: "118",
        chamber: "house",
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
