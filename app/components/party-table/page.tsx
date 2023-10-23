import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function PartyTable({ members }: { members: Member[] | [] }) {
  if (members) {
    return (
      <div className="container mx-auto py-1">
        <DataTable columns={columns} data={members} />
      </div>
    );
  }
}
