# Feature Enrichment — Attempt 1

Generated: 2026-08-09

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend Utilities

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/exception/GlobalExceptionHandler.java` — Centralized exception handler for the backend application, catching specific exceptions and returning standardized `ErrorResponse` DTOs.
- `backend/src/main/java/com/farmaaishrestaurant/exception/ResourceNotFoundException.java` — Custom unchecked exception indicating that a requested resource could not be found.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ErrorResponse.java` — Data Transfer Object (DTO) for providing a consistent structure for error messages returned by the API.
- `backend/src/main/java/com/farmaaishrestaurant/config/DataSeeder.java` — Configuration component that populates the database with initial data on application startup, primarily for menu categories and items.

**Feature Instruction:**

This feature provides essential backend utilities that are shared across various other features, including global exception handling, a custom resource not found exception, a standardized error response DTO, and initial data seeding. The `GlobalExceptionHandler` intercepts exceptions thrown by controllers and services, mapping them to a consistent `ErrorResponse` format with appropriate HTTP status codes. Specifically, `ResourceNotFoundException` is caught and translated into a 404 Not Found response. The `ResourceNotFoundException` itself is a custom unchecked exception that can be thrown by any service when a requested entity is not found in the database. The `ErrorResponse` DTO defines the structure for these error messages, including a timestamp, status, error message, and path. Finally, the `DataSeeder` component is responsible for populating the database with initial data on application startup. It injects `MenuItemRepository` and `MenuCategoryRepository` (from the `menu-management` feature) to create default menu categories and items, ensuring the application has essential data for immediate use. This seeding process is crucial for a functional initial deployment.

---

## Menu Management

**Name:** `menu-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItem.java` — JPA Entity — represents a single dish or beverage on the restaurant's menu, with fields for name, description, price, image, and dietary information.
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuCategory.java` — JPA Entity — represents a category of menu items, such as 'Appetizers' or 'Main Course', and manages its associated menu items.
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemRepository.java` — Spring Data JPA repository — provides CRUD operations for MenuItem entities and custom queries to find items by category.
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuCategoryRepository.java` — Spring Data JPA repository — provides CRUD operations for MenuCategory entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/MenuService.java` — SERVICE layer — implements business logic for managing menu items and categories, including create, read, update, and delete operations.
- `backend/src/main/java/com/farmaaishrestaurant/controller/MenuController.java` — REST Controller — exposes public API endpoints for fetching menu categories and items for display on the storefront.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminMenuController.java` — REST Controller — exposes admin-only API endpoints for full CRUD operations on menu items and categories.
- `backend/src/main/java/com/farmaaishrestaurant/dto/MenuItemDto.java` — Data Transfer Object — used for representing MenuItem entities in API requests and responses, including validation rules.
- `backend/src/main/java/com/farmaaishrestaurant/dto/MenuCategoryDto.java` — Data Transfer Object — used for representing MenuCategory entities in API requests and responses, including a list of associated menu items.

**Feature Instruction:**

The Menu Management feature provides a comprehensive backend system for managing the restaurant's menu items and categories. It includes models for `MenuItem` and `MenuCategory`, repositories for persistence, a service layer for business logic, and two controllers: `MenuController` for public access to menu data and `AdminMenuController` for administrative CRUD operations. This feature is designed to be consumed by both public-facing storefronts (e.g., `menu-display` feature) and internal admin tools (e.g., `admin-portal` feature).

## Data Models

**MenuItem.java** represents a single dish or beverage. It includes fields for `id`, `name`, `description`, `price`, `imageUrl`, `isVegetarian`, `isAvailable`, and a many-to-one relationship with `MenuCategory`.

**MenuCategory.java** represents a category of menu items. It includes fields for `id`, `name`, and a one-to-many relationship with `MenuItem`.

## Persistence Layer

**MenuItemRepository.java** extends `JpaRepository` for `MenuItem` entities, providing standard CRUD operations and custom queries to find items by category.

**MenuCategoryRepository.java** extends `JpaRepository` for `MenuCategory` entities, providing standard CRUD operations.

## Service Layer

**MenuService.java** orchestrates interactions between controllers and repositories. It defines methods for:

1.  `getAllMenuCategories()`: Retrieves all menu categories, each including its associated menu items.
    -   Returns: `List<MenuCategoryDto>`
    -   Logic: Fetches all `MenuCategory` entities, then for each category, fetches its associated `MenuItem` entities. Maps these to `MenuCategoryDto` and `MenuItemDto` respectively.

2.  `getMenuCategoryById(UUID categoryId)`: Retrieves a single menu category by its ID, including its associated menu items.
    -   Parameters: `UUID categoryId`
    -   Returns: `MenuCategoryDto`
    -   Throws: `ResourceNotFoundException` if the category is not found.
    -   Logic: Fetches the `MenuCategory` by ID. If found, fetches its associated `MenuItem` entities and maps them to `MenuCategoryDto` and `MenuItemDto`.

3.  `getAllMenuItems()`: Retrieves all menu items.
    -   Returns: `List<MenuItemDto>`
    -   Logic: Fetches all `MenuItem` entities and maps them to `MenuItemDto`.

4.  `getMenuItemById(UUID itemId)`: Retrieves a single menu item by its ID.
    -   Parameters: `UUID itemId`
    -   Returns: `MenuItemDto`
    -   Throws: `ResourceNotFoundException` if the item is not found.
    -   Logic: Fetches the `MenuItem` by ID and maps it to `MenuItemDto`.

5.  `createMenuCategory(MenuCategoryDto categoryDto)`: Creates a new menu category.
    -   Parameters: `MenuCategoryDto categoryDto`
    -   Returns: `MenuCategoryDto`
    -   Logic: Maps the DTO to a `MenuCategory` entity, saves it via `MenuCategoryRepository`, and maps the saved entity back to a `MenuCategoryDto`.

6.  `updateMenuCategory(UUID categoryId, MenuCategoryDto categoryDto)`: Updates an existing menu category.
    -   Parameters: `UUID categoryId`, `MenuCategoryDto categoryDto`
    -   Returns: `MenuCategoryDto`
    -   Throws: `ResourceNotFoundException` if the category is not found.
    -   Logic: Fetches the existing `MenuCategory` by ID. Updates its fields from the DTO, saves it via `MenuCategoryRepository`, and maps the saved entity back to a `MenuCategoryDto`.

7.  `deleteMenuCategory(UUID categoryId)`: Deletes a menu category by its ID.
    -   Parameters: `UUID categoryId`
    -   Throws: `ResourceNotFoundException` if the category is not found.
    -   Logic: Fetches the `MenuCategory` by ID. If found, deletes it via `MenuCategoryRepository`.

8.  `createMenuItem(MenuItemDto menuItemDto)`: Creates a new menu item.
    -   Parameters: `MenuItemDto menuItemDto`
    -   Returns: `MenuItemDto`
    -   Throws: `ResourceNotFoundException` if the category specified in `menuItemDto` is not found.
    -   Logic: Fetches the `MenuCategory` by the `categoryId` in the DTO. Maps the DTO to a `MenuItem` entity, sets its category, saves it via `MenuItemRepository`, and maps the saved entity back to a `MenuItemDto`.

9.  `updateMenuItem(UUID itemId, MenuItemDto menuItemDto)`: Updates an existing menu item.
    -   Parameters: `UUID itemId`, `MenuItemDto menuItemDto`
    -   Returns: `MenuItemDto`
    -   Throws: `ResourceNotFoundException` if the item or its specified category is not found.
    -   Logic: Fetches the existing `MenuItem` by ID. Fetches the `MenuCategory` by the `categoryId` in the DTO. Updates the item's fields and category, saves it via `MenuItemRepository`, and maps the saved entity back to a `MenuItemDto`.

10. `deleteMenuItem(UUID itemId)`: Deletes a menu item by its ID.
    -   Parameters: `UUID itemId`
    -   Throws: `ResourceNotFoundException` if the item is not found.
    -   Logic: Fetches the `MenuItem` by ID. If found, deletes it via `MenuItemRepository`.

## Controllers

**MenuController.java** exposes public API endpoints for fetching menu categories and items. All endpoints return `MenuCategoryDto` or `MenuItemDto`.

**AdminMenuController.java** exposes admin-only API endpoints for full CRUD operations on menu categories and items. These endpoints require authentication and authorization (admin role). All endpoints consume and produce `MenuCategoryDto` or `MenuItemDto`.

## DTOs

**MenuItemDto.java** is used for transferring menu item data between the service layer and controllers. It includes fields mirroring `MenuItem.java` but with appropriate validation annotations.

**MenuCategoryDto.java** is used for transferring menu category data. It includes fields mirroring `MenuCategory.java` and a `List<MenuItemDto>` to represent the items within that category.


---

## Reservation System

**Name:** `reservation-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Reservation.java` — JPA Entity layer — represents a customer's table reservation with fields for customer details, date, time, and status.
- `backend/src/main/java/com/farmaaishrestaurant/model/ReservationStatus.java` — Enum defining the possible statuses of a reservation.
- `backend/src/main/java/com/farmaaishrestaurant/repository/ReservationRepository.java` — REPOSITORY layer — provides CRUD operations and custom queries for Reservation entities, including findByReservationDate, findByStatus, and findByCustomerEmail.
- `backend/src/main/java/com/farmaaishrestaurant/service/ReservationService.java` — SERVICE layer — implements createReservation(CreateReservationRequest): ReservationDto, getReservationById(UUID): ReservationDto, getAllReservations(): List<ReservationDto>, getReservationsByDate(LocalDate): List<ReservationDto>, updateReservationStatus(UUID, ReservationStatus): ReservationDto, and deleteReservation(UUID): void.
- `backend/src/main/java/com/farmaaishrestaurant/controller/ReservationController.java` — CONTROLLER layer — exposes public API endpoint for creating new table reservations.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminReservationController.java` — CONTROLLER layer — exposes admin-only API endpoints for viewing and managing all reservations.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ReservationDto.java` — DTO layer — represents Reservation entities in API responses.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateReservationRequest.java` — DTO layer — captures the details of a new reservation request from a customer.

**Feature Instruction:**

The Reservation System feature provides a complete backend solution for managing customer table reservations for Farmaaish Restaurant. It includes models for `Reservation` and `ReservationStatus`, a Spring Data JPA repository for persistence, a service layer for business logic, and two controllers: one for public reservation creation and another for admin-level management. This feature integrates with the `shared-backend` for exception handling.

## Data Models

### Reservation.java
This JPA entity represents a single table reservation. It includes fields for `id` (UUID), `customerName` (String), `customerEmail` (String), `customerPhone` (String), `numberOfGuests` (int), `reservationDate` (LocalDate), `reservationTime` (LocalTime), `specialRequests` (String, nullable), `status` (ReservationStatus enum), `createdAt` (LocalDateTime), and `updatedAt` (LocalDateTime). The `status` field will default to `PENDING` upon creation. It will have a many-to-one relationship with a `User` entity (from an external feature, if available, otherwise it will be a simple String for now).

### ReservationStatus.java
This enum defines the possible states a reservation can be in: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`, `NO_SHOW`.

## Repository Layer

### ReservationRepository.java
This interface extends `JpaRepository<Reservation, UUID>` and provides standard CRUD operations. It will also include custom query methods to find reservations by `reservationDate`, by `status`, and by `customerEmail`.

## Service Layer

### ReservationService.java
This service class encapsulates the business logic for reservations. It injects `ReservationRepository`.

**Public Functions:**

1.  `createReservation(CreateReservationRequest request): ReservationDto`
    *   **Logic:**
        1.  Validate the `CreateReservationRequest` fields (e.g., `numberOfGuests` > 0, `reservationDate` is in the future, `reservationTime` is within operating hours). Throw `IllegalArgumentException` if validation fails.
        2.  Create a new `Reservation` entity from the request, setting `status` to `PENDING`, `createdAt` and `updatedAt` to `LocalDateTime.now()`.
        3.  Save the `Reservation` entity using `reservationRepository.save()`.
        4.  Convert the saved `Reservation` entity to a `ReservationDto` and return it.
    *   **Error Cases:** Throws `IllegalArgumentException` (HTTP 400) for invalid input.

2.  `getReservationById(UUID id): ReservationDto`
    *   **Logic:**
        1.  Retrieve the `Reservation` by `id` using `reservationRepository.findById()`. 
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Convert the `Reservation` entity to a `ReservationDto` and return it.
    *   **Error Cases:** Throws `ResourceNotFoundException` (HTTP 404) if the reservation does not exist.

3.  `getAllReservations(): List<ReservationDto>`
    *   **Logic:**
        1.  Retrieve all `Reservation` entities using `reservationRepository.findAll()`.
        2.  Convert the list of `Reservation` entities to a list of `ReservationDto` and return it.

4.  `getReservationsByDate(LocalDate date): List<ReservationDto>`
    *   **Logic:**
        1.  Retrieve `Reservation` entities by `date` using `reservationRepository.findByReservationDate()`.
        2.  Convert the list of `Reservation` entities to a list of `ReservationDto` and return it.

5.  `updateReservationStatus(UUID id, ReservationStatus status): ReservationDto`
    *   **Logic:**
        1.  Retrieve the `Reservation` by `id` using `reservationRepository.findById()`. 
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Update the `status` and `updatedAt` fields of the `Reservation` entity.
        4.  Save the updated `Reservation` entity using `reservationRepository.save()`.
        5.  Convert the updated `Reservation` entity to a `ReservationDto` and return it.
    *   **Error Cases:** Throws `ResourceNotFoundException` (HTTP 404) if the reservation does not exist.

6.  `deleteReservation(UUID id): void`
    *   **Logic:**
        1.  Check if the `Reservation` exists by `id` using `reservationRepository.existsById()`. 
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Delete the `Reservation` entity using `reservationRepository.deleteById()`.
    *   **Error Cases:** Throws `ResourceNotFoundException` (HTTP 404) if the reservation does not exist.

## Controller Layer

### ReservationController.java
This controller handles public-facing API endpoints for creating reservations.

**Public Functions:**

1.  `createReservation(@RequestBody CreateReservationRequest request): ResponseEntity<ReservationDto>`
    *   **Logic:** Calls `reservationService.createReservation(request)` and returns `HttpStatus.CREATED` with the `ReservationDto`.
    *   **Error Cases:** Returns `HttpStatus.BAD_REQUEST` (400) if `IllegalArgumentException` is thrown by the service. Returns `HttpStatus.INTERNAL_SERVER_ERROR` (500) for other exceptions.

### AdminReservationController.java
This controller handles admin-only API endpoints for viewing and managing all reservations.

**Public Functions:**

1.  `getAllReservations(): ResponseEntity<List<ReservationDto>>`
    *   **Logic:** Calls `reservationService.getAllReservations()` and returns `HttpStatus.OK` with the list of `ReservationDto`.

2.  `getReservationById(@PathVariable UUID id): ResponseEntity<ReservationDto>`
    *   **Logic:** Calls `reservationService.getReservationById(id)` and returns `HttpStatus.OK` with the `ReservationDto`.
    *   **Error Cases:** Returns `HttpStatus.NOT_FOUND` (404) if `ResourceNotFoundException` is thrown by the service.

3.  `getReservationsByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date): ResponseEntity<List<ReservationDto>>`
    *   **Logic:** Calls `reservationService.getReservationsByDate(date)` and returns `HttpStatus.OK` with the list of `ReservationDto`.

4.  `updateReservationStatus(@PathVariable UUID id, @RequestParam ReservationStatus status): ResponseEntity<ReservationDto>`
    *   **Logic:** Calls `reservationService.updateReservationStatus(id, status)` and returns `HttpStatus.OK` with the updated `ReservationDto`.
    *   **Error Cases:** Returns `HttpStatus.NOT_FOUND` (404) if `ResourceNotFoundException` is thrown by the service.

5.  `deleteReservation(@PathVariable UUID id): ResponseEntity<Void>`
    *   **Logic:** Calls `reservationService.deleteReservation(id)` and returns `HttpStatus.NO_CONTENT`.
    *   **Error Cases:** Returns `HttpStatus.NOT_FOUND` (404) if `ResourceNotFoundException` is thrown by the service.

## Data Transfer Objects (DTOs)

### ReservationDto.java
This DTO represents the `Reservation` entity for API responses, containing fields: `id` (UUID), `customerName` (String), `customerEmail` (String), `customerPhone` (String), `numberOfGuests` (int), `reservationDate` (LocalDate), `reservationTime` (LocalTime), `specialRequests` (String), `status` (ReservationStatus), `createdAt` (LocalDateTime), `updatedAt` (LocalDateTime).

### CreateReservationRequest.java
This DTO is used for incoming reservation requests, containing fields: `customerName` (String), `customerEmail` (String), `customerPhone` (String), `numberOfGuests` (int), `reservationDate` (LocalDate), `reservationTime` (LocalTime), `specialRequests` (String, nullable). All fields except `specialRequests` are mandatory and will have appropriate Bean Validation annotations.

---

## Order Management

**Name:** `order-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Order.java` — MODEL layer — represents a customer's online food order, linking to user, order items, and payment details.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderItem.java` — MODEL layer — represents a single item within a customer's order, linking to the menu item.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderStatus.java` — MODEL layer — enum defining the possible statuses of an order.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderRepository.java` — REPOSITORY layer — provides CRUD operations for Order entities and custom queries for fetching orders by user ID.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderItemRepository.java` — REPOSITORY layer — provides CRUD operations for OrderItem entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/OrderService.java` — SERVICE layer — implements createOrder(CreateOrderRequest): OrderDto, getOrderById(UUID): OrderDto, getOrdersByUserId(Integer): List<OrderDto>, getAllOrders(): List<OrderDto>, and updateOrderStatus(UUID, OrderStatus): OrderDto; delegates payment to PaymentService and persistence to OrderRepository and OrderItemRepository.
- `backend/src/main/java/com/farmaaishrestaurant/controller/OrderController.java` — CONTROLLER layer — exposes REST endpoints for customers to create and retrieve their own orders.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminOrderController.java` — CONTROLLER layer — exposes REST endpoints for administrators to view and manage all online orders.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderDto.java` — DTO layer — Data Transfer Object for representing Order entities in API responses, including nested OrderItemDto.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateOrderRequest.java` — DTO layer — DTO for capturing the details of a new online order from a customer, including a list of order items.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderItemRequest.java` — DTO layer — DTO representing a single item within a CreateOrderRequest, specifying the menu item and quantity.

**Feature Instruction:**

The Order Management feature handles the complete lifecycle of a customer's online food order, from creation and payment initiation to status updates and retrieval by both customers and administrators. It integrates with the PaymentService for secure payment processing and relies on the Menu-Management feature to validate menu items.

## Order Creation Flow
1.  **`OrderController.createOrder(CreateOrderRequest request)`**:
    *   Receives a `CreateOrderRequest` from the client, containing `userId` and a list of `OrderItemRequest` objects.
    *   Calls `OrderService.createOrder(CreateOrderRequest request)` to process the order.
    *   Returns a `ResponseEntity` containing the `OrderDto` of the newly created order with an HTTP 201 status.
2.  **`OrderService.createOrder(CreateOrderRequest request)`**:
    *   Validates that the `userId` exists (e.g., by calling a user service, though not explicitly defined here, assume it's available or handled by authentication context).
    *   For each `OrderItemRequest` in the `CreateOrderRequest`:
        *   Retrieves the `MenuItem` from `MenuItemRepository` using `menuItemId`. If not found, throws `ResourceNotFoundException`.
        *   Calculates the `subTotal` for the order item (`menuItem.getPrice().multiply(itemRequest.getQuantity())`).
    *   Calculates the `totalAmount` for the entire order by summing up all `subTotal` values.
    *   Creates a new `Order` entity with `userId`, `totalAmount`, `OrderStatus.PENDING_PAYMENT`, and the current timestamp.
    *   Saves the `Order` entity using `OrderRepository.save(order)`.
    *   For each `OrderItemRequest`:
        *   Creates an `OrderItem` entity, linking it to the `Order` and `MenuItem`, storing `quantity` and `subTotal`.
        *   Saves the `OrderItem` entity using `OrderItemRepository.save(orderItem)`.
    *   Calls `PaymentService.createOrder(new CreatePaymentRequest(totalAmount, "INR", "order_" + order.getId()))` to initiate a payment gateway order. The `referenceId` for the payment should be `"order_" + order.getId()`.
    *   Updates the `Order` entity with the `gatewayOrderId` received from `PaymentService` and saves it.
    *   Returns the created `Order` mapped to an `OrderDto`.

## Order Retrieval Flow (Customer)
1.  **`OrderController.getOrdersByUserId(UUID userId)`**:
    *   Receives a `userId` from the authenticated context (not from path variable for security).
    *   Calls `OrderService.getOrdersByUserId(UUID userId)`.
    *   Returns a `ResponseEntity` containing a `List<OrderDto>` of orders for the specified user with an HTTP 200 status.
2.  **`OrderController.getOrderById(UUID orderId)`**:
    *   Receives an `orderId` and verifies that the `userId` from the authenticated context matches the order's `userId`.
    *   Calls `OrderService.getOrderById(UUID orderId)`.
    *   Returns a `ResponseEntity` containing the `OrderDto` with an HTTP 200 status. Throws `ResourceNotFoundException` if the order is not found or does not belong to the user.
3.  **`OrderService.getOrdersByUserId(UUID userId)`**:
    *   Retrieves all `Order` entities for the given `userId` from `OrderRepository.findByUserId(userId)`.
    *   Maps the `List<Order>` to `List<OrderDto>`.
    *   Returns the `List<OrderDto>`.
4.  **`OrderService.getOrderById(UUID orderId)`**:
    *   Retrieves the `Order` entity by `orderId` from `OrderRepository.findById(orderId)`. If not found, throws `ResourceNotFoundException`.
    *   Maps the `Order` to an `OrderDto`.
    *   Returns the `OrderDto`.

## Order Retrieval and Management Flow (Admin)
1.  **`AdminOrderController.getAllOrders()`**:
    *   Calls `OrderService.getAllOrders()`.
    *   Returns a `ResponseEntity` containing a `List<OrderDto>` of all orders with an HTTP 200 status.
2.  **`AdminOrderController.getOrderById(UUID orderId)`**:
    *   Calls `OrderService.getOrderById(UUID orderId)`.
    *   Returns a `ResponseEntity` containing the `OrderDto` with an HTTP 200 status. Throws `ResourceNotFoundException` if not found.
3.  **`AdminOrderController.updateOrderStatus(UUID orderId, OrderStatus status)`**:
    *   Receives an `orderId` and a new `OrderStatus`.
    *   Calls `OrderService.updateOrderStatus(UUID orderId, OrderStatus status)`.
    *   Returns a `ResponseEntity` containing the updated `OrderDto` with an HTTP 200 status. Throws `ResourceNotFoundException` if not found.
4.  **`OrderService.getAllOrders()`**:
    *   Retrieves all `Order` entities from `OrderRepository.findAll()`.
    *   Maps the `List<Order>` to `List<OrderDto>`.
    *   Returns the `List<OrderDto>`.
5.  **`OrderService.updateOrderStatus(UUID orderId, OrderStatus status)`**:
    *   Retrieves the `Order` entity by `orderId` from `OrderRepository.findById(orderId)`. If not found, throws `ResourceNotFoundException`.
    *   Updates the `status` of the `Order` entity.
    *   Saves the updated `Order` entity using `OrderRepository.save(order)`.
    *   Returns the updated `Order` mapped to an `OrderDto`.

## Payment Verification
*   The `PaymentService` publishes a `PaymentCapturedEvent` upon successful payment. The `OrderService` should listen for this event using `@EventListener`.
*   **`OrderService.handlePaymentCapturedEvent(PaymentCapturedEvent event)`**:
    *   Receives a `PaymentCapturedEvent`.
    *   Extracts the `referenceId` from the event, which is expected to be in the format `"order_" + orderId`.
    *   Parses the `orderId` from the `referenceId`.
    *   Retrieves the `Order` entity using `OrderRepository.findById(orderId)`. If not found, log an error.
    *   If the order exists and its status is `PENDING_PAYMENT`, update the `Order` status to `RECEIVED` and save it.

## Error Handling
*   `ResourceNotFoundException` should be thrown when an `Order` or `MenuItem` is not found. This should be handled by a global exception handler (e.g., `GlobalExceptionHandler` from `shared-backend`) returning an HTTP 404.
*   `IllegalArgumentException` should be thrown for invalid input, returning an HTTP 400.

## Data Mapping
*   `Order` entities are mapped to `OrderDto` for API responses. This includes mapping `OrderItem` entities to `OrderItemDto` within the `OrderDto`.
*   `CreateOrderRequest` and `OrderItemRequest` are used for incoming requests.

---

## Inquiry Management

**Name:** `inquiry-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/CateringInquiry.java` — MODEL layer — represents a customer inquiry for catering or private events, storing all relevant details and its current status.
- `backend/src/main/java/com/farmaaishrestaurant/model/InquiryStatus.java` — MODEL layer — an enum defining the possible states for a catering inquiry.
- `backend/src/main/java/com/farmaaishrestaurant/repository/CateringInquiryRepository.java` — REPOSITORY layer — provides data access operations for `CateringInquiry` entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/CateringInquiryService.java` — SERVICE layer — implements `createInquiry(CreateInquiryRequest): CateringInquiryDto`, `getAllInquiries(): List<CateringInquiryDto>`, `getInquiryById(UUID): CateringInquiryDto`, and `updateInquiryStatus(UUID, InquiryStatus): CateringInquiryDto`; delegates persistence to `CateringInquiryRepository`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/CateringInquiryController.java` — CONTROLLER layer — exposes a public API endpoint for customers to submit new catering inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminCateringInquiryController.java` — CONTROLLER layer — exposes admin-only API endpoints for viewing and managing catering inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CateringInquiryDto.java` — DTO layer — Data Transfer Object for representing `CateringInquiry` entities in API responses.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateInquiryRequest.java` — DTO layer — Data Transfer Object for capturing the details of a new catering inquiry from a customer.

**Feature Instruction:**

The Inquiry Management feature enables customers to submit catering or private event inquiries and provides an administrative interface for restaurant staff to manage these inquiries. It consists of backend models, a repository, a service layer, and two controllers: one public for submission and one admin-only for management.

## Data Models
`CateringInquiry.java` represents the core entity for a catering inquiry, storing details such as customer information, event specifics, and the inquiry's status. `InquiryStatus.java` is an enum defining the possible states of an inquiry (e.g., NEW, CONTACTED, CLOSED).

## Persistence
`CateringInquiryRepository.java` provides standard CRUD operations for `CateringInquiry` entities using Spring Data JPA. It will also include a custom query to retrieve inquiries by their status.

## Business Logic
`CateringInquiryService.java` encapsulates the business logic. It defines methods for creating new inquiries, retrieving all inquiries, getting a single inquiry by ID, and updating an inquiry's status. When a new inquiry is created, the service will save it to the database. For updating an inquiry, it will fetch the existing inquiry, apply the changes, and then save the updated entity. Error handling will involve throwing `ResourceNotFoundException` if an inquiry with the given ID is not found.

### `CateringInquiryService.java` Public Methods:
1. `createInquiry(CreateInquiryRequest request): CateringInquiryDto`
   - Logic:
     1. Map the `CreateInquiryRequest` DTO to a `CateringInquiry` entity.
     2. Set the initial `status` to `InquiryStatus.NEW`.
     3. Set `createdAt` and `updatedAt` timestamps.
     4. Save the new `CateringInquiry` entity using `cateringInquiryRepository.save()`.
     5. Map the saved entity back to a `CateringInquiryDto`.
     6. Return the `CateringInquiryDto`.
   - Error Cases: Throws `IllegalArgumentException` if required fields in `CreateInquiryRequest` are null or empty.

2. `getAllInquiries(): List<CateringInquiryDto>`
   - Logic:
     1. Retrieve all `CateringInquiry` entities from `cateringInquiryRepository.findAll()`.
     2. Map each entity to a `CateringInquiryDto`.
     3. Return the list of `CateringInquiryDto`.
   - Error Cases: None.

3. `getInquiryById(UUID id): CateringInquiryDto`
   - Logic:
     1. Retrieve the `CateringInquiry` entity by `id` using `cateringInquiryRepository.findById(id)`.
     2. If the inquiry is not found, throw `ResourceNotFoundException`.
     3. Map the found entity to a `CateringInquiryDto`.
     4. Return the `CateringInquiryDto`.
   - Error Cases: Throws `ResourceNotFoundException` (HTTP 404) if no inquiry with the given ID exists.

4. `updateInquiryStatus(UUID id, InquiryStatus status): CateringInquiryDto`
   - Logic:
     1. Retrieve the `CateringInquiry` entity by `id` using `cateringInquiryRepository.findById(id)`.
     2. If the inquiry is not found, throw `ResourceNotFoundException`.
     3. Update the `status` of the retrieved inquiry to the provided `status`.
     4. Set `updatedAt` timestamp.
     5. Save the updated `CateringInquiry` entity using `cateringInquiryRepository.save()`.
     6. Map the saved entity back to a `CateringInquiryDto`.
     7. Return the `CateringInquiryDto`.
   - Error Cases: Throws `ResourceNotFoundException` (HTTP 404) if no inquiry with the given ID exists.

## API Endpoints
`CateringInquiryController.java` exposes a public endpoint for customers to submit new catering inquiries. It injects `CateringInquiryService` and calls `createInquiry()`.

`AdminCateringInquiryController.java` provides administrative endpoints for viewing and managing inquiries. It injects `CateringInquiryService` and calls `getAllInquiries()`, `getInquiryById()`, and `updateInquiryStatus()`.

## Data Transfer Objects
`CreateInquiryRequest.java` is used for incoming requests to create a new inquiry, containing fields like `customerName`, `customerEmail`, `eventDate`, etc., with appropriate validation annotations.
`CateringInquiryDto.java` is used for outgoing responses, representing the full details of a catering inquiry, including its `id` and `status`.

---

## Blog Management

**Name:** `blog-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Post.java` — MODEL layer — defines the structure and persistence mapping for a blog post entity.
- `backend/src/main/java/com/farmaaishrestaurant/repository/PostRepository.java` — REPOSITORY layer — provides data access operations for the Post entity using Spring Data JPA.
- `backend/src/main/java/com/farmaaishrestaurant/service/PostService.java` — SERVICE layer — implements business logic for managing blog posts, including `getAllPosts(): List<PostDto>`, `getPostById(UUID id): PostDto`, `createPost(PostDto postDto): PostDto`, `updatePost(UUID id, PostDto postDto): PostDto`, and `deletePost(UUID id): void`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/PostController.java` — CONTROLLER layer — exposes public read-only REST API endpoints for fetching blog posts.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminPostController.java` — CONTROLLER layer — exposes admin-only REST API endpoints for CRUD operations on blog posts.
- `backend/src/main/java/com/farmaaishrestaurant/dto/PostDto.java` — DTO layer — defines the data transfer object for blog posts, used in API requests and responses.

**Feature Instruction:**

The Blog Management feature provides a complete backend solution for managing blog posts, including public-facing APIs for reading posts and admin-only APIs for full CRUD operations. It consists of a `Post` entity, a `PostRepository` for data access, a `PostService` for business logic, and two controllers: `PostController` for public access and `AdminPostController` for administrative tasks. A `PostDto` is used for data transfer between the service and controllers.

## Data Model
- **Post.java**: Represents a blog post with fields for `id` (UUID), `title` (String), `content` (String), `author` (String), `publishDate` (LocalDate), and `imageUrl` (String). The `content` field should support rich text, potentially stored as HTML or Markdown. `author` will be a simple string for now, but can be linked to a `User` entity in the future.

## Service Logic
- **PostService.java**: This service orchestrates the business logic for blog posts. It injects `PostRepository` to perform database operations.
  - `getAllPosts()`: Retrieves all blog posts, ordered by `publishDate` in descending order. Returns `List<PostDto>`.
  - `getPostById(UUID id)`: Retrieves a single blog post by its ID. Throws `ResourceNotFoundException` if the post does not exist. Returns `PostDto`.
  - `createPost(PostDto postDto)`: Creates a new blog post. The `id` and `publishDate` will be generated by the system. Returns the created `PostDto`.
  - `updatePost(UUID id, PostDto postDto)`: Updates an existing blog post. Throws `ResourceNotFoundException` if the post does not exist. Returns the updated `PostDto`.
  - `deletePost(UUID id)`: Deletes a blog post by its ID. Throws `ResourceNotFoundException` if the post does not exist.

## API Endpoints
- **PostController.java**: Exposes public read-only endpoints for blog posts.
  - `GET /api/v1/blog/posts`: Returns a list of all blog posts, ordered by `publishDate` descending. Maps to `postService.getAllPosts()`.
  - `GET /api/v1/blog/posts/{id}`: Returns a single blog post by ID. Maps to `postService.getPostById(id)`. Returns HTTP 404 if not found.

- **AdminPostController.java**: Exposes authenticated admin endpoints for CRUD operations on blog posts.
  - `GET /api/v1/admin/blog/posts`: Returns a list of all blog posts. Maps to `postService.getAllPosts()`.
  - `GET /api/v1/admin/blog/posts/{id}`: Returns a single blog post by ID. Maps to `postService.getPostById(id)`. Returns HTTP 404 if not found.
  - `POST /api/v1/admin/blog/posts`: Creates a new blog post. Request body is `PostDto`. Maps to `postService.createPost(postDto)`.
  - `PUT /api/v1/admin/blog/posts/{id}`: Updates an existing blog post. Request body is `PostDto`. Maps to `postService.updatePost(id, postDto)`. Returns HTTP 404 if not found.
  - `DELETE /api/v1/admin/blog/posts/{id}`: Deletes a blog post. Maps to `postService.deletePost(id)`. Returns HTTP 404 if not found.

## Inter-file Wiring
- `PostController` and `AdminPostController` inject `PostService`.
- `PostService` injects `PostRepository`.
- `PostService` throws `ResourceNotFoundException` (from `shared-backend` feature) when a post is not found, which is handled by a global exception handler.

---

## Gallery Management

**Name:** `gallery-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/GalleryImage.java` — JPA Entity — represents an image in the restaurant's photo gallery.
- `backend/src/main/java/com/farmaaishrestaurant/repository/GalleryImageRepository.java` — Spring Data JPA Repository — provides CRUD operations for GalleryImage entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/GalleryImageService.java` — SERVICE layer — implements uploadImage(MultipartFile file, String caption): GalleryImageDto, getAllGalleryImages(): List<GalleryImageDto>, getGalleryImageById(UUID id): GalleryImageDto, and deleteGalleryImage(UUID id): void; delegates persistence to GalleryImageRepository.
- `backend/src/main/java/com/farmaaishrestaurant/controller/GalleryController.java` — Public-facing REST controller — exposes getAllGalleryImages(): ResponseEntity<List<GalleryImageDto>>.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminGalleryController.java` — Admin-only REST controller — exposes uploadGalleryImage(MultipartFile file, String caption): ResponseEntity<GalleryImageDto> and deleteGalleryImage(UUID id): ResponseEntity<Void>.
- `backend/src/main/java/com/farmaaishrestaurant/dto/GalleryImageDto.java` — Data Transfer Object — represents GalleryImage entities in API responses.

**Feature Instruction:**

The Gallery Management feature provides a backend API for managing the restaurant's image gallery. It allows for public viewing of gallery images and authenticated administrative operations like uploading and deleting images. The feature consists of a `GalleryImage` JPA entity, a `GalleryImageRepository` for data access, a `GalleryImageService` for business logic and file storage, and two controllers: `GalleryController` for public access and `AdminGalleryController` for administrative tasks. A `GalleryImageDto` is used for API responses.

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8902e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

### GalleryImage.java
This JPA entity represents an image in the restaurant's gallery. It will have fields for `id` (UUID, primary key), `imageUrl` (String, URL to the stored image), `caption` (String, optional description), and `uploadDate` (LocalDateTime).

### GalleryImageRepository.java
This Spring Data JPA repository extends `JpaRepository<GalleryImage, UUID>` and provides standard CRUD operations for `GalleryImage` entities. No custom query methods are required.

### GalleryImageService.java
This service handles the core business logic for gallery images. It will be responsible for:
1.  **uploadImage(MultipartFile file, String caption): GalleryImageDto**
    -   Generates a unique filename for the uploaded image.
    -   Stores the `MultipartFile` in a designated directory on the server (e.g., `uploads/gallery/`).
    -   Creates a `GalleryImage` entity with the generated URL, caption, and current date.
    -   Saves the `GalleryImage` entity using `GalleryImageRepository`.
    -   Returns the saved `GalleryImage` mapped to `GalleryImageDto`.
    -   Error cases: Throws `IOException` if file storage fails.
2.  **getAllGalleryImages(): List<GalleryImageDto>**
    -   Fetches all `GalleryImage` entities from the repository, ordered by `uploadDate` descending.
    -   Maps the entities to `GalleryImageDto` and returns the list.
3.  **getGalleryImageById(UUID id): GalleryImageDto**
    -   Fetches a `GalleryImage` by its `id` from the repository.
    -   Throws `ResourceNotFoundException` if the image is not found.
    -   Maps the entity to `GalleryImageDto` and returns it.
4.  **deleteGalleryImage(UUID id): void**
    -   Fetches the `GalleryImage` by its `id`.
    -   Throws `ResourceNotFoundException` if the image is not found.
    -   Deletes the physical file from the server using the `imageUrl`.
    -   Deletes the `GalleryImage` entity from the repository.
    -   Error cases: Throws `IOException` if file deletion fails.

### GalleryImageDto.java
This DTO will represent a gallery image in API responses. It will contain `id` (UUID), `imageUrl` (String), `caption` (String), and `uploadDate` (LocalDateTime).

### GalleryController.java
This controller exposes public endpoints for retrieving gallery images.
1.  **getAllGalleryImages(): ResponseEntity<List<GalleryImageDto>>**
    -   Handles GET requests to `/api/v1/gallery`.
    -   Calls `galleryImageService.getAllGalleryImages()`.
    -   Returns a `200 OK` response with a list of `GalleryImageDto`.

### AdminGalleryController.java
This controller exposes admin-only endpoints for managing gallery images.
1.  **uploadGalleryImage(MultipartFile file, String caption): ResponseEntity<GalleryImageDto>**
    -   Handles POST requests to `/api/v1/admin/gallery`.
    -   Accepts a `MultipartFile` and a `caption` string.
    -   Calls `galleryImageService.uploadImage(file, caption)`.
    -   Returns a `201 Created` response with the newly uploaded `GalleryImageDto`.
    -   Error cases: Returns `500 Internal Server Error` if `IOException` occurs during file upload.
2.  **deleteGalleryImage(UUID id): ResponseEntity<Void>**
    -   Handles DELETE requests to `/api/v1/admin/gallery/{id}`.
    -   Calls `galleryImageService.deleteGalleryImage(id)`.
    -   Returns a `204 No Content` response upon successful deletion.
    -   Error cases: Returns `404 Not Found` if `ResourceNotFoundException` is thrown. Returns `500 Internal Server Error` if `IOException` occurs during file deletion.

---

## Review Management

**Name:** `review-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Review.java` — JPA Entity layer — defines the data structure for customer reviews in the database.
- `backend/src/main/java/com/farmaaishrestaurant/repository/ReviewRepository.java` — REPOSITORY layer — provides data access operations for Review entities, including a custom query for featured reviews.
- `backend/src/main/java/com/farmaaishrestaurant/service/ReviewService.java` — SERVICE layer — implements business logic for fetching, creating, updating, deleting, and syncing customer reviews. Exposes public methods: getFeaturedReviews(): List<ReviewDto>, getAllReviews(): List<ReviewDto>, getReviewById(UUID): ReviewDto, createReview(ReviewDto): ReviewDto, updateReview(UUID, ReviewDto): ReviewDto, deleteReview(UUID): void, syncReviewsFromGoogle(): void.
- `backend/src/main/java/com/farmaaishrestaurant/controller/ReviewController.java` — CONTROLLER layer — exposes public REST endpoints for fetching featured customer reviews. Exposes public method: getFeaturedReviews(): ResponseEntity<List<ReviewDto>>.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminReviewController.java` — CONTROLLER layer — exposes admin-only REST endpoints for managing reviews and triggering syncs. Exposes public methods: getAllReviews(): ResponseEntity<List<ReviewDto>>, getReviewById(UUID): ResponseEntity<ReviewDto>, createReview(ReviewDto): ResponseEntity<ReviewDto>, updateReview(UUID, ReviewDto): ResponseEntity<ReviewDto>, deleteReview(UUID): ResponseEntity<Void>, syncReviews(): ResponseEntity<String>.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ReviewDto.java` — Data Transfer Object layer — defines the structure for review data exchanged via API.

**Feature Instruction:**

The Review Management feature handles the storage, retrieval, and synchronization of customer reviews for Farmaaish Restaurant. It provides public-facing endpoints to display featured reviews on the storefront and admin-only endpoints for managing reviews and triggering sync operations with external platforms like Google Business Profile.

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

### Review.java
This JPA entity represents a customer review. It includes fields for `id` (UUID), `authorName` (String, not null), `rating` (Integer, 1-5), `comment` (String, nullable), `source` (String, e.g., "Google", not null), `externalId` (String, unique identifier from external source, nullable), `reviewDate` (LocalDate, not null), `createdAt` (LocalDateTime), and `updatedAt` (LocalDateTime).

### ReviewRepository.java
This repository extends `JpaRepository<Review, UUID>` and provides standard CRUD operations. It also includes a custom query method `findByIsFeatured(boolean isFeatured)` to retrieve reviews marked as featured.

### ReviewDto.java
This DTO mirrors the `Review` entity but is used for API communication. It includes `id`, `authorName`, `rating`, `comment`, `source`, `reviewDate`, and `isFeatured`.

### ReviewService.java
This service class orchestrates the business logic for reviews. It injects `ReviewRepository`.

- `public List<ReviewDto> getFeaturedReviews()`:
  1. Calls `reviewRepository.findByIsFeatured(true)` to fetch all featured reviews.
  2. Maps the `Review` entities to `ReviewDto`s.
  3. Returns the list of `ReviewDto`s.

- `public List<ReviewDto> getAllReviews()`:
  1. Calls `reviewRepository.findAll()` to fetch all reviews.
  2. Maps the `Review` entities to `ReviewDto`s.
  3. Returns the list of `ReviewDto`s.

- `public ReviewDto getReviewById(UUID id)`:
  1. Calls `reviewRepository.findById(id)`.
  2. If the review is not found, throws `ResourceNotFoundException`.
  3. Maps the `Review` entity to a `ReviewDto`.
  4. Returns the `ReviewDto`.

- `public ReviewDto createReview(ReviewDto reviewDto)`:
  1. Creates a new `Review` entity from the `reviewDto`.
  2. Sets `createdAt` and `updatedAt` timestamps.
  3. Saves the new `Review` entity using `reviewRepository.save()`.
  4. Maps the saved `Review` entity back to a `ReviewDto`.
  5. Returns the `ReviewDto`.

- `public ReviewDto updateReview(UUID id, ReviewDto reviewDto)`:
  1. Calls `reviewRepository.findById(id)`.
  2. If the review is not found, throws `ResourceNotFoundException`.
  3. Updates the existing `Review` entity with fields from `reviewDto` (authorName, rating, comment, source, reviewDate, isFeatured).
  4. Sets `updatedAt` timestamp.
  5. Saves the updated `Review` entity using `reviewRepository.save()`.
  6. Maps the saved `Review` entity back to a `ReviewDto`.
  7. Returns the `ReviewDto`.

- `public void deleteReview(UUID id)`:
  1. Calls `reviewRepository.findById(id)`.
  2. If the review is not found, throws `ResourceNotFoundException`.
  3. Deletes the `Review` entity using `reviewRepository.deleteById(id)`.

- `public void syncReviewsFromGoogle()`:
  1. This method will simulate syncing reviews from an external source. For now, it will log a message indicating a sync operation.
  2. In a real implementation, this would involve calling an external API (e.g., Google Business Profile API) to fetch new reviews and update existing ones in the database. It should handle potential duplicates based on `externalId`.

### ReviewController.java
This public-facing REST controller exposes endpoints for retrieving featured customer reviews. It injects `ReviewService`.

- `public ResponseEntity<List<ReviewDto>> getFeaturedReviews()`:
  1. Calls `reviewService.getFeaturedReviews()`.
  2. Returns a `ResponseEntity` with a list of `ReviewDto`s and HTTP status 200 OK.

### AdminReviewController.java
This admin-only REST controller provides endpoints for managing reviews and triggering syncs. It injects `ReviewService`.

- `public ResponseEntity<List<ReviewDto>> getAllReviews()`:
  1. Calls `reviewService.getAllReviews()`.
  2. Returns a `ResponseEntity` with a list of `ReviewDto`s and HTTP status 200 OK.

- `public ResponseEntity<ReviewDto> getReviewById(UUID id)`:
  1. Calls `reviewService.getReviewById(id)`.
  2. Returns a `ResponseEntity` with the `ReviewDto` and HTTP status 200 OK.
  3. Throws `ResourceNotFoundException` if the review is not found, which will be handled by `GlobalExceptionHandler` returning HTTP status 404 NOT FOUND.

- `public ResponseEntity<ReviewDto> createReview(ReviewDto reviewDto)`:
  1. Calls `reviewService.createReview(reviewDto)`.
  2. Returns a `ResponseEntity` with the created `ReviewDto` and HTTP status 201 CREATED.

- `public ResponseEntity<ReviewDto> updateReview(UUID id, ReviewDto reviewDto)`:
  1. Calls `reviewService.updateReview(id, reviewDto)`.
  2. Returns a `ResponseEntity` with the updated `ReviewDto` and HTTP status 200 OK.
  3. Throws `ResourceNotFoundException` if the review is not found, which will be handled by `GlobalExceptionHandler` returning HTTP status 404 NOT FOUND.

- `public ResponseEntity<Void> deleteReview(UUID id)`:
  1. Calls `reviewService.deleteReview(id)`.
  2. Returns a `ResponseEntity` with HTTP status 204 NO CONTENT.
  3. Throws `ResourceNotFoundException` if the review is not found, which will be handled by `GlobalExceptionHandler` returning HTTP status 404 NOT FOUND.

- `public ResponseEntity<String> syncReviews()`:
  1. Calls `reviewService.syncReviewsFromGoogle()`.
  2. Returns a `ResponseEntity` with a success message and HTTP status 200 OK.

---

## Offer Management

**Name:** `offer-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/SpecialOffer.java` — MODEL layer — defines the `SpecialOffer` entity with fields for promotions and discounts.
- `backend/src/main/java/com/farmaaishrestaurant/repository/SpecialOfferRepository.java` — REPOSITORY layer — provides data access operations for `SpecialOffer` entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/SpecialOfferService.java` — SERVICE layer — implements business logic for managing special offers, including CRUD operations and fetching active offers.
- `backend/src/main/java/com/farmaaishrestaurant/controller/SpecialOfferController.java` — CONTROLLER layer — exposes public REST endpoints for fetching active special offers.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminSpecialOfferController.java` — CONTROLLER layer — exposes admin-only REST endpoints for CRUD operations on special offers.
- `backend/src/main/java/com/farmaaishrestaurant/dto/SpecialOfferDto.java` — DTO layer — Data Transfer Object for representing `SpecialOffer` entities in API requests and responses.

**Feature Instruction:**

The Offer Management feature provides a robust system for Farmaaish Restaurant to create, manage, and display special offers and promotions. This includes a backend API for both public consumption (fetching active offers) and administrative control (CRUD operations on offers). The feature is comprised of a `SpecialOffer` JPA entity, a `SpecialOfferRepository` for data access, a `SpecialOfferService` for business logic, and two controllers: `SpecialOfferController` for public access and `AdminSpecialOfferController` for authenticated administrative operations. A `SpecialOfferDto` is used for data transfer between the service layer and the controllers.

### SpecialOffer.java
This is the JPA entity representing a special offer. It will have fields for `id` (UUID), `title` (String), `description` (String), `discountPercentage` (BigDecimal), `startDate` (LocalDate), `endDate` (LocalDate), `imageUrl` (String), and `isActive` (boolean). The `id` will be the primary key, and `title` will be a required field.

### SpecialOfferRepository.java
This Spring Data JPA repository extends `JpaRepository<SpecialOffer, UUID>`. It will provide standard CRUD operations. Additionally, it will include a custom query method `findByIsActiveTrueAndEndDateAfter(LocalDate date)` to retrieve all active offers that have not yet expired.

### SpecialOfferService.java
This service class encapsulates the business logic for special offers. It injects `SpecialOfferRepository`.

**public SpecialOfferDto createSpecialOffer(SpecialOfferDto offerDto)**
1. Validates the incoming `offerDto` (e.g., `title` is not null, `startDate` is before `endDate`).
2. Converts the `SpecialOfferDto` to a `SpecialOffer` entity.
3. Saves the `SpecialOffer` entity using `specialOfferRepository.save()`.
4. Converts the saved `SpecialOffer` entity back to a `SpecialOfferDto` and returns it.
5. Throws `IllegalArgumentException` if validation fails.

**public SpecialOfferDto getSpecialOfferById(UUID id)**
1. Retrieves a `SpecialOffer` entity by its `id` using `specialOfferRepository.findById()`.
2. If the offer is not found, throws `ResourceNotFoundException`.
3. Converts the `SpecialOffer` entity to a `SpecialOfferDto` and returns it.

**public List<SpecialOfferDto> getAllActiveSpecialOffers()**
1. Calls `specialOfferRepository.findByIsActiveTrueAndEndDateAfter(LocalDate.now())` to get all active and unexpired offers.
2. Converts the list of `SpecialOffer` entities to a list of `SpecialOfferDto`s and returns it.

**public List<SpecialOfferDto> getAllSpecialOffers()**
1. Retrieves all `SpecialOffer` entities using `specialOfferRepository.findAll()`.
2. Converts the list of `SpecialOffer` entities to a list of `SpecialOfferDto`s and returns it.

**public SpecialOfferDto updateSpecialOffer(UUID id, SpecialOfferDto offerDto)**
1. Retrieves the existing `SpecialOffer` entity by `id` using `specialOfferRepository.findById()`. If not found, throws `ResourceNotFoundException`.
2. Validates the incoming `offerDto`.
3. Updates the fields of the existing `SpecialOffer` entity with values from `offerDto`.
4. Saves the updated `SpecialOffer` entity using `specialOfferRepository.save()`.
5. Converts the updated `SpecialOffer` entity to a `SpecialOfferDto` and returns it.
6. Throws `IllegalArgumentException` if validation fails.

**public void deleteSpecialOffer(UUID id)**
1. Checks if the `SpecialOffer` with the given `id` exists using `specialOfferRepository.existsById()`. If not found, throws `ResourceNotFoundException`.
2. Deletes the `SpecialOffer` entity by `id` using `specialOfferRepository.deleteById()`.

### SpecialOfferController.java
This REST controller exposes public endpoints for fetching special offers. It injects `SpecialOfferService`.

**public ResponseEntity<List<SpecialOfferDto>> getAllActiveSpecialOffers()**
1. Calls `specialOfferService.getAllActiveSpecialOffers()`.
2. Returns the list of `SpecialOfferDto`s with HTTP status 200 OK.

### AdminSpecialOfferController.java
This REST controller exposes admin-only endpoints for managing special offers. It injects `SpecialOfferService`.

**public ResponseEntity<SpecialOfferDto> createSpecialOffer(@RequestBody SpecialOfferDto offerDto)**
1. Calls `specialOfferService.createSpecialOffer(offerDto)`.
2. Returns the created `SpecialOfferDto` with HTTP status 201 Created. Catches `IllegalArgumentException` and returns 400 Bad Request, and `ResourceNotFoundException` (if any internal lookup fails) returning 404 Not Found.

**public ResponseEntity<List<SpecialOfferDto>> getAllSpecialOffers()**
1. Calls `specialOfferService.getAllSpecialOffers()`.
2. Returns the list of `SpecialOfferDto`s with HTTP status 200 OK.

**public ResponseEntity<SpecialOfferDto> getSpecialOfferById(@PathVariable UUID id)**
1. Calls `specialOfferService.getSpecialOfferById(id)`.
2. Returns the `SpecialOfferDto` with HTTP status 200 OK. Catches `ResourceNotFoundException` and returns 404 Not Found.

**public ResponseEntity<SpecialOfferDto> updateSpecialOffer(@PathVariable UUID id, @RequestBody SpecialOfferDto offerDto)**
1. Calls `specialOfferService.updateSpecialOffer(id, offerDto)`.
2. Returns the updated `SpecialOfferDto` with HTTP status 200 OK. Catches `IllegalArgumentException` and returns 400 Bad Request, and `ResourceNotFoundException` returning 404 Not Found.

**public ResponseEntity<Void> deleteSpecialOffer(@PathVariable UUID id)**
1. Calls `specialOfferService.deleteSpecialOffer(id)`.
2. Returns HTTP status 204 No Content. Catches `ResourceNotFoundException` and returns 404 Not Found.

### SpecialOfferDto.java
This DTO defines the structure for transferring special offer data between layers. It will mirror the `SpecialOffer` entity but will be used for API requests and responses.

---

## Core UI & Pages

**Name:** `core-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/App.tsx` — The root component of the React application that sets up the main router, defining all public and authenticated routes.
- `frontend/src/config/siteConfig.ts` — Central configuration for site-wide content, exporting constants for business details, navigation, and social links.
- `frontend/src/api/client.ts` — Configures and exports the application-wide Axios instance for API communication, including a JWT interceptor.
- `frontend/src/pages/HomePage.tsx` — The main landing page, composed of several sections including a hero, featured menu items, testimonials, and calls to action.
- `frontend/src/components/home/HeroSection.tsx` — A full-bleed, visually rich hero component for the homepage with brand messaging and primary CTAs.
- `frontend/src/components/home/FeaturedMenuItems.tsx` — Displays a curated grid of signature dishes on the homepage, fetching data using `useMenu` and allowing items to be added to the cart.
- `frontend/src/components/home/TestimonialsSection.tsx` — A section showcasing glowing customer reviews, fetching data using `useReviews`.
- `frontend/src/components/home/AboutSnippet.tsx` — A brief section on the homepage introducing the restaurant's heritage and culinary philosophy.
- `frontend/src/components/home/CtaSection.tsx` — A prominent call-to-action section, encouraging users to book a table or order online.
- `frontend/src/components/home/SpecialOffersSection.tsx` — Displays current special offers and promotions in an engaging card-based layout, fetching data using `useOffers`.
- `frontend/src/pages/AboutPage.tsx` — A content page detailing the restaurant's story, culinary philosophy, and the heritage of Mughlai cuisine.
- `frontend/src/pages/ContactPage.tsx` — Provides contact information, business hours, and an interactive map, using `ContactDetails` and `LocationMap` components.
- `frontend/src/components/contact/ContactDetails.tsx` — Displays address, phone number (with click-to-call), email, and opening hours, sourced from `siteConfig.ts`.
- `frontend/src/components/contact/LocationMap.tsx` — Embeds an interactive Google Map showing the restaurant's location, using `siteConfig.ts` for the embed URL.
- `frontend/src/pages/NotFoundPage.tsx` — A user-friendly 404 page that helps users navigate back to main sections of the site.
- `frontend/src/components/common/WhatsAppButton.tsx` — A floating action button that opens a WhatsApp chat for quick inquiries, using `siteConfig.ts` for the WhatsApp number.
- `frontend/src/hooks/useOffers.ts` — React Query hook for fetching and managing special offer data, calling `offerService.getAllActiveOffers()`.
- `frontend/src/services/offerService.ts` — Service for making API calls to the special offer-related endpoints, specifically `GET /api/v1/offers`.
- `frontend/src/types/offer.ts` — Generated from the backend API contract — TypeScript types and interfaces for the SpecialOffer domain.
- `frontend/src/hooks/useReviews.ts` — React Query hook for fetching and managing customer review data, calling `reviewService.getFeaturedReviews()`.
- `frontend/src/services/reviewService.ts` — Service for making API calls to the review-related endpoints, specifically `GET /api/v1/reviews/featured`.
- `frontend/src/types/review.ts` — Generated from the backend API contract — TypeScript types and interfaces for the Review domain.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Secondary CTA: border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto"> 
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

## Core UI & Pages Feature Instruction

This feature provides the foundational UI structure and core public-facing pages for the Farmaaish Restaurant website. It includes the main application router, global site configuration, an Axios instance for API communication, and key pages like the Home, About, Contact, and 404 pages. It also includes shared components like a WhatsApp button and specific sections for the homepage.

### `App.tsx`
This file sets up the main React Router, defining the routes for the entire application. It will include routes for the `HomePage`, `AboutPage`, `ContactPage`, `MenuPage` (from `menu-display`), `BookingPage` (from `reservation-flow`), `OrderPage` (from `order-flow`), `CheckoutPage` (from `order-flow`), `CateringPage` (from `inquiry-ui`), `BlogPage` (from `blog-ui`), `BlogDetailPage` (from `blog-ui`), `GalleryPage` (from `gallery-ui`), `LoginPage` (from `auth-ui`), `ProfilePage` (from `auth-ui`), and `NotFoundPage`. All public-facing routes will be wrapped by the `Layout` component from `@/components/Layout` (from `shared-ui`), and authenticated routes like `/profile` will use `ProtectedRoute` (from `auth-ui`).

### `siteConfig.ts`
This file centralizes configuration for site-wide content. It exports constants for the `businessName` ('Farmaaish Restaurant'), `tagline` ('Experience the Royal Flavors of Mughlai Cuisine'), `description`, `phone` ('020 2729 1111'), `email` ('info@farmaaish.com'), `address` ('Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069'), `googleMapsEmbedUrl` (using coordinates 18.55557, 73.77488), `whatsappNumber` ('919876543210'), and `socialLinks` (e.g., Facebook, Instagram). It also defines the main navigation links, including `href` and `label` for Home, Menu, Reservations, Order Online, Catering, Blog, Gallery, About, and Contact. The `footerLinks` will include sections like 'Quick Links', 'Our Services', and 'Contact Us', each with relevant links.

### `client.ts`
This file configures and exports a pre-configured Axios instance for all API calls. It sets the `baseURL` to `/api/v1` and includes an interceptor to attach the JWT token from `localStorage` (key: 'token') to the `Authorization` header for authenticated requests. It also handles basic error logging.

### `HomePage.tsx`
This page serves as the main landing page. It will use the `Layout` component and comprise several sections:
1.  **HeroSection**: A full-width hero with a background image, a prominent headline "Farmaaish Restaurant: Experience the Royal Flavors of Mughlai Cuisine", a sub-headline "Where every dish tells a story of tradition and taste.", and two CTAs: "View Our Menu" (linking to `/menu`) and "Book a Table" (linking to `/reservations`).
2.  **AboutSnippet**: A brief introduction to Farmaaish Restaurant's heritage and culinary philosophy.
3.  **FeaturedMenuItems**: Displays a curated selection of signature dishes, fetched using `useMenu().getFeaturedMenuItems()`. Each item will show `name`, `description`, `price` (formatted in INR), and `imageUrl`.
4.  **SpecialOffersSection**: Showcases active promotions, fetched using `useOffers().getAllActiveSpecialOffers()`. Each offer will display `title`, `description`, `discountPercentage`, and `imageUrl`.
5.  **TestimonialsSection**: Features customer reviews, fetched using `useReviews().getFeaturedReviews()`. Each testimonial will display `authorName`, `rating`, and `comment`.
6.  **CtaSection**: A final call-to-action encouraging reservations or online orders.

### `HeroSection.tsx`
This component renders the hero section for the `HomePage`. It will feature a large background image (e.g., `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80`) with a dark overlay (`bg-black bg-opacity-50`), the business name and tagline as a prominent `h1` and `p` element, and two call-to-action buttons styled with the primary and secondary CTA design tokens. The buttons will link to `/menu` and `/reservations` respectively.

### `FeaturedMenuItems.tsx`
This component displays a grid of featured menu items. It will use the `useMenu` hook (from `menu-display` feature) to fetch `MenuItemDto` objects. Each menu item card will display the `name`, `description`, `price` (formatted in INR), and `imageUrl`. A button to add the item to the cart will be present on each card, calling `useCart().addItem()` (from `cart` feature).

### `TestimonialsSection.tsx`
This component displays customer testimonials. It will use the `useReviews` hook to fetch `ReviewDto` objects. Each testimonial will be presented in a card-like format, showing the `authorName`, `rating` (as stars), and `comment`. It should be designed to be visually appealing, possibly as a carousel or a grid.

### `AboutSnippet.tsx`
This component provides a concise introduction to Farmaaish Restaurant, highlighting its heritage and culinary philosophy. It will include placeholder text that aligns with the warm, sophisticated, and inviting tone, emphasizing authenticity and a passion for Mughlai cuisine.

### `CtaSection.tsx`
This component renders a prominent call-to-action section. It will include a headline like "Ready for a Royal Feast?" and two buttons: "Book Your Table" (linking to `/reservations`) and "Order Online Now" (linking to `/order`). Both buttons will use the primary CTA design token.

### `SpecialOffersSection.tsx`
This component displays current special offers. It will use the `useOffers` hook to fetch `SpecialOfferDto` objects. Each offer will be presented in a card-based layout, showing the `title`, `description`, `discountPercentage`, and `imageUrl`. Prices will be formatted in INR.

### `AboutPage.tsx`
This page provides detailed information about Farmaaish Restaurant. It will use the `Layout` component and include sections on the restaurant's history, culinary philosophy, the authenticity of Mughlai cuisine, and perhaps a gallery snippet (linking to `/gallery`). The content will be rich with descriptive text, maintaining the warm and sophisticated tone.

### `ContactPage.tsx`
This page provides all contact information. It will use the `Layout` component and include the `ContactDetails` component, the `LocationMap` component, and potentially a contact form (from `inquiry-ui` if a general contact form is implemented there, otherwise a simple email link). The business address, phone, and opening hours from `siteConfig.ts` will be displayed.

### `ContactDetails.tsx`
This component displays the restaurant's contact information, including address, phone number (with a `tel:` link), email, and opening hours, all sourced from `siteConfig.ts`. The phone number will be formatted for Indian locale.

### `LocationMap.tsx`
This component embeds an interactive Google Map showing the restaurant's location. It will use the `googleMapsEmbedUrl` from `siteConfig.ts` to render an `<iframe>` with the map.

### `NotFoundPage.tsx`
This page is displayed for invalid URLs. It will use the `Layout` component and provide a user-friendly message like "Oops! The page you're looking for doesn't exist." and a button to navigate back to the homepage, styled with the primary CTA design token.

### `WhatsAppButton.tsx`
This is a floating action button that allows users to quickly initiate a WhatsApp chat. It will use the `whatsappNumber` from `siteConfig.ts` to construct the WhatsApp chat link.

### `useOffers.ts`
This React Query hook provides functions to fetch special offer data. It will use `offerService.getAllActiveOffers()` to retrieve a list of `SpecialOfferDto` objects.

### `offerService.ts`
This service handles API calls related to special offers. It uses the `apiClient` to make GET requests to `/api/v1/offers` to fetch all active special offers.

### `offer.ts`
This file defines the TypeScript interfaces for `SpecialOfferDto` as derived from the backend `offer-management` feature's `SpecialOfferDto` data shape.

### `useReviews.ts`
This React Query hook provides functions to fetch customer review data. It will use `reviewService.getFeaturedReviews()` to retrieve a list of `ReviewDto` objects.

### `reviewService.ts`
This service handles API calls related to reviews. It uses the `apiClient` to make GET requests to `/api/v1/reviews/featured` to fetch featured reviews.

### `review.ts`
This file defines the TypeScript interfaces for `ReviewDto` as derived from the backend `review-management` feature's `ReviewDto` data shape.

### Inter-file Wiring
- `App.tsx` imports and uses `HomePage`, `AboutPage`, `ContactPage`, `NotFoundPage`, and components/pages from other features like `menu-display`, `reservation-flow`, `order-flow`, `inquiry-ui`, `blog-ui`, `gallery-ui`, and `auth-ui` to define the application routes.
- `HomePage` imports and renders `HeroSection`, `FeaturedMenuItems`, `TestimonialsSection`, `AboutSnippet`, `CtaSection`, and `SpecialOffersSection`.
- `ContactPage` imports and renders `ContactDetails` and `LocationMap`.
- `FeaturedMenuItems` uses the `useMenu` hook from `menu-display`.
- `TestimonialsSection` uses the `useReviews` hook.
- `SpecialOffersSection` uses the `useOffers` hook.
- `useOffers` calls `offerService.getAllActiveOffers()`.
- `offerService` uses the `apiClient` from `client.ts`.
- `useReviews` calls `reviewService.getFeaturedReviews()`.
- `reviewService` uses the `apiClient` from `client.ts`.
- `ContactDetails`, `LocationMap`, and `WhatsAppButton` all consume configuration from `siteConfig.ts`.
- `client.ts` reads the 'token' from `localStorage` for authentication, which is set by the `auth-ui` feature.

### Error Handling
API calls made via `client.ts` will handle network errors and propagate them to the respective hooks (e.g., `useOffers`, `useReviews`). These hooks should then manage loading and error states, which the components consuming them (`SpecialOffersSection`, `TestimonialsSection`) will display gracefully to the user.


---

## Authentication UI

**Name:** `auth-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/context/AuthContext.tsx` — React Context provider for managing global authentication state. It exposes `user`, `token`, `login(LoginRequest): Promise<AuthResponse>`, and `logout(): void`.
- `frontend/src/hooks/useAuth.ts` — Custom React hook for easily consuming the `AuthContext`. It exposes `user: User | null`, `token: string | null`, `login(LoginRequest): Promise<AuthResponse>`, and `logout(): void`.
- `frontend/src/services/authService.ts` — Service layer for making API calls to authentication endpoints. It exposes `login(LoginRequest): Promise<AuthResponse>` and `register(RegisterRequest): Promise<AuthResponse>`.
- `frontend/src/types/auth.ts` — TypeScript types and interfaces for authentication-related data.
- `frontend/src/pages/LoginPage.tsx` — Page component for user login. It consumes `useAuth` for login functionality and redirects on success.
- `frontend/src/pages/ProfilePage.tsx` — Page component for displaying the logged-in user's profile details and order history. It consumes `useAuth` to get user data and renders `ProfileDetails` and `OrderHistory`.
- `frontend/src/components/profile/ProfileDetails.tsx` — Component for displaying the authenticated user's profile information. It consumes `useAuth` to retrieve user data.
- `frontend/src/components/profile/OrderHistory.tsx` — Component for displaying a list of the authenticated user's past orders. It consumes `useOrders` from the `order-flow` feature.
- `frontend/src/components/ProtectedRoute.tsx` — Wrapper component that restricts access to routes based on user authentication status. It consumes `useAuth` to check authentication.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

This feature provides the core authentication functionality and user profile management for Farmaaish Restaurant. It includes a React Context (`AuthContext.tsx`) to manage global authentication state, a custom hook (`useAuth.ts`) for easy consumption of this context, and a service (`authService.ts`) to interact with the backend authentication API. It defines TypeScript types for authentication-related data (`auth.ts`).

The user interface consists of a `LoginPage.tsx` for user login, a `ProfilePage.tsx` to display user details and order history, and `ProfileDetails.tsx` and `OrderHistory.tsx` components for the profile page. A `ProtectedRoute.tsx` component is provided to guard routes that require authentication.

### AuthContext.tsx
This file defines the `AuthContext` using React's `createContext` and `AuthContextProvider` component. The context manages the `user` state (of type `User | null`) and `token` state (string or null). It provides `login` and `logout` functions. The `login` function takes `LoginRequest` (email, password), calls `authService.login`, stores the received JWT in `localStorage` under the key 'token', sets the `user` state, and returns the `AuthResponse`. The `logout` function clears the `user` and `token` states and removes the 'token' from `localStorage`. On initialization, `AuthContextProvider` attempts to read the 'token' from `localStorage` and, if present, fetches user details (not implemented in this feature, assumed to be part of a future user-management feature) to populate the `user` state. For now, it will simply set a placeholder user if a token exists.

### useAuth.ts
This hook simplifies access to the `AuthContext`. It exports a `useAuth` function that returns the `AuthContext` value, allowing components to easily access `user`, `token`, `login`, and `logout`.

### authService.ts
This service handles API calls to the backend authentication endpoints. It exports `login` and `register` functions. The `login` function takes `LoginRequest` and makes a POST request to `/api/v1/auth/login`, returning `AuthResponse`. The `register` function takes `RegisterRequest` and makes a POST request to `/api/v1/auth/register`, returning `AuthResponse`. Both functions use the `apiClient` from `frontend/src/api/client.ts`.

### auth.ts
This file defines the TypeScript interfaces for `User`, `LoginRequest`, `RegisterRequest`, and `AuthResponse`.
- `User` interface: `id: number`, `email: string`, `name: string`, `roles: string[]`.
- `LoginRequest` interface: `email: string`, `password: string`.
- `RegisterRequest` interface: `name: string`, `email: string`, `password: string`.
- `AuthResponse` interface: `token: string`, `user: User`.

### LoginPage.tsx
This page provides a login form. It uses the `useAuth` hook to access the `login` function. The form will have fields for `email` and `password`. On successful login, the user should be redirected to the home page or a previously intended private route. The page should include a link to a registration page (if one exists in the future). The layout should be centered, visually appealing, and consistent with the design tokens. The heading should be "Welcome Back to Farmaaish".

### ProfilePage.tsx
This page displays the logged-in user's profile details and their past order history. It uses `useAuth` to get the current user. It renders the `ProfileDetails` component and the `OrderHistory` component. The page should be accessible only to authenticated users via `ProtectedRoute`. The heading should be "Your Farmaaish Profile".

### ProfileDetails.tsx
This component displays the user's name and email, retrieved from the `useAuth` hook. It should present this information clearly and elegantly, consistent with the overall design. The component should display the user's name and email.

### OrderHistory.tsx
This component fetches and displays a list of the user's past orders. It will use the `useOrders` hook (from the `order-flow` feature) to fetch orders for the currently logged-in user. Each order should display its `id`, `totalAmount` (formatted in INR), `status`, and `createdAt` date. The component should display a message if no orders are found. Monetary values must be formatted using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### ProtectedRoute.tsx
This component acts as a wrapper for routes that require authentication. It uses the `useAuth` hook to check if a user is logged in. If not, it redirects the user to the `LoginPage`. If the user is logged in, it renders the children components. It can optionally take a `roles` prop (e.g., `['admin']`) to restrict access based on user roles, redirecting to a 403 page if the user doesn't have the required role. For now, only checks for general authentication.


---

## Menu Display

**Name:** `menu-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/MenuPage.tsx` — PAGE layer — orchestrates the display of menu categories and items, fetching data via `useMenu` and rendering child components `MenuCategoryTabs` and `MenuItemsGrid`.
- `frontend/src/hooks/useMenu.ts` — HOOK layer — provides React Query hooks for fetching `MenuCategoryDto[]` and `MenuItemDto[]` from the backend, and manages the selected menu category state.
- `frontend/src/services/menuService.ts` — SERVICE layer — handles API calls to the menu-management backend, exposing `getAllMenuCategories()` and `getAllMenuItems()`.
- `frontend/src/types/menu.ts` — Generated from the backend API contract — defines TypeScript types for MenuCategoryDto and MenuItemDto.
- `frontend/src/components/menu/MenuCategoryTabs.tsx` — COMPONENT layer — renders a set of clickable tabs for filtering menu items by category, exposing `MenuCategoryTabs` with props for categories, selected category, and selection callback.
- `frontend/src/components/menu/MenuItemsGrid.tsx` — COMPONENT layer — displays a responsive grid of `MenuItemDto` cards, each with an 'Add to Cart' button, exposing `MenuItemsGrid` with props for menu items.

**Feature Instruction:**

This feature provides the frontend components and logic for displaying Farmaaish Restaurant's menu to customers. It consists of a main `MenuPage` that orchestrates the display of menu categories and items, a React Query hook `useMenu` for data fetching, a `menuService` for API interactions, and dedicated components `MenuCategoryTabs` and `MenuItemsGrid` for rendering the UI. The `menu.ts` file defines the TypeScript interfaces for menu data.

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#B8860B] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

### MenuPage.tsx
This page (`MenuPage.tsx`) is the entry point for displaying the menu. It will use the `Layout` component from `@/components/Layout` for consistent navigation and footer. The page will fetch menu categories and items using the `useMenu` hook. It will render a hero section with a background image, a title "Our Exquisite Menu", and a brief tagline like "A Culinary Journey Through Mughlai Delicacies". Below the hero, it will display `MenuCategoryTabs` to allow users to filter menu items by category. The selected category will filter the items displayed in the `MenuItemsGrid`. Each menu item in the grid will include an 'Add to Cart' button, which will call the `useCart().addItem` function from the pre-scaffolded cart framework. All prices will be displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### useMenu.ts
This React Query hook (`useMenu.ts`) will provide functions to fetch all menu categories and all menu items. It will expose `useQuery` instances for `getAllMenuCategories` and `getAllMenuItems` from `menuService.ts`. The hook should manage loading states and errors, returning `data`, `isLoading`, and `error` for both categories and items. It will also expose a `selectedCategory` state and a `setSelectedCategory` function to manage the active category for filtering.

### menuService.ts
This service (`menuService.ts`) will contain asynchronous functions to interact with the backend menu API. It will use the `api` client from `frontend/src/api/client.ts` to make HTTP requests. It will have two primary functions:
1. `getAllMenuCategories(): Promise<MenuCategoryDto[]>`: Makes a GET request to `/api/v1/menu/categories`.
2. `getAllMenuItems(): Promise<MenuItemDto[]>`: Makes a GET request to `/api/v1/menu/items`.

### menu.ts
This file (`menu.ts`) will define the TypeScript interfaces for `MenuCategoryDto` and `MenuItemDto` based on the `menu-management` backend feature's `data_shapes`. These types will be used throughout the frontend for type safety.

### MenuCategoryTabs.tsx
This component (`MenuCategoryTabs.tsx`) will receive a list of `MenuCategoryDto` objects and the currently `selectedCategory` (UUID or null for 'All'). It will render a set of clickable tabs, one for each category, plus an 'All' tab. When a tab is clicked, it will call an `onSelectCategory` callback function, passing the `id` of the selected category or `null` for 'All'. The active tab will be visually highlighted using Tailwind classes.

### MenuItemsGrid.tsx
This component (`MenuItemsGrid.tsx`) will receive a list of `MenuItemDto` objects. It will render these items in a responsive grid layout. Each item card will display the `imageUrl`, `name`, `description`, and `price` of the `MenuItemDto`. The price will be formatted in Indian Rupees. Each card will also include an `AddToCartButton` component from `frontend/src/components/order/AddToCartButton.tsx`. The `AddToCartButton` will receive the `MenuItemDto` as a prop and, when clicked, will call `useCart().addItem({ id: menuItem.id, name: menuItem.name, unitPrice: menuItem.price, imageUrl: menuItem.imageUrl })` to add the item to the cart.

---

## Reservation Flow

**Name:** `reservation-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/BookingPage.tsx` — PAGE layer — renders the main reservation form for customers to book a table.
- `frontend/src/hooks/useReservations.ts` — HOOK layer — provides a React Query mutation for creating new reservations, interacting with `reservationService.ts`.
- `frontend/src/services/reservationService.ts` — SERVICE layer — handles API calls related to reservations, specifically `createReservation(request: CreateReservationRequest): Promise<ReservationDto>`.
- `frontend/src/types/reservation.ts` — Generated from the backend API contract — defines TypeScript types for reservation-related data transfer objects and enums.
- `frontend/src/components/reservation/ReservationForm.tsx` — COMPONENT layer — provides an interactive form for users to input and submit reservation details, using `useCreateReservation`.

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

## Feature Instruction: Reservation Flow

This feature enables customers to book tables at Farmaaish Restaurant through a dedicated online reservation form. It consists of a `BookingPage.tsx` that hosts the `ReservationForm.tsx` component, which handles user input and submission. The `ReservationForm.tsx` interacts with the `useReservations.ts` React Query hook, which in turn uses `reservationService.ts` to communicate with the backend `reservation-system` API. All data structures are defined in `reservation.ts`.

### `reservation.ts`
This file defines the TypeScript interfaces for `ReservationDto` and `CreateReservationRequest` based on the backend `reservation-system`'s `ReservationDto` and `CreateReservationRequest` data shapes. It also defines `ReservationStatus` enum.

### `reservationService.ts`
This service provides an asynchronous function `createReservation` that makes a POST request to the backend `/api/v1/reservations` endpoint. It takes a `CreateReservationRequest` object as input and returns a `Promise<ReservationDto>`. It uses the shared `api/client.ts` for HTTP requests.

### `useReservations.ts`
This React Query hook provides a `useCreateReservation` mutation. This mutation allows components to submit new reservation requests. It uses `reservationService.createReservation` to perform the API call. Upon successful creation, it should display a success toast notification (e.g., using `sonner`) and navigate the user to a confirmation page or the home page. In case of an error, it should display an error toast.

### `ReservationForm.tsx`
This component renders an interactive form for customers to input their reservation details. It will include fields for `customerName`, `customerEmail`, `customerPhone`, `numberOfGuests`, `reservationDate`, `reservationTime`, and `specialRequests`. The form should use appropriate input types (e.g., date picker for `reservationDate`, time picker for `reservationTime`, number input for `numberOfGuests`).

1.  **Form Structure**: The form should be visually appealing, aligning with the Mughlai heritage design. Use form elements that are easy to interact with.
2.  **State Management**: Manage form input states using React's `useState` or a form library like React Hook Form.
3.  **Validation**: Implement client-side validation for all fields. `customerName`, `customerEmail`, `customerPhone`, `numberOfGuests`, `reservationDate`, and `reservationTime` are mandatory. `customerEmail` and `customerPhone` should have format validation. `numberOfGuests` should be a positive integer.
4.  **Submission**: On form submission, it calls the `mutate` function from `useCreateReservation` hook, passing the form data mapped to a `CreateReservationRequest` object.
5.  **Loading and Error States**: Display a loading indicator when the form is submitting and show error messages for invalid inputs or failed submissions.
6.  **Success Feedback**: Upon successful reservation, display a success message using a toast notification (e.g., from `sonner`) and clear the form or redirect the user.

### `BookingPage.tsx`
This page serves as the entry point for table reservations. It wraps the `ReservationForm.tsx` component within the `Layout` component from `@/components/Layout`. The page should have a clear heading like "Book Your Table at Farmaaish Restaurant" and a brief, inviting description that aligns with the sophisticated tone, such as "Experience the regal flavors of Mughlai cuisine. Reserve your table for an unforgettable dining experience."

1.  **Layout**: Uses the `Layout` component for consistent navigation and footer.
2.  **Content**: Contains a `div` with a `max-w-3xl mx-auto` for centering the form, a prominent `h1` heading (text-4xl md:text-5xl font-bold text-[#36454F] mb-6 text-center), and a `p` sub-heading (text-lg text-gray-600 mb-10 text-center).
3.  **Component Inclusion**: Renders the `ReservationForm` component.

## Inter-file Wiring
- `BookingPage.tsx` imports and renders `ReservationForm.tsx`.
- `ReservationForm.tsx` imports and uses the `useCreateReservation` mutation from `useReservations.ts`.
- `useReservations.ts` imports and calls `reservationService.createReservation` from `reservationService.ts`.
- `reservationService.ts` imports `CreateReservationRequest` and `ReservationDto` from `reservation.ts` and uses `api/client.ts` to make HTTP requests to the backend `reservation-system` feature.


---

## Online Ordering Flow

**Name:** `order-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/OrderPage.tsx` — PAGE layer — The main online ordering page, responsible for displaying the menu, integrating the cart, and navigating to checkout.
- `frontend/src/pages/CheckoutPage.tsx` — PAGE layer — A multi-step checkout page that guides the user through delivery details, payment, and order confirmation, leveraging the cart framework and order service.
- `frontend/src/hooks/useOrders.ts` — HOOK layer — Provides React Query mutations for interacting with the order service, specifically for creating new orders.
- `frontend/src/services/orderService.ts` — SERVICE layer — Handles direct API communication with the backend order-management feature, specifically for creating orders.
- `frontend/src/types/order.ts` — Generated from the backend API contract — TypeScript types and interfaces for the Order domain, including DTOs for requests and responses.
- `frontend/src/components/order/CartDrawer.tsx` — COMPONENT layer — A slide-out drawer component that displays the contents of the shopping cart and allows for item quantity adjustments or removal.
- `frontend/src/components/order/AddToCartButton.tsx` — COMPONENT layer — A reusable button component for adding a menu item to the cart, integrating with the cart framework.
- `frontend/src/components/order/DeliveryAddressStep.tsx` — COMPONENT layer — The first step of the checkout process, a form for collecting the user's delivery address and contact details.
- `frontend/src/components/order/PaymentStep.tsx` — COMPONENT layer — The second step of checkout, integrating a payment gateway widget to collect payment for the order.
- `frontend/src/components/order/OrderConfirmationStep.tsx` — COMPONENT layer — The final step of checkout, displaying a summary of the successfully placed order.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

## Online Ordering Flow Feature Instruction

This feature implements the complete online ordering journey for Farmaaish Restaurant, from browsing the menu and adding items to a persistent cart, to a multi-step checkout process for delivery and payment, and finally order confirmation. It leverages the pre-scaffolded cart framework (`@/cart`) for cart management and integrates with the `menu-management` backend feature for menu item data and the `order-management` backend feature for order creation.

### Core Concepts

1.  **Persistent Cart**: The shopping cart state is managed using the `useCart` hook from `@/cart`, configured to use `localStorageCart` for persistence. This ensures that items remain in the cart even if the user navigates away or closes the browser.
2.  **Menu Integration**: The `OrderPage.tsx` displays menu items using the `MenuItemsGrid` component from the `menu-display` feature. Each menu item card will include an `AddToCartButton` to allow users to add items to their cart.
3.  **Multi-Step Checkout**: The `CheckoutPage.tsx` guides users through three distinct steps: `DeliveryAddressStep`, `PaymentStep`, and `OrderConfirmationStep`. The `useCheckout` hook from `@/cart` will manage the checkout flow.
4.  **Order Creation**: Once payment is successful, the `CheckoutPage` will call the `createOrder` function from `orderService.ts` to submit the order details to the backend `order-management` feature.
5.  **Payment Integration**: The `PaymentStep` component will integrate a payment gateway widget. Upon successful payment, it will receive a payment confirmation and proceed to create the order.

### File Interactions

*   **`OrderPage.tsx`**: This page serves as the main entry point for online ordering. It fetches menu categories and items using `useMenu` from `menu-display`. It renders `MenuItemsGrid` to display the menu, and each item within the grid will contain an `AddToCartButton`. It also renders the `CartDrawer` component, which displays the current cart contents.
*   **`CartDrawer.tsx`**: This component displays the items currently in the cart, their quantities, and the total amount. It uses the `useCart` hook to access and modify cart items (e.g., `removeItem`, `setItemQuantity`). It will include a button to navigate to the `CheckoutPage`.
*   **`AddToCartButton.tsx`**: This component is responsible for adding a `MenuItemDto` to the cart. It uses the `useCart().addItem` method. It should display appropriate feedback (e.g., a toast notification) upon successful addition.
*   **`CheckoutPage.tsx`**: This page orchestrates the checkout process. It uses `useCart` to retrieve cart items and totals, and `useCheckout` to manage the steps. It renders `DeliveryAddressStep`, `PaymentStep`, and `OrderConfirmationStep` sequentially. After successful payment in `PaymentStep`, it calls `useOrders().createOrder` to send the order to the backend.
*   **`DeliveryAddressStep.tsx`**: This component is a form for collecting the user's delivery address and contact information. It will manage its own local state and pass the collected data to the `CheckoutPage`.
*   **`PaymentStep.tsx`**: This component integrates the payment gateway. It will receive the order total from `CheckoutPage` and initiate the payment process. Upon successful payment, it will notify `CheckoutPage`.
*   **`OrderConfirmationStep.tsx`**: This component displays a summary of the successfully placed order, including the order ID and total amount. It receives the `OrderDto` from `CheckoutPage`.
*   **`useOrders.ts`**: This React Query hook provides mutations for creating orders. It calls `orderService.createOrder`.
    *   `useOrders().createOrder(request: CreateOrderRequest)`: Initiates an order creation request to the backend. On success, it invalidates relevant queries and potentially navigates to the order confirmation.
*   **`orderService.ts`**: This service handles direct API calls to the backend `order-management` feature.
    *   `createOrder(request: CreateOrderRequest): Promise<OrderDto>`: Sends a POST request to `/api/v1/orders` with the `CreateOrderRequest` body. This function will be called by `useOrders`.
*   **`order.ts`**: Defines TypeScript interfaces for `OrderDto`, `OrderItemDto`, `CreateOrderRequest`, and `OrderItemRequest` based on the `order-management` backend's `data_shapes`.

### Data Flow and Logic

1.  **Adding to Cart**: When a user clicks "Add to Cart" on a `MenuItemDto` (from `menu-display`), the `AddToCartButton` component calls `useCart().addItem({ id: menuItem.id, name: menuItem.name, unitPrice: menuItem.price, imageUrl: menuItem.imageUrl, quantity: 1 })`. The cart state is updated and persisted to local storage.
2.  **Viewing Cart**: The `CartDrawer` component reads `useCart().cartItems` and `useCart().totals` to display the current cart contents and total. Users can adjust quantities or remove items using `useCart().setItemQuantity` and `useCart().removeItem`.
3.  **Initiating Checkout**: From the `CartDrawer`, the user navigates to `/checkout`. The `CheckoutPage` initializes the `useCheckout` hook.
4.  **Delivery Address**: `DeliveryAddressStep` collects customer details (name, phone, address) and passes them up to `CheckoutPage`.
5.  **Payment**: `PaymentStep` receives the `totalAmount` from `useCart().totals.total`. It integrates with a payment gateway (e.g., Razorpay, Stripe) to collect payment. Upon successful payment, it will receive a payment confirmation (e.g., `gatewayOrderId`).
6.  **Order Submission**: After successful payment, the `CheckoutPage` constructs a `CreateOrderRequest` using the cart items and delivery details. It then calls `useOrders().createOrder` (which in turn calls `orderService.createOrder`). The `CreateOrderRequest` will map `CartItem`s to `OrderItemRequest`s, using `cartItem.id` as `menuItemId` and `cartItem.quantity` as `quantity`. The `userId` for the `CreateOrderRequest` should be obtained from the `useAuth` hook from the `auth-ui` feature.
7.  **Order Confirmation**: Upon receiving a successful `OrderDto` response from the backend, `CheckoutPage` transitions to `OrderConfirmationStep`, passing the `OrderDto` for display. The cart is then cleared using `useCart().clearCart()`.

### Error Handling

*   All API calls made by `orderService.ts` should include error handling. Network errors or backend errors (e.g., 400, 500) should be caught and re-thrown as custom `Error` objects or handled by React Query's error mechanism. `useOrders` will expose these errors.
*   User-facing errors (e.g., invalid input in forms, payment failure) should be displayed using a toast notification system (e.g., `sonner`).

### Indian Business Context

*   All monetary values displayed (menu item prices, cart totals, order summaries) must be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.
*   Address and phone number inputs should be tailored for Indian conventions.


---

## Catering Inquiry UI

**Name:** `inquiry-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/CateringPage.tsx` — PAGE layer — renders the catering information and hosts the CateringInquiryForm component.
- `frontend/src/hooks/useInquiries.ts` — HOOK layer — provides a React Query hook `useCreateInquiry` for submitting catering inquiry data by calling `inquiryService.createInquiry(CreateInquiryRequest): Promise<CateringInquiryDto>`.
- `frontend/src/services/inquiryService.ts` — SERVICE layer — handles API calls related to catering inquiries, exposing `createInquiry(CreateInquiryRequest): Promise<CateringInquiryDto>`.
- `frontend/src/types/inquiry.ts` — Generated from the backend API contract — defines TypeScript types for catering inquiry DTOs and request objects.
- `frontend/src/components/inquiry/CateringInquiryForm.tsx` — COMPONENT layer — provides a form for customers to submit catering inquiry details, consuming `useInquiries().createInquiry`.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

This feature provides a user interface for customers to inquire about catering services for events. It consists of a dedicated `CateringPage.tsx` that displays information about Farmaaish Restaurant's catering offerings and includes a `CateringInquiryForm.tsx` for submitting inquiries. The form collects customer details, event type, date, number of guests, budget, and special requests. The `CateringInquiryForm.tsx` component utilizes the `useInquiries.ts` React Query hook to handle form submission and manage the state of the inquiry. The `useInquiries.ts` hook, in turn, interacts with `inquiryService.ts` to make API calls to the backend's `/api/v1/inquiries/catering` endpoint for creating new inquiries. All data structures related to catering inquiries are defined in `inquiry.ts`.

### `CateringPage.tsx`
This page serves as the entry point for catering inquiries. It will feature a hero section with a compelling image and headline, followed by sections detailing the catering services, and finally, the inquiry form. The page will use the `Layout` component from `@/components/Layout` for consistent navigation and footer.

**Sections:**
1.  **Hero Section:**
    -   Background image: `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80` with a `bg-black bg-opacity-50` overlay.
    -   Headline: "Experience the Grandeur of Farmaaish Catering"
    -   Sub-headline: "Bring the authentic taste of Mughlai cuisine to your special events."
    -   Call to Action (Optional): A button linking to the inquiry form section.
2.  **Catering Services Overview:**
    -   Heading: "Our Catering Services"
    -   Content: Describe the types of events catered (weddings, corporate, private parties), customization options, and the culinary experience. Emphasize the rich Mughlai flavors and premium service.
3.  **Why Choose Farmaaish Catering:**
    -   Heading: "Why Choose Farmaaish for Your Event?"
    -   Content: Highlight unique selling points like authentic recipes, experienced chefs, bespoke menus, and impeccable service.
4.  **Inquiry Form Section:**
    -   Heading: "Plan Your Event with Us"
    -   Sub-headline: "Tell us about your event, and our team will get in touch to craft a memorable culinary experience."
    -   Includes the `CateringInquiryForm` component.

### `CateringInquiryForm.tsx`
This component renders a form for customers to submit catering inquiry details. It will use `react-hook-form` for form management and `zod` for validation. Upon successful submission, a toast notification (using `sonner`) will confirm the inquiry. The form fields will map directly to the `CreateInquiryRequest` DTO.

**Form Fields:**
-   `customerName`: Text input, required.
-   `customerEmail`: Email input, required, valid email format.
-   `customerPhone`: Text input, required, valid Indian phone number format.
-   `eventType`: Select dropdown (e.g., "Wedding", "Corporate Event", "Birthday Party", "Private Gathering", "Other"), required.
-   `eventDate`: Date picker, required, future date only.
-   `numberOfGuests`: Number input, required, minimum 1.
-   `budget`: Number input, optional, displayed in INR.
-   `specialRequests`: Textarea, optional.

**Form Submission:**
1.  When the form is submitted, `CateringInquiryForm` calls `useInquiries().createInquiry.mutate(data)`. 
2.  On success, a success toast "Your catering inquiry has been submitted successfully! We will contact you shortly." is displayed. 
3.  On error, an error toast "Failed to submit inquiry. Please try again." is displayed.

### `useInquiries.ts`
This React Query hook provides an interface for components to interact with catering inquiry data. It exports a `useCreateInquiry` hook for submitting new inquiries.

**`useCreateInquiry` hook logic:**
1.  Uses `react-query`'s `useMutation` to handle the asynchronous API call.
2.  Calls `inquiryService.createInquiry(request)` with the provided `CreateInquiryRequest` data.
3.  Manages loading, error, and success states for the mutation.

### `inquiryService.ts`
This service handles the actual API communication with the backend for catering inquiries. It uses the `api` client from `frontend/src/api/client.ts`.

**`createInquiry` function logic:**
1.  Accepts a `CreateInquiryRequest` object.
2.  Makes a `POST` request to `/api/v1/inquiries/catering` with the request body.
3.  Returns a `Promise<CateringInquiryDto>`.
4.  Handles potential network errors or API response errors.

### `inquiry.ts`
This file defines the TypeScript interfaces for catering inquiry data transfer objects (DTOs) and request/response structures, mirroring the backend's `inquiry-management` feature data shapes.

**Interfaces:**
-   `CateringInquiryDto`: Represents a full catering inquiry, including its ID, status, and timestamps.
-   `CreateInquiryRequest`: Represents the data required to create a new catering inquiry.

---

## Blog UI

**Name:** `blog-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/BlogPage.tsx` — PAGE layer — displays a list of blog posts by consuming the `useAllPosts` hook and rendering `PostCard` components.
- `frontend/src/pages/BlogDetailPage.tsx` — PAGE layer — displays the full content of a single blog post by consuming the `usePostById` hook and rendering the `PostContent` component.
- `frontend/src/hooks/useBlog.ts` — HOOK layer — provides React Query hooks for fetching blog posts: `useAllPosts(): { data: PostDto[] | undefined; isLoading: boolean; error: Error | null }` and `usePostById(id: string): { data: PostDto | undefined; isLoading: boolean; error: Error | null }`.
- `frontend/src/services/blogService.ts` — SERVICE layer — provides functions for making API calls to the blog-management backend: `getAllPosts(): Promise<PostDto[]>` and `getPostById(id: string): Promise<PostDto>`.
- `frontend/src/types/blog.ts` — Generated from the backend API contract — defines the TypeScript interface for `PostDto`.
- `frontend/src/components/blog/PostCard.tsx` — COMPONENT layer — displays a summary of a blog post, taking a `PostDto` as props.
- `frontend/src/components/blog/PostContent.tsx` — COMPONENT layer — renders the full content of a blog post, taking a `PostDto` as props.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

## Blog UI Feature Instruction
This feature provides the user interface for displaying blog posts, allowing users to browse a list of posts and view the full content of individual posts. It consists of two main pages: `BlogPage.tsx` for listing posts and `BlogDetailPage.tsx` for viewing a single post. Data fetching is handled by `useBlog.ts` (a React Query hook) which in turn uses `blogService.ts` to interact with the backend API. The `blog.ts` file defines the TypeScript types for blog posts, ensuring type safety across the frontend. Visual components `PostCard.tsx` and `PostContent.tsx` are used to render blog post summaries and full content respectively.

### Data Flow and Interactions
1.  **`BlogPage.tsx`**: This page is the entry point for browsing blog posts. It uses the `useBlog.ts` hook to fetch a list of all blog posts. It then maps over the `PostDto` objects returned by the hook and renders each post using the `PostCard.tsx` component. Each `PostCard` will link to the `BlogDetailPage.tsx` for the respective blog post using its `id`.
2.  **`BlogDetailPage.tsx`**: This page displays the detailed content of a single blog post. It extracts the `id` of the blog post from the URL parameters using `useParams` from `react-router-dom`. It then uses the `useBlog.ts` hook to fetch the specific blog post by its `id`. The fetched `PostDto` is then passed to the `PostContent.tsx` component for rendering the full article.
3.  **`useBlog.ts`**: This React Query hook provides functions to fetch blog posts. It exports `useAllPosts()` to retrieve a list of all blog posts and `usePostById(id: string)` to retrieve a single blog post by its ID. These hooks internally call `blogService.ts` to perform the actual API requests. It manages loading states, errors, and caching using React Query.
4.  **`blogService.ts`**: This service file contains asynchronous functions that make HTTP requests to the `blog-management` backend feature. It exports `getAllPosts(): Promise<PostDto[]>` to fetch all posts and `getPostById(id: string): Promise<PostDto>` to fetch a single post. It uses the pre-scaffolded `apiClient` from `frontend/src/api/client.ts` for making these requests.
5.  **`blog.ts`**: This file defines the `PostDto` interface, which mirrors the `PostDto` data shape from the `blog-management` backend feature. This ensures consistency and type safety when handling blog post data.
6.  **`PostCard.tsx`**: This component receives a `PostDto` as a prop and renders a summary of the blog post, including its `title`, `imageUrl`, `author`, and `publishDate`. It should be styled according to the design tokens for cards and include a link to the corresponding `BlogDetailPage.tsx`.
7.  **`PostContent.tsx`**: This component receives a `PostDto` as a prop and renders the full `title`, `content`, `author`, `publishDate`, and `imageUrl` of the blog post. The `content` should be rendered as HTML, assuming it contains rich text formatting from the backend.

### Error Handling
-   Both `BlogPage.tsx` and `BlogDetailPage.tsx` should display a loading indicator while data is being fetched (e.g., "Loading blog posts...").
-   If an error occurs during data fetching, an error message should be displayed to the user (e.g., "Failed to load blog posts. Please try again later.").
-   If a specific blog post is not found (e.g., `getPostById` returns a 404), `BlogDetailPage.tsx` should display a "Blog post not found" message.

### Styling and Responsiveness
-   All components should use Tailwind CSS classes, adhering strictly to the defined design tokens.
-   Pages and components must be responsive, adapting gracefully to different screen sizes.
-   Monetary values (if any were present) would be formatted using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### Routing
-   `BlogPage.tsx` should be accessible at `/blog`.
-   `BlogDetailPage.tsx` should be accessible at `/blog/:id`, where `:id` is the UUID of the blog post.

### `PostDto` Structure (from `blog-management` feature)
```

typescript
interface PostDto {
  id: string; // UUID
  title: string;
  content: string;
  author: string;
  publishDate: string; // LocalDate as ISO string
  imageUrl: string;
}


```

---

## Gallery UI

**Name:** `gallery-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/GalleryPage.tsx` — PAGE layer — renders the public gallery page, fetching data via `useGallery` and displaying it with `ImageGrid`.
- `frontend/src/hooks/useGallery.ts` — HOOK layer — provides the `useGallery` hook for fetching gallery images.
- `frontend/src/services/galleryService.ts` — SERVICE layer — provides `getAllGalleryImages()` for making API calls to the backend gallery endpoint.
- `frontend/src/types/gallery.ts` — Generated from the backend API contract — defines TypeScript types for the Gallery domain.
- `frontend/src/components/gallery/ImageGrid.tsx` — COMPONENT layer — displays a responsive grid of gallery images.

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

## Feature Instruction: Gallery UI

This feature provides a public-facing gallery page (`GalleryPage.tsx`) to showcase high-quality images of Farmaaish Restaurant's food and ambiance. It leverages a React Query hook (`useGallery.ts`) to fetch gallery data from the backend via `galleryService.ts`. The fetched images are then displayed in a responsive masonry grid component (`ImageGrid.tsx`). The `gallery.ts` file defines the TypeScript types for the gallery images.

### `GalleryPage.tsx`

This page will render a visually stunning gallery of images, embodying the regality and richness of Mughlai heritage. It will use the `Layout` component from `@/components/Layout` for consistent navigation and footer. The page will consist of a hero section followed by the main image grid. It will fetch gallery images using the `useGallery` hook and pass the data to the `ImageGrid` component.

1.  **Hero Section**: Display a large, high-fidelity hero image relevant to a restaurant (e.g., https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80) with a dark overlay (`bg-black bg-opacity-50`). The headline should be "Our Culinary Journey" or "A Glimpse into Farmaaish" in `text-4xl md:text-6xl font-bold text-white`, and a sub-headline like "Experience the Richness of Mughlai Cuisine and Ambiance" in `text-xl md:text-2xl text-white mt-4`.
2.  **Gallery Section**: Below the hero, render a section with a heading "Moments from Farmaaish" in `text-3xl font-bold text-[#36454F] mb-8`. This section will contain the `ImageGrid` component, displaying the images fetched from the `useGallery` hook.
3.  **Loading and Error States**: While images are loading, display a loading indicator. If an error occurs during fetching, display a user-friendly error message.

### `useGallery.ts`

This React Query hook will encapsulate the logic for fetching gallery images. It will use `galleryService.ts` to make the actual API call.

1.  **`useGallery()` function**: This function will use `react-query`'s `useQuery` to fetch a list of `GalleryImageDto` objects.
    *   **Query Key**: `['galleryImages']`
    *   **Query Function**: `galleryService.getAllGalleryImages`
    *   **Return Value**: An object containing `data` (list of `GalleryImageDto`), `isLoading`, and `error`.

### `galleryService.ts`

This service will handle direct API communication with the backend's gallery endpoints. It will use the pre-scaffolded `api/client.ts` for making HTTP requests.

1.  **`getAllGalleryImages()` function**: This asynchronous function will make a GET request to `/api/v1/gallery`.
    *   **Method**: `GET`
    *   **Path**: `/api/v1/gallery`
    *   **Return Type**: `Promise<GalleryImageDto[]>`
    *   **Error Handling**: Propagate any errors from the API client.

### `gallery.ts`

This file will define the TypeScript interfaces for the gallery domain, mirroring the `GalleryImageDto` from the backend.

1.  **`GalleryImageDto` interface**: This interface will define the structure of a single gallery image object, including `id` (string), `imageUrl` (string), `caption` (string), and `uploadDate` (string).

### `ImageGrid.tsx`

This component will be responsible for rendering the gallery images in a responsive masonry-like grid layout. It will receive an array of `GalleryImageDto` as props.

1.  **`ImageGrid` component**: This functional component will accept `images: GalleryImageDto[]` as props.
2.  **Layout**: Use Tailwind CSS to create a responsive grid that adapts to different screen sizes, resembling a masonry layout. Consider using `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` with appropriate gap classes.
3.  **Image Display**: For each `GalleryImageDto`, display the `imageUrl` within an `<img>` tag. Include the `caption` as an `alt` attribute and potentially as an overlay or caption below the image. Ensure images maintain aspect ratio and are styled with `rounded-lg shadow-md`.
4.  **Accessibility**: Ensure `alt` attributes are correctly populated for all images.

---

## Admin Portal

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/AdminDashboardPage.tsx` — Admin page — the main landing page for the admin panel, showing key stats and navigation.
- `frontend/src/pages/AdminMenuPage.tsx` — Admin page — orchestrates the display and management of menu items using MenuTable, MenuItemForm, and DeleteMenuItemDialog.
- `frontend/src/components/admin/menu/MenuTable.tsx` — React component — displays a data table for all menu items with actions for editing and deleting.
- `frontend/src/components/admin/menu/MenuItemForm.tsx` — React component — a form for creating or editing a menu item.
- `frontend/src/components/admin/menu/DeleteMenuItemDialog.tsx` — React component — a confirmation dialog for deleting a menu item.
- `frontend/src/pages/AdminReservationsPage.tsx` — Admin page — orchestrates the display and management of customer reservations using ReservationsTable.
- `frontend/src/components/admin/reservations/ReservationsTable.tsx` — React component — displays a data table for all reservations with actions for updating status and deleting.
- `frontend/src/pages/AdminOrdersPage.tsx` — Admin page — orchestrates the display and management of online orders using OrdersTable.
- `frontend/src/components/admin/orders/OrdersTable.tsx` — React component — displays a data table for all online orders with actions for updating status.
- `frontend/src/pages/AdminCateringInquiriesPage.tsx` — Admin page — orchestrates the display and management of catering inquiries using InquiriesTable.
- `frontend/src/components/admin/inquiries/InquiriesTable.tsx` — React component — displays a data table for all catering inquiries with actions for updating status.
- `frontend/src/pages/AdminBlogPage.tsx` — Admin page — orchestrates the display and management of blog posts using PostsTable and PostForm.
- `frontend/src/components/admin/blog/PostsTable.tsx` — React component — displays a data table for all blog posts with actions for editing and deleting.
- `frontend/src/components/admin/blog/PostForm.tsx` — React component — a form for creating or editing a blog post.
- `frontend/src/pages/AdminGalleryPage.tsx` — Admin page — orchestrates the display and management of gallery images using GalleryGrid and ImageUploadForm.
- `frontend/src/components/admin/gallery/GalleryGrid.tsx` — React component — displays a grid of gallery images with options to delete.
- `frontend/src/components/admin/gallery/ImageUploadForm.tsx` — React component — a form for uploading new images to the gallery.
- `frontend/src/pages/AdminReviewsPage.tsx` — Admin page — orchestrates the display and management of customer reviews using ReviewsTable and SyncReviewsButton.
- `frontend/src/components/admin/reviews/ReviewsTable.tsx` — React component — displays a data table for all customer reviews with actions for featuring and deleting.
- `frontend/src/components/admin/reviews/SyncReviewsButton.tsx` — React component — a button to trigger the synchronization of reviews from Google Business Profile.
- `frontend/src/pages/AdminOffersPage.tsx` — Admin page — orchestrates the display and management of special offers using OffersTable and OfferForm.
- `frontend/src/components/admin/offers/OffersTable.tsx` — React component — displays a data table for all special offers with actions for editing and deleting.
- `frontend/src/components/admin/offers/OfferForm.tsx` — React component — a form for creating or editing a special offer.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#36454F] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

The Admin Portal feature provides a comprehensive web interface for Farmaaish Restaurant staff to manage various aspects of the business, including menu items, reservations, online orders, catering inquiries, blog posts, gallery images, customer reviews, and special offers. All pages within this feature are protected by authentication and require an 'admin' role, enforced by the `<AdminLayout>` component from `@/components/AdminLayout` which wraps all admin pages. This layout provides the necessary navigation and ensures only authorized users can access the administrative functions.

Each administrative section (Menu, Reservations, Orders, Catering Inquiries, Blog, Gallery, Reviews, Offers) follows a consistent pattern: a main page (`AdminMenuPage.tsx`, `AdminReservationsPage.tsx`, etc.) that orchestrates the display of data in a table component (`MenuTable.tsx`, `ReservationsTable.tsx`, etc.) and provides functionality for creating, editing, and deleting entries through form and dialog components (`MenuItemForm.tsx`, `DeleteMenuItemDialog.tsx`, `PostForm.tsx`, `ImageUploadForm.tsx`, `OfferForm.tsx`, `SyncReviewsButton.tsx`).

Data fetching and manipulation for each section are handled by dedicated React Query hooks (e.g., `useMenu.ts`, `useReservations.ts`, `useOrders.ts`, `useInquiries.ts`, `useBlog.ts`, `useGallery.ts`, `useReviews.ts`, `useOffers.ts`). These hooks abstract away the direct API calls to the backend services (e.g., `menu-management`, `reservation-system`, `order-management`, `inquiry-management`, `blog-management`, `gallery-management`, `review-management`, `offer-management`) and provide a consistent interface for components to interact with data, including loading states, error handling, and data invalidation for UI updates. All monetary values displayed in the admin portal, such as `MenuItemDto.price`, `OrderDto.totalAmount`, `CateringInquiryDto.budget`, and `SpecialOfferDto.discountPercentage`, must be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

**AdminDashboardPage.tsx** serves as the entry point, displaying an overview of key metrics and quick navigation links to other admin sections. It should present a welcoming and informative dashboard for the restaurant's administrators.

**AdminMenuPage.tsx** manages menu items. It renders `MenuTable.tsx` to list all menu items and provides buttons to trigger `MenuItemForm.tsx` for creating/editing and `DeleteMenuItemDialog.tsx` for deleting. `MenuTable.tsx` will display `MenuItemDto` objects, including `id`, `name`, `description`, `price` (formatted as ₹), `imageUrl`, `isVegetarian`, `isAvailable`, `categoryName`. `MenuItemForm.tsx` will allow creation and update of `MenuItemDto` objects, requiring fields like `name`, `description`, `price`, `imageUrl`, `isVegetarian`, `isAvailable`, and `categoryId`. The `categoryId` will be selected from a dropdown populated by `MenuCategoryDto` objects fetched via `useMenu().categories`. `DeleteMenuItemDialog.tsx` will confirm deletion of a `MenuItemDto` by its `id`.

**AdminReservationsPage.tsx** manages customer reservations. It renders `ReservationsTable.tsx` to display `ReservationDto` objects, including `id`, `customerName`, `customerEmail`, `customerPhone`, `numberOfGuests`, `reservationDate`, `reservationTime`, `specialRequests`, `status`, `createdAt`, `updatedAt`. The table should allow updating the `status` of a reservation (e.g., to 'CONFIRMED', 'CANCELLED', 'COMPLETED') and deleting reservations. The `status` field will be an enum with values like 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'.

**AdminOrdersPage.tsx** manages online orders. It renders `OrdersTable.tsx` to display `OrderDto` objects, including `id`, `userId`, `orderItems` (each with `menuItem.name`, `quantity`, `subTotal` formatted as ₹), `totalAmount` (formatted as ₹), `status`, `gatewayOrderId`, `createdAt`, `updatedAt`. The table should allow updating the `status` of an order (e.g., to 'PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_DELIVERY', 'DELIVERED', 'CANCELLED').

**AdminCateringInquiriesPage.tsx** manages catering inquiries. It renders `InquiriesTable.tsx` to display `CateringInquiryDto` objects, including `id`, `customerName`, `customerEmail`, `customerPhone`, `eventType`, `eventDate`, `numberOfGuests`, `budget` (formatted as ₹), `specialRequests`, `status`, `createdAt`, `updatedAt`. The table should allow updating the `status` of an inquiry (e.g., to 'NEW', 'CONTACTED', 'QUOTED', 'CLOSED').

**AdminBlogPage.tsx** manages blog posts. It renders `PostsTable.tsx` to display `PostDto` objects, including `id`, `title`, `author`, `publishDate`, `imageUrl`. It provides buttons to trigger `PostForm.tsx` for creating/editing. `PostForm.tsx` will allow creation and update of `PostDto` objects, requiring `title`, `content`, `author`, `publishDate`, `imageUrl`. The `content` field should support rich text editing. Deletion of posts will also be handled.

**AdminGalleryPage.tsx** manages gallery images. It renders `GalleryGrid.tsx` to display `GalleryImageDto` objects, including `id`, `imageUrl`, `caption`, `uploadDate`. It provides `ImageUploadForm.tsx` for uploading new images, requiring a `file` and `caption`. Deletion of images will also be handled.

**AdminReviewsPage.tsx** manages customer reviews. It renders `ReviewsTable.tsx` to display `ReviewDto` objects, including `id`, `authorName`, `rating`, `comment`, `source`, `reviewDate`, `isFeatured`. It also includes `SyncReviewsButton.tsx` to trigger synchronization of reviews from Google Business Profile. The table should allow marking reviews as `isFeatured` and deleting reviews.

**AdminOffersPage.tsx** manages special offers. It renders `OffersTable.tsx` to display `SpecialOfferDto` objects, including `id`, `title`, `description`, `discountPercentage`, `startDate`, `endDate`, `imageUrl`, `isActive`. It provides buttons to trigger `OfferForm.tsx` for creating/editing. `OfferForm.tsx` will allow creation and update of `SpecialOfferDto` objects, requiring `title`, `description`, `discountPercentage`, `startDate`, `endDate`, `imageUrl`, `isActive`. Deletion of offers will also be handled.

All data tables (`MenuTable`, `ReservationsTable`, `OrdersTable`, `InquiriesTable`, `PostsTable`, `ReviewsTable`, `OffersTable`) should implement basic pagination, sorting, and filtering capabilities where appropriate, using the data provided by their respective React Query hooks. Forms (`MenuItemForm`, `PostForm`, `ImageUploadForm`, `OfferForm`) should include client-side validation and provide user feedback using a toast notification system (e.g., `sonner`).

**Authentication:** All API calls made by the hooks and services within this feature must include the JWT token retrieved from `localStorage.getItem('token')` in the `Authorization` header as a Bearer token. This ensures that only authenticated and authorized administrators can perform these operations.

---

