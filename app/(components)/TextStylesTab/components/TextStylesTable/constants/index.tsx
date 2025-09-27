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
      <div className='hover:underline'>
        <Link href={ROUTES.TEXT_STYLES.$ID(row.original.id)}>{row.getValue('token')}</Link>
      </div>
    )
  }
  // todo add more info
  // {
  //   accessorKey: 'description',
  //   header: () => <div>Description</div>,
  //   cell: ({ row }) => <div>{row.getValue('description')}</div>
  // }
];
