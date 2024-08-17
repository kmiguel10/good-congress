import React from "react";

export default function CommitteeHeader({
  headerInfo,
}: {
  headerInfo: CommitteeHeaderData;
}) {
  const { chamber, name, url, chair, chair_party, chair_state } = headerInfo;
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
      <p className="text-muted-foreground">
        {`Chaired by ${chamber === "Senate" ? "Sen. " : "Rep. "}${chair} a ${
          chair_party === "D" ? "Democrat" : "Republican"
        } from ${chair_state}. Visit the `}
        <a
          href={url}
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official Website
        </a>
        .
      </p>
    </div>
  );
}
