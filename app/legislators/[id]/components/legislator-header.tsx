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

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
      <p className="text-muted-foreground">
        {`A ${party} from ${
          district ? `the ${district}th district of ` : "the state of "
        }${state}. ${pronoun} is ${age} yrs old and is up for reelection in `}
        <strong>{reelection}</strong>
        {leadership_role
          ? `. ${pronoun} serves as the ${leadership_role}.`
          : "."}
      </p>
    </div>
  );
}
