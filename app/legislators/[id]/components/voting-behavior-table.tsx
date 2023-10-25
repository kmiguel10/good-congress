import React from "react";

export default function VotingBehavior({
  votingData,
}: {
  votingData: VotingBehaviorDataType;
}) {
  const {
    totalVotes,
    missedVotes,
    totalPresent,
    missedVotesPct,
    votesAgainstPartyPct,
    votesWithPartyPct,
  } = votingData;
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-l font-medium leading-none">Total Votes</p>
          {/* <p className="text-sm text-muted-foreground">
            olivia.martin@email.com
          </p> */}
        </div>
        <div className="ml-auto font-medium">{totalVotes}</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-l font-medium leading-none">Missed Votes</p>
        </div>
        <div className="ml-auto font-medium">{missedVotes}</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-l font-medium leading-none">Total Present</p>
        </div>
        <div className="ml-auto font-medium">{totalPresent}</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-l font-medium leading-none">
            Missed Votes Percentage
          </p>
        </div>
        <div className="ml-auto font-medium">{missedVotesPct}%</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-l font-medium leading-none">
            Votes with Party Percentage
          </p>
        </div>
        <div className="ml-auto font-medium">{votesWithPartyPct}%</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-l font-medium leading-none">
            Votes Against Party Percentage
          </p>
        </div>
        <div className="ml-auto font-medium">{votesAgainstPartyPct}%</div>
      </div>
    </div>
  );
}
