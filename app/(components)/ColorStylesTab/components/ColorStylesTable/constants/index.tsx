import type { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

import type { ColorStylesByTokenResponseSuccess } from '@/generated/api/admin/models';

import { Checkbox } from '@/src/components/ui';
import { ROUTES } from '@/src/utils/constants';

export type ColorStyleTableItem = ColorStylesByTokenResponseSuccess['data']['colorStyles'][number];

export const COLOR_STYLES_TABLE_COLUMNS: ColumnDef<ColorStyleTableItem>[] = [
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
      <Link href={ROUTES.COLOR_STYLES.$ID(row.original.id)}>
        <div className='hover:underline'>{row.getValue('token')}</div>
      </Link>
    )
  },
  {
    accessorKey: 'color',
    header: () => <div>Color</div>,
    cell: ({ row }) => {
      return <div>{row.getValue('color')}</div>;
    }
  }
];
