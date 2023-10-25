import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function CommitteeTable({
  committees,
}: {
  committees: CommitteeTableDataType[];
}) {
  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={committees} />
    </div>
  );
}
