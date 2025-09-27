'use client';

import { flexRender } from '@tanstack/react-table';
import { MoreHorizontal, TrashIcon } from 'lucide-react';
import Link from 'next/link';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/src/components/ui';
import { ROUTES } from '@/src/utils/constants';

import type { TextStyleTableItem } from './constants';

import { TEXT_STYLES_TABLE_COLUMNS } from './constants';
import { useTextStylesTable } from './hooks/useTextStylesTable';

interface TextStylesTableProps {
  textStyles: TextStyleTableItem[];
}

export const TextStylesTable = (props: TextStylesTableProps) => {
  const { table } = useTextStylesTable(props);

  return (
    <div className='w-full'>
      <div className='flex justify-between pb-4'>
        <Input
          className='max-w-sm'
          value={(table.getColumn('token')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('token')?.setFilterValue(event.target.value)}
          placeholder='Filter name...'
        />
        <div className='space-y-6'>
          <Button>
            <Link href={ROUTES.TEXT_STYLES.CREATE}>Создать стиль текста</Link>
          </Button>
        </div>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!!table.getRowModel().rows?.length &&
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className='h-8 w-8 p-0' variant='ghost'>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='center'>
                      <DropdownMenuItem>
                        <TrashIcon />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableRow>
              ))}
            {!table.getRowModel().rows?.length && (
              <TableRow>
                <TableCell className='h-24 text-center' colSpan={TEXT_STYLES_TABLE_COLUMNS.length}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-muted-foreground flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            disabled={!table.getCanPreviousPage()}
            size='sm'
            variant='outline'
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            size='sm'
            variant='outline'
            onClick={() => table.nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
