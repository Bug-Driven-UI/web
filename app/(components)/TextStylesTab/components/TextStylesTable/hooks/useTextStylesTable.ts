import type { ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import React from 'react';

import type { TextStyleTableItem } from '../constants';

import { TEXT_STYLES_TABLE_COLUMNS } from '../constants';

interface UseTextStylesTableParams {
  textStyles: TextStyleTableItem[];
}

export const useTextStylesTable = ({ textStyles }: UseTextStylesTableParams) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: textStyles,
    columns: TEXT_STYLES_TABLE_COLUMNS,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return { table };
};
