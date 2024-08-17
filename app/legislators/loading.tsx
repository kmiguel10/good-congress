"use client";

import Skeleton from "../components/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LoadLegislatorsPage() {
  const table = [1, 2, 3, 4, 5];
  return (
    <div>
      <div className="flex items-center py-4">
        <Skeleton />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.map((item) => (
              <TableRow key={item}>
                <Skeleton />
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.map((row) => (
              <TableRow key={row}>
                <Skeleton />
              </TableRow>
            ))}{" "}
            : (
            <TableRow>
              <TableCell className="h-24 text-center">
                <Skeleton />
              </TableCell>
            </TableRow>
            )
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}
