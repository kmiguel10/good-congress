import {
  CardHeader,
  CardTitle,
  CardContent,
  Card,
  CardDescription,
} from "@/components/ui/card";
import CardDashboard from "./card-dashboard";

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

export default async function CongressDashboard() {
  const response = await fetch(
    "https://api.propublica.org/congress/v1/118/house/members.json",
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  const data: CongressData = await response.json();

  // need to filter out non-voting delegates
  // Filter members with in_office set to false
  const activeMembers: Member[] = data.results[0].members.filter(function (
    member
  ) {
    return member.in_office && member.title !== "Delegate";
  });

  console.log(activeMembers.length);

  const democrats: Member[] = activeMembers.filter(
    (member) => member.party === "D"
  );

  const republicans: Member[] = activeMembers.filter(
    (member) => member.party === "R"
  );

  const totalNumber: number = activeMembers.length;

  const partyStatus = (party: string): string => {
    if (party === "rep") {
      return republicans.length > democrats.length ? "Majority" : "Minority";
    } else {
      return democrats.length > republicans.length ? "Majority" : "Minority";
    }
  };

  const republicanStatus: string = partyStatus("rep");
  const democratStatus: string = partyStatus("dem");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <CardDashboard
          title="Legislators"
          body={totalNumber.toString()}
          subBody="Total Number of legislators"
        />
        <CardDashboard
          title="Democrats"
          body={democrats.length.toString()}
          subBody={democratStatus}
        />
        <CardDashboard
          title="Republicans"
          body={republicans.length.toString()}
          subBody={republicanStatus}
        />
        <CardDashboard
          title="Bills Passed"
          body="Number"
          subBody="Number of bills passed "
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Democrats</CardTitle>
          </CardHeader>
          <CardContent className="pl-2"></CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Republicans</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
