import type { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

import type { CommandsByNameResponseSuccess } from '@/generated/api/admin/models';

import { Checkbox } from '@/src/components/ui';
import { ROUTES } from '@/src/utils/constants';

export type CommandsTableItem = CommandsByNameResponseSuccess['data']['commands'][number];

export const COMMANDS_TABLE_COLUMNS: ColumnDef<CommandsTableItem>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div
          className='flex cursor-pointer items-center gap-2 hover:underline'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='size-4' />
        </div>
      );
    },
    cell: ({ row }) => (
      <div>
        <Link href={ROUTES.COMMANDS.$ID(row.original.id)}>{row.getValue('name')}</Link>
      </div>
    )
  },
  {
    accessorKey: 'description',
    header: () => <div>Description</div>,
    cell: ({ row }) => <div>{row.getValue('description')}</div>
  }
];
