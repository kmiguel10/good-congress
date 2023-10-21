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
export function getActiveMembers(congress: CongressData): Member[] {
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
