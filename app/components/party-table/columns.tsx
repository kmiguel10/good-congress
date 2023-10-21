"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

//shape of legislator object
//can use zod schema

type Member = {
  id: string;
  title: string;
  short_title: string;
  api_uri: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  suffix: string | null;
  date_of_birth: string;
  gender: string;
  party: string;
  leadership_role: string | null;
  twitter_account: string;
  facebook_account: string;
  youtube_account: string | null;
  govtrack_id: string;
  cspan_id: string;
  votesmart_id: string;
  icpsr_id: string;
  crp_id: string;
  google_entity_id: string;
  fec_candidate_id: string;
  url: string;
  rss_url: string;
  contact_form: string | null;
  in_office: boolean;
  cook_pvi: string | null;
  dw_nominate: string | null;
  ideal_point: string | null;
  seniority: string;
  next_election: string;
  total_votes: number;
  missed_votes: number;
  total_present: number;
  last_updated: string;
  ocd_id: string;
  office: string;
  phone: string;
  fax: string | null;
  state: string;
  district: string;
  at_large: boolean;
  geoid: string;
  missed_votes_pct: number;
  votes_with_party_pct: number;
  votes_against_party_pct: number;
};

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
