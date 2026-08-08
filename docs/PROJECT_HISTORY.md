# Project History

This file tracks each generation attempt.

## Attempt 2 — 2026-08-08 [COMPLETED]

**Business:** Farmaaish Restaurant
**Category:** Mughlai restaurant
**Website Type:** FULL_PLATFORM

**Must-Have Features:**
- Integrated Online Reservation System (e.g., via Resy, OpenTable, or SevenRooms API)
- Integrated Online Ordering System with payment gateway
- High-quality, professional food photography
- Mobile-first, responsive design
- Schema markup for recipes, menus, and local business
- Click-to-call and interactive map integration
- Google Business Profile synchronization for hours and reviews

---

## Attempt 3 — 2026-08-08 [IN PROGRESS]

**Business:** Farmaaish Restaurant
**Planned Files (119):**
- backend/src/main/java/com/farmaaishrestaurant/exception/GlobalExceptionHandler.java
- backend/src/main/java/com/farmaaishrestaurant/exception/ResourceNotFoundException.java
- backend/src/main/java/com/farmaaishrestaurant/dto/ErrorResponse.java
- backend/src/main/java/com/farmaaishrestaurant/config/DataSeeder.java
- backend/src/main/java/com/farmaaishrestaurant/model/MenuItem.java
- backend/src/main/java/com/farmaaishrestaurant/model/MenuItemCategory.java
- backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemRepository.java
- backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemCategoryRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/MenuService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/MenuController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminMenuController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/MenuItemDto.java
- backend/src/main/java/com/farmaaishrestaurant/dto/MenuItemCategoryDto.java
- backend/src/main/java/com/farmaaishrestaurant/model/Reservation.java
- backend/src/main/java/com/farmaaishrestaurant/model/ReservationStatus.java
- backend/src/main/java/com/farmaaishrestaurant/repository/ReservationRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/ReservationService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/ReservationController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminReservationController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/CreateReservationRequest.java
- backend/src/main/java/com/farmaaishrestaurant/dto/ReservationResponse.java
- backend/src/main/java/com/farmaaishrestaurant/dto/UpdateReservationStatusRequest.java
- backend/src/main/java/com/farmaaishrestaurant/exception/ReservationConflictException.java
- backend/src/main/java/com/farmaaishrestaurant/model/Order.java
- backend/src/main/java/com/farmaaishrestaurant/model/OrderItem.java
- backend/src/main/java/com/farmaaishrestaurant/model/OrderStatus.java
- backend/src/main/java/com/farmaaishrestaurant/repository/OrderRepository.java
- backend/src/main/java/com/farmaaishrestaurant/repository/OrderItemRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/OrderService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/OrderController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminOrderController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/CreateOrderRequest.java
- backend/src/main/java/com/farmaaishrestaurant/dto/OrderItemRequest.java
- backend/src/main/java/com/farmaaishrestaurant/dto/OrderResponse.java
- backend/src/main/java/com/farmaaishrestaurant/dto/UpdateOrderStatusRequest.java
- backend/src/main/java/com/farmaaishrestaurant/exception/OrderProcessingException.java
- backend/src/main/java/com/farmaaishrestaurant/model/EventInquiry.java
- backend/src/main/java/com/farmaaishrestaurant/model/InquiryStatus.java
- backend/src/main/java/com/farmaaishrestaurant/repository/EventInquiryRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/EventInquiryService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/EventInquiryController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminEventInquiryController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/CreateEventInquiryRequest.java
- backend/src/main/java/com/farmaaishrestaurant/dto/EventInquiryResponse.java
- backend/src/main/java/com/farmaaishrestaurant/model/GalleryImage.java
- backend/src/main/java/com/farmaaishrestaurant/repository/GalleryImageRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/GalleryService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/GalleryController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminGalleryController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/GalleryImageDto.java
- frontend/src/App.tsx
- frontend/src/api/client.ts
- frontend/src/config/siteConfig.ts
- frontend/src/pages/HomePage.tsx
- frontend/src/components/home/HeroSection.tsx
- frontend/src/components/home/FeaturedDishes.tsx
- frontend/src/components/home/Testimonials.tsx
- frontend/src/components/home/BookingCallToAction.tsx
- frontend/src/pages/AboutPage.tsx
- frontend/src/pages/ContactPage.tsx
- frontend/src/components/contact/ContactDetails.tsx
- frontend/src/components/contact/InteractiveMap.tsx
- frontend/src/pages/NotFoundPage.tsx
- frontend/src/types/auth.ts
- frontend/src/hooks/useAuth.ts
- frontend/src/context/AuthContext.tsx
- frontend/src/pages/LoginPage.tsx
- frontend/src/components/ProtectedRoute.tsx
- frontend/src/pages/ProfilePage.tsx
- frontend/src/components/profile/OrderHistoryTable.tsx
- frontend/src/types/menu.ts
- frontend/src/services/menuService.ts
- frontend/src/hooks/useMenu.ts
- frontend/src/pages/MenuPage.tsx
- frontend/src/components/menu/MenuCategoryTabs.tsx
- frontend/src/components/menu/MenuItemsGrid.tsx
- frontend/src/components/menu/MenuItemCard.tsx
- frontend/src/types/reservation.ts
- frontend/src/services/reservationService.ts
- frontend/src/hooks/useReservations.ts
- frontend/src/pages/BookingPage.tsx
- frontend/src/components/reservation/ReservationForm.tsx
- frontend/src/types/order.ts
- frontend/src/services/orderService.ts
- frontend/src/hooks/useOrders.ts
- frontend/src/pages/CheckoutPage.tsx
- frontend/src/components/checkout/OrderSummary.tsx
- frontend/src/components/checkout/DeliveryAddressForm.tsx
- frontend/src/components/checkout/PaymentComponent.tsx
- frontend/src/types/gallery.ts
- frontend/src/services/galleryService.ts
- frontend/src/hooks/useGallery.ts
- frontend/src/pages/GalleryPage.tsx
- frontend/src/types/inquiry.ts
- frontend/src/services/inquiryService.ts
- frontend/src/hooks/useInquiries.ts
- frontend/src/pages/CateringPage.tsx
- frontend/src/components/inquiry/InquiryForm.tsx
- frontend/src/components/inquiry/CateringInfo.tsx
- frontend/src/pages/AdminDashboardPage.tsx
- frontend/src/components/AdminLayout.tsx
- frontend/src/pages/AdminMenuPage.tsx
- frontend/src/components/admin/menu/MenuTable.tsx
- frontend/src/components/admin/menu/MenuItemForm.tsx
- frontend/src/components/admin/menu/DeleteMenuItemDialog.tsx
- frontend/src/pages/AdminReservationsPage.tsx
- frontend/src/components/admin/reservations/ReservationsTable.tsx
- frontend/src/components/admin/reservations/UpdateReservationDialog.tsx
- frontend/src/pages/AdminOrdersPage.tsx
- frontend/src/components/admin/orders/OrdersTable.tsx
- frontend/src/components/admin/orders/OrderDetailsModal.tsx
- frontend/src/pages/AdminInquiriesPage.tsx
- frontend/src/components/admin/inquiries/InquiriesTable.tsx
- frontend/src/pages/AdminGalleryPage.tsx
- frontend/src/components/admin/gallery/GalleryGrid.tsx
- frontend/src/components/admin/gallery/UploadImageForm.tsx
- .github/workflows/ci.yml
- frontend/src/components/Layout.tsx
- frontend/src/routes.ts

---
