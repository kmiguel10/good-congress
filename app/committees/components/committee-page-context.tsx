"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommitteeTable from "./committee-table/committee-table";

interface Props {
  senateCommittees: CommitteeTableData[];
  houseCommittees: CommitteeTableData[];
}

export default function CommitteePageContent({
  senateCommittees,
  houseCommittees,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Senate</CardTitle>
        </CardHeader>
        <CardContent>
          <CommitteeTable data={senateCommittees} />
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>House</CardTitle>
          {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <CommitteeTable data={houseCommittees} />
        </CardContent>
      </Card>
    </div>
  );
}
