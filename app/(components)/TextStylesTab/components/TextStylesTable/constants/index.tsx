import type { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

import type { TextStylesByTokenResponseSuccess } from '@/generated/api/admin/models';

import { Checkbox } from '@/src/components/ui';
import { ROUTES } from '@/src/utils/constants';

export type TextStyleTableItem = TextStylesByTokenResponseSuccess['data']['textStyles'][number];

export const TEXT_STYLES_TABLE_COLUMNS: ColumnDef<TextStyleTableItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        aria-label='Select all'
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label='Select row'
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'token',
    header: ({ column }) => {
      return (
        <div
          className='flex cursor-pointer items-center gap-2 hover:underline'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Token
          <ArrowUpDown className='size-4' />
        </div>
      );
    },
    cell: ({ row }) => (
      <Link href={ROUTES.TEXT_STYLES.$ID(row.original.id)}>
        <div className='hover:underline'>{row.getValue('token')}</div>
      </Link>
    )
  },
  {
    accessorKey: 'size',
    header: ({ column }) => {
      return (
        <div
          className='flex cursor-pointer items-center gap-2 hover:underline'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Size
          <ArrowUpDown className='size-4' />
        </div>
      );
    },
    cell: ({ row }) => <div>{row.original.size}</div>
  },
  {
    accessorKey: 'weight',
    header: () => <div>Weight</div>,
    cell: ({ row }) => <div>{row.original.weight ?? '-'}</div>
  },
  {
    accessorKey: 'decoration',
    header: () => <div>Decoration</div>,
    cell: ({ row }) => <div>{row.original.decoration ?? '-'}</div>
  }
  // todo backend
  // {
  //   accessorKey: 'lineHeight',
  //   header: () => <div>Decoration</div>,
  //   cell: ({ row }) => <div>{row.original.lineHeight ?? '-'}</div>
  // }
];
