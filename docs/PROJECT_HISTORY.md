# Project History

This file tracks each generation attempt.

## Attempt 3 — 2026-08-02 [COMPLETED]

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

## Attempt 4 — 2026-08-02 [IN PROGRESS]

**Business:** Farmaaish Restaurant
**Planned Files (110):**
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
- backend/src/main/java/com/farmaaishrestaurant/model/Reservation.java
- backend/src/main/java/com/farmaaishrestaurant/model/ReservationStatus.java
- backend/src/main/java/com/farmaaishrestaurant/repository/ReservationRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/ReservationService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/ReservationController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminReservationController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/ReservationRequest.java
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
- backend/src/main/java/com/farmaaishrestaurant/model/Inquiry.java
- backend/src/main/java/com/farmaaishrestaurant/model/InquiryStatus.java
- backend/src/main/java/com/farmaaishrestaurant/repository/InquiryRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/InquiryService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/InquiryController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminInquiryController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/InquiryDto.java
- backend/src/main/java/com/farmaaishrestaurant/model/Event.java
- backend/src/main/java/com/farmaaishrestaurant/repository/EventRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/EventService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/EventController.java
- backend/src/main/java/com/farmaaishrestaurant/controller/AdminEventController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/EventDto.java
- backend/src/main/java/com/farmaaishrestaurant/model/Customer.java
- backend/src/main/java/com/farmaaishrestaurant/repository/CustomerRepository.java
- backend/src/main/java/com/farmaaishrestaurant/service/CustomerService.java
- backend/src/main/java/com/farmaaishrestaurant/controller/CustomerController.java
- backend/src/main/java/com/farmaaishrestaurant/dto/CustomerDto.java
- frontend/src/App.tsx
- frontend/src/api/client.ts
- frontend/src/config/siteConfig.ts
- frontend/src/components/ProtectedRoute.tsx
- frontend/src/context/AuthContext.tsx
- frontend/src/hooks/useAuth.ts
- frontend/src/types/auth.ts
- frontend/src/pages/LoginPage.tsx
- frontend/src/pages/HomePage.tsx
- frontend/src/components/home/HeroSection.tsx
- frontend/src/components/home/FeaturedDishes.tsx
- frontend/src/components/home/Testimonials.tsx
- frontend/src/pages/AboutPage.tsx
- frontend/src/pages/ContactPage.tsx
- frontend/src/components/contact/LocationMap.tsx
- frontend/src/pages/CateringPage.tsx
- frontend/src/components/catering/CateringInquiryForm.tsx
- frontend/src/hooks/useMenu.ts
- frontend/src/services/menuService.ts
- frontend/src/types/menu.ts
- frontend/src/pages/MenuPage.tsx
- frontend/src/components/menu/MenuCategoryTabs.tsx
- frontend/src/components/menu/MenuItemsGrid.tsx
- frontend/src/hooks/useReservations.ts
- frontend/src/services/reservationService.ts
- frontend/src/types/reservation.ts
- frontend/src/pages/ReservationPage.tsx
- frontend/src/components/reservation/ReservationForm.tsx
- frontend/src/hooks/useOrders.ts
- frontend/src/services/orderService.ts
- frontend/src/types/order.ts
- frontend/src/pages/OrderPage.tsx
- frontend/src/components/order/CartSummary.tsx
- frontend/src/components/order/DeliveryAddressForm.tsx
- frontend/src/components/order/PaymentStep.tsx
- frontend/src/hooks/useInquiries.ts
- frontend/src/services/inquiryService.ts
- frontend/src/types/inquiry.ts
- frontend/src/hooks/useEvents.ts
- frontend/src/services/eventService.ts
- frontend/src/types/event.ts
- frontend/src/pages/EventsPage.tsx
- frontend/src/hooks/useCustomer.ts
- frontend/src/services/customerService.ts
- frontend/src/types/customer.ts
- frontend/src/pages/ProfilePage.tsx
- frontend/src/components/profile/UserProfileForm.tsx
- frontend/src/components/profile/OrderHistoryList.tsx
- frontend/src/pages/AdminDashboardPage.tsx
- frontend/src/pages/AdminMenuPage.tsx
- frontend/src/components/admin/menu/MenuTable.tsx
- frontend/src/components/admin/menu/MenuItemForm.tsx
- frontend/src/components/admin/menu/DeleteMenuItemDialog.tsx
- frontend/src/pages/AdminReservationsPage.tsx
- frontend/src/components/admin/reservations/ReservationsTable.tsx
- frontend/src/pages/AdminOrdersPage.tsx
- frontend/src/components/admin/orders/OrdersTable.tsx
- frontend/src/pages/AdminEventsPage.tsx
- frontend/src/components/admin/events/EventsTable.tsx
- frontend/src/components/admin/events/EventForm.tsx
- frontend/src/pages/AdminInquiriesPage.tsx
- frontend/src/components/admin/inquiries/InquiriesTable.tsx
- frontend/src/routes.ts

---
