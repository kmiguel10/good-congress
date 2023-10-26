import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  members: Member[];
}

export default function PartyTable({ members }: any) {
  if (members) {
    return (
      <div className="container mx-auto py-1">
        <DataTable columns={columns} data={members} />
      </div>
    );
  }
}
