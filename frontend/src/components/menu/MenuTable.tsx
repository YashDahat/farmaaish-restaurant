import { MenuItemDto } from '@/types/menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
const formatCurrency = (amount: number) =>
  amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

interface MenuTableProps {
  menuItems: MenuItemDto[];
  onEdit: (item: MenuItemDto) => void;
  onDelete: (id: string) => void;
}

export function MenuTable({ menuItems, onEdit, onDelete }: MenuTableProps) {
  return (
    <div className="rounded-md border">
      <Table data-testid="menu-table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Vegetarian</TableHead>
            <TableHead>Spicy</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No menu items found.
              </TableCell>
            </TableRow>
          ) : (
            menuItems.map((item) => (
              <TableRow key={item.id} data-testid="menu-item-row">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>{formatCurrency(item.price ?? 0)}</TableCell>
                <TableCell>{item.vegetarian ? 'Yes' : 'No'}</TableCell>
                <TableCell>{item.spicy ? 'Yes' : 'No'}</TableCell>
                <TableCell>{item.available ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="mr-2"
                    data-testid={`edit-menu-item-${item.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(item.id!)}
                    data-testid={`delete-menu-item-${item.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
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