import { useEffect, useState } from "react";

export default async function Home() {
  const response = await fetch(
    "https://api.propublica.org/congress/v1/118/house/members.json",
    {
      headers: {
        "X-API-Key": process.env.PRO_PUBLICA_API_KEY || "",
      },
    }
  );

  const data = await response.json();

  return (
    <div>
      <h1>Example Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
