// Assembled from routes.ts by the route registry — re-derived every attempt.
import './index.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { CartProvider } from './cart/CartContext'
import { SiteLayout } from '@/shell'
import siteConfig from '@/config/siteConfig'

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import BookingPage from './pages/BookingPage';
import CateringPage from './pages/CateringPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminBlogPage from './pages/AdminBlogPage';
import AdminCateringInquiriesPage from './pages/AdminCateringInquiriesPage';
import AdminGalleryPage from './pages/AdminGalleryPage';
import AdminMenuPage from './pages/AdminMenuPage';
import AdminOffersPage from './pages/AdminOffersPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminReservationsPage from './pages/AdminReservationsPage';
import AdminReviewsPage from './pages/AdminReviewsPage';
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient()

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/blog" element={<ProtectedRoute><AdminBlogPage /></ProtectedRoute>} />
              <Route path="/admin/catering-inquiries" element={<ProtectedRoute><AdminCateringInquiriesPage /></ProtectedRoute>} />
              <Route path="/admin/gallery" element={<ProtectedRoute><AdminGalleryPage /></ProtectedRoute>} />
              <Route path="/admin/menu" element={<ProtectedRoute><AdminMenuPage /></ProtectedRoute>} />
              <Route path="/admin/offers" element={<ProtectedRoute><AdminOffersPage /></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute><AdminOrdersPage /></ProtectedRoute>} />
              <Route path="/admin/reservations" element={<ProtectedRoute><AdminReservationsPage /></ProtectedRoute>} />
              <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviewsPage /></ProtectedRoute>} />
              <Route element={<SiteLayout config={siteConfig}><Outlet /></SiteLayout>}>
                {/* Outlet receives the matched child route */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/catering" element={<CateringPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
