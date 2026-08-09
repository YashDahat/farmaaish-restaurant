import type { JSX } from 'react';
import { useState } from 'react';
import { PlusCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AdminLayout from '@/components/AdminLayout';
import OffersTable from '@/components/admin/offers/OffersTable';
import OfferForm from '@/components/admin/offers/OfferForm';
import type { SpecialOfferDto } from '@/types/offer';

export default function AdminOffersPage(): React.JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedOffer, setSelectedOffer] = useState<SpecialOfferDto | undefined>(undefined);

  const handleEditOffer = (offer: SpecialOfferDto): void => {
    setSelectedOffer(offer);
    setIsFormOpen(true);
  };

  const handleNewOffer = (): void => {
    setSelectedOffer(undefined);
    setIsFormOpen(true);
  };

  const handleFormSuccess = (): void => {
    setIsFormOpen(false);
    setSelectedOffer(undefined);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Special Offers</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewOffer} data-testid="create-offer-button">
              <PlusCircleIcon className="mr-2 h-4 w-4" /> Create New Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedOffer ? 'Edit Special Offer' : 'Create Special Offer'}</DialogTitle>
            </DialogHeader>
            <OfferForm initialData={selectedOffer} onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-8">
        <OffersTable onEdit={handleEditOffer} />
      </div>
    </AdminLayout>
  );
}