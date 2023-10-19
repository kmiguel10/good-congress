import { useEffect, useState } from "react";
import Navbar from "./components/navbar";

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

export default async function Home() {
  const response = await fetch(
    "https://api.propublica.org/congress/v1/118/house/members.json",
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  const data: CongressData = await response.json();

  // Filter members with in_office set to false
  const inactiveMembers = data.results[0].members.filter(
    (member) => !member.in_office
  );

  const democrats = data.results[0].members.filter(
    (member) => member.party === "D"
  );

  const republicans = data.results[0].members.filter(
    (member) => member.party === "R"
  );

  const testThis = data.results[0].members.filter(
    (member) => member.last_name === "Plaskett"
  );

  console.log(data);

  return (
    <div>
      <h1>Example Data</h1>
      <p> Republicans {republicans.length}</p>
      <p> Democrats {democrats.length}</p>
      <p> Total Numbers {data.results[0].members.length}</p>
      {/* <p>{testThis}</p> */}

      {/* {data.results[0].members.filter((d) => !d.in_office)} */}
      <ul>
        {inactiveMembers.map((member) => (
          <li key={member.id}>
            {member.title} {member.first_name} {member.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
