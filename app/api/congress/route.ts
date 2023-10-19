export async function GET() {
  const response = await fetch(
    "https://api.propublica.org/congress/v1/118/house/members.json",
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  const data = await response.json();

  return Response.json({ data });
}
