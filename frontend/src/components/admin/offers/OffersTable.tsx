import type { JSX } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useOffers } from '@/hooks/useOffers';
import { deleteSpecialOffer } from '@/services/apiService';
import type { SpecialOfferDto } from '@/types/offer';

interface OffersTableProps {
  onEdit: (offer: SpecialOfferDto) => void;
}

export default function OffersTable({ onEdit }: OffersTableProps): React.JSX.Element {
  const { offers, isLoading, isError, error } = useOffers();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteSpecialOffer,
    onSuccess: () => {
      toast.success('Offer deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['activeOffers'] });
    },
    onError: (err) => {
      toast.error(`Failed to delete offer: ${err.message}`);
    },
  });

  if (isLoading) {
    return <div>Loading offers...</div>;
  }

  if (isError) {
    return <div>Error loading offers: {error?.message}</div>;
  }

  return (
    <div className="rounded-md border">
      <Table data-testid="offers-table">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Discount (%)</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Image URL</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers?.map((offer) => (
            <TableRow key={offer.id} data-testid={`offer-row-${offer.id}`}>
              <TableCell>{offer.title}</TableCell>
              <TableCell>{offer.description}</TableCell>
              <TableCell>{offer.discountPercentage}</TableCell>
              <TableCell>{format(new Date(offer.startDate), 'PPP')}</TableCell>
              <TableCell>{format(new Date(offer.endDate), 'PPP')}</TableCell>
              <TableCell>
                <a href={offer.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Image
                </a>
              </TableCell>
              <TableCell>{offer.isActive ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(offer)}
                    data-testid={`edit-offer-${offer.id}`}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        data-testid={`delete-offer-trigger-${offer.id}`}
                      >
                        <Trash2Icon className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the
                          special offer &quot;{offer.title}&quot;.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-testid="delete-offer-cancel">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(offer.id)}
                          data-testid={`delete-offer-confirm-${offer.id}`}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}