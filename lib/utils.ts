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
