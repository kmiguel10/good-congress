"use client";

import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<LegislatorTableDataType>[] = [
  {
    accessorKey: "name",
    header: "Legislator",
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
    accessorKey: "chamber",
    header: "Chamber",
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
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Age
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("age")}</div>;
    },
  },
  {
    accessorKey: "next_election",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Reelection
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("next_election")}</div>;
    },
  },
  {
    accessorKey: "seniority",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Seniority
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("seniority")}</div>;
    },
  },
  {
    accessorKey: "total_votes",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Votes
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("total_votes")}</div>;
    },
  },
  {
    accessorKey: "missed_votes",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Missed Votes
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("missed_votes")}</div>;
    },
  },
];
