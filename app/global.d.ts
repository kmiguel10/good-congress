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

  type barChartDataType = {
    ageRange: string;
    democrats: number | 0;
    republicans: number | 0;
    age: number | 0;
  };

  type AgeTenureDataType = {
    id: number;
    name: string;
    age: number;
    tenure: number;
    party: string;
  };

  type LegislatorTableDataType = {
    id: string;
    name: string;
    chamber: string;
    age: number;
    gender: string;
    party: string;
    leadership_role: string | null;
    url: string;
    next_election: string;
    seniority: string | null;
    total_votes: number;
    missed_votes: number;
    total_present: number;
    missed_votes_pct: number;
    votes_with_party_pct: number;
    votes_against_party_pct: number;
  };

  type CommitteeType = {
    name: string;
    code: string;
    api_uri: string;
    side: string;
    title: string;
    rank_in_party: number;
    begin_date: string;
    end_date: string;
  };

  type RoleType = {
    congress: string;
    chamber: string;
    title: string;
    short_title: string;
    state: string;
    party: string;
    leadership_role: string | null;
    fec_candidate_id: string;
    seniority: string;
    district: string;
    at_large: boolean;
    ocd_id: string;
    start_date: string;
    end_date: string;
    office: string | null;
    phone: string | null;
    fax: string | null;
    contact_form: string | null;
    cook_pvi: string | null;
    dw_nominate: number;
    ideal_point: number | null;
    next_election: string;
    total_votes: number;
    missed_votes: number;
    total_present: number;
    senate_class: string;
    state_rank: string;
    lis_id: string;
    bills_sponsored: number;
    bills_cosponsored: number;
    missed_votes_pct: number;
    votes_with_party_pct: number;
    votes_against_party_pct: number;
    committees: CommitteeType[];
    subcommittees: CommitteeType[];
  };

  type MemberType = {
    id: string;
    member_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string | null;
    date_of_birth: string;
    gender: string;
    url: string;
    times_topics_url: string;
    times_tag: string;
    govtrack_id: string;
    cspan_id: string;
    votesmart_id: string;
    icpsr_id: string;
    twitter_account: string;
    facebook_account: string;
    youtube_account: string | null;
    crp_id: string;
    google_entity_id: string;
    rss_url: string | null;
    in_office: boolean;
    current_party: string;
    most_recent_vote: string;
    last_updated: string;
    roles: RoleType[];
  };

  type IndividualMember = {
    status: string;
    copyright: string;
    results: MemberType[];
  };

  type IndividualMemberHeader = {
    name: string;
    party: string;
    district: string;
    state: string;
    age: number;
    reelection: string;
    pronoun: string;
  };

  type CommitteeTableDataType = {
    committeeName: string;
    title: string;
    rank: number;
    end_date: string;
  };
}
