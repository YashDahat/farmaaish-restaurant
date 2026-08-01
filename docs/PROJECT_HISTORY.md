# Project History

This file tracks each generation attempt.

## Attempt 1 — 2026-08-01 [COMPLETED]

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

## Attempt 3 — 2026-08-01 [IN PROGRESS]

**Business:** Farmaaish Restaurant
**Planned Files (138):**
- backend/src/main/java/com/farmaaishrestaurant/exception/GlobalExceptionHandler.java
- backend/src/main/java/com/farmaaishrestaurant/exception/ResourceNotFoundException.java
- backend/src/main/java/com/farmaaishrestaurant/dto/ErrorResponse.java
- backend/src/main/java/com/farmaaishrestaurant/controller/SpaController.java
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
- backend/src/main/java/com/farmaaishrestaurant/dto/CreateMenuItemRequest.java
- backend/src/main/java/com/farmaaishrestaurant/model/Reservation.java
- backend/src/main/java/com/farmaaishrestaurant/model/ReservationStatus.java
- backend/src/main/java/com/farmaaishrestaurant/repository/ReservationRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/ReservationService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/ReservationController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminReservationController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/CreateReservationRequest.java
- backend/src/main/java/com/farmaaishrestaurant/dto/ReservationResponse.java
- backend/src/main/java/com/farmaaishrestaurant/dto/UpdateReservationStatusRequest.java
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
- backend/src/main/java/com/farmaaishrestaurant/model/GalleryItem.java
- backend/src/main/java/com/farmaaishrestaurant/repository/GalleryItemRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/GalleryService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/GalleryController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminGalleryController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/GalleryItemDto.java
- backend/src/main/java/com/farmaaishrestaurant/model/Inquiry.java
- backend/src/main/java/com/farmaaishrestaurant/model/InquiryStatus.java
- backend/src/main/java/com/farmaaishrestaurant/repository/InquiryRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/InquiryService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/InquiryController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminInquiryController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/CreateInquiryRequest.java
- backend/src/main/java/com/farmaaishrestaurant/dto/InquiryResponse.java
- backend/src/main/java/com/farmaaishrestaurant/model/Post.java
- backend/src/main/java/com/farmaaishrestaurant/repository/PostRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/BlogService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/BlogController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminBlogController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/PostDto.java
- frontend/src/api/client.ts
- frontend/src/App.tsx
- frontend/src/components/Layout.tsx
- frontend/src/components/Header.tsx
- frontend/src/components/Footer.tsx
- frontend/src/components/AdminLayout.tsx
- frontend/src/components/ProtectedRoute.tsx
- frontend/src/components/common/WhatsAppCTA.tsx
- frontend/src/pages/AdminDashboardPage.tsx
- frontend/src/pages/NotFoundPage.tsx
- frontend/src/context/AuthContext.tsx
- frontend/src/hooks/useAuth.ts
- frontend/src/services/authService.ts
- frontend/src/types/auth.ts
- frontend/src/pages/LoginPage.tsx
- frontend/src/components/auth/LoginForm.tsx
- frontend/src/pages/HomePage.tsx
- frontend/src/components/home/HeroSection.tsx
- frontend/src/components/home/FeaturedMenuItems.tsx
- frontend/src/components/home/TestimonialsSection.tsx
- frontend/src/components/home/CallToActionSection.tsx
- frontend/src/pages/AboutPage.tsx
- frontend/src/components/about/OurStory.tsx
- frontend/src/components/about/ChefProfile.tsx
- frontend/src/pages/ContactPage.tsx
- frontend/src/components/contact/ContactInfoMap.tsx
- frontend/src/services/menuService.ts
- frontend/src/hooks/useMenu.ts
- frontend/src/types/menu.ts
- frontend/src/pages/MenuPage.tsx
- frontend/src/components/menu/MenuCategoryTabs.tsx
- frontend/src/components/menu/MenuItemsGrid.tsx
- frontend/src/components/menu/MenuItemCard.tsx
- frontend/src/pages/AdminMenuPage.tsx
- frontend/src/components/menu/MenuTable.tsx
- frontend/src/components/menu/MenuItemForm.tsx
- frontend/src/components/menu/DeleteMenuItemDialog.tsx
- frontend/src/services/reservationService.ts
- frontend/src/hooks/useReservations.ts
- frontend/src/types/reservation.ts
- frontend/src/pages/ReservationsPage.tsx
- frontend/src/components/reservation/ReservationForm.tsx
- frontend/src/components/reservation/ReservationSuccessDialog.tsx
- frontend/src/pages/AdminReservationsPage.tsx
- frontend/src/components/reservation/ReservationsTable.tsx
- frontend/src/components/reservation/ReservationDetailView.tsx
- frontend/src/services/orderService.ts
- frontend/src/hooks/useOrders.ts
- frontend/src/types/order.ts
- frontend/src/pages/CheckoutPage.tsx
- frontend/src/components/checkout/DeliveryAddressForm.tsx
- frontend/src/components/checkout/OrderSummary.tsx
- frontend/src/components/checkout/PaymentComponent.tsx
- frontend/src/pages/OrderHistoryPage.tsx
- frontend/src/components/order/OrderHistoryList.tsx
- frontend/src/components/cart/CartDrawer.tsx
- frontend/src/components/cart/CartItem.tsx
- frontend/src/components/cart/AddToCartButton.tsx
- frontend/src/pages/AdminOrdersPage.tsx
- frontend/src/components/order/OrdersTable.tsx
- frontend/src/components/order/OrderDetailView.tsx
- frontend/src/services/galleryService.ts
- frontend/src/hooks/useGallery.ts
- frontend/src/types/gallery.ts
- frontend/src/pages/GalleryPage.tsx
- frontend/src/components/gallery/GalleryGrid.tsx
- frontend/src/pages/AdminGalleryPage.tsx
- frontend/src/services/inquiryService.ts
- frontend/src/hooks/useInquiry.ts
- frontend/src/types/inquiry.ts
- frontend/src/pages/CateringPage.tsx
- frontend/src/components/inquiry/CateringInquiryForm.tsx
- frontend/src/pages/AdminInquiriesPage.tsx
- frontend/src/services/blogService.ts
- frontend/src/hooks/useBlog.ts
- frontend/src/types/blog.ts
- frontend/src/pages/BlogPage.tsx
- frontend/src/components/blog/PostList.tsx
- frontend/src/components/blog/PostCard.tsx
- frontend/src/pages/BlogPostPage.tsx
- frontend/src/components/blog/PostContent.tsx
- frontend/src/pages/AdminBlogPage.tsx
- frontend/src/routes.ts

---
