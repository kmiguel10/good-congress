import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *Calculates the total active members of congress by filtering out inactive and delegate members
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
  // if (!members || !Array.isArray(members)) {
  //   // Handle the case where members is not an array or is null/undefined.
  //   return results;
  // }
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

export function getAvgTenure(members: Member[]): number {
  let sumTenure = 0;
  members.forEach((member) => {
    sumTenure += parseInt(member.seniority);
  });
  return Math.round(sumTenure / members.length);
}

export function getChamber(shortTitle: string): string {
  return shortTitle === "Sen." ? "Senate" : "House";
}

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
