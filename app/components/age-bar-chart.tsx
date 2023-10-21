"use client";

import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

type CongressData = {
  status: string;
  copyright: string;
  results: {
    congress: string;
    chamber: string;
    num_results: number;
    offset: number;
    members: Member[];
  }[];
};

type barChartType = {
  ageRange: string;
  democrats: number | 0;
  republicans: number | 0;
  age: number | 0;
};

const barChartData: barChartType[] = [
  {
    ageRange: "0 - 28",
    democrats: 0,
    republicans: 0,
    age: 0,
  },
  {
    ageRange: "0 - 28",
    democrats: 0,
    republicans: 0,
    age: 0,
  },
  {
    ageRange: "0 - 28",
    democrats: 0,
    republicans: 0,
    age: 0,
  },
  {
    ageRange: "0 - 28",
    democrats: 0,
    republicans: 0,
    age: 0,
  },
  {
    ageRange: "0 - 28",
    democrats: 0,
    republicans: 0,
    age: 0,
  },
  {
    ageRange: "0 - 28",
    democrats: 0,
    republicans: 0,
    age: 0,
  },
];

const data = [
  {
    name: "< 27",
    democrats: 23,
    republicans: 10,
  },
  {
    name: "28 - 38",
    democrats: 3000,
    republicans: 1398,
  },
  {
    name: "39 - 49",
    democrats: 2000,
    republicans: 9800,
    amt: 2290,
  },
  {
    name: "50 - 59",
    democrats: 2780,
    republicans: 3908,
    amt: 2000,
  },
  {
    name: "60 - 70",
    democrats: 1890,
    republicans: 4800,
    amt: 2181,
  },
  {
    name: "71 - 81",
    democrats: 2390,
    republicans: 3800,
    amt: 2500,
  },
  {
    name: "> 82",
    democrats: 3490,
    republicans: 4300,
    amt: 2100,
  },
];

interface Props {
  members: Member[];
}

export default function AgeBarChart(members: Props) {
  //calculate age range
  // How do I divide it?
  // 0 - 27
  // 28 - 38
  // 39 - 49
  // 50 - 60
  // 61 - 71
  // 72 - 82
  // 83 or more

  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="democrats"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="republicans"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
