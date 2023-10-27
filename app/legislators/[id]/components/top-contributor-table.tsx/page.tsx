import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  data: FundraisingContributorData[];
}
export default async function TopContributorsTable({ data }: Props) {
  return (
    <div className="container mx-auto py-1">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
