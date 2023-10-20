import { Member, columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  members: Member[];
}

export default async function PartyTable({ members }: Props) {
  return (
    <div className="container mx-auto py-1">
      <DataTable columns={columns} data={members} />
    </div>
  );
}
