import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MenuItemDto } from '@/types/menu';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface MenuTableProps {
  menuItems: MenuItemDto[];
  onEdit: (item: MenuItemDto) => void;
  onDelete: (id: string) => void;
}

export function MenuTable({ menuItems, onEdit, onDelete }: MenuTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table data-testid="menu-items-table">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No menu items found.
              </TableCell>
            </TableRow>
          ) : (
            menuItems.map((item) => (
              <TableRow key={item.id} data-testid={`menu-item-row-${item.id}`}>
                <TableCell>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name ?? 'Menu Item'}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {item.price?.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }) ?? 'N/A'}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {item.description}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
                    className="mr-2"
                    data-testid={`edit-menu-item-${item.id}`}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => item.id && onDelete(item.id)}
                    data-testid={`delete-menu-item-${item.id}`}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}