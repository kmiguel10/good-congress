import type { ReactNode } from "react";

declare global {
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

  /**
   * Prop interface for CardDashboard
   */
  interface cardProps {
    title: string;
    body: string;
    subBody: string;
  }
}
