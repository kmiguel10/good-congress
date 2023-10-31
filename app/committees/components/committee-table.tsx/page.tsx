import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Props {
  data: CommitteeTableData[];
}

export default function CommitteeTable({ data }: Props) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
