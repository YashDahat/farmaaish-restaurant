# Feature Enrichment — Attempt 2

Generated: 2026-08-08

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend Utilities

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/exception/GlobalExceptionHandler.java` — Centralized exception handler that catches application-wide exceptions and formats them into a standardized ErrorResponse DTO, returning appropriate HTTP status codes.
- `backend/src/main/java/com/farmaaishrestaurant/exception/ResourceNotFoundException.java` — Custom unchecked exception indicating that a requested resource could not be found, typically thrown by service layers.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ErrorResponse.java` — Data Transfer Object (DTO) used to standardize the format of error messages returned by the API.
- `backend/src/main/java/com/farmaaishrestaurant/config/DataSeeder.java` — Configuration component that populates the database with initial menu categories and items upon application startup, ensuring a baseline dataset for the restaurant.

**Feature Instruction:**

This feature provides core backend utilities, including a global exception handler, a custom resource not found exception, a standardized error response DTO, and a data seeder for initial database population. The `GlobalExceptionHandler` intercepts specific exceptions thrown by any service or controller in the application and transforms them into a consistent `ErrorResponse` DTO, which is then returned to the client with an appropriate HTTP status code. It specifically handles `ResourceNotFoundException` by returning a 404 Not Found status. The `ResourceNotFoundException` is a custom unchecked exception that can be thrown by services when a requested entity is not found in the database. The `ErrorResponse` DTO defines a standard structure for error messages, including a timestamp, status code, error message, and path. The `DataSeeder` component, which runs on application startup, is responsible for populating the database with initial `MenuItemCategory` and `MenuItem` data by interacting with the `MenuItemCategoryRepository` and `MenuItemRepository` from the `menu-management` feature. This ensures that the application has essential data available immediately after deployment.

---

## Menu Management

**Name:** `menu-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItem.java` — JPA Entity — represents a single dish or beverage on the restaurant's menu, linked to a category.
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItemCategory.java` — JPA Entity — represents a category for menu items, such as 'Appetizers' or 'Main Course'.
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemRepository.java` — Spring Data JPA repository for MenuItem entities, providing CRUD and custom query operations.
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemCategoryRepository.java` — Spring Data JPA repository for MenuItemCategory entities, providing standard CRUD operations.
- `backend/src/main/java/com/farmaaishrestaurant/service/MenuService.java` — SERVICE layer — implements business logic for managing menu items and categories, converting between entities and DTOs, and throwing `ResourceNotFoundException`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/MenuController.java` — Public-facing REST controller for fetching the restaurant menu, exposing read-only endpoints.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminMenuController.java` — Admin-only REST controller for creating, updating, and deleting menu items and categories, requiring authentication.
- `backend/src/main/java/com/farmaaishrestaurant/dto/MenuItemDto.java` — Data Transfer Object for MenuItem entities, used in API requests and responses, including validation.
- `backend/src/main/java/com/farmaaishrestaurant/dto/MenuItemCategoryDto.java` — Data Transfer Object for MenuItemCategory entities, used in API requests and responses, including validation.

**Feature Instruction:**

The Menu Management feature provides a complete backend solution for managing the Farmaaish Restaurant's menu, including dishes and beverages, organized by categories. It consists of two model entities, MenuItem and MenuItemCategory, which are persisted using Spring Data JPA repositories, MenuItemRepository and MenuItemCategoryRepository. Business logic for CRUD operations on menu items and categories is encapsulated within MenuService. This service handles the mapping between entities and DTOs (MenuItemDto, MenuItemCategoryDto) and throws `ResourceNotFoundException` if an entity is not found. Two controllers expose the API: `MenuController` provides public read-only access to the menu, allowing customers to browse available dishes and categories. `AdminMenuController` provides authenticated administrative access for creating, updating, and deleting menu items and categories. All monetary values (prices) must be handled as `BigDecimal` and formatted for the Indian locale (₹) when displayed in any frontend component consuming these APIs.

### MenuItem.java
This JPA entity represents a single dish or beverage. It includes fields for `id`, `name`, `description`, `price`, `imageUrl`, `vegetarian` status, and a many-to-one relationship with `MenuItemCategory`.

### MenuItemCategory.java
This JPA entity represents a category for menu items, such as 'Appetizers' or 'Main Course'. It includes fields for `id`, `name`, and `description`.

### MenuItemRepository.java
This repository extends `JpaRepository<MenuItem, UUID>` and provides standard CRUD operations. It also includes a custom query method `findByCategory_Id(UUID categoryId)` to fetch menu items by their category.

### MenuItemCategoryRepository.java
This repository extends `JpaRepository<MenuItemCategory, UUID>` and provides standard CRUD operations.

### MenuItemDto.java
This DTO is used for transferring menu item data between the service layer and controllers. It mirrors the `MenuItem` entity but includes `categoryId` and `categoryName` for convenience. It includes validation annotations for `name`, `description`, `price`, and `imageUrl`.

### MenuItemCategoryDto.java
This DTO is used for transferring menu item category data. It mirrors the `MenuItemCategory` entity and includes validation annotations for `name` and `description`.

### MenuService.java
This service orchestrates the business logic for menu management. It injects `MenuItemRepository` and `MenuItemCategoryRepository`. All methods handle `MenuItem` and `MenuItemCategory` entities and convert them to and from `MenuItemDto` and `MenuItemCategoryDto` respectively. It throws `ResourceNotFoundException` if a requested menu item or category is not found.

- `getAllMenuItems()`: Returns a `List<MenuItemDto>` of all menu items.
- `getMenuItemById(UUID id)`: Returns a `MenuItemDto` for the given ID. Throws `ResourceNotFoundException` if not found.
- `getMenuItemsByCategoryId(UUID categoryId)`: Returns a `List<MenuItemDto>` for a given category ID. Throws `ResourceNotFoundException` if category not found.
- `createMenuItem(MenuItemDto menuItemDto)`: Creates a new menu item. Requires a valid `categoryId`. Returns the created `MenuItemDto`.
- `updateMenuItem(UUID id, MenuItemDto menuItemDto)`: Updates an existing menu item. Requires a valid `categoryId`. Returns the updated `MenuItemDto`. Throws `ResourceNotFoundException` if menu item or category not found.
- `deleteMenuItem(UUID id)`: Deletes a menu item by ID. Throws `ResourceNotFoundException` if not found.
- `getAllMenuItemCategories()`: Returns a `List<MenuItemCategoryDto>` of all menu item categories.
- `getMenuItemCategoryById(UUID id)`: Returns a `MenuItemCategoryDto` for the given ID. Throws `ResourceNotFoundException` if not found.
- `createMenuItemCategory(MenuItemCategoryDto categoryDto)`: Creates a new menu item category. Returns the created `MenuItemCategoryDto`.
- `updateMenuItemCategory(UUID id, MenuItemCategoryDto categoryDto)`: Updates an existing menu item category. Returns the updated `MenuItemCategoryDto`. Throws `ResourceNotFoundException` if not found.
- `deleteMenuItemCategory(UUID id)`: Deletes a menu item category by ID. Throws `ResourceNotFoundException` if not found.

### MenuController.java
This controller exposes public endpoints for fetching menu items and categories. It injects `MenuService`.

- `getAllMenuItems()`: GET /api/v1/menu/items - Returns a list of all menu items.
- `getMenuItemById(UUID id)`: GET /api/v1/menu/items/{id} - Returns a single menu item by ID.
- `getMenuItemsByCategoryId(UUID categoryId)`: GET /api/v1/menu/categories/{categoryId}/items - Returns menu items belonging to a specific category.
- `getAllMenuItemCategories()`: GET /api/v1/menu/categories - Returns a list of all menu item categories.

### AdminMenuController.java
This controller exposes admin-only endpoints for managing menu items and categories. It injects `MenuService`. All endpoints require authentication and admin role.

- `createMenuItem(MenuItemDto menuItemDto)`: POST /api/v1/admin/menu/items - Creates a new menu item.
- `updateMenuItem(UUID id, MenuItemDto menuItemDto)`: PUT /api/v1/admin/menu/items/{id} - Updates an existing menu item.
- `deleteMenuItem(UUID id)`: DELETE /api/v1/admin/menu/items/{id} - Deletes a menu item.
- `createMenuItemCategory(MenuItemCategoryDto categoryDto)`: POST /api/v1/admin/menu/categories - Creates a new menu item category.
- `updateMenuItemCategory(UUID id, MenuItemCategoryDto categoryDto)`: PUT /api/v1/admin/menu/categories/{id} - Updates an existing menu item category.
- `deleteMenuItemCategory(UUID id)`: DELETE /api/v1/admin/menu/categories/{id} - Deletes a menu item category.

---

## Reservation System

**Name:** `reservation-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Reservation.java` — JPA Entity — represents a customer's table reservation, storing all relevant details and its current status.
- `backend/src/main/java/com/farmaaishrestaurant/model/ReservationStatus.java` — Enum — defines the possible states a reservation can be in.
- `backend/src/main/java/com/farmaaishrestaurant/repository/ReservationRepository.java` — Spring Data JPA Repository — provides standard CRUD operations for `Reservation` entities and custom query methods.
- `backend/src/main/java/com/farmaaishrestaurant/service/ReservationService.java` — Service layer — implements `createReservation(CreateReservationRequest): ReservationResponse`, `getAllReservations(): List<ReservationResponse>`, `getReservationById(UUID): ReservationResponse`, `updateReservationStatus(UUID, ReservationStatus): ReservationResponse`, and `deleteReservation(UUID): void`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/ReservationController.java` — REST Controller — exposes public API endpoints for customers to create reservations.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminReservationController.java` — REST Controller — exposes admin API endpoints for viewing, updating, and deleting reservations.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateReservationRequest.java` — DTO — used for capturing new reservation details from a customer when creating a reservation.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ReservationResponse.java` — DTO — used for returning reservation details in API responses.
- `backend/src/main/java/com/farmaaishrestaurant/dto/UpdateReservationStatusRequest.java` — DTO — used for admin requests to update the status of a reservation.
- `backend/src/main/java/com/farmaaishrestaurant/exception/ReservationConflictException.java` — Custom Exception — indicates that a requested reservation time slot is unavailable or conflicts with existing reservations.

**Feature Instruction:**

The Reservation System feature provides a complete backend solution for managing customer table reservations at Farmaaish Restaurant. It includes models for reservations and their statuses, a repository for data access, a service layer for business logic, and two controllers: one public-facing for customers to create reservations, and an admin-only controller for staff to view and manage all reservations.

### Reservation Flow

1.  **Customer Reservation (Public API)**:
    *   A customer submits a reservation request via `POST /api/v1/reservations` to `ReservationController.createReservation(CreateReservationRequest request)`. The `CreateReservationRequest` DTO contains `customerName`, `customerEmail`, `customerPhone`, `reservationTime`, `numberOfGuests`, and `specialRequests`.
    *   `ReservationController` injects `ReservationService` and calls `reservationService.createReservation(request)`. 
    *   `ReservationService.createReservation(CreateReservationRequest request)` performs the following steps:
        1.  Validates the input `CreateReservationRequest`.
        2.  Checks for existing reservations that conflict with the requested `reservationTime` and `numberOfGuests`. A conflict occurs if another reservation exists for the same time slot and the combined `numberOfGuests` exceeds the restaurant's capacity (assume a fixed capacity of 50 for now). If a conflict is detected, it throws a `ReservationConflictException`.
        3.  Creates a new `Reservation` entity, setting its initial `status` to `PENDING`.
        4.  Persists the new `Reservation` entity using `reservationRepository.save(reservation)`.
        5.  Returns a `ReservationResponse` containing the details of the newly created reservation.
    *   If `ReservationConflictException` is thrown, the `ReservationController` catches it and returns an HTTP 409 Conflict status with an appropriate error message.
    *   If any other exception occurs, the `GlobalExceptionHandler` (from `shared-backend`) will handle it.

2.  **Admin Reservation Management (Admin API)**:
    *   Admins can retrieve all reservations via `GET /api/v1/admin/reservations` by calling `AdminReservationController.getAllReservations()`. This method calls `reservationService.getAllReservations()` which fetches all `Reservation` entities from `reservationRepository.findAll()` and maps them to a `List<ReservationResponse>`.
    *   Admins can retrieve a single reservation by ID via `GET /api/v1/admin/reservations/{id}` by calling `AdminReservationController.getReservationById(UUID id)`. This method calls `reservationService.getReservationById(id)` which fetches the `Reservation` entity from `reservationRepository.findById(id)`. If not found, it throws `ResourceNotFoundException`.
    *   Admins can update the status of a reservation via `PUT /api/v1/admin/reservations/{id}/status` by calling `AdminReservationController.updateReservationStatus(UUID id, UpdateReservationStatusRequest request)`. The `UpdateReservationStatusRequest` DTO contains the new `status`.
    *   `AdminReservationController` injects `ReservationService` and calls `reservationService.updateReservationStatus(id, request.getStatus())`.
    *   `ReservationService.updateReservationStatus(UUID id, ReservationStatus newStatus)` performs the following steps:
        1.  Retrieves the existing `Reservation` entity by `id` using `reservationRepository.findById(id)`. If not found, it throws `ResourceNotFoundException`.
        2.  Updates the `status` of the `Reservation` entity to `newStatus`.
        3.  Persists the updated `Reservation` entity using `reservationRepository.save(reservation)`.
        4.  Returns a `ReservationResponse` for the updated reservation.
    *   Admins can delete a reservation via `DELETE /api/v1/admin/reservations/{id}` by calling `AdminReservationController.deleteReservation(UUID id)`. This method calls `reservationService.deleteReservation(id)` which deletes the `Reservation` entity using `reservationRepository.deleteById(id)`.

### Data Models and DTOs

*   `Reservation.java` is the JPA entity representing a reservation, with fields for `id`, `customerName`, `customerEmail`, `customerPhone`, `reservationTime`, `numberOfGuests`, `specialRequests`, `status`, `createdAt`, and `updatedAt`.
*   `ReservationStatus.java` is an enum defining possible reservation states: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`.
*   `CreateReservationRequest.java` is used for customer requests to create a reservation.
*   `ReservationResponse.java` is used for returning reservation details in API responses.
*   `UpdateReservationStatusRequest.java` is used by admins to change a reservation's status.
*   `ReservationConflictException.java` is a custom exception thrown when a new reservation conflicts with an existing one.

### Inter-file Wiring

*   `ReservationController` and `AdminReservationController` both inject `ReservationService`.
*   `ReservationService` injects `ReservationRepository`.
*   `Reservation` model uses `ReservationStatus` enum.
*   `UpdateReservationStatusRequest` DTO uses `ReservationStatus` enum.

### Error Handling

*   `ReservationService` throws `ResourceNotFoundException` (from `shared-backend`) if a reservation ID is not found during update or retrieval operations.
*   `ReservationService` throws `ReservationConflictException` if a new reservation request cannot be accommodated due to time slot or capacity conflicts.
*   `ReservationController` and `AdminReservationController` will rely on `GlobalExceptionHandler` (from `shared-backend`) for general exception handling, returning appropriate HTTP status codes (e.g., 404 for `ResourceNotFoundException`, 500 for unexpected errors). `ReservationController` specifically handles `ReservationConflictException` to return HTTP 409.


---

## Order Management

**Name:** `order-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Order.java` — MODEL layer — Represents a customer's food order, containing multiple order items.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderItem.java` — MODEL layer — Represents a single line item within a customer's order.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderStatus.java` — MODEL layer — Enum representing the status of an order (e.g., PENDING, CONFIRMED, OUT_FOR_DELIVERY, DELIVERED).
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderRepository.java` — REPOSITORY layer — Spring Data JPA repository for CRUD operations on Order entities, including finding orders by customer ID.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderItemRepository.java` — REPOSITORY layer — Spring Data JPA repository for CRUD operations on OrderItem entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/OrderService.java` — SERVICE layer — implements createOrder(CreateOrderRequest, UUID): OrderResponse, getAllOrders(): List<OrderResponse>, getOrdersByCustomerId(UUID): List<OrderResponse>, getOrderById(UUID): OrderResponse, and updateOrderStatus(UUID, UpdateOrderStatusRequest): OrderResponse; delegates persistence to OrderRepository and calls MenuService and PaymentService.
- `backend/src/main/java/com/farmaaishrestaurant/controller/OrderController.java` — CONTROLLER layer — Public-facing REST controller for customers to place and view their orders.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminOrderController.java` — CONTROLLER layer — Admin-only REST controller for viewing and managing all customer orders.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateOrderRequest.java` — DTO layer — DTO for capturing a new food order from a customer.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderItemRequest.java` — DTO layer — DTO representing a single item within a CreateOrderRequest.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderResponse.java` — DTO layer — DTO for returning order details in API responses.
- `backend/src/main/java/com/farmaaishrestaurant/dto/UpdateOrderStatusRequest.java` — DTO layer — DTO for admin requests to update the status of an order.
- `backend/src/main/java/com/farmaaishrestaurant/exception/OrderProcessingException.java` — EXCEPTION layer — Custom exception for errors that occur during order creation or payment processing.

**Feature Instruction:**

The Order Management feature handles the complete lifecycle of a customer's food order, from creation and payment processing to status updates and retrieval. It integrates with the `menu-management` feature to validate menu items and with a pre-scaffolded payment service for transaction processing. This feature provides both customer-facing and admin-facing APIs.

## Data Models

`Order.java` represents the main order entity, containing details like customer ID, total amount, delivery address, and current status. It has a one-to-many relationship with `OrderItem.java`.

`OrderItem.java` represents a single item within an order, linking to a `MenuItem` from the `menu-management` feature and storing the quantity and price at the time of order.

`OrderStatus.java` is an enum defining the possible states of an order (e.g., PENDING, CONFIRMED, OUT_FOR_DELIVERY, DELIVERED).

## Repositories

`OrderRepository.java` provides standard CRUD operations for `Order` entities. `OrderItemRepository.java` provides standard CRUD operations for `OrderItem` entities.

## Service Layer

`OrderService.java` encapsulates the core business logic:

### `createOrder(CreateOrderRequest request, UUID customerId): OrderResponse`
1. Validates the `CreateOrderRequest` to ensure all required fields are present and valid.
2. Iterates through `OrderItemRequest` objects in the request.
3. For each `OrderItemRequest`, it calls `menu-management`'s `MenuService.getMenuItemById(UUID id)` to retrieve the `MenuItemDto` and verify its existence and current price. If a menu item is not found, it throws a `ResourceNotFoundException`.
4. Calculates the total amount of the order based on the current prices of menu items.
5. Creates a new `Order` entity with status `PENDING` and saves it using `OrderRepository.save()`.
6. Creates `OrderItem` entities for each item in the request, linking them to the newly created `Order`, and saves them using `OrderItemRepository.save()`.
7. Calls the pre-scaffolded `PaymentService.createOrder(new CreatePaymentRequest(amount, "INR", "order_" + order.getId()))` to initiate a payment. If the payment fails, it throws an `OrderProcessingException`.
8. Updates the `Order` status to `CONFIRMED` if payment is successful and saves the updated order.
9. Returns an `OrderResponse` containing the details of the created order.

### `getAllOrders(): List<OrderResponse>`
1. Retrieves all orders from `OrderRepository`.
2. Maps `Order` entities to `OrderResponse` DTOs.
3. Returns the list of `OrderResponse` objects.

### `getOrdersByCustomerId(UUID customerId): List<OrderResponse>`
1. Retrieves orders for a specific customer from `OrderRepository`.
2. Maps `Order` entities to `OrderResponse` DTOs.
3. Returns the list of `OrderResponse` objects.

### `getOrderById(UUID orderId): OrderResponse`
1. Retrieves an order by its ID from `OrderRepository`.
2. Throws `ResourceNotFoundException` if the order is not found.
3. Maps the `Order` entity to an `OrderResponse` DTO.
4. Returns the `OrderResponse`.

### `updateOrderStatus(UUID orderId, UpdateOrderStatusRequest request): OrderResponse`
1. Retrieves the order by `orderId` from `OrderRepository`.
2. Throws `ResourceNotFoundException` if the order is not found.
3. Updates the order's status to the `newStatus` provided in the `UpdateOrderStatusRequest`.
4. Saves the updated order using `OrderRepository.save()`.
5. Returns the updated `OrderResponse`.

## Controllers

`OrderController.java` exposes public-facing APIs for customers:
- `POST /api/v1/orders`: Allows authenticated customers to place new orders. It consumes `CreateOrderRequest` and returns `OrderResponse`. Requires authentication.
- `GET /api/v1/orders/my-orders`: Allows authenticated customers to view their own orders. Returns a `List<OrderResponse>`. Requires authentication.
- `GET /api/v1/orders/{orderId}`: Allows authenticated customers to view a specific order by ID. Returns `OrderResponse`. Requires authentication.

`AdminOrderController.java` exposes admin-only APIs:
- `GET /api/v1/admin/orders`: Allows administrators to view all orders. Returns a `List<OrderResponse>`. Requires admin role.
- `GET /api/v1/admin/orders/{orderId}`: Allows administrators to view a specific order by ID. Returns `OrderResponse`. Requires admin role.
- `PUT /api/v1/admin/orders/{orderId}/status`: Allows administrators to update the status of an order. It consumes `UpdateOrderStatusRequest` and returns `OrderResponse`. Requires admin role.

## DTOs

`CreateOrderRequest.java`: Used for creating new orders. Contains `customerId` and a list of `OrderItemRequest`.

`OrderItemRequest.java`: Represents a single item within `CreateOrderRequest`, containing `menuItemId` and `quantity`.

`OrderResponse.java`: Used for returning order details in API responses. Contains order ID, customer ID, total amount, status, and a list of `OrderItemResponse`.

`UpdateOrderStatusRequest.java`: Used by administrators to change an order's status.

## Exception Handling

`OrderProcessingException.java` is a custom exception thrown for errors during order creation or payment processing.

---

## Inquiry Management

**Name:** `inquiry-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/EventInquiry.java` — MODEL layer — represents a customer inquiry for catering or private events, storing all relevant details and its current status.
- `backend/src/main/java/com/farmaaishrestaurant/model/InquiryStatus.java` — MODEL layer — defines the possible states for an event inquiry.
- `backend/src/main/java/com/farmaaishrestaurant/repository/EventInquiryRepository.java` — REPOSITORY layer — provides CRUD operations for EventInquiry entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/EventInquiryService.java` — SERVICE layer — implements createInquiry(CreateEventInquiryRequest): EventInquiryResponse, getAllInquiries(): List<EventInquiryResponse>, getInquiryById(UUID): EventInquiryResponse, and updateInquiryStatus(UUID, InquiryStatus): EventInquiryResponse; delegates persistence to EventInquiryRepository.
- `backend/src/main/java/com/farmaaishrestaurant/controller/EventInquiryController.java` — CONTROLLER layer — exposes a public API endpoint for submitting new event inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminEventInquiryController.java` — CONTROLLER layer — exposes admin-only API endpoints for viewing and managing event inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateEventInquiryRequest.java` — DTO layer — defines the data structure for submitting a new event inquiry.
- `backend/src/main/java/com/farmaaishrestaurant/dto/EventInquiryResponse.java` — DTO layer — defines the data structure for returning event inquiry details in API responses.

**Feature Instruction:**

The Inquiry Management feature handles the submission and administration of customer inquiries for catering and private events at Farmaaish Restaurant. It consists of a public API endpoint for customers to submit new inquiries and an admin-only API for staff to view and manage these inquiries.

### Public Inquiry Submission Flow
1.  **Customer Submits Inquiry**: A customer fills out an inquiry form on the website (handled by the `inquiry-form` frontend feature), providing details such as their name, email, phone number, event type, date, number of guests, and any special requests. This data is sent as a `CreateEventInquiryRequest` to the `EventInquiryController`.
2.  **Controller Receives Request**: The `EventInquiryController` receives the `CreateEventInquiryRequest` and delegates it to the `EventInquiryService.createInquiry(CreateEventInquiryRequest request)` method.
3.  **Service Processes Inquiry**: The `EventInquiryService` maps the `CreateEventInquiryRequest` DTO to an `EventInquiry` entity. It sets the `status` of the new inquiry to `NEW` (from the `InquiryStatus` enum) and sets the `inquiryDate` to the current timestamp. The service then persists the `EventInquiry` entity using the `EventInquiryRepository.save(EventInquiry inquiry)` method. After successful persistence, it returns an `EventInquiryResponse` DTO.
4.  **Controller Returns Response**: The `EventInquiryController` returns a `201 Created` HTTP status with the `EventInquiryResponse` containing the details of the newly created inquiry.

### Admin Inquiry Management Flow
1.  **Admin Views Inquiries**: An administrator accesses the admin portal (handled by the `admin-portal` frontend feature) to view all event inquiries. The frontend calls `AdminEventInquiryController.getAllInquiries()`.
2.  **Controller Fetches All Inquiries**: The `AdminEventInquiryController` calls `EventInquiryService.getAllInquiries()`.
3.  **Service Retrieves Inquiries**: The `EventInquiryService` retrieves all `EventInquiry` entities from the `EventInquiryRepository.findAll()` and maps them to a `List<EventInquiryResponse>`.
4.  **Controller Returns Inquiries**: The `AdminEventInquiryController` returns a `200 OK` HTTP status with the list of `EventInquiryResponse` DTOs.

5.  **Admin Views Single Inquiry**: An administrator can view the details of a specific inquiry by its ID. The frontend calls `AdminEventInquiryController.getInquiryById(UUID inquiryId)`.
6.  **Controller Fetches Single Inquiry**: The `AdminEventInquiryController` calls `EventInquiryService.getInquiryById(UUID inquiryId)`.
7.  **Service Retrieves Single Inquiry**: The `EventInquiryService` retrieves the `EventInquiry` entity by ID using `EventInquiryRepository.findById(UUID id)`. If the inquiry is not found, it throws a `ResourceNotFoundException` (from `shared-backend`). The service then maps the entity to an `EventInquiryResponse`.
8.  **Controller Returns Single Inquiry**: The `AdminEventInquiryController` returns a `200 OK` HTTP status with the `EventInquiryResponse` or a `404 Not Found` if `ResourceNotFoundException` is caught.

9.  **Admin Updates Inquiry Status**: An administrator can update the status of an inquiry (e.g., from `NEW` to `CONTACTED` or `CLOSED`). The frontend calls `AdminEventInquiryController.updateInquiryStatus(UUID inquiryId, InquiryStatus newStatus)`.
10. **Controller Updates Status**: The `AdminEventInquiryController` calls `EventInquiryService.updateInquiryStatus(UUID inquiryId, InquiryStatus newStatus)`.
11. **Service Updates Status**: The `EventInquiryService` retrieves the `EventInquiry` entity by ID. If found, it updates the `status` field with the `newStatus` and persists the updated entity using `EventInquiryRepository.save(EventInquiry inquiry)`. If not found, it throws a `ResourceNotFoundException`. The service then maps the updated entity to an `EventInquiryResponse`.
12. **Controller Returns Updated Inquiry**: The `AdminEventInquiryController` returns a `200 OK` HTTP status with the updated `EventInquiryResponse` or a `404 Not Found` if `ResourceNotFoundException` is caught.

### Error Handling
-   `ResourceNotFoundException` (from `shared-backend`) will be thrown by `EventInquiryService` if an inquiry with the given ID is not found during retrieval or update operations. This will result in a `404 Not Found` HTTP status from the controllers.
-   Validation errors for `CreateEventInquiryRequest` will result in `400 Bad Request` HTTP status from the `EventInquiryController`.

---

## Gallery Management

**Name:** `gallery-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/GalleryImage.java` — JPA Entity layer — represents an image in the restaurant's photo gallery with its URL, caption, and upload timestamp.
- `backend/src/main/java/com/farmaaishrestaurant/repository/GalleryImageRepository.java` — REPOSITORY layer — provides CRUD operations for GalleryImage entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/GalleryService.java` — SERVICE layer — implements getAllGalleryImages(): List<GalleryImageDto>, uploadGalleryImage(GalleryImageDto): GalleryImageDto, and deleteGalleryImage(UUID): void; delegates persistence to GalleryImageRepository.
- `backend/src/main/java/com/farmaaishrestaurant/controller/GalleryController.java` — CONTROLLER layer — exposes public API endpoints for fetching gallery images.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminGalleryController.java` — CONTROLLER layer — exposes admin-only API endpoints for uploading and deleting gallery images.
- `backend/src/main/java/com/farmaaishrestaurant/dto/GalleryImageDto.java` — DTO layer — data transfer object for gallery image data, used for API requests and responses.

**Feature Instruction:**

The Gallery Management feature provides backend services for managing a photo gallery for Farmaaish Restaurant. It includes a data model for gallery images, a repository for persistence, a service layer for business logic, and two controllers: one public-facing for fetching images and one admin-only for uploading and deleting images.

## GalleryImage.java
This is the JPA entity representing a single image in the restaurant's gallery. It will have fields for a unique identifier (UUID), the URL of the image, a caption, and a timestamp for when it was uploaded.

## GalleryImageRepository.java
This Spring Data JPA repository provides standard CRUD operations for `GalleryImage` entities. It will extend `JpaRepository<GalleryImage, UUID>`.

## GalleryImageDto.java
This DTO will be used for transferring gallery image data between the service layer and the controllers. It will mirror the `GalleryImage` entity but will be used for API responses and requests.

## GalleryService.java
This service class encapsulates the business logic for gallery management. It will inject `GalleryImageRepository`.

### public List<GalleryImageDto> getAllGalleryImages()
1. Retrieve all `GalleryImage` entities from `galleryImageRepository`.
2. Map each `GalleryImage` entity to a `GalleryImageDto`.
3. Return the list of `GalleryImageDto`.

### public GalleryImageDto uploadGalleryImage(GalleryImageDto galleryImageDto)
1. Create a new `GalleryImage` entity from the provided `galleryImageDto`.
2. Set the `uploadedAt` timestamp to the current time.
3. Save the new `GalleryImage` entity using `galleryImageRepository`.
4. Map the saved `GalleryImage` entity back to a `GalleryImageDto`.
5. Return the `GalleryImageDto`.

### public void deleteGalleryImage(UUID id)
1. Check if a `GalleryImage` with the given `id` exists using `galleryImageRepository.existsById(id)`.
2. If not found, throw a `ResourceNotFoundException`.
3. If found, delete the `GalleryImage` entity by `id` using `galleryImageRepository.deleteById(id)`.

## GalleryController.java
This controller exposes public API endpoints for retrieving gallery images. It will inject `GalleryService`.

### public ResponseEntity<List<GalleryImageDto>> getAllGalleryImages()
1. Call `galleryService.getAllGalleryImages()`.
2. Return the list of `GalleryImageDto` with HTTP status 200 OK.

## AdminGalleryController.java
This controller exposes admin-only API endpoints for uploading and deleting gallery images. It will inject `GalleryService`.

### public ResponseEntity<GalleryImageDto> uploadGalleryImage(@RequestBody GalleryImageDto galleryImageDto)
1. Call `galleryService.uploadGalleryImage(galleryImageDto)`.
2. Return the created `GalleryImageDto` with HTTP status 201 CREATED.

### public ResponseEntity<Void> deleteGalleryImage(@PathVariable UUID id)
1. Call `galleryService.deleteGalleryImage(id)`.
2. Return HTTP status 204 NO CONTENT.
3. If `ResourceNotFoundException` is thrown by the service, the `GlobalExceptionHandler` (from `shared-backend`) will catch it and return HTTP status 404 NOT FOUND.

---

## Core UI & Pages

**Name:** `core-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/App.tsx` — Root component that sets up the React Router and defines the main application routes, wrapping public pages with the `Layout` component.
- `frontend/src/api/client.ts` — Configures and exports a shared Axios instance for all API calls, including an interceptor for JWT token attachment from localStorage.
- `frontend/src/config/siteConfig.ts` — Central configuration for site-wide content, including brand name, navigation links, and contact information, to be imported by other components.
- `frontend/src/pages/HomePage.tsx` — Landing page that orchestrates `HeroSection`, `FeaturedDishes`, `Testimonials`, and `BookingCallToAction` components to introduce the restaurant.
- `frontend/src/components/home/HeroSection.tsx` — Full-bleed hero component displaying a background image, title, and subtitle, designed to evoke the regality of Mughlai heritage.
- `frontend/src/components/home/FeaturedDishes.tsx` — Displays a curated grid of signature dishes by fetching data using the `useMenu` hook and formatting prices in INR.
- `frontend/src/components/home/Testimonials.tsx` — Displays a rotating selection of positive customer reviews, reflecting the restaurant's warm and sophisticated tone.
- `frontend/src/components/home/BookingCallToAction.tsx` — A prominent call-to-action component encouraging users to book a table, with a button navigating to the reservations page.
- `frontend/src/pages/AboutPage.tsx` — Static page detailing the restaurant's heritage and culinary philosophy, wrapped in the `Layout` component.
- `frontend/src/pages/ContactPage.tsx` — Page displaying contact information and an interactive map, integrating `ContactDetails` and `InteractiveMap` components.
- `frontend/src/components/contact/ContactDetails.tsx` — Displays the restaurant's address, clickable phone number, and opening hours, sourced from `siteConfig.ts`.
- `frontend/src/components/contact/InteractiveMap.tsx` — Embeds a Google Map showing the restaurant's location, using coordinates from `siteConfig.ts`.
- `frontend/src/pages/NotFoundPage.tsx` — User-friendly 404 page that guides users back to the main site with a clear message and a navigation button.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

This `core-ui` feature establishes the foundational structure and common pages for the Farmaaish Restaurant frontend application. It includes the main `App.tsx` router setup, a configured Axios instance for API calls (`client.ts`), and site-wide configuration (`siteConfig.ts`). It also provides the core static pages: `HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, and `NotFoundPage.tsx`, along with their respective components.

### `App.tsx`
This file is the root component, responsible for setting up the `react-router-dom` router. It defines the main routes for the application, including the home page, about page, contact page, and a 404 not found page. It uses the `Layout` component from `@/components/Layout` to provide a consistent header and footer across public pages.

### `client.ts`
This file configures and exports a shared Axios instance. This instance is pre-configured with the base URL for the backend API (`/api/v1`) and includes an interceptor to attach the JWT token from `localStorage` (using the key 'token') to every outgoing request. This ensures that all authenticated API calls automatically include the necessary authorization header. It also handles basic error logging.

### `siteConfig.ts`
This file centralizes all site-wide configuration. It exports constants for the brand name ("Farmaaish"), navigation links (Home, Menu, Reservations, About, Contact, Gallery, Catering), and contact information (address, phone, email, opening hours, map coordinates). All components and pages requiring this information should import it from `siteConfig.ts` to maintain consistency and ease of updates.

### `HomePage.tsx`
This page serves as the landing page for the restaurant. It orchestrates several child components to present a compelling introduction to Farmaaish. It uses the `Layout` component. The page structure is as follows:
1.  **Hero Section**: Renders `HeroSection.tsx` at the top, featuring a full-bleed background image, the restaurant name, and a captivating tagline.
2.  **Featured Dishes**: Renders `FeaturedDishes.tsx`, showcasing a curated selection of signature dishes. This component will fetch menu items using the `useMenu` hook from the `menu-display` feature.
3.  **Testimonials**: Renders `Testimonials.tsx`, displaying customer reviews to build trust and appeal.
4.  **Booking Call to Action**: Renders `BookingCallToAction.tsx`, a prominent section encouraging users to make a reservation.

### `HeroSection.tsx`
This component displays a full-bleed hero section. It receives `title` and `subtitle` as props. It uses a high-quality background image relevant to a Mughlai restaurant (e.g., https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80) with a dark overlay. The title will be "Farmaaish Restaurant" and the subtitle will be "Experience the Grandeur of Mughlai Cuisine."

### `FeaturedDishes.tsx`
This component displays a grid of featured dishes. It uses the `useMenu` hook from the `menu-display` feature to fetch a list of `MenuItemDto` objects. It should display a maximum of 6 dishes. Each dish will be rendered using a card-like structure, showing its `name`, `description`, `price` (formatted in INR), and `imageUrl`. It should include a button to "View Menu" that navigates to the `/menu` route.

### `Testimonials.tsx`
This component displays a rotating selection of customer testimonials. It should include at least three placeholder testimonials with customer names and ratings, reflecting the warm and sophisticated tone of the restaurant. Example testimonial: "An unforgettable culinary journey! Farmaaish truly captures the essence of Mughlai dining. The biryani was divine!" - Priya S.

### `BookingCallToAction.tsx`
This component presents a prominent call to action for booking a table. It includes a compelling headline like "Reserve Your Table for an Exquisite Dining Experience" and a button labeled "Book Now" that navigates to the `/reservations` route.

### `AboutPage.tsx`
This static page tells the story of Farmaaish. It uses the `Layout` component. It should include sections detailing the restaurant's heritage, culinary philosophy, and commitment to quality. The content should be warm, sophisticated, and inviting, using the brand accent color for key headings or phrases.

### `ContactPage.tsx`
This page provides all contact information for Farmaaish. It uses the `Layout` component. It integrates `ContactDetails.tsx` to display the address, phone, and opening hours, and `InteractiveMap.tsx` to show the restaurant's location on a map.

### `ContactDetails.tsx`
This component displays the restaurant's contact information, including the address (Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069), phone number (020 2729 1111, made clickable), and opening hours (e.g., "Open Daily: 12:00 PM - 3:00 PM & 7:00 PM - 11:00 PM").

### `InteractiveMap.tsx`
This component embeds a Google Map showing the restaurant's location. It uses the coordinates (18.55557, 73.7749) from `siteConfig.ts` to center the map and place a marker. It should be a static map display, not requiring complex user interaction beyond basic pan and zoom.

### `NotFoundPage.tsx`
This page is displayed for any unhandled routes (404 errors). It uses the `Layout` component. It provides a user-friendly message like "Oops! The page you're looking for doesn't exist." and a prominent button to "Go to Homepage" that navigates to the `/` route.

All monetary values displayed (e.g., in `FeaturedDishes.tsx`) must be formatted using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.


---

## Authentication UI

**Name:** `auth-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/auth.ts` — TypeScript types and interfaces for authentication, including User and AuthResponse.
- `frontend/src/services/authService.ts` — SERVICE layer - provides login(credentials: LoginRequest): Promise<AuthResponse> and logout(): void for user authentication.
- `frontend/src/hooks/useAuth.ts` — HOOK layer - provides useAuth(): AuthContextType to access authentication state and actions.
- `frontend/src/context/AuthContext.tsx` — CONTEXT layer - provides AuthProvider component for managing global authentication state and actions.
- `frontend/src/pages/LoginPage.tsx` — PAGE layer - renders a login form and handles user authentication.
- `frontend/src/components/ProtectedRoute.tsx` — COMPONENT layer - restricts access to routes based on user authentication and roles.
- `frontend/src/pages/ProfilePage.tsx` — PAGE layer - displays the authenticated user's profile and order history.
- `frontend/src/components/profile/OrderHistoryTable.tsx` — COMPONENT layer - displays a table of the current user's past orders.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

This feature provides the core authentication functionality for the Farmaaish Restaurant application, enabling users to log in, manage their session, and access protected routes. It consists of TypeScript types for authentication entities (`auth.ts`), a service for API interactions (`authService.ts`), a React Context for global state management (`AuthContext.tsx`), a custom hook to consume the context (`useAuth.ts`), a login page (`LoginPage.tsx`), a protected route component (`ProtectedRoute.tsx`), and a user profile page (`ProfilePage.tsx`) which includes an order history table (`OrderHistoryTable.tsx`).

**`auth.ts`**: Defines the `User` interface with `id`, `username`, `email`, `roles`, and `token` fields, and the `AuthResponse` interface for login responses. It also defines `LoginRequest` for the login payload.

**`authService.ts`**: This service handles the actual API calls for authentication. It provides `login(credentials: LoginRequest): Promise<AuthResponse>` which sends a POST request to `/api/v1/auth/login`. Upon successful login, it stores the received JWT `token` in `localStorage` under the key 'token' and returns the `AuthResponse`. It also provides `logout(): void` which removes the 'token' from `localStorage`.

**`AuthContext.tsx`**: This React Context manages the global authentication state, including `user` (of type `User | null`), `isAuthenticated` (boolean), `loading` (boolean), `login` (function), and `logout` (function). It uses `authService.ts` for API calls and `localStorage` for persistent token storage. On initialization, it attempts to load a user from `localStorage` if a token exists. The `login` function takes `LoginRequest` and calls `authService.login`. If successful, it updates the `user` state, sets `isAuthenticated` to true, and navigates the user to the home page or a previously intended route. The `logout` function calls `authService.logout`, clears the user state, sets `isAuthenticated` to false, and redirects to the login page. The `AuthContext.Provider` wraps the application to make the authentication state available to all components.

**`useAuth.ts`**: This custom hook provides a convenient way for components to access the authentication state and actions from `AuthContext`. It exports `useAuth(): AuthContextType`, where `AuthContextType` includes `user`, `isAuthenticated`, `loading`, `login`, and `logout`.

**`LoginPage.tsx`**: This page provides a form for users to log in. It uses the `useAuth` hook to access the `login` function. The form will have fields for `username` and `password`. Upon successful login, the user will be redirected to the home page. The page will feature a rich, inviting background image (e.g., https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80) with a dark overlay, a prominent heading "Welcome to Farmaaish Restaurant", and a login form styled with the brand's color palette. The form will include an "Experience the Flavors" button.

**`ProtectedRoute.tsx`**: This component acts as a wrapper for routes that require authentication. It uses the `useAuth` hook to check `isAuthenticated` and `loading` status. If the user is not authenticated and `loading` is false, it redirects them to the `/login` page. It can optionally take a `roles` prop (e.g., `['ADMIN']`) to restrict access based on user roles. If the user does not have the required role, they are redirected to a 403 Forbidden page or the home page.

**`ProfilePage.tsx`**: This page displays the authenticated user's profile information and their past order history. It will fetch user details (from the `AuthContext`) and order history using `useOrders` from the `order-flow` feature. The page will be structured with a "My Profile" section showing the user's name and email, and an "Order History" section that renders the `OrderHistoryTable` component. All monetary values will be displayed in Indian Rupees (₹) using the `en-IN` locale.

**`OrderHistoryTable.tsx`**: This component displays a table of the current user's past orders. It receives a `List<OrderResponse>` as a prop. Each row will show `orderDate`, `totalAmount`, `status`, and a button to view `OrderResponse.orderItems` details. The `totalAmount` will be formatted in Indian Rupees (₹) using the `en-IN` locale.


---

## Menu Display

**Name:** `menu-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/menu.ts` — Generated from the backend API contract — defines TypeScript interfaces for menu items and categories.
- `frontend/src/services/menuService.ts` — Provides functions for fetching menu data from the backend API. Exports `getMenuItems(): Promise<MenuItem[]>` and `getMenuCategories(): Promise<MenuItemCategory[]>` and `getMenuItemsByCategoryId(categoryId: string): Promise<MenuItem[]>`.
- `frontend/src/hooks/useMenu.ts` — React Query hook for fetching and managing menu data. Exports `useMenuItems(): UseQueryResult<MenuItem[], Error>`, `useMenuCategories(): UseQueryResult<MenuItemCategory[], Error>`, and `useMenuItemsByCategory(categoryId: string): UseQueryResult<MenuItem[], Error>`.
- `frontend/src/pages/MenuPage.tsx` — Page component that displays the full restaurant menu, including category filters and integration with the cart system. It uses `useMenu` to fetch data and `MenuCategoryTabs` and `MenuItemsGrid` to render the UI.
- `frontend/src/components/menu/MenuCategoryTabs.tsx` — Component that renders interactive tabs for filtering menu items by category. It accepts `categories`, `onSelectCategory`, and `selectedCategoryId` as props.
- `frontend/src/components/menu/MenuItemsGrid.tsx` — Component that displays a grid of `MenuItemCard` components. It accepts an array of `MenuItem` objects as props.
- `frontend/src/components/menu/MenuItemCard.tsx` — Component that displays a single menu item with its details and an 'Add to Cart' button. It accepts a `MenuItem` object as props and interacts with the `useCart` hook.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

This feature provides the frontend components and logic for displaying Farmaaish Restaurant's menu to customers, allowing them to browse dishes by category and add items to their cart. It interacts with the `menu-management` backend feature to fetch menu data and with the pre-scaffolded `src/cart` framework for cart operations. The `MenuPage.tsx` serves as the main entry point, orchestrating the display of menu categories and items. `MenuCategoryTabs.tsx` renders filterable tabs for menu categories, while `MenuItemsGrid.tsx` displays the actual dishes. Each dish is represented by a `MenuItemCard.tsx`, which includes an 'Add to Cart' button that utilizes the `useCart` hook from the `src/cart` framework.

### `frontend/src/types/menu.ts`
This file defines the TypeScript interfaces for `MenuItem` and `MenuItemCategory`, mirroring the `MenuItemDto` and `MenuItemCategoryDto` data shapes from the `menu-management` backend feature. These types are used throughout the frontend for consistent data handling.

### `frontend/src/services/menuService.ts`
This service provides asynchronous functions to interact with the `menu-management` backend API. It uses `apiClient` from `@/api/client` to make HTTP requests. It exposes `getMenuItems()` to fetch all menu items and `getMenuCategories()` to fetch all menu categories. It also includes `getMenuItemsByCategoryId(categoryId: string)` for filtering.

### `frontend/src/hooks/useMenu.ts`
This React Query hook encapsulates the logic for fetching and caching menu data. It provides `useQuery` hooks for `useMenuItems()` and `useMenuCategories()`, which call the corresponding functions in `menuService.ts`. It also provides `useMenuItemsByCategory(categoryId: string)` to fetch items for a specific category. The hook manages loading states, errors, and data caching, making it easy for components to consume menu data.

### `frontend/src/pages/MenuPage.tsx`
This page renders the complete menu for Farmaaish Restaurant. It uses the `Layout` component from `@/components/Layout` for consistent navigation and footer. The page displays a prominent hero section with a background image, the restaurant's name, and a welcoming message. Below the hero, it fetches and displays menu categories using `MenuCategoryTabs` and then renders the menu items for the selected category using `MenuItemsGrid`. The page manages the currently selected category state. All monetary values (prices) are displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

**Page Sections:**
1.  **Hero Section:** Full-width hero image (`https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80`) with a dark overlay (`absolute inset-0 bg-black bg-opacity-50`). Contains a large, bold `h1` with the text "Farmaaish Restaurant" and a sub-headline "Experience the Royal Flavors of Mughlai Cuisine." Both use `text-white`.
2.  **Menu Categories Section:** A `Section container` (`py-16 px-4 max-w-7xl mx-auto`) with a `h2` "Our Exquisite Menu" (`text-3xl md:text-4xl font-bold text-[#36454F] mb-8 text-center`). This section contains the `MenuCategoryTabs` component.
3.  **Menu Items Section:** A `Section container` (`py-16 px-4 max-w-7xl mx-auto`) that dynamically displays `MenuItemsGrid` based on the selected category. If no category is selected, it should display all items.

### `frontend/src/components/menu/MenuCategoryTabs.tsx`
This component renders a set of clickable tabs, each representing a menu category. It receives `categories` (an array of `MenuItemCategory`) and `onSelectCategory` (a callback function) as props. When a tab is clicked, it calls `onSelectCategory` with the `id` of the selected category. The active tab should be visually distinct. The component uses `useMenu.useMenuCategories()` to fetch categories.

**Props:**
- `categories: MenuItemCategory[]`
- `onSelectCategory: (categoryId: string | null) => void`
- `selectedCategoryId: string | null`

### `frontend/src/components/menu/MenuItemsGrid.tsx`
This component displays a responsive grid of `MenuItemCard` components. It receives an array of `MenuItem` objects as a prop. It iterates over the `items` array and renders a `MenuItemCard` for each item. If the `items` array is empty, it displays a message like "No items found in this category." All monetary values (prices) are displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

**Props:**
- `items: MenuItem[]`

### `frontend/src/components/menu/MenuItemCard.tsx`
This component renders a single menu item as a card. It receives a `MenuItem` object as a prop. The card displays the item's `imageUrl`, `name`, `description`, and `price`. It includes an 'Add to Cart' button that, when clicked, calls `useCart().addItem()` with the item's details (`id`, `name`, `unitPrice`, `imageUrl`). The price is displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

**Props:**
- `item: MenuItem`


---

## Reservation Flow

**Name:** `reservation-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/reservation.ts` — Generated from the backend API contract — TypeScript types for reservations and reservation requests.
- `frontend/src/services/reservationService.ts` — SERVICE layer — provides `createReservation(request: CreateReservationRequest): Promise<Reservation>` for interacting with the backend reservation API.
- `frontend/src/hooks/useReservations.ts` — HOOK layer — provides `useCreateReservation()` for managing reservation creation with React Query, including loading and error states.
- `frontend/src/pages/BookingPage.tsx` — PAGE layer — renders the main reservation form and orchestrates the reservation creation flow using the `useCreateReservation` hook.
- `frontend/src/components/reservation/ReservationForm.tsx` — COMPONENT layer — a reusable form for collecting reservation details and submitting them via a provided `createReservation` function.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8942b] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

This feature provides the frontend components and logic for customers to make table reservations at Farmaaish Restaurant. It consists of TypeScript types, a service for API interaction, a React Query hook for data management, a dedicated booking page, and a reusable reservation form component.

The `reservation.ts` file defines the TypeScript interfaces for `Reservation` and `CreateReservationRequest`, mirroring the backend DTOs from the `reservation-system` feature. These types ensure strong typing throughout the frontend application when dealing with reservation data.

The `reservationService.ts` file encapsulates the API calls to the backend `reservation-system` feature. It exports an `createReservation` function that takes a `CreateReservationRequest` object and sends it to the `/api/v1/reservations` endpoint. This service uses the `apiClient` from `@/api/client.ts` for making authenticated requests.

The `useReservations.ts` hook leverages React Query to provide a convenient way for components to interact with the `reservationService`. It exports a `useCreateReservation` mutation hook that handles the asynchronous logic of creating a reservation, including loading states, error handling, and success callbacks. Upon successful reservation, a toast notification should be displayed to the user.

The `BookingPage.tsx` is the main entry point for customers to make reservations. It uses the `Layout` component from `@/components/Layout` to provide consistent navigation and footer. The page renders a `ReservationForm` component, passing the `useCreateReservation` mutation hook's `mutate` function and `isLoading` state as props. The page's content should be structured with a hero section at the top, followed by a section containing the reservation form. The hero section should feature a large, high-fidelity image relevant to a restaurant, a headline "Experience the Grandeur of Farmaaish" and a subheadline "Reserve Your Table for an Unforgettable Mughlai Feast."

The `ReservationForm.tsx` component is a controlled form that allows users to input their `customerName`, `customerEmail`, `customerPhone`, `reservationTime` (date and time), `numberOfGuests`, and `specialRequests`. It uses local state to manage form inputs and validates them before submission. Upon submission, it calls the `createReservation` function passed via props. The form should include input fields for all required reservation details and a submit button. Date and time selection should be user-friendly, perhaps using a date picker library. The form should display loading states and error messages appropriately. All monetary values (if any were to be displayed here, which there are none for reservations) would be formatted using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

**Interaction Flow:**
1. A user navigates to the `/book` route, which renders `BookingPage.tsx`.
2. `BookingPage.tsx` renders the `ReservationForm.tsx` component.
3. The user fills out the `ReservationForm` with their details.
4. Upon submission, `ReservationForm` calls the `createReservation` function provided by `BookingPage`.
5. `BookingPage`'s `createReservation` handler (from `useCreateReservation` hook) calls `reservationService.createReservation`.
6. `reservationService.createReservation` makes a POST request to `/api/v1/reservations` on the backend `reservation-system`.
7. The backend processes the reservation and returns a `ReservationResponse`.
8. The `useCreateReservation` hook's `onSuccess` callback is triggered, displaying a success toast and potentially redirecting the user or clearing the form.

---

## Ordering & Checkout Flow

**Name:** `order-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/order.ts` — Generated from the backend API contract — TypeScript types for orders and order items.
- `frontend/src/services/orderService.ts` — Generated from the backend API contract — Provides functions for creating and managing food orders.
- `frontend/src/hooks/useOrders.ts` — React Query hook for creating and managing order data, exposing `useCreateOrder()` for submitting new orders and `useMyOrders()` for fetching a customer's order history.
- `frontend/src/pages/CheckoutPage.tsx` — Page component that orchestrates the multi-step checkout process, displaying order summary, delivery address form, and payment component.
- `frontend/src/components/checkout/OrderSummary.tsx` — Component that displays the items in the cart, their quantities, and the total price, formatted in Indian Rupees.
- `frontend/src/components/checkout/DeliveryAddressForm.tsx` — Component providing a form for users to enter their delivery address and contact information, emitting these details on submission.
- `frontend/src/components/checkout/PaymentComponent.tsx` — Component that integrates with the order creation process, initiating the backend order submission using the `useCreateOrder` hook.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

This feature implements the complete ordering and checkout flow for Farmaaish Restaurant, allowing customers to review their cart, provide delivery details, and complete payment. It integrates with the pre-scaffolded cart framework and the backend `order-management` feature to create and manage orders.

`order.ts` defines the TypeScript interfaces for `Order`, `OrderItem`, `CreateOrderRequest`, and `OrderItemRequest`, mirroring the backend DTOs from the `order-management` feature. These types are used throughout the frontend for consistency.

`orderService.ts` provides the API client functions for interacting with the backend `order-management` endpoints. It includes `createOrder` to submit a new order and `getMyOrders` to fetch a customer's order history. It uses the `api/client.ts` for making authenticated HTTP requests.

`useOrders.ts` is a React Query hook that wraps `orderService.ts`. It provides `useCreateOrder` for handling the mutation of creating a new order, and `useMyOrders` for fetching and caching a user's order history. This hook manages loading states, error handling, and data invalidation.

`CheckoutPage.tsx` orchestrates the multi-step checkout process. It utilizes the `useCart` hook from `@/cart` to access cart items and totals. It renders `OrderSummary.tsx`, `DeliveryAddressForm.tsx`, and `PaymentComponent.tsx` in sequence. The page manages the checkout steps and collects necessary data (delivery address, contact phone) from `DeliveryAddressForm.tsx`. Upon successful payment, it calls `useOrders().useCreateOrder().mutateAsync()` with the collected order details and cart items, then navigates the user to an order confirmation page (not part of this feature).

`OrderSummary.tsx` is a presentational component that displays the current items in the user's cart, their quantities, individual prices, and the calculated subtotal, adjustments, and total amount. It receives `cartItems` and `totals` as props, typically from `useCart()` in `CheckoutPage.tsx`. All monetary values are displayed in Indian Rupees (₹) using the `en-IN` locale.

`DeliveryAddressForm.tsx` provides a form for the user to input their delivery address and contact phone number. It manages its own form state and validation. Upon submission, it emits the `deliveryAddress` and `contactPhone` values to its parent component, `CheckoutPage.tsx`.

`PaymentComponent.tsx` is responsible for initiating the payment process. It receives the `totalAmount` and `orderItems` from `CheckoutPage.tsx`. When the user confirms payment, it calls `useOrders().useCreateOrder().mutateAsync()` to submit the order to the backend. It handles the success and error states of the order creation, potentially showing toast notifications using `sonner`.

**Checkout Flow Steps:**
1.  **Cart Review (OrderSummary.tsx):** The user reviews the items in their cart, quantities, and the total amount. All prices are formatted in `en-IN` locale with `INR` currency symbol.
2.  **Delivery Details (DeliveryAddressForm.tsx):** The user enters their delivery address and contact phone number.
3.  **Payment (PaymentComponent.tsx):** The user proceeds to payment. `PaymentComponent.tsx` will trigger the `createOrder` mutation via `useOrders` hook. The `CreateOrderRequest` will be constructed using the cart items (mapped to `OrderItemRequest`), delivery address, and contact phone.
4.  **Order Creation:** `orderService.createOrder` sends a POST request to `/api/v1/orders` with the `CreateOrderRequest`. The backend `order-management` feature processes this request, creates the order, and returns an `OrderResponse`.
5.  **Confirmation:** Upon successful order creation, the user is redirected to an order confirmation page (outside this feature's scope).

**Error Handling:**
-   If `orderService.createOrder` fails, an error message should be displayed to the user, potentially using a toast notification.
-   Network errors or API errors from the backend should be caught and handled gracefully by `useOrders` and propagated to `PaymentComponent.tsx` for user feedback.

---

## Gallery Display

**Name:** `gallery-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/gallery.ts` — TypeScript types for gallery images, derived from the backend API contract.
- `frontend/src/services/galleryService.ts` — SERVICE layer — provides `getAllGalleryImages(): Promise<GalleryImage[]>` by calling the backend gallery API.
- `frontend/src/hooks/useGallery.ts` — REACT HOOK layer — provides `useGallery()` for fetching and caching gallery images using React Query.
- `frontend/src/pages/GalleryPage.tsx` — PAGE layer — displays a public gallery of restaurant images, using `useGallery` to fetch data.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8942b] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

This feature provides a public-facing gallery page for Farmaaish Restaurant, showcasing high-quality images of its dishes and ambiance. It consists of TypeScript types for gallery images (`gallery.ts`), a service for fetching these images from the backend (`galleryService.ts`), a React Query hook for data fetching and caching (`useGallery.ts`), and the main gallery page component (`GalleryPage.tsx`).

The `GalleryPage.tsx` will display a grid of images fetched using the `useGallery` hook. Each image will be presented with its caption. The page will be structured with a hero section, a main gallery grid, and will use the `Layout` component from `@/components/Layout` for consistent navigation and footer.

`galleryService.ts` will interact with the `gallery-management` backend feature to retrieve gallery images. Specifically, it will call the `GET /api/v1/gallery` endpoint. The `useGallery.ts` hook will then wrap this service call using React Query to provide data fetching, caching, and loading/error states to `GalleryPage.tsx`.

The `GalleryPage.tsx` will render a visually appealing layout, adhering to the design tokens. It will feature a hero section with a relevant background image and a compelling headline. The main content area will display the gallery images in a responsive grid, with each image having a caption. Error and loading states will be handled gracefully, providing user feedback.

### `gallery.ts`
Defines the `GalleryImage` interface, which mirrors the `GalleryImageDto` data shape from the `gallery-management` backend feature.

### `galleryService.ts`
Exports an asynchronous function `getAllGalleryImages()` that makes an HTTP GET request to `/api/v1/gallery` using the `apiClient` from `frontend/src/api/client.ts`. It returns a `Promise<GalleryImage[]>`.

### `useGallery.ts`
Exports a custom React Query hook `useGallery()` that utilizes `react-query`'s `useQuery` to fetch gallery images. It calls `galleryService.getAllGalleryImages()` and provides `isLoading`, `isError`, `data`, and `error` states to consuming components. The query key for this hook should be `['galleryImages']`.

### `GalleryPage.tsx`
This page component is responsible for rendering the entire gallery. It will:
1. Import and use the `useGallery` hook to fetch gallery images.
2. Render a `Layout` component from `@/components/Layout` to provide consistent header and footer.
3. Implement a hero section with a background image (Unsplash URL for a restaurant ambiance: `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80`) and an overlay. The hero section will contain an `h1` with the text "Our Culinary Journey" and a `p` with the text "A visual feast of Farmaaish Restaurant's exquisite dishes and inviting ambiance."
4. Display loading and error states using conditional rendering based on the `useGallery` hook's return values.
5. If data is successfully fetched, render a responsive grid of gallery images. Each image should be displayed within a card-like structure, showing the `imageUrl` and `caption` from the `GalleryImage` object. The images should be styled to be visually prominent and appealing.
6. All text and background colors will adhere to the design tokens provided.

---

## Inquiry Form

**Name:** `inquiry-form`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/inquiry.ts` — Generated from the backend API contract — defines TypeScript types for event inquiry requests and responses.
- `frontend/src/services/inquiryService.ts` — Frontend service layer — provides `submitInquiry(request: CreateEventInquiryRequest): Promise<EventInquiryResponse>` for interacting with the backend inquiry API.
- `frontend/src/hooks/useInquiries.ts` — React Query hook — provides `useSubmitInquiry()` for components to submit event inquiries and manage their state.
- `frontend/src/pages/CateringPage.tsx` — Page component — displays catering information and hosts the `InquiryForm` for private event inquiries.
- `frontend/src/components/inquiry/InquiryForm.tsx` — Component — provides a form for customers to submit inquiries about catering or private events, using `useSubmitInquiry` hook.
- `frontend/src/components/inquiry/CateringInfo.tsx` — Component — displays static information about Farmaaish Restaurant's catering packages and options.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

This feature provides a complete flow for customers to submit catering and private event inquiries to Farmaaish Restaurant. It includes TypeScript types for inquiry data, a service for interacting with the backend API, a React Query hook for managing inquiry state, and UI components for displaying catering information and collecting inquiry details.

### `inquiry.ts`
This file defines the TypeScript interfaces for `CreateEventInquiryRequest` and `EventInquiryResponse`, mirroring the backend `inquiry-management` feature's DTOs. These types ensure strong typing throughout the frontend application when handling inquiry data.

### `inquiryService.ts`
This service acts as an intermediary between the React application and the backend `inquiry-management` API. It exports an asynchronous function `submitInquiry` which takes a `CreateEventInquiryRequest` object and sends it to the `/api/v1/inquiries` endpoint using the `apiClient` from `@/api/client.ts`. It returns a `Promise<EventInquiryResponse>` upon successful submission.

### `useInquiries.ts`
This React Query hook, `useSubmitInquiry`, provides a convenient way for components to interact with the `inquiryService.ts`. It uses `react-query`'s `useMutation` to handle the asynchronous submission of inquiry data, providing loading, error, and success states. Upon successful submission, it will display a success toast notification using `sonner` and navigate the user to the home page.

### `CateringPage.tsx`
This page serves as the entry point for catering and private event inquiries. It uses the `Layout` component from `@/components/Layout` to maintain consistent navigation and branding. The page is structured into a hero section, a section for catering information (`CateringInfo` component), and a section containing the inquiry form (`InquiryForm` component). The hero section will feature a large, high-fidelity image relevant to catering, with a headline "Experience the Grandeur of Farmaaish Catering" and a subheadline "Crafting Unforgettable Events with Authentic Mughlai Flavors."

### `CateringInfo.tsx`
This static component displays detailed information about Farmaaish Restaurant's catering packages and options. It should present the information in an elegant, readable format, using the defined design tokens for typography and spacing. This component does not interact with any backend APIs.

### `InquiryForm.tsx`
This component renders the form for customers to submit their inquiries. It utilizes `react-hook-form` for form management and validation. The form collects the following information:
- `customerName`: String, required.
- `customerEmail`: String, required, valid email format.
- `customerPhone`: String, required, valid Indian phone number format.
- `eventType`: String, required (e.g., "Wedding", "Corporate Event", "Birthday").
- `eventDate`: Date, required, future date.
- `numberOfGuests`: Integer, required, minimum 1.
- `specialRequests`: String, optional.

The form will use the `useSubmitInquiry` hook from `useInquiries.ts` to handle form submission. Upon successful submission, it should clear the form and display a success message to the user. Error messages from validation or API calls should be displayed appropriately. All monetary values (if any were to be displayed here, though none are in this feature) would be formatted using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.


---

## Admin Portal

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/AdminDashboardPage.tsx` — Admin page — the main dashboard for administrators, providing an overview and navigation to other management sections.
- `frontend/src/components/AdminLayout.tsx` — Layout component — provides a consistent header, sidebar navigation, and content area for all admin pages. Public function: AdminLayout(props: { children: React.ReactNode }).
- `frontend/src/pages/AdminMenuPage.tsx` — Admin page — manages menu items, integrating MenuTable, MenuItemForm, and DeleteMenuItemDialog, and using the useMenu hook.
- `frontend/src/components/admin/menu/MenuTable.tsx` — Component — displays a table of menu items with edit and delete actions. Public function: MenuTable(props: { menuItems: MenuItemDto[]; onEdit: (item: MenuItemDto) => void; onDelete: (id: UUID) => void }).
- `frontend/src/components/admin/menu/MenuItemForm.tsx` — Component — a form for creating or editing a menu item. Public function: MenuItemForm(props: { initialData: MenuItemDto | null; onSave: (item: MenuItemDto) => void; onCancel: () => void; isLoading: boolean }).
- `frontend/src/components/admin/menu/DeleteMenuItemDialog.tsx` — Component — a confirmation dialog for deleting a menu item. Public function: DeleteMenuItemDialog(props: { isOpen: boolean; onClose: () => void; onConfirm: (id: UUID) => void; itemToDelete: MenuItemDto | null; isLoading: boolean }).
- `frontend/src/pages/AdminReservationsPage.tsx` — Admin page — manages customer reservations, integrating ReservationsTable and UpdateReservationDialog, and using the useReservations hook.
- `frontend/src/components/admin/reservations/ReservationsTable.tsx` — Component — displays a table of reservations with status update options. Public function: ReservationsTable(props: { reservations: ReservationResponse[]; onUpdateStatus: (id: UUID, status: ReservationStatus) => void }).
- `frontend/src/components/admin/reservations/UpdateReservationDialog.tsx` — Component — a dialog for updating the status of a reservation. Public function: UpdateReservationDialog(props: { isOpen: boolean; onClose: () => void; onConfirm: (id: UUID, status: ReservationStatus) => void; reservationToUpdate: ReservationResponse | null; isLoading: boolean }).
- `frontend/src/pages/AdminOrdersPage.tsx` — Admin page — manages customer food orders, integrating OrdersTable and OrderDetailsModal, and using the useOrders hook.
- `frontend/src/components/admin/orders/OrdersTable.tsx` — Component — displays a table of orders with filtering and status update options. Public function: OrdersTable(props: { orders: OrderResponse[]; onViewDetails: (order: OrderResponse) => void; onUpdateStatus: (id: UUID, status: OrderStatus) => void }).
- `frontend/src/components/admin/orders/OrderDetailsModal.tsx` — Component — a modal showing detailed order contents and allowing status updates. Public function: OrderDetailsModal(props: { isOpen: boolean; onClose: () => void; order: OrderResponse | null; onUpdateStatus: (id: UUID, status: OrderStatus) => void; isLoading: boolean }).
- `frontend/src/pages/AdminInquiriesPage.tsx` — Admin page — manages catering and event inquiries, integrating InquiriesTable and using the useInquiries hook.
- `frontend/src/components/admin/inquiries/InquiriesTable.tsx` — Component — displays a table of event inquiries with contact details and status. Public function: InquiriesTable(props: { inquiries: EventInquiryResponse[] }).
- `frontend/src/pages/AdminGalleryPage.tsx` — Admin page — manages the photo gallery, integrating GalleryGrid and UploadImageForm, and using the useGallery hook.
- `frontend/src/components/admin/gallery/GalleryGrid.tsx` — Component — displays a grid of existing gallery images with a delete option. Public function: GalleryGrid(props: { images: GalleryImageDto[]; onDelete: (id: UUID) => void }).
- `frontend/src/components/admin/gallery/UploadImageForm.tsx` — Component — a form for uploading new images to the gallery. Public function: UploadImageForm(props: { onUpload: (file: File, caption: string) => void; isLoading: boolean }).

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#36454F] text-[#D4AF37]
- Primary CTA: bg-[#D4AF37] hover:bg-[#C2A032] text-[#36454F] font-semibold rounded-lg px-6 py-3 transition-all duration-200
- Secondary CTA: bg-[#800020] hover:bg-[#6A001A] text-white font-semibold rounded-lg px-6 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-12 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed
- Admin Sidebar: bg-[#36454F] text-white
- Admin Header: bg-white shadow-sm border-b border-gray-200
- Admin Table Header: bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider
- Admin Button Primary: bg-[#D4AF37] hover:bg-[#C2A032] text-[#36454F] font-medium rounded-md px-4 py-2
- Admin Button Danger: bg-[#800020] hover:bg-[#6A001A] text-white font-medium rounded-md px-4 py-2

This feature provides the administrative interface for Farmaaish Restaurant, allowing staff to manage menu items, reservations, customer orders, event inquiries, and the restaurant's photo gallery. It consists of several pages, each dedicated to a specific management area, all wrapped within a consistent `AdminLayout` component that provides navigation and a unified look and feel.

### AdminLayout.tsx
This component serves as the main layout for all admin pages. It includes a sidebar with navigation links to `AdminDashboardPage`, `AdminMenuPage`, `AdminReservationsPage`, `AdminOrdersPage`, `AdminInquiriesPage`, and `AdminGalleryPage`. The layout ensures a consistent header and content area for all administrative views. It accepts `children` as props to render the specific page content.

### AdminDashboardPage.tsx
This page is the entry point for administrators, providing an overview of key operational metrics and quick links to other management sections. It will display placeholder content for now, such as "Welcome to Farmaaish Admin Portal" and navigation cards to the various management pages.

### AdminMenuPage.tsx
This page allows administrators to manage the restaurant's menu. It integrates `MenuTable` to display existing menu items, `MenuItemForm` (rendered in a dialog) for creating or editing menu items, and `DeleteMenuItemDialog` for confirming deletions. It uses the `useMenu` hook to interact with the backend menu-management API. The page will fetch all menu items and categories on load.

### MenuTable.tsx
This component displays a paginated and sortable table of `MenuItemDto` objects. Each row includes actions to edit or delete a menu item. It receives `menuItems: MenuItemDto[]`, `onEdit: (item: MenuItemDto) => void`, `onDelete: (id: UUID) => void` as props. Prices are displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### MenuItemForm.tsx
This component is a form for creating or updating a `MenuItemDto`. It takes `initialData: MenuItemDto | null`, `onSave: (item: MenuItemDto) => void`, `onCancel: () => void`, and `isLoading: boolean` as props. It includes fields for `name`, `description`, `price`, `imageUrl`, `vegetarian`, and `categoryId`. It will fetch available categories using `useMenu.useMenuCategories()` to populate a dropdown. Price input should handle `BigDecimal` values correctly.

### DeleteMenuItemDialog.tsx
This component is a confirmation dialog for deleting a menu item. It takes `isOpen: boolean`, `onClose: () => void`, `onConfirm: (id: UUID) => void`, `itemToDelete: MenuItemDto | null`, and `isLoading: boolean` as props. It displays the name of the item to be deleted for confirmation.

### AdminReservationsPage.tsx
This page enables administrators to view and manage customer reservations. It uses `ReservationsTable` to list reservations and `UpdateReservationDialog` (rendered in a dialog) to change reservation statuses. It interacts with the backend reservation-system API via the `useReservations` hook. The page will fetch all reservations on load.

### ReservationsTable.tsx
This component displays a table of `ReservationResponse` objects, allowing filtering and sorting. Each row includes an option to update the reservation status. It receives `reservations: ReservationResponse[]`, `onUpdateStatus: (id: UUID, status: ReservationStatus) => void` as props. Reservation times are displayed in a user-friendly format.

### UpdateReservationDialog.tsx
This dialog allows administrators to update the status of a reservation. It takes `isOpen: boolean`, `onClose: () => void`, `onConfirm: (id: UUID, status: ReservationStatus) => void`, `reservationToUpdate: ReservationResponse | null`, and `isLoading: boolean` as props. It provides a dropdown to select a new `ReservationStatus` (PENDING, CONFIRMED, CANCELLED, COMPLETED).

### AdminOrdersPage.tsx
This page is for managing customer food orders. It uses `OrdersTable` to display orders and `OrderDetailsModal` to show detailed order information and allow status updates. It uses the `useOrders` hook to interact with the backend order-management API. The page will fetch all orders on load.

### OrdersTable.tsx
This component displays a table of `OrderResponse` objects, with filtering and sorting capabilities. Each row includes an option to view order details and update its status. It receives `orders: OrderResponse[]`, `onViewDetails: (order: OrderResponse) => void`, `onUpdateStatus: (id: UUID, status: OrderStatus) => void` as props. Total amounts are displayed in Indian Rupees (₹).

### OrderDetailsModal.tsx
This modal displays the detailed contents of an `OrderResponse`, including order items, total amount, delivery address, and contact phone. It also allows updating the order status. It takes `isOpen: boolean`, `onClose: () => void`, `order: OrderResponse | null`, `onUpdateStatus: (id: UUID, status: OrderStatus) => void`, and `isLoading: boolean` as props. Total amounts and item prices are displayed in Indian Rupees (₹).

### AdminInquiriesPage.tsx
This page allows administrators to view and manage catering and event inquiries. It uses `InquiriesTable` to list inquiries and interacts with the backend inquiry-management API via the `useInquiries` hook. The page will fetch all inquiries on load.

### InquiriesTable.tsx
This component displays a table of `EventInquiryResponse` objects, including customer details, event type, date, and status. It receives `inquiries: EventInquiryResponse[]` as props. Each row should allow viewing details and updating the inquiry status.

### AdminGalleryPage.tsx
This page is for managing the restaurant's photo gallery. It uses `GalleryGrid` to display existing images and `UploadImageForm` to add new ones. It interacts with the backend gallery-management API via the `useGallery` hook. The page will fetch all gallery images on load.

### GalleryGrid.tsx
This component displays a grid of `GalleryImageDto` objects. Each image includes an option to delete it. It receives `images: GalleryImageDto[]`, `onDelete: (id: UUID) => void` as props.

### UploadImageForm.tsx
This component is a form for uploading new images to the gallery. It takes `onUpload: (file: File, caption: string) => void` and `isLoading: boolean` as props. It includes a file input and a text input for the image caption.

---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Files in this feature:**
- `.github/workflows/ci.yml`

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

