import React, { useRef, useLayoutEffect, useState } from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type StickyGridProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  stickyColumns?: number; // number of leftmost columns to stick
  cellProps?: React.ComponentProps<typeof TableCell>; // custom props for all cells
};

export function StickyGrid<T extends object>({
  data,
  columns,
  stickyColumns = 1,
  cellProps = { sx: { whiteSpace: "nowrap" } },
}: StickyGridProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // refs for measuring column widths
  const colRefs = useRef<(HTMLTableCellElement | null)[]>([]);
  const [stickyOffsets, setStickyOffsets] = useState<number[]>([]);

  useLayoutEffect(() => {
    const offsets: number[] = [];
    let cumulative = 0;

    for (let i = 0; i < stickyColumns; i++) {
      const col = colRefs.current[i];
      if (col) {
        offsets[i] = cumulative;
        cumulative += col.offsetWidth;
      }
    }
    setStickyOffsets(offsets);
  }, [stickyColumns, data, columns]);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500, maxWidth: "100%" }}>
      <Table stickyHeader sx={{ minWidth: 800 }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <TableCell
                  key={header.id}
                  ref={(el) => {
                    colRefs.current[i] = el as HTMLTableCellElement | null;
                  }}
                  {...cellProps}
                  sx={{
                    position: i < stickyColumns ? "sticky" : "static",
                    left: i < stickyColumns ? stickyOffsets[i] : undefined,
                    background: i < stickyColumns ? "#f5f5f5" : "white",
                    zIndex: i < stickyColumns ? 2 : 1,
                    fontWeight: "bold",
                    ...cellProps?.sx,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell, i) => (
                <TableCell
                  key={cell.id}
                  ref={(el) => {
                    colRefs.current[i] = el as HTMLTableCellElement | null;
                  }}
                  {...cellProps}
                  sx={{
                    position: i < stickyColumns ? "sticky" : "static",
                    left: i < stickyColumns ? stickyOffsets[i] : undefined,
                    background: i < stickyColumns ? "#fafafa" : "white",
                    zIndex: i < stickyColumns ? 1 : 0,
                    ...cellProps?.sx,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}