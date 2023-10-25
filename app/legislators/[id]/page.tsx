import { getHeaderInfo } from "@/lib/utils";
import React from "react";

interface Props {
  params: { id: string };
}

export default async function LegislatorInformation({ params }: Props) {
  const response = await fetch(
    `https://api.propublica.org/congress/v1/members/${params.id}.json`,
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  const memberData: IndividualMember = await response.json();
  const { name, party, district, state, age, reelection, pronoun } =
    getHeaderInfo(memberData.results);
  return (
    <div className="container relative">
      <div className="overflow-hidden rounded-lg border bg-background shadow space-y-4">
        <div className="flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
              <p className="text-muted-foreground">
                A {party} from {district}&apos;th district of {state}. {pronoun}{" "}
                is {age} yrs old and is up for reelection in {reelection}.
              </p>
            </div>
          </div>

          {/* <div className="flex-1 space-y-4 p-8 pt-6">
            <LegislatorsTable />
          </div> */}
        </div>
      </div>
    </div>
  );
}
