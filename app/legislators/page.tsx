import React from "react";
import LegislatorsTable from "./components/legislators-table";

export default function Legislators() {
  return (
    <div className="container relative">
      <div className="overflow-hidden rounded-lg border bg-background shadow space-y-4">
        <div className="flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Legislators</h2>
              <p className="text-muted-foreground">
                Select a legislator from both chambers
              </p>
            </div>
          </div>
          <LegislatorsTable />
          {/* <div className="flex-1 space-y-4 p-8 pt-6">
            <LegislatorsTable />
          </div> */}
        </div>
      </div>
    </div>
  );
}
