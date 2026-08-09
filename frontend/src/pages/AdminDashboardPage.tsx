import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { useAllPosts } from '@/hooks/useBlog';
import { useGallery } from '@/hooks/useGallery';
import { useMenu } from '@/hooks/useMenu';

import { useQuery } from '@tanstack/react-query';
import { getAllInquiries } from '@/services/inquiryService';
import { getAllReservations } from '@/services/reservationService';
import { getAllOrders } from '@/services/orderService';
import { getAllSpecialOffers } from '@/services/offerService';
import { adminGetAllMenuItems } from '@/services/menuService';
import { adminGetAllPosts } from '@/services/blogService';
import { getAllGalleryImages } from '@/services/galleryService';
import { getAllReviews } from '@/services/reviewService';
import type { CateringInquiryDto } from '@/types/inquiry';
import type { ReservationDto } from '@/types/reservation';
import type { OrderDto } from '@/types/order';
import type { SpecialOfferDto } from '@/types/offer';
import type { MenuItemDto } from '@/types/menu';
import type { PostDto } from '@/types/blog';
import type { GalleryImageDto } from '@/types/gallery';
import type { ReviewDto } from '@/types/review';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboardPage = () => {
  const { data: posts, isLoading: isLoadingPosts } = useQuery<PostDto[], Error>({ queryKey: ['adminBlogPosts'], queryFn: adminGetAllPosts });
  const { data: galleryImages, isLoading: isLoadingGallery } = useQuery<GalleryImageDto[], Error>({ queryKey: ['galleryImages'], queryFn: getAllGalleryImages });
  const { data: inquiries, isLoading: isLoadingInquiries } = useQuery<CateringInquiryDto[], Error>({ queryKey: ['cateringInquiries'], queryFn: getAllInquiries });
  const { data: menuItems, isLoading: isLoadingMenu } = useQuery<MenuItemDto[], Error>({ queryKey: ['adminMenuItems'], queryFn: adminGetAllMenuItems });
  const { data: offers, isLoading: isLoadingOffers } = useQuery<SpecialOfferDto[], Error>({ queryKey: ['specialOffers'], queryFn: getAllSpecialOffers });
  const { data: orders, isLoading: isLoadingOrders } = useQuery<OrderDto[], Error>({ queryKey: ['orders'], queryFn: getAllOrders });
  const { data: reservations, isLoading: isLoadingReservations } = useQuery<ReservationDto[], Error>({ queryKey: ['reservations'], queryFn: getAllReservations });
  const { data: reviews, isLoading: isLoadingReviews } = useQuery<ReviewDto[], Error>({ queryKey: ['allReviews'], queryFn: getAllReviews });

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  const totalRevenue = orders?.reduce((sum: number, order: OrderDto) => sum + order.totalAmount, 0) ?? 0;
  const pendingOrders = orders?.filter((order: OrderDto) => order.status === 'PENDING_PAYMENT' || order.status === 'RECEIVED').length ?? 0;
  const pendingReservations = reservations?.filter((res: ReservationDto) => res.status === 'PENDING').length ?? 0;
  const newInquiries = inquiries?.filter((inq: CateringInquiryDto) => inq.status === 'NEW').length ?? 0;
  const activeOffers = offers?.filter((offer: SpecialOfferDto) => offer.isActive).length ?? 0;
  const totalMenuItems = menuItems?.length ?? 0;
  const totalReviews = reviews?.length ?? 0;
  const totalPosts = posts?.length ?? 0;
  const totalGalleryImages = galleryImages?.length ?? 0;

  const isLoadingAny = isLoadingPosts || isLoadingGallery || isLoadingInquiries || isLoadingMenu || isLoadingOffers || isLoadingOrders || isLoadingReservations || isLoadingReviews;

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {isLoadingAny ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card data-testid="dashboard-card-revenue">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
              </CardContent>
            </Card>

            <Card data-testid="dashboard-card-pending-orders">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingOrders}</div>
              </CardContent>
            </Card>

            <Card data-testid="dashboard-card-pending-reservations">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reservations</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingReservations}</div>
              </CardContent>
            </Card>

            <Card data-testid="dashboard-card-new-inquiries">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" x2="4" y1="22" y2="15"></line>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newInquiries}</div>
              </CardContent>
            </Card>

            <Card data-testid="dashboard-card-active-offers">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M2 12s3 0 7 5 7-5 7-5"></path>
                  <path d="M22 12s-3 0-7 5-7-5-7-5"></path>
                  <path d="M12 2v20"></path>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeOffers}</div>
              </CardContent>
            </Card>

            <Card data-testid="dashboard-card-menu-items">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M3 3v18h18"></path>
                  <path d="M18.7 8.3L12 15 7.1 10.1"></path>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMenuItems}</div>
              </CardContent>
            </Card>

            <Card data-testid="dashboard-card-reviews">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalReviews}</div>
              </CardContent>
            </Card>

            <Card data-testid="dashboard-card-blog-posts">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" x2="8" y1="13" y2="13"></line>
                  <line x1="16" x2="8" y1="17" y2="17"></line>
                  <line x1="10" x2="8" y1="9" y2="9"></line>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPosts}</div>
              </CardContent>
            </Card>

            <Card data-testid="dashboard-card-gallery-images">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalGalleryImages}</div>
              </CardContent>
            </Card>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button asChild className="w-full" data-testid="nav-admin-menu">
            <Link to={ROUTES.ADMIN_MENU}>Manage Menu</Link>
          </Button>
          <Button asChild className="w-full" data-testid="nav-admin-reservations">
            <Link to={ROUTES.ADMIN_RESERVATIONS}>Manage Reservations</Link>
          </Button>
          <Button asChild className="w-full" data-testid="nav-admin-orders">
            <Link to={ROUTES.ADMIN_ORDERS}>Manage Orders</Link>
          </Button>
          <Button asChild className="w-full" data-testid="nav-admin-catering-inquiries">
            <Link to={ROUTES.ADMIN_CATERING_INQUIRIES}>Manage Catering Inquiries</Link>
          </Button>
          <Button asChild className="w-full" data-testid="nav-admin-blog">
            <Link to={ROUTES.ADMIN_BLOG}>Manage Blog</Link>
          </Button>
          <Button asChild className="w-full" data-testid="nav-admin-gallery">
            <Link to={ROUTES.ADMIN_GALLERY}>Manage Gallery</Link>
          </Button>
          <Button asChild className="w-full" data-testid="nav-admin-reviews">
            <Link to={ROUTES.ADMIN_REVIEWS}>Manage Reviews</Link>
          </Button>
          <Button asChild className="w-full" data-testid="nav-admin-offers">
            <Link to={ROUTES.ADMIN_OFFERS}>Manage Offers</Link>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;