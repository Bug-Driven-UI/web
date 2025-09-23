import type { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';

import { Button, Checkbox } from '@/src/components/ui';

interface Command {
  description?: string;
  id: string;
  name: string;
}

export const COMMANDS_TABLE_COLUMNS: ColumnDef<Command>[] = [
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
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'description',
    header: () => <div>Description</div>,
    cell: ({ row }) => <div className='lowercase'>{row.getValue('description')}</div>
  }
];

export const COMMANDS: Command[] = [
  {
    description: 'some description',
    id: 'id1',
    name: 'Command1'
  },
  {
    description: 'some description',
    id: 'id2',
    name: 'Command2'
  },
  {
    description: 'some description',
    id: 'id3',
    name: 'Command3'
  }
];
