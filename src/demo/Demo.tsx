import React from "react";
import { StickyGrid } from "../components/StickyGrid";
import { ColumnDef } from "@tanstack/react-table";

type Person = { id: number; name: string; age: number; city: string };

const data: Person[] = [
  { id: 1, name: "Alice", age: 25, city: "New York" },
  { id: 2, name: "Bob", age: 30, city: "San Francisco" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" }
];

const columns: ColumnDef<Person>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "city", header: "City" }
];

export default function Demo() {
  return <StickyGrid data={data} columns={columns} stickyColumns={2} />;
}

