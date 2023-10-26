import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  getActiveMembers,
  getActiveMembersWithoutChamberFilter,
  getLegislatorTableData,
} from "@/lib/utils";

export default async function LegislatorsTable() {
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

  const activeMembers: Member[] =
    getActiveMembersWithoutChamberFilter(combinedCongressData);

  const data = getLegislatorTableData(activeMembers);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
