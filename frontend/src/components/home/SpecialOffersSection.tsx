import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useOffers } from '@/hooks/useOffers';

export default function SpecialOffersSection() {
  const { offers, isLoading, isError, error } = useOffers();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="special-offers-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-[#36454F]">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <Skeleton className="h-48 w-full rounded-md mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="special-offers-section">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-[#36454F]">Special Offers</h2>
          <p>Error loading special offers: {error?.message}</p>
        </div>
      </section>
    );
  }

  if (!offers || offers.length === 0) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="special-offers-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-[#36454F]">Special Offers</h2>
          <p className="text-gray-600">No special offers available at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white" data-testid="special-offers-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-[#36454F]">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg">
              <CardHeader className="p-0 mb-4">
                {offer.imageUrl && (
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <CardTitle className="text-xl font-bold text-[#36454F]">{offer.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {offer.discountPercentage > 0 && (
                    <span className="font-semibold text-[#D4AF37]">{offer.discountPercentage}% OFF</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-[#36454F] leading-relaxed">{offer.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Valid from {new Date(offer.startDate).toLocaleDateString()} to {new Date(offer.endDate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}