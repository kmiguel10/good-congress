"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

//will add more
export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "last_name",
    header: "Legislator",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "seniority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Seniority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("seniority")}
        </div>
      );
    },
  },
  {
    accessorKey: "district",
    header: () => <div className="text-right">District</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("district")}</div>
      );
    },
  },
];
