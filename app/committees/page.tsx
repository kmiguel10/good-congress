import { getSenateCommittees, getHouseCommittees } from "@/lib/utils";
import CommitteePageContent from "./components/committee-page-context";

export default async function Committees() {
  const congress = 118; //needs to be dynamic , set to current

  /** API Calls */
  const responseSenateCommittees = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/senate/committees.json`,
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  const senateCommitteeData: CommitteeApiResponse =
    await responseSenateCommittees.json();

  const senateCommittees: Committee[] =
    getSenateCommittees(senateCommitteeData);

  const responseHouseCommittees = await fetch(
    `https://api.propublica.org/congress/v1/${congress}/house/committees.json`,
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );
  const houseCommitteeData: CommitteeApiResponse =
    await responseHouseCommittees.json();

  const houseCommittees: Committee[] = getHouseCommittees(houseCommitteeData);

  return (
    <div className="container relative">
      <div className="overflow-hidden rounded-lg border bg-background shadow space-y-4">
        <div className="flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Committees</h2>
              <p className="text-muted-foreground">
                Select a Committee from the House or Senate
              </p>
            </div>
          </div>
          <CommitteePageContent
            senateCommittees={senateCommittees}
            houseCommittees={houseCommittees}
          />
        </div>
      </div>
    </div>
  );
}
