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

interface MenuTableProps {
  menuItems: MenuItemDto[];
  onEditMenuItem: (item: MenuItemDto) => void;
  onDeleteMenuItem: (id: number) => void;
}

export default function MenuTable({ menuItems, onEditMenuItem, onDeleteMenuItem }: MenuTableProps): JSX.Element {
  return (
    <div className="rounded-md border">
      <Table data-testid="menu-table">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Vegetarian</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id} data-testid={`menu-item-row-${item.id}`}>
              <TableCell>
                <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded" />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.categoryName}</TableCell>
              <TableCell>{item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
              <TableCell>{item.vegetarian ? 'Yes' : 'No'}</TableCell>
              <TableCell>{item.available ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditMenuItem(item)}
                  className="mr-2"
                  data-testid={`edit-menu-item-${item.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteMenuItem(item.id)}
                  data-testid={`delete-menu-item-${item.id}`}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}