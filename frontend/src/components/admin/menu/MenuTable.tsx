import { MenuItemDto } from '@/types/menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface MenuTableProps {
  menuItems: MenuItemDto[];
  onEdit: (item: MenuItemDto) => void;
  onDelete: (id: string) => void;
}

export default function MenuTable({ menuItems, onEdit, onDelete }: MenuTableProps): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <Table data-testid="menu-items-table">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Vegetarian</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id} data-testid={`menu-item-row-${item.id}`}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.categoryName}</TableCell>
              <TableCell>
                {item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </TableCell>
              <TableCell>{item.vegetarian ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(item)}
                    data-testid={`edit-menu-item-${item.id}`}
                    className="hover:bg-gray-100 transition-all duration-200"
                  >
                    <PencilIcon className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                    data-testid={`delete-menu-item-${item.id}`}
                    className="hover:bg-gray-100 transition-all duration-200"
                  >
                    <Trash2Icon className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}