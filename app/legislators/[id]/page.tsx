import { getHeaderInfo } from "@/lib/utils";
import React from "react";
import LegislatorHeader from "./components/legislator-header";

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

  if (!response.ok) {
    // Handle non-successful responses here, e.g., log the status and throw an error.
    console.error(`API request failed with status ${response.status}`);
    throw new Error(`API request failed with status ${response.status}`);
  }

  const memberData: IndividualMember = await response.json();
  const headerInfo = getHeaderInfo(memberData.results);
  return (
    <div className="container relative">
      <div className="overflow-hidden rounded-lg border bg-background shadow space-y-4">
        <div className="flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <LegislatorHeader headerInfo={headerInfo} />
          </div>

          {/* <div className="flex-1 space-y-4 p-8 pt-6">
            <LegislatorsTable />
          </div> */}
        </div>
      </div>
    </div>
  );
}
