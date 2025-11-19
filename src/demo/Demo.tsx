import React from "react";
import { StickyGrid } from "../components/StickyGrid";
import { ColumnDef } from "@tanstack/react-table";
import { Box, Typography } from "@mui/material";

type Person = { id: number; name: string; age: number; city: string; email: string; department: string; salary: number };

const data: Person[] = [
  { id: 1, name: "Alice Johnson", age: 25, city: "New York", email: "alice@example.com", department: "Engineering", salary: 95000 },
  { id: 2, name: "Bob Smith", age: 30, city: "San Francisco", email: "bob@example.com", department: "Design", salary: 87000 },
  { id: 3, name: "Charlie Brown", age: 28, city: "Chicago", email: "charlie@example.com", department: "Marketing", salary: 72000 },
  { id: 4, name: "Diana Prince", age: 32, city: "Seattle", email: "diana@example.com", department: "Engineering", salary: 105000 },
  { id: 5, name: "Ethan Hunt", age: 27, city: "Boston", email: "ethan@example.com", department: "Sales", salary: 68000 },
  { id: 6, name: "Fiona Green", age: 29, city: "Austin", email: "fiona@example.com", department: "Product", salary: 92000 },
  { id: 7, name: "George Miller", age: 35, city: "Denver", email: "george@example.com", department: "Engineering", salary: 110000 },
  { id: 8, name: "Hannah White", age: 26, city: "Portland", email: "hannah@example.com", department: "Design", salary: 83000 },
];

const columns: ColumnDef<Person>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "salary", header: "Salary" }
];

export default function Demo() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 4,
      }}
    >
      <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            marginBottom: 3,
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          React Sticky Grid Demo
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.9)",
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          Scroll horizontally to see the first two columns stick in place
        </Typography>
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          <StickyGrid
            data={data}
            columns={columns}
            stickyColumns={2}
            cellProps={{
              sx: {
                whiteSpace: "nowrap",
                fontSize: 14,
                padding: 2,
                borderBottom: "1px solid #e0e0e0",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

