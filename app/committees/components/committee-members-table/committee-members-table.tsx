import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  data: CommitteeMembersTableData[];
}
export default async function CommitteeMembersTable({ data }: Props) {
  return (
    <div className="container mx-auto py-1">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
