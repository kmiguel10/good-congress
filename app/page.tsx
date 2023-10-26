import CongressDashboard from "./components/congress-dashboard";

export default async function Home() {
  return (
    <div className="container relative">
      <section className="md:block">
        <div className="overflow-hidden rounded-lg border bg-background shadow space-y-4">
          <CongressDashboard />
        </div>
      </section>
    </div>
  );
}
