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
import CateringPage from './pages/CateringPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import ReservationPage from './pages/ReservationPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminInquiriesPage from './pages/AdminInquiriesPage';
import AdminMenuPage from './pages/AdminMenuPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminReservationsPage from './pages/AdminReservationsPage';

const queryClient = new QueryClient()

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/events" element={<ProtectedRoute><AdminEventsPage /></ProtectedRoute>} />
              <Route path="/admin/inquiries" element={<ProtectedRoute><AdminInquiriesPage /></ProtectedRoute>} />
              <Route path="/admin/menu" element={<ProtectedRoute><AdminMenuPage /></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute><AdminOrdersPage /></ProtectedRoute>} />
              <Route path="/admin/reservations" element={<ProtectedRoute><AdminReservationsPage /></ProtectedRoute>} />
              <Route element={<SiteLayout config={siteConfig}><Outlet /></SiteLayout>}>
                {/* Outlet receives the matched child route */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/catering" element={<CateringPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/reservation" element={<ReservationPage />} />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
