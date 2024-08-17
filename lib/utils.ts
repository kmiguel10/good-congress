import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  congressCommitteeCodes,
  jointCommitteeCodes,
  senateCommitteeCodes,
} from "../lib/constants/committee";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *Calculates the total active members of congress by filtering out inactive and delegate members with Chamber filter
 * @param data of type CongressData from the API
 * @returns returns an array of filtered Member[]
 */
export function getActiveMembers(
  congress: CongressData,
  chamber: number
): Member[] {
  if (chamber === 1) {
    return congress.results[0].members.filter(function (member) {
      return member.in_office && member.title != "Delegate";
    });
  } else if (chamber === 2) {
    return congress.results[0].members.filter(function (member) {
      return (
        member.in_office &&
        member.title != "Delegate" &&
        member.short_title === "Rep."
      );
    });
  } else {
    return congress.results[0].members.filter(function (member) {
      return (
        member.in_office &&
        member.title != "Delegate" &&
        member.short_title === "Sen."
      );
    });
  }
}

/**
 * Calculates the total active members of congress by filtering out inactive and delegate members with Chamber filter
 * @param congress : CongressData
 * @returns Member[]
 */
export function getActiveMembersWithoutChamberFilter(
  congress: CongressData
): Member[] {
  return congress.results[0].members.filter(function (member) {
    return member.in_office && member.title != "Delegate";
  });
}

/**
 *Calculates the total active dems
 * @param activeMembers
 * @returns number of dems
 */
export function getDemocraticMembers(activeMembers: Member[]): Member[] {
  return activeMembers.filter((member) => member.party === "D");
}

/**
 * Calculates the total active republicans
 * @param activeMembers
 * @returns number of reps
 */
export function getRepublicanMembers(activeMembers: Member[]): Member[] {
  return activeMembers.filter((member) => member.party === "R");
}

export function getIndependentMembers(activeMembers: Member[]): Member[] {
  return activeMembers.filter((member) => member.party === "ID");
}

/**
 * Calculates whether a party is in a majority or minority
 * @param party
 * @param democrats
 * @param republicans
 * @returns "Majority" or "Minority" status
 */
export function getPartyMajorityMinorityStatus(
  party: string,
  democrats: Member[],
  republicans: Member[]
): string {
  if (party === "rep") {
    return republicans.length > democrats.length ? "Majority" : "Minority";
  } else {
    return democrats.length > republicans.length ? "Majority" : "Minority";
  }
}

/**
 * Calculates age
 * @param members
 * @param results
 * @returns array of type barChartDataType
 */
export function calculateCongressAgeData(
  members: Member[],
  results: barChartDataType[]
): barChartDataType[] {
  members.forEach((member) => {
    const birthDate = new Date(member.date_of_birth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    //Determine the age range based on the age
    let ageRange: any;

    if (age < 31) {
      ageRange = "< 31";
    } else if (age >= 31 && age <= 41) {
      ageRange = "31 - 41";
    } else if (age >= 42 && age <= 52) {
      ageRange = "42 - 52";
    } else if (age >= 53 && age <= 63) {
      ageRange = "53 - 63";
    } else if (age >= 64 && age <= 74) {
      ageRange = "64 - 74";
    } else if (age >= 75 && age <= 85) {
      ageRange = "75 - 85";
    } else {
      ageRange = "> 85";
    }

    //increment the counts for dems and reps
    if (member.party === "D") {
      results.find((range) => {
        if (range.ageRange === ageRange) {
          range.democrats++;
        }
      });
    } else {
      results.find((range) => {
        if (range.ageRange === ageRange) {
          range.republicans++;
        }
      });
    }
  });
  return results;
}

/**
 *Returns age and years served
 * @param param0
 * @returns AgeTenureDataType[]
 */
export function getAgeAndTenureData(members: Member[]): AgeTenureDataType[] {
  const results: AgeTenureDataType[] = [];

  members.forEach((member) => {
    const birthDate = new Date(member.date_of_birth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    results.push({
      id: parseInt(member.id),
      name: `${member.short_title} ${member.last_name} ${member.state} ${member.party}`,
      age: age,
      tenure: parseInt(member.seniority),
      party: member.party,
    });
  });

  return results;
}

export function getAvgAge(members: Member[]): number {
  let sumAge: number = 0;
  members.forEach((member) => {
    const birthDate = new Date(member.date_of_birth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    sumAge += age;
  });

  return Math.round(sumAge / members.length);
}

/**
 *
 * @param members Get average tenure(years) of Members[]
 * @returns Average Tenure (years)
 */
export function getAvgTenure(members: Member[]): number {
  let sumTenure = 0;
  members.forEach((member) => {
    sumTenure += parseInt(member.seniority);
  });
  return Math.round(sumTenure / members.length);
}

/**
 *
 * @param shortTitle Get Chamber name based on short title
 * @returns Senate or House
 */
export function getChamber(shortTitle: string): string {
  return shortTitle === "Sen." ? "Senate" : "House";
}

/**
 * Get data for Legislator Table from member[]
 * @param members
 * @returns Legislator Table Data LegislatorTableDataType[]
 */
export function getLegislatorTableData(
  members: Member[]
): LegislatorTableDataType[] {
  let legislatureData: LegislatorTableDataType[] = [];

  members.forEach((member) => {
    const birthDate = new Date(member.date_of_birth);
    const today = new Date();
    const age: number = today.getFullYear() - birthDate.getFullYear();
    const chamber: string = getChamber(member.short_title);

    return legislatureData.push({
      id: member.id,
      name: `${member.short_title} ${member.first_name} ${member.last_name}`,
      chamber: chamber,
      age: age,
      gender: member.gender,
      party: member.party,
      leadership_role: member.leadership_role,
      url: member.url,
      next_election: member.next_election,
      seniority: member.seniority,
      total_votes: member.total_votes,
      missed_votes: member.missed_votes,
      total_present: member.total_present,
      missed_votes_pct: member.missed_votes_pct,
      votes_with_party_pct: member.votes_with_party_pct,
      votes_against_party_pct: member.votes_against_party_pct,
    });
  });

  return legislatureData;
}

/**
 * Get state name based on given abbreviation
 * @param stateAbbreviation
 * @returns State Name
 */
function getStateName(stateAbbreviation: string): string | undefined {
  const stateAbbreviations: { [key: string]: string } = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
    // Add more states if needed
  };

  return stateAbbreviations[stateAbbreviation] || undefined;
}

/**
 * Get header information
 * @param member
 * @returns IndividualMemberHeader
 */
export function getHeaderInfo(member: MemberType[]): IndividualMemberHeader {
  const roles = member[0].roles[0];
  const getParty = (party: string): string => {
    return party === "D" ? "democrat" : "republican";
  };
  const birthDate = new Date(member[0].date_of_birth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const getPronoun = (gender: string): string => {
    return gender === "F" ? "She" : "He";
  };

  const header: IndividualMemberHeader = {
    name: `${roles.short_title} ${member[0].first_name} ${member[0].last_name}`,
    party: getParty(member[0].current_party),
    district: roles.district,
    state: getStateName(roles.state),
    age: age,
    reelection: roles.next_election,
    pronoun: getPronoun(member[0].gender),
    leadership_role: roles.leadership_role,
  };

  return header;
}

/**
 * Get committee and subcommittee table data
 * @param committees
 * @returns CommitteeTableDataType[]
 */
export function getCommitteeTableData(
  committees: CommitteeType[]
): CommitteeTableDataType[] {
  let committeeData: CommitteeTableDataType[] = [];

  committees.forEach((committee) => {
    const date = new Date(committee.end_date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short", // Use short month name (e.g., "Jan")
      day: "numeric",
    };
    const endDate = new Intl.DateTimeFormat("en-US", options).format(date);
    committeeData.push({
      committeeName: committee.name,
      title: committee.title,
      rank: committee.rank_in_party,
      end_date: endDate,
    });
  });

  return committeeData;
}

/**
 * Get voting behavior data type
 * @param data
 * @returns VotingBehaviorDataType
 */
export function getVotingBehaviorDataType(
  data: RoleType
): VotingBehaviorDataType {
  return {
    totalVotes: data.total_votes,
    missedVotes: data.missed_votes,
    totalPresent: data.total_present,
    missedVotesPct: data.missed_votes_pct,
    votesWithPartyPct: data.votes_with_party_pct,
    votesAgainstPartyPct: data.votes_against_party_pct,
  };
}

/**
 *
 * @param data Get bills passed by given member
 * @returns Number of bills passed
 */
export function getBillsPassedByMember(data: BillAPIResponse): string {
  return data.results[0].num_results.toString();
}

/**
 * Formats dollar value to dollar value string
 * @param value
 * @returns
 */
function formatDollarValue(value: number): string {
  return "$" + value.toLocaleString("en-US");
}

/**
 * Get fundraising bar chart data
 * @param data
 * @returns FundraisingBarChartData[]
 */
export function getFundraisingBarChartData(
  data: CandSummaryResponse
): FundraisingBarChartData[] {
  const fundraisingData: FundraisingBarChartData[] = [];

  fundraisingData.push({
    name: "Raised",
    value: parseInt(data.total),
    dollarValue: formatDollarValue(parseInt(data.total)),
  });

  fundraisingData.push({
    name: "Spent",
    value: parseInt(data.spent),
    dollarValue: formatDollarValue(parseInt(data.spent)),
  });

  fundraisingData.push({
    name: "Cash on Hand",
    value: parseInt(data.cash_on_hand),
    dollarValue: formatDollarValue(parseInt(data.cash_on_hand)),
  });

  fundraisingData.push({
    name: "Debts",
    value: parseInt(data.debt),
    dollarValue: formatDollarValue(parseInt(data.debt)),
  });

  return fundraisingData;
}

/**
 * Get top contributor table data
 * @param data
 * @returns FundraisingContributorsData
 */
export function getTopContributorTableData(
  data: FundraisingContributors
): FundraisingContributorsData {
  const contributors: FundraisingContributorData[] = [];
  let topContributor: FundraisingContributorData = {
    org_name: "",
    total: 0,
    pacs: 0,
    indivs: 0,
  };

  let top_contributor = "";

  data.response.contributors.contributor.forEach((contributor) => {
    const contributorData: FundraisingContributorData = {
      org_name: contributor["@attributes"].org_name,
      total: parseInt(contributor["@attributes"].total),
      pacs: parseInt(contributor["@attributes"].pacs),
      indivs: parseInt(contributor["@attributes"].indivs),
    };

    contributors.push(contributorData);

    // Check if this contributor is the top contributor
    if (contributorData.total > topContributor.total) {
      top_contributor = contributorData.org_name;
      topContributor.total = contributorData.total;
    }
  });

  return { contributors, top_contributor };
}

/**
 * Gets top industries table data
 * @param data from industry API
 * @returns FundraisingContributorsData
 */
export function getTopIndustriesTableData(
  data: FundraisingIndustries
): FundraisingContributorsData {
  const contributors: FundraisingContributorData[] = [];
  let topContributor: fundraisingIndustryData = {
    industry_name: "",
    total: 0,
    pacs: 0,
    indivs: 0,
    industry_code: "",
  };

  let top_contributor = "";

  data.response.industries.industry.forEach((industry) => {
    const contributorData: FundraisingContributorData = {
      org_name: industry["@attributes"].industry_name,
      total: parseInt(industry["@attributes"].total),
      pacs: parseInt(industry["@attributes"].pacs),
      indivs: parseInt(industry["@attributes"].indivs),
    };

    contributors.push(contributorData);

    // Check if this contributor is the top contributor
    if (contributorData.total > topContributor.total) {
      top_contributor = contributorData.org_name;
      topContributor.total = contributorData.total;
    }
  });

  return { contributors, top_contributor };
}

/**
 * Gets fundraising data by sector for table
 * @param data from industry API
 * @returns FundraisingContributorsData
 */
export function getTopSectorTableData(
  data: FundraisingSectors
): FundraisingContributorsData {
  const contributors: FundraisingContributorData[] = [];
  let topContributor: fundraisingSectorData = {
    sector_name: "",
    total: 0,
    pacs: 0,
    indivs: 0,
    sectorid: "",
  };

  let top_contributor = "";

  data.response.sectors.sector.forEach((sector) => {
    const contributorData: FundraisingContributorData = {
      org_name: sector["@attributes"].sector_name,
      total: parseInt(sector["@attributes"].total),
      pacs: parseInt(sector["@attributes"].pacs),
      indivs: parseInt(sector["@attributes"].indivs),
    };

    contributors.push(contributorData);

    // Check if this contributor is the top contributor
    if (contributorData.total > topContributor.total) {
      top_contributor = contributorData.org_name;
      topContributor.total = contributorData.total;
    }
  });

  return { contributors, top_contributor };
}

export function getFundraisingSummaryPieChartData(
  data: FundraisingSectors
): FundraisingPieChartElement[] {
  const pieChartData: FundraisingPieChartElement[] = [
    {
      name: "Individual",
      value: 0,
      label: "",
    },
    {
      name: "PACs",
      value: 0,
      label: "",
    },
  ];

  data.response.sectors.sector.forEach((sector) => {
    const individualValue = parseInt(sector["@attributes"].indivs);
    const pacsValue = parseInt(sector["@attributes"].pacs);

    const individualObject = pieChartData.find(
      (data) => data.name === "Individual"
    );
    const pacsObject = pieChartData.find((data) => data.name === "PACs");

    if (individualValue > 0) {
      individualObject!.value =
        (individualObject!.value || 0) + individualValue;
      individualObject!.label =
        "Individual: " + formatDollarValue(individualObject!.value).toString();
    }

    if (pacsValue > 0) {
      pacsObject!.value = (pacsObject!.value || 0) + pacsValue;
      pacsObject!.label =
        "PACs: " + formatDollarValue(pacsObject!.value).toString();
    }

    // pieChartData.individual += parseInt(sector["@attributes"].indivs);
    // pieChartData.pacs += parseInt(sector["@attributes"].pacs);
    // pieChartData.total += parseInt(sector["@attributes"].total);
  });

  return pieChartData;
}

/**
 * Get committees for senate and house
 * @param data
 * @returns
 */
export function getCommittees(
  data: CommitteeApiResponse
): CommitteeTableData[] {
  const results: CommitteeTableData[] = [];
  const congress = parseInt(data.results[0].congress);
  const chamber = data.results[0].chamber;

  data.results[0].committees.forEach((committee) => {
    results.push({
      id: committee.id,
      congress: congress,
      chamber: chamber,
      committee_name: committee.name,
      chair_name: committee.chair,
      chair_party: committee.chair_party,
    });
  });
  return results;
}

/**
 * Data used for Committee Header
 * @param data
 * @returns
 */
export function getCommitteeHeaderData(
  data: CommitteeAPIResponse
): CommitteeHeaderData {
  return {
    chamber: data.results[0].chamber,
    name: data.results[0].name,
    url: data.results[0].url,
    chair: data.results[0].chair,
    chair_party: data.results[0].chair_party,
    chair_state: data.results[0].chair_state,
  };
}

export function getCommitteeMembersTableData(
  data: CommitteeMember[]
): CommitteeMembersTableData[] {
  const committeeMembersData: CommitteeMembersTableData[] = [];
  data.forEach((member) => {
    committeeMembersData.push({
      id: member.id,
      name: member.name,
      party: member.party,
      chamber: member.chamber,
      side: member.side,
      rank_in_party: member.rank_in_party,
      state: member.state,
      note: member.note,
    });
  });
  return committeeMembersData;
}

/**
 * Get committee name from api.gov and code from opensecrets
 * @param chamber
 * @param committee
 * @returns
 */
export function getCommitteeCode(chamber: string, committee: string): string {
  if (chamber === "Senate") {
    return senateCommitteeCodes[committee];
  } else if (chamber === "House") {
    return congressCommitteeCodes[committee];
  } else {
    return jointCommitteeCodes[committee];
  }
}

export function getcommitteeContributionsByIndustry(
  data: congCmteIndusCommitteeResponse
): committeeContributionsByIndustry {
  const contributions: committeeContributionsByIndustry = {
    name: "",
    total: 0,
    individual: 0,
    pacs: 0,
  };

  contributions.name = data.response.committee["@attributes"].industry;

  data.response.committee.member.forEach((mem) => {
    contributions.total += parseInt(mem["@attributes"].total);
    contributions.individual += parseInt(mem["@attributes"].indivs);
    contributions.pacs += parseInt(mem["@attributes"].pacs);
  });

  return contributions;
}
