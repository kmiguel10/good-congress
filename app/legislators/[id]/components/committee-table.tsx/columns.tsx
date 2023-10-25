"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CommitteeTableDataType>[] = [
  {
    accessorKey: "committeeName",
    header: "Committee",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "rank",
    header: () => <div className="text-right">Rank</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("rank")}</div>
      );
    },
  },
  {
    accessorKey: "end_date",
    header: () => <div className="text-right">End Date</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("end_date")}</div>
      );
    },
  },
];
