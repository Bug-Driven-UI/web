import type { ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import React from 'react';

import type { ExternalApiTableItem } from '../constants';

import { EXTERNAL_APIS_TABLE_COLUMNS } from '../constants';

interface UseExternalApisTableParams {
  externalApis: ExternalApiTableItem[];
}

export const useExternalApisTable = ({ externalApis }: UseExternalApisTableParams) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: externalApis,
    columns: EXTERNAL_APIS_TABLE_COLUMNS,
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
