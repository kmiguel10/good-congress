import React from "react";

export default function LegislatorHeader({
  headerInfo,
}: {
  headerInfo: IndividualMemberHeader;
}) {
  const {
    name,
    party,
    district,
    state,
    age,
    reelection,
    pronoun,
    leadership_role,
  } = headerInfo;
  return !leadership_role ? (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
      {district && (
        <p className="text-muted-foreground">
          A {party} from the {district}th district of {state}. {pronoun} is{" "}
          {age} yrs old and is up for reelection in{" "}
          <strong>{reelection}</strong>.
        </p>
      )}
      {!district && (
        <p className="text-muted-foreground">
          A {party} from the state of {state}. {pronoun} is {age} yrs old and is
          up for reelection in <strong>{reelection}</strong>.
        </p>
      )}
    </div>
  ) : (
    <div>
      {" "}
      <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
      {district && (
        <p className="text-muted-foreground">
          A {party} from the {district}th district of {state}. {pronoun} is{" "}
          {age} yrs old and is up for reelection in{" "}
          <strong>{reelection}</strong>. {pronoun} serves as the{" "}
          <strong>{leadership_role}</strong>.
        </p>
      )}
      {!district && (
        <p className="text-muted-foreground">
          A {party} from the state of {state}. {pronoun} is {age} yrs old and is
          up for reelection in <strong>{reelection}</strong>. {pronoun} serves
          as the <strong>{leadership_role}</strong>.
        </p>
      )}
    </div>
  );
}
