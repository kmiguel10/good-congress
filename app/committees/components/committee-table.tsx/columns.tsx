"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<CommitteeTableData>[] = [
  {
    accessorKey: "committee_name",
    header: "Committee",
    cell: ({ row }) => (
      <Link
        className="underline decoration-sky-600 hover:text-purple-600"
        href="/committees/[...id]"
        as={`/committees/${row.original.id}/${row.original.congress}/${row.original.chamber}`}
      >
        {row.original.committee_name}
      </Link>
    ),
  },
  {
    accessorKey: "chair_name",
    header: "Chair",
  },
  {
    accessorKey: "chair_party",
    header: "Party",
  },
];
