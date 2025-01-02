import { UserType } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { DataTable } from './ui/data-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from './ui/use-toast';

export default function UsersDashboard() {
  const { data, isLoading, error } = useQuery<UserType[]>({
    queryKey: ['users'],
    queryFn: () => {
      return axios.get('/api/users/').then((res) => res.data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  console.log(data);

  const queryClient = useQueryClient();

  const roleChange = useMutation({
    mutationFn: async (userId: string) => {
      const updated = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
      });
      if (updated.ok) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    },
  });
  const { toast } = useToast();
  const handleChangeRole = (userId: string) => {
    roleChange.mutate(userId, {
      onSuccess: () => {
        toast({ description: 'User role changed successfully' });
      },
      onError: () => {
        toast({ description: 'Failed to change user role' });
      },
    });
  };

  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      const deleted = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (deleted.ok) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    },
  });

  const handleDeleteUser = (userId: string) => {
    deleteUser.mutate(userId, {
      onSuccess: () => {
        toast({ description: 'User deleted successfully' });
      },
      onError: () => {
        toast({ description: 'Failed to delete user' });
      },
    });
  };

  const usersDashboardColumns: ColumnDef<UserType>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='text-right'>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <DotsVerticalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleChangeRole(user.user_id!)}>
                Change Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteUser(user.user_id!)}>
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (error) {
    console.error(error);
    return null;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <DataTable columns={usersDashboardColumns} data={data!} />
  );
}
