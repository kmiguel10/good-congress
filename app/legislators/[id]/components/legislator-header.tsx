import React from "react";

export default function LegislatorHeader({
  headerInfo,
}: {
  headerInfo: IndividualMemberHeader;
}) {
  const { name, party, district, state, age, reelection, pronoun } = headerInfo;
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
      <p className="text-muted-foreground">
        A {party} from {district}th district of {state}. {pronoun} is {age} yrs
        old and is up for reelection in {reelection}.
      </p>
    </div>
  );
}
