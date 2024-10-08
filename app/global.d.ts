import type { ReactNode } from "react";
import FundraisingSummaryPieChart from "./legislators/[id]/components/fundraising-summary-pie-chart";

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
    body: string | null;
    subBody: string;
    tooltipContent?: string | null;
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
    state: string | undefined;
    age: number;
    reelection: string;
    pronoun: string;
    leadership_role: string | null;
  };

  type CommitteeTableDataType = {
    committeeName: string;
    title: string;
    rank: number;
    end_date: string;
  };

  type VotingBehaviorDataType = {
    totalVotes: number;
    missedVotes: number;
    totalPresent: number;
    missedVotesPct: number;
    votesWithPartyPct: number;
    votesAgainstPartyPct: number;
  };

  type Bill = {
    congress: string;
    bill_id: string;
    bill_type: string;
    number: string;
    bill_uri: string;
    title: string;
    short_title: string;
    sponsor_title: string;
    sponsor_id: string;
    sponsor_name: string;
    sponsor_state: string;
    sponsor_party: string;
    sponsor_uri: string;
    gpo_pdf_uri: string | null;
    congressdotgov_url: string;
    govtrack_url: string;
    introduced_date: string;
    active: boolean;
    last_vote: string | null;
    house_passage: string;
    senate_passage: string;
    enacted: string;
    vetoed: string | null;
    cosponsors: number;
    cosponsors_by_party: Record<string, number>;
    committees: string;
    primary_subject: string;
    summary: string;
    summary_short: string;
    latest_major_action_date: string;
    latest_major_action: string;
  };

  type MemberByBill = {
    id: string;
    member_uri: string;
    name: string;
    num_results: number;
    offset: number;
    bills: Bill[];
  };

  type BillAPIResponse = {
    status: string;
    copyright: string;
    results: MemberByBill[];
  };

  type CandSummaryResponse = {
    cand_name: string;
    cid: string;
    cycle: string;
    state: string;
    party: string;
    chamber: string;
    first_elected: string;
    next_election: string;
    total: string;
    spent: string;
    cash_on_hand: string;
    debt: string;
    origin: string;
    source: string;
    last_updated: string;
  };

  type CandSummaryDataResponse = {
    summary: {
      "@attributes": CandSummaryResponse;
    };
  };

  type CandidateFundraisingSummaryData = {
    response: CandSummaryDataResponse;
  };

  type FundraisingBarChartData = {
    name: string;
    value: number;
    dollarValue: string;
  };

  type FundraisingContributor = {
    "@attributes": {
      org_name: string;
      total: string;
      pacs: string;
      indivs: string;
    };
  };

  type FundraisingContributors = {
    response: {
      contributors: {
        "@attributes": {
          cand_name: string;
          cid: string;
          cycle: string;
          origin: string;
          source: string;
          notice: string;
        };
        contributor: FundraisingContributor[];
      };
    };
  };

  type FundraisingContributorsData = {
    contributors: FundraisingContributorData[];
    top_contributor: string;
  };

  type FundraisingContributorData = {
    org_name: string;
    total: number;
    pacs: number;
    indivs: number;
  };

  type FundraisingIndustry = {
    "@attributes": {
      industry_code: string;
      industry_name: string;
      indivs: string;
      pacs: string;
      total: string;
    };
  };

  type fundraisingIndustryData = {
    industry_code: string;
    industry_name: string;
    indivs: number;
    pacs: number;
    total: number;
  };

  type FundraisingIndustries = {
    response: {
      industries: {
        "@attributes": {
          cand_name: string;
          cid: string;
          cycle: string;
          origin: string;
          source: string;
          last_updated: string;
        };
        industry: FundraisingIndustry[];
      };
    };
  };

  type fundraisingSectorData = {
    sector_name: string;
    sectorid: string;
    indivs: number;
    pacs: number;
    total: number;
  };

  type FundraisingSector = {
    "@attributes": {
      sector_name: string;
      sectorid: string;
      indivs: string;
      pacs: string;
      total: string;
    };
  };

  type FundraisingSectors = {
    response: {
      sectors: {
        "@attributes": {
          cand_name: string;
          cid: string;
          cycle: string;
          origin: string;
          source: string;
          last_updated: string;
        };
        sector: FundraisingSector[];
      };
    };
  };

  type FundraisingPieChartData = {
    data: FundraisingPieChartElement[];
  };

  type FundraisingPieChartElement = {
    name: string;
    value: number;
    label: string;
  };

  type CommitteeSubcommittee = {
    id: string;
    name: string;
    api_uri: string;
  };

  type Committee = {
    id: string;
    name: string;
    chamber: string;
    url: string;
    api_uri: string;
    chair: string;
    chair_id: string;
    chair_party: string;
    chair_state: string;
    chair_uri: string;
    ranking_member_id: string;
    subcommittees: CommitteeSubcommittee[];
  };

  type CommitteeResult = {
    congress: string;
    chamber: string;
    num_results: number;
    committees: Committee[];
  };

  type CommitteeApiResponse = {
    status: string;
    copyright: string;
    results: CommitteeResult[];
  };

  type CommitteeTableData = {
    id: string;
    congress: number;
    chamber: string;
    committee_name: string;
    chair_name: string;
    chair_party: string;
  };

  //Individual Committee
  type CommitteeAPIResponse = {
    status: string;
    copyright: string;
    results: IndivCommitteeResult[];
  };

  type IndivCommitteeResult = {
    congress: string;
    chamber: string;
    id: string;
    name: string;
    url: string;
    num_results: number;
    chair: string;
    chair_id: string;
    chair_party: string;
    chair_state: string;
    ranking_member_id: string;
    current_members: CommitteeMember[];
    former_members: CommitteeMember[];
    subcommittees: IndivCommitteeSubcommittee[];
  };

  type CommitteeMember = {
    id: string;
    name: string;
    api_uri: string;
    party: string;
    chamber: string;
    side: string;
    rank_in_party: number | null;
    state: string;
    note: string | null;
    begin_date: string | null;
    end_date: string | null;
  };

  type IndivCommitteeSubcommittee = {
    id: string;
    name: string;
    api_uri: string;
  };

  type CommitteeHeaderData = {
    chamber: string;
    name: string;
    url: string;
    chair: string;
    chair_party: string;
    chair_state: string;
  };

  type CommitteeMembersTableData = {
    id: string;
    name: string;
    party: string;
    chamber: string;
    side: string;
    rank_in_party: number | null;
    state: string;
    note: string | null;
  };

  type congCmteIndusCommitteeMember = {
    "@attributes": {
      member_name: string;
      cid: string;
      party: string;
      state: string;
      total: string;
      indivs: string;
      pacs: string;
    };
  };

  type congCmteIndusCommitteeInfo = {
    "@attributes": {
      committee_name: string;
      industry: string;
      congno: string;
      origin: string;
      source: string;
      last_updated: string;
    };
    member: congCmteIndusCommitteeMember[];
  };

  type congCmteIndusCommitteeResponse = {
    response: {
      committee: congCmteIndusCommitteeInfo;
    };
  };

  type committeeContributionsByIndustry = {
    name: string;
    total: number;
    individual: number;
    pacs: number;
  };
}
