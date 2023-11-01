"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<CommitteeMembersTableData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        className="underline decoration-sky-600 hover:text-purple-600"
        href={`/legislators/${row.original.id}`}
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "note",
    header: "Title",
  },
  {
    accessorKey: "rank_in_party",
    header: "Rank",
  },
  {
    accessorKey: "side",
    header: "Side",
  },
  {
    accessorKey: "party",
    header: "Party",
    cell: ({ row }) => {
      if (row.original.party === "D") {
        return <div className="text-blue-600">{row.getValue("party")}</div>;
      } else if (row.original.party === "R") {
        return <div className="text-red-600">{row.getValue("party")}</div>;
      } else {
        return <div className="text-green-600">{row.getValue("party")}</div>;
      }
    },
  },
];
