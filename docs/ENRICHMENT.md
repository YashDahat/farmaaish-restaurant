# Feature Enrichment — Attempt 1

Generated: 2026-08-03

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend Utilities

**Name:** `shared-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/exception/GlobalExceptionHandler.java` — Centralized exception handler for the backend, converting various exceptions into a standardized ErrorResponse DTO.
- `backend/src/main/java/com/farmaaishrestaurant/exception/ResourceNotFoundException.java` — Custom exception class to indicate that a requested resource could not be found.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ErrorResponse.java` — Data Transfer Object (DTO) for standardizing error responses from the API.
- `backend/src/main/java/com/farmaaishrestaurant/config/DataSeeder.java` — Configuration component that populates the database with initial data on application startup.

**Feature Instruction:**

This feature provides shared backend utilities for error handling, custom exceptions, and initial data seeding. The `GlobalExceptionHandler` centralizes error management, catching specific exceptions like `ResourceNotFoundException` and general `Exception` instances to return a consistent `ErrorResponse` DTO. `ResourceNotFoundException` is a custom exception to be thrown by services when a requested entity is not found. `ErrorResponse` defines the standardized structure for API error messages, including a timestamp, status, error message, and path. The `DataSeeder` component is responsible for populating the database with initial menu categories and menu items on application startup, ensuring the application has baseline data for demonstration and initial use. It injects `MenuItemRepository` and `MenuItemCategoryRepository` from the `menu-management` feature to persist the data.

---

## Menu Management (Backend)

**Name:** `menu-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItem.java` — JPA Entity — represents a single dish or beverage on the restaurant's menu, linked to a category.
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItemCategory.java` — JPA Entity — represents a category for menu items, such as 'Appetizers' or 'Main Course'.
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemRepository.java` — Spring Data JPA Repository — provides CRUD operations for MenuItem entities and custom queries to find items by category.
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemCategoryRepository.java` — Spring Data JPA Repository — provides CRUD operations for MenuItemCategory entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/MenuService.java` — SERVICE layer — implements business logic for managing menu items and categories, including creation, retrieval, update, and deletion.
- `backend/src/main/java/com/farmaaishrestaurant/controller/MenuController.java` — REST Controller — exposes public API endpoints for fetching menu items and categories.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminMenuController.java` — REST Controller — exposes admin-only API endpoints for CRUD operations on menu items and categories.
- `backend/src/main/java/com/farmaaishrestaurant/dto/MenuItemDto.java` — Data Transfer Object — used for transferring menu item data between the service layer and the controllers, including validation.

**Feature Instruction:**

The Menu Management feature provides a complete backend solution for managing the Farmaaish Restaurant's menu, including dishes, beverages, and their categories. It consists of JPA entities for `MenuItem` and `MenuItemCategory`, Spring Data JPA repositories for persistence, a `MenuService` for business logic, and two REST controllers: `MenuController` for public access to the menu and `AdminMenuController` for administrative CRUD operations.

## Entities
- `MenuItem.java`: Represents a single menu item with fields for `id`, `name`, `description`, `price`, `imageUrl`, `vegetarian`, `available`, and a many-to-one relationship with `MenuItemCategory`.
- `MenuItemCategory.java`: Represents a category for menu items with fields for `id`, `name`, and a one-to-many relationship with `MenuItem`.

## Repositories
- `MenuItemRepository.java`: Provides standard CRUD operations for `MenuItem` entities. It will include a custom query to find menu items by category ID.
- `MenuItemCategoryRepository.java`: Provides standard CRUD operations for `MenuItemCategory` entities.

## Service
- `MenuService.java`: This service orchestrates interactions between controllers and repositories. It handles the following operations:
    1. `getAllMenuItems()`: Returns a `List<MenuItemDto>` of all available menu items.
    2. `getMenuItemsByCategory(Long categoryId)`: Returns a `List<MenuItemDto>` of menu items belonging to a specific category. Throws `ResourceNotFoundException` if the category does not exist.
    3. `getMenuItemById(Long id)`: Returns a `MenuItemDto` for a given ID. Throws `ResourceNotFoundException` if the item does not exist.
    4. `getAllMenuItemCategories()`: Returns a `List<MenuItemCategory>` of all menu item categories.
    5. `createMenuItem(MenuItemDto menuItemDto)`: Creates a new menu item. Validates that the associated category exists. Returns the created `MenuItemDto`.
    6. `updateMenuItem(Long id, MenuItemDto menuItemDto)`: Updates an existing menu item. Validates that both the item and its associated category exist. Returns the updated `MenuItemDto`. Throws `ResourceNotFoundException` if the item or category is not found.
    7. `deleteMenuItem(Long id)`: Deletes a menu item by ID. Throws `ResourceNotFoundException` if the item does not exist.
    8. `createMenuItemCategory(MenuItemCategory category)`: Creates a new menu item category. Returns the created `MenuItemCategory`.
    9. `updateMenuItemCategory(Long id, MenuItemCategory category)`: Updates an existing menu item category. Throws `ResourceNotFoundException` if the category does not exist. Returns the updated `MenuItemCategory`.
    10. `deleteMenuItemCategory(Long id)`: Deletes a menu item category by ID. Throws `ResourceNotFoundException` if the category does not exist.

## DTOs
- `MenuItemDto.java`: A DTO used for transferring menu item data between the service layer and the controllers. It mirrors the `MenuItem` entity but includes validation annotations.

## Controllers
- `MenuController.java`: Exposes public API endpoints for fetching menu items and categories. All endpoints are publicly accessible.
    - `GET /api/v1/menu/items`: Returns a list of all menu items.
    - `GET /api/v1/menu/items/category/{categoryId}`: Returns a list of menu items filtered by category.
    - `GET /api/v1/menu/items/{id}`: Returns a single menu item by ID.
    - `GET /api/v1/menu/categories`: Returns a list of all menu categories.
- `AdminMenuController.java`: Exposes admin-only API endpoints for managing menu items and categories. All endpoints require administrator authentication.
    - `POST /api/v1/admin/menu/items`: Creates a new menu item.
    - `PUT /api/v1/admin/menu/items/{id}`: Updates an existing menu item.
    - `DELETE /api/v1/admin/menu/items/{id}`: Deletes a menu item.
    - `POST /api/v1/admin/menu/categories`: Creates a new menu category.
    - `PUT /api/v1/admin/menu/categories/{id}`: Updates an existing menu category.
    - `DELETE /api/v1/admin/menu/categories/{id}`: Deletes a menu category.

## Error Handling
Both controllers will utilize `@ExceptionHandler` to catch `ResourceNotFoundException` (from `shared-backend` feature) and return an appropriate HTTP 404 Not Found response, and `IllegalArgumentException` for bad requests, returning HTTP 400 Bad Request.

---

## Reservation System (Backend)

**Name:** `reservation-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Reservation.java` — JPA Entity — represents a customer's table reservation with fields for customer details, date, time, and status.
- `backend/src/main/java/com/farmaaishrestaurant/model/ReservationStatus.java` — Enum — defines the possible states for a table reservation.
- `backend/src/main/java/com/farmaaishrestaurant/repository/ReservationRepository.java` — REPOSITORY layer — provides CRUD operations for `Reservation` entities and a custom query to find reservations by date range.
- `backend/src/main/java/com/farmaaishrestaurant/service/ReservationService.java` — SERVICE layer — implements `createReservation(CreateReservationRequest): ReservationDto`, `getAllReservations(): List<ReservationDto>`, `getReservationsByDateRange(LocalDate, LocalDate): List<ReservationDto>`, `getReservationById(Long): ReservationDto`, `updateReservationStatus(Long, ReservationStatus): ReservationDto`, and `deleteReservation(Long): void`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/ReservationController.java` — CONTROLLER layer — exposes a public API endpoint for customers to submit new reservation requests.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminReservationController.java` — CONTROLLER layer — exposes admin-only API endpoints for viewing and managing all reservations.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateReservationRequest.java` — DTO — used for capturing customer input when creating a new reservation.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ReservationDto.java` — DTO — used for representing a `Reservation` in API responses.

**Feature Instruction:**

The Reservation System (Backend) feature provides a robust API for managing table reservations at Farmaaish Restaurant. It allows customers to submit new reservation requests and provides administrators with comprehensive tools to view, confirm, and cancel reservations. The system is built around the `Reservation` entity, which tracks details such as customer name, contact, party size, date, time, and status.

### Data Models

- `Reservation.java`: This JPA entity represents a single reservation. It includes fields for `id`, `customerName`, `customerPhone`, `customerEmail`, `partySize`, `reservationDate`, `reservationTime`, `specialRequests`, `status` (an enum of type `ReservationStatus`), and `createdAt`.
- `ReservationStatus.java`: An enum defining the possible states of a reservation: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`.

### Data Transfer Objects (DTOs)

- `CreateReservationRequest.java`: Used for public reservation submissions. It contains `customerName`, `customerPhone`, `customerEmail`, `partySize`, `reservationDate`, `reservationTime`, and `specialRequests`. All fields are mandatory except `specialRequests`.
- `ReservationDto.java`: Used for API responses, providing a comprehensive view of a reservation. It includes `id`, `customerName`, `customerPhone`, `customerEmail`, `partySize`, `reservationDate`, `reservationTime`, `specialRequests`, `status`, and `createdAt`.

### Persistence Layer

- `ReservationRepository.java`: This Spring Data JPA repository extends `JpaRepository<Reservation, Long>` and provides standard CRUD operations for `Reservation` entities. It will also include a custom query method `findByReservationDateBetweenOrderByReservationTimeAsc` to retrieve reservations within a date range, ordered by time, for administrative viewing.

### Service Layer

- `ReservationService.java`: This service class encapsulates the business logic for reservations. It injects `ReservationRepository`.
  - `createReservation(CreateReservationRequest request)`: This method takes a `CreateReservationRequest` DTO, maps it to a `Reservation` entity, sets the initial `status` to `PENDING`, saves it using `reservationRepository.save()`, and returns a `ReservationDto`.
  - `getAllReservations()`: Retrieves all reservations from the database, maps them to `ReservationDto` objects, and returns a list.
  - `getReservationsByDateRange(LocalDate startDate, LocalDate endDate)`: Retrieves reservations within the specified date range, ordered by time, maps them to `ReservationDto` objects, and returns a list. It uses `reservationRepository.findByReservationDateBetweenOrderByReservationTimeAsc()`.
  - `getReservationById(Long id)`: Retrieves a single reservation by its ID. If not found, it throws a `ResourceNotFoundException`. It maps the entity to a `ReservationDto`.
  - `updateReservationStatus(Long id, ReservationStatus newStatus)`: Updates the status of an existing reservation. It fetches the reservation by ID, updates its status, saves the changes, and returns the updated `ReservationDto`. Throws `ResourceNotFoundException` if the reservation is not found.
  - `deleteReservation(Long id)`: Deletes a reservation by its ID. Throws `ResourceNotFoundException` if the reservation is not found.

### Controller Layer

- `ReservationController.java`: This public-facing REST controller handles customer reservation requests. It injects `ReservationService`.
  - `createReservation(@RequestBody @Valid CreateReservationRequest request)`: Handles POST requests to `/api/v1/reservations`. It calls `reservationService.createReservation()` and returns a `ResponseEntity` with the created `ReservationDto` and HTTP status 201 (Created).

- `AdminReservationController.java`: This admin-only REST controller provides endpoints for managing all reservations. It injects `ReservationService`.
  - `getAllReservations()`: Handles GET requests to `/api/v1/admin/reservations`. It calls `reservationService.getAllReservations()` and returns a `ResponseEntity` with a list of `ReservationDto` objects and HTTP status 200 (OK).
  - `getReservationsByDateRange(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate)`: Handles GET requests to `/api/v1/admin/reservations/by-date-range`. It calls `reservationService.getReservationsByDateRange()` and returns a `ResponseEntity` with a list of `ReservationDto` objects and HTTP status 200 (OK).
  - `getReservationById(@PathVariable Long id)`: Handles GET requests to `/api/v1/admin/reservations/{id}`. It calls `reservationService.getReservationById()` and returns a `ResponseEntity` with the `ReservationDto` and HTTP status 200 (OK). Throws `ResourceNotFoundException` if not found, which is handled by `GlobalExceptionHandler` to return 404.
  - `updateReservationStatus(@PathVariable Long id, @RequestParam ReservationStatus status)`: Handles PUT requests to `/api/v1/admin/reservations/{id}/status`. It calls `reservationService.updateReservationStatus()` and returns a `ResponseEntity` with the updated `ReservationDto` and HTTP status 200 (OK). Throws `ResourceNotFoundException` if not found.
  - `deleteReservation(@PathVariable Long id)`: Handles DELETE requests to `/api/v1/admin/reservations/{id}`. It calls `reservationService.deleteReservation()` and returns a `ResponseEntity` with HTTP status 204 (No Content). Throws `ResourceNotFoundException` if not found.

Error Handling: The controllers will rely on the `GlobalExceptionHandler` from the `shared-backend` feature to handle `ResourceNotFoundException` (returning 404 Not Found) and other general exceptions (returning 500 Internal Server Error).

---

## Order Management (Backend)

**Name:** `order-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Order.java` — JPA Entity — represents a customer's online food order, containing customer details, delivery information, total amount, status, and a list of associated OrderItem entities.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderItem.java` — JPA Entity — represents a single line item within an Order, linking to a MenuItem and storing quantity and price details.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderStatus.java` — Enum — defines the possible states an order can be in, such as PENDING_PAYMENT, RECEIVED, IN_PROGRESS, and DELIVERED.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderRepository.java` — Spring Data JPA Repository — provides standard CRUD operations for the Order entity and custom query methods for retrieving orders by customer ID and status.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderItemRepository.java` — Spring Data JPA Repository — provides standard CRUD operations for the OrderItem entity.
- `backend/src/main/java/com/farmaaishrestaurant/service/OrderService.java` — SERVICE layer — implements createOrder(CreateOrderRequest): OrderResponse, getOrderById(Long): OrderResponse, getOrdersByCustomerId(Long): List<OrderResponse>, getAllOrders(): List<OrderResponse>, and updateOrderStatus(Long, OrderStatus): OrderResponse; delegates payment to PaymentService and menu item lookup to MenuService.
- `backend/src/main/java/com/farmaaishrestaurant/controller/OrderController.java` — REST Controller — exposes public-facing API endpoints for customers to create new orders and retrieve their own order details.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminOrderController.java` — REST Controller — exposes admin-only API endpoints for viewing all orders and updating their statuses.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateOrderRequest.java` — DTO — used for incoming requests to create a new online order, encapsulating customer details and a list of items.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderItemRequest.java` — DTO — represents a single item within a CreateOrderRequest, specifying the menu item ID and desired quantity.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderResponse.java` — DTO — used for outgoing API responses, representing a full Order with its detailed items and payment gateway information.

**Feature Instruction:**

The Order Management (Backend) feature handles the complete lifecycle of customer food orders, from creation and payment initiation to status updates and retrieval. It integrates with the `menu-management` feature to validate menu items and with the pre-scaffolded `PaymentService` for payment processing. This feature exposes public API endpoints for customers to place orders and check their status, and admin-only endpoints for managing all orders.

## Order Creation Flow
1.  **`OrderController.createOrder(CreateOrderRequest request)`**: This endpoint receives a `CreateOrderRequest` from the frontend. It delegates to `OrderService.createOrder`.
2.  **`OrderService.createOrder(CreateOrderRequest request)`**: This method performs the following steps:
    a.  Validates that the `customerId` is provided in the `CreateOrderRequest`.
    b.  Initializes a new `Order` entity with `OrderStatus.PENDING_PAYMENT`, the provided `customerId`, `customerName`, `customerPhone`, `deliveryAddress`, and `notes`.
    c.  Iterates through `request.getOrderItems`:
        i.  For each `OrderItemRequest`, it calls `menu-management.MenuService.getMenuItemById(item.getMenuItemId())` to fetch the `MenuItemDto`.
        ii. If any `MenuItemDto` is not found, it throws a `ResourceNotFoundException` with a message like "Menu item with ID {menuItemId} not found."
        iii. Creates an `OrderItem` entity using the details from `MenuItemDto` and the requested `quantity`.
        iv. Calculates the `subTotal` for the order item (`menuItem.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()))`).
        v.  Adds the `OrderItem` to the `Order` entity's list of items.
    d.  Calculates the `totalAmount` for the `Order` by summing the `subTotal` of all `OrderItem`s.
    e.  Saves the `Order` entity using `OrderRepository.save()`.
    f.  Creates a `CreatePaymentRequest` using the `totalAmount` of the order, "INR" as currency, and a `referenceId` in the format "order_{orderId}" (where `orderId` is the ID of the newly saved `Order`).
    g.  Calls `PaymentService.createOrder(createPaymentRequest)` to initiate the payment process.
    h.  Updates the `Order` entity with the `gatewayOrderId` received from `PaymentService.createOrder` and saves it again.
    i.  Returns an `OrderResponse` containing the created `Order` details and the `PaymentOrderResponse` from the `PaymentService`.

## Order Status Update (Admin)
1.  **`AdminOrderController.updateOrderStatus(Long orderId, OrderStatus newStatus)`**: This endpoint allows administrators to update the status of an order. It delegates to `OrderService.updateOrderStatus`.
2.  **`OrderService.updateOrderStatus(Long orderId, OrderStatus newStatus)`**: This method performs the following steps:
    a.  Retrieves the `Order` by `orderId` using `OrderRepository.findById()`. If not found, throws `ResourceNotFoundException`.
    b.  Updates the `status` of the `Order` to `newStatus`.
    c.  Saves the updated `Order` using `OrderRepository.save()`.
    d.  Returns an `OrderResponse` for the updated order.

## Payment Capture Event Handling
1.  **`OrderService`** must listen for `PaymentCapturedEvent`s published by the `PaymentService`.
2.  **`@EventListener public void handlePaymentCapturedEvent(PaymentCapturedEvent event)`**: This method performs the following steps:
    a.  Extracts the `orderId` from `event.getReferenceId()` (e.g., parsing "order_123" to get 123).
    b.  Retrieves the `Order` by `orderId` using `OrderRepository.findById()`. If not found, logs a warning but does not throw an exception (as webhooks are asynchronous and the order might have been deleted).
    c.  If the order is found and its status is `PENDING_PAYMENT`, it updates the `Order`'s `status` to `RECEIVED` and saves it.

## Error Handling
-   `ResourceNotFoundException` will be thrown if an order or menu item is not found. The `GlobalExceptionHandler` in `shared-backend` will convert this to an HTTP 404 Not Found response.
-   `PaymentGatewayException` will be thrown by `PaymentService` if there are issues with the payment gateway. This will also be handled by `GlobalExceptionHandler`.

## DTOs
-   `CreateOrderRequest`: Used for incoming order creation requests. Contains `customerId`, `customerName`, `customerPhone`, `deliveryAddress`, `notes`, and a list of `OrderItemRequest`.
-   `OrderItemRequest`: Represents a single item in `CreateOrderRequest`, containing `menuItemId` and `quantity`.
-   `OrderResponse`: Used for outgoing order responses. Contains `id`, `customerId`, `customerName`, `customerPhone`, `deliveryAddress`, `notes`, `totalAmount`, `status`, `orderDate`, `gatewayOrderId`, and a list of `OrderItemResponse` (derived from `OrderItem` entities).
-   `OrderItemResponse`: Represents a single item in `OrderResponse`, containing `menuItemId`, `menuItemName`, `quantity`, `unitPrice`, and `subTotal`.

## Security
-   `/api/v1/orders` (POST) and `/api/v1/orders/{orderId}` (GET) are `authenticated` endpoints, requiring a logged-in user to place and view their own orders.
-   `/api/v1/admin/orders/**` endpoints are `admin` only, requiring an administrator role to access.

---

## Inquiry Management (Backend)

**Name:** `inquiry-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/CateringInquiry.java` — MODEL layer — defines the entity structure for catering inquiries, representing a customer's request for catering or private events.
- `backend/src/main/java/com/farmaaishrestaurant/repository/CateringInquiryRepository.java` — REPOSITORY layer — provides standard Spring Data JPA CRUD operations for `CateringInquiry` entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/CateringInquiryService.java` — SERVICE layer — implements `submitInquiry(CateringInquiryDto): CateringInquiryDto`, `getAllInquiries(): List<CateringInquiryDto>`, `getInquiryById(Long): CateringInquiryDto`, and `deleteInquiry(Long): void` for managing catering inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/controller/CateringInquiryController.java` — CONTROLLER layer — provides a public REST endpoint for customers to submit new catering inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminCateringInquiryController.java` — CONTROLLER layer — provides admin-only REST endpoints for viewing and managing catering inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CateringInquiryDto.java` — DTO layer — defines the data transfer object for `CateringInquiry` entities, used for API requests and responses.

**Feature Instruction:**

The Inquiry Management feature provides a backend system for Farmaaish Restaurant to handle catering and private event inquiries. It consists of a data model (`CateringInquiry.java`), a repository for database interaction (`CateringInquiryRepository.java`), a service layer for business logic (`CateringInquiryService.java`), and two controllers: one for public submission of inquiries (`CateringInquiryController.java`) and another for administrative management (`AdminCateringInquiryController.java`). A DTO (`CateringInquiryDto.java`) is used for data transfer between the service and controller layers.

### Data Model: CateringInquiry
`CateringInquiry.java` defines the entity structure for a catering inquiry, including fields such as `customerName`, `customerEmail`, `customerPhone`, `eventType`, `eventDate`, `numberOfGuests`, `budget`, `specialRequests`, and `inquiryDate`. All fields are mandatory except `budget` and `specialRequests`.

### Repository: CateringInquiryRepository
`CateringInquiryRepository.java` extends `JpaRepository` to provide standard CRUD operations for `CateringInquiry` entities. No custom query methods are required for this feature.

### Service: CateringInquiryService
`CateringInquiryService.java` encapsulates the business logic. It injects `CateringInquiryRepository` to perform database operations.

#### Public Functions:
1. `submitInquiry(CateringInquiryDto inquiryDto): CateringInquiryDto`
   - Steps:
     1. Validate `inquiryDto` fields (e.g., `customerName`, `customerEmail`, `eventDate`, `numberOfGuests` must not be null).
     2. Map the `CateringInquiryDto` to a `CateringInquiry` entity.
     3. Set the `inquiryDate` to the current date and time.
     4. Save the `CateringInquiry` entity using `cateringInquiryRepository.save()`.
     5. Map the saved entity back to a `CateringInquiryDto`.
     6. Return the `CateringInquiryDto`.
   - Error Cases: Throws `IllegalArgumentException` if required fields in `inquiryDto` are missing or invalid.

2. `getAllInquiries(): List<CateringInquiryDto>`
   - Steps:
     1. Retrieve all `CateringInquiry` entities from the database using `cateringInquiryRepository.findAll()`.
     2. Map each `CateringInquiry` entity to a `CateringInquiryDto`.
     3. Return the list of `CateringInquiryDto`.

3. `getInquiryById(Long id): CateringInquiryDto`
   - Steps:
     1. Retrieve the `CateringInquiry` entity by `id` using `cateringInquiryRepository.findById(id)`.
     2. If the inquiry is not found, throw `ResourceNotFoundException`.
     3. Map the found entity to a `CateringInquiryDto`.
     4. Return the `CateringInquiryDto`.
   - Error Cases: Throws `ResourceNotFoundException` if no inquiry with the given `id` is found.

4. `deleteInquiry(Long id): void`
   - Steps:
     1. Check if an inquiry with the given `id` exists using `cateringInquiryRepository.existsById(id)`.
     2. If the inquiry does not exist, throw `ResourceNotFoundException`.
     3. Delete the `CateringInquiry` entity by `id` using `cateringInquiryRepository.deleteById(id)`.
   - Error Cases: Throws `ResourceNotFoundException` if no inquiry with the given `id` is found.

### DTO: CateringInquiryDto
`CateringInquiryDto.java` defines the data transfer object for catering inquiries, mirroring the `CateringInquiry` entity but adapted for API interactions. It includes validation annotations for incoming requests.

### Controllers
`CateringInquiryController.java` handles public submissions, and `AdminCateringInquiryController.java` handles administrative operations. Both controllers inject `CateringInquiryService`.

#### CateringInquiryController (Public)
- Exposes a `POST /api/v1/inquiries/catering` endpoint for submitting new catering inquiries. It consumes `CateringInquiryDto` and returns the saved `CateringInquiryDto` with HTTP status 201 (Created). If validation fails, it returns HTTP status 400 (Bad Request).

#### AdminCateringInquiryController (Admin)
- Exposes `GET /api/v1/admin/inquiries/catering` to retrieve all catering inquiries. Returns a list of `CateringInquiryDto`.
- Exposes `GET /api/v1/admin/inquiries/catering/{id}` to retrieve a single catering inquiry by ID. Returns a `CateringInquiryDto` or HTTP status 404 (Not Found) if not found.
- Exposes `DELETE /api/v1/admin/inquiries/catering/{id}` to delete a catering inquiry by ID. Returns HTTP status 204 (No Content) on success or 404 (Not Found) if not found.

---

## Shared Frontend Utilities

**Name:** `shared-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/App.tsx` — The root component of the React application, responsible for setting up the router, global providers like AuthContext, and the main application layout.
- `frontend/src/api/client.ts` — Configures the global Axios instance, `apiClient`, for making authenticated API requests by attaching the JWT token from local storage.

**Feature Instruction:**

This feature provides core frontend utilities and the application's root component. `App.tsx` sets up the React Router, integrates the `AuthContext.Provider` from the `auth-ui` feature to manage global authentication state, and defines the main application layout including public and admin routes. It ensures that the `Toaster` component from `sonner` is available for displaying toast notifications across the application. The `client.ts` file configures a global Axios instance, `apiClient`, which is used for all backend API calls. This instance includes an interceptor that automatically attaches the JWT authentication token (stored in `localStorage` under the key 'token') to every outgoing request's `Authorization` header. It also handles API error responses by logging them and potentially redirecting to a login page if a 401 Unauthorized error occurs, ensuring a consistent approach to API communication and authentication across the frontend.

---

## Core UI & Static Pages

**Name:** `core-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/config/siteConfig.ts` — Central configuration file defining global site content such as brand name, navigation links, and footer details, consumed by the shared Layout component.
- `frontend/src/pages/HomePage.tsx` — The main landing page of the restaurant website, orchestrating the display of hero, featured menu, ambiance gallery, and testimonials sections.
- `frontend/src/components/home/HeroSection.tsx` — A full-bleed hero component for the homepage, displaying a background image, a prominent headline, subheadline, and primary call-to-action buttons.
- `frontend/src/components/home/FeaturedMenuSection.tsx` — Displays a curated grid of signature dishes on the homepage, fetching data via the `useMenu` hook and rendering each item with `MenuItemCard`.
- `frontend/src/components/home/AmbianceGallerySection.tsx` — A visually rich component for the homepage, showcasing the restaurant's interior and dining experience through a gallery of images.
- `frontend/src/components/home/TestimonialsSection.tsx` — A component for the homepage that displays customer reviews in a carousel or grid format to build social proof.
- `frontend/src/pages/AboutPage.tsx` — A static page detailing the restaurant's story, culinary philosophy, and heritage, wrapped in the shared Layout component.
- `frontend/src/pages/ContactPage.tsx` — A static page displaying contact information, opening hours, a click-to-call button, and an embedded map, wrapped in the shared Layout component.
- `frontend/src/pages/NotFoundPage.tsx` — A user-friendly 404 error page that guides users back to the home page, wrapped in the shared Layout component.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Secondary CTA: border border-[#D4AF37] text-[#D4AF37] font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

This feature provides the core UI and static pages for the Farmaaish Restaurant website, establishing the brand identity and user experience. It includes a central configuration file (`siteConfig.ts`) for global site details, and several static pages: `HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, and `NotFoundPage.tsx`. The `HomePage.tsx` is composed of several distinct components: `HeroSection.tsx`, `FeaturedMenuSection.tsx`, `AmbianceGallerySection.tsx`, and `TestimonialsSection.tsx`.

`siteConfig.ts` will define the restaurant's name, navigation links, and footer content. These values will be consumed by the shared `Layout` component (from `shared-frontend`) to render the consistent header and footer across the site. The navigation links will include paths to `/`, `/menu`, `/reservations`, `/catering`, `/about`, and `/contact`.

`HomePage.tsx` will serve as the landing page, orchestrating the display of its child components. It will use the `Layout` component for consistent header and footer rendering. The `HeroSection.tsx` will feature a full-bleed background image, a regal headline "Experience the Royal Flavors of Farmaaish" and a subheadline "Where every dish tells a story of Mughlai heritage and culinary excellence." It will include two CTAs: a primary "View Our Menu" linking to `/menu` and a secondary "Book a Table" linking to `/reservations`. The `FeaturedMenuSection.tsx` will display a curated selection of signature dishes. It will use the `useMenu` hook (from `menu-display`) to fetch a limited number of menu items (e.g., 6-8 items) to showcase. Each featured dish will be rendered using a `MenuItemCard` component (from `menu-display`), which will include an "Add to Order" button that calls `useCart().addItem()` (from `cart`). The `AmbianceGallerySection.tsx` will present a grid or carousel of high-quality images showcasing the restaurant's interior. The `TestimonialsSection.tsx` will display customer reviews in a carousel or grid format.

`AboutPage.tsx` will provide detailed information about Farmaaish Restaurant, its culinary philosophy, and the heritage of Mughlai cuisine. It will use the `Layout` component.

`ContactPage.tsx` will display the restaurant's contact details, including the address, phone number, and opening hours, all sourced from the business context. It will feature a click-to-call button for the phone number and an embedded Google Map using the provided coordinates. It will use the `Layout` component.

`NotFoundPage.tsx` will be a user-friendly 404 page, guiding users back to the home page with a prominent CTA. It will use the `Layout` component.

All pages and components will adhere strictly to the defined design tokens for colors, typography, and spacing to maintain a consistent and luxurious aesthetic.

---

## Authentication UI

**Name:** `auth-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/context/AuthContext.tsx` — React Context provider for managing authentication state. It exposes `isAuthenticated: boolean`, `token: string | null`, `login: (credentials: LoginRequest) => Promise<void>`, and `logout: () => void` to its consumers.
- `frontend/src/hooks/useAuth.ts` — Custom React hook for convenient access to the authentication context, returning `isAuthenticated: boolean`, `token: string | null`, `login: (credentials: LoginRequest) => Promise<void>`, and `logout: () => void`.
- `frontend/src/services/authService.ts` — Frontend service for authenticating with the backend. It provides `login(credentials: LoginRequest): Promise<AuthResponse>` to handle user authentication.
- `frontend/src/types/auth.ts` — TypeScript types for authentication data structures.
- `frontend/src/pages/LoginPage.tsx` — React page component for administrator login, consuming `useAuth` to handle authentication and redirect upon success.
- `frontend/src/components/ProtectedRoute.tsx` — React component that protects routes by checking user authentication status via `useAuth` and redirecting unauthenticated users to the login page.

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

This feature provides the core authentication mechanism for the Farmaaish Restaurant application, enabling administrators to log in and access protected routes. It consists of a React Context (`AuthContext.tsx`) to manage authentication state, a custom hook (`useAuth.ts`) for easy consumption of this context, a service file (`authService.ts`) to interact with the backend authentication API, and a type definition file (`auth.ts`). Additionally, it includes a `LoginPage.tsx` for the administrator login interface and a `ProtectedRoute.tsx` component to guard routes requiring authentication.

### `auth.ts`
This file defines the TypeScript interfaces for `LoginRequest` and `AuthResponse`. `LoginRequest` will have `username: string` and `password: string`. `AuthResponse` will contain `token: string` and `expiresIn: number`.

### `authService.ts`
This service is responsible for making API calls to the backend's authentication endpoints. It will export an `async` function `login(credentials: LoginRequest): Promise<AuthResponse>` that sends a POST request to `/api/v1/auth/login`. Upon successful login, it should return the `AuthResponse` from the backend. It will use the `apiClient` from `@/api/client.ts` to make the HTTP request.

### `AuthContext.tsx`
This file provides the `AuthContext` and `AuthProvider` components. The `AuthProvider` will manage the authentication state, including the user's JWT token. It will store the token in `localStorage` under the key `'token'` upon successful login and remove it upon logout. The context will expose `isAuthenticated: boolean`, `token: string | null`, `login: (credentials: LoginRequest) => Promise<void>`, and `logout: () => void`. The `login` function will call `authService.login`, store the token, and set `isAuthenticated` to `true`. The `logout` function will clear the token from `localStorage` and set `isAuthenticated` to `false`. The `AuthProvider` should initialize its state by checking for an existing token in `localStorage`.

### `useAuth.ts`
This custom hook simplifies access to the `AuthContext`. It will export a `useAuth` function that returns the context value, allowing components to easily consume authentication state and functions.

### `LoginPage.tsx`
This page provides the user interface for administrators to log in. It will consist of a form with input fields for username and password, and a submit button. Upon submission, it will call the `login` function from `useAuth`. If login is successful, the user should be redirected to the `/admin/dashboard` route. If there's an error, a toast notification should be displayed using `sonner` (ensure `<Toaster/>` is in `Layout.tsx`). The page should use the `Layout` component from `@/components/Layout`.

**Page Sections:**
- **Login Form Section:** A central, elegant card containing the login form. The card should have a `bg-white rounded-xl shadow-md border border-gray-100 p-8 max-w-md mx-auto`. The form inputs should have a `border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent` style. The submit button should use the `Primary CTA` design token.

**Content:**
- **Heading:** "Admin Login" (text-3xl font-bold text-center text-[#36454F])
- **Subheading:** "Access the Farmaaish Restaurant management portal." (text-gray-600 text-center mb-6)
- **Username Label:** "Username"
- **Password Label:** "Password"
- **Login Button Text:** "Login"

### `ProtectedRoute.tsx`
This component acts as a guard for routes that require authentication. It will receive `children` as props. It uses the `useAuth` hook to check if the user is authenticated. If not authenticated, it redirects the user to the `/login` page. Otherwise, it renders its `children`.


---

## Admin Portal

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/AdminDashboardPage.tsx` — Admin panel landing page — provides navigation to other administrative features.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#36454F] text-[#D4AF37]
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

The Admin Portal feature provides a central dashboard for restaurant staff to manage various aspects of the Farmaaish Restaurant operations. The `AdminDashboardPage.tsx` serves as the main entry point after successful authentication, offering a summary of key operational metrics and navigation links to other administrative sections like menu management, reservation management, order management, and catering inquiry management. This page is designed to be accessible only to authenticated administrators, leveraging the `AdminLayout` component from `@/components/AdminLayout` for consistent navigation and styling. It will display a welcoming message and provide quick links to the various admin sub-features.

### AdminDashboardPage.tsx
This page is the main landing page for the admin panel. It will display a greeting to the authenticated user and provide a set of navigation cards or links to other admin features. The page will be wrapped in the `AdminLayout` component to ensure consistent header, sidebar, and footer for the admin interface. It does not directly consume any backend APIs but provides navigation to pages that do.

**Content Sections:**
1.  **Welcome Section:** A prominent heading welcoming the administrator, e.g., "Welcome to Farmaaish Admin Portal".
2.  **Overview Cards/Links:** A grid of cards or links, each representing a different administrative area (e.g., Menu Management, Reservations, Orders, Catering Inquiries). Each card should have a title, a brief description, and an icon, styled to match the Mughlai aesthetic with deep maroon and gold accents. These links will navigate to the respective admin pages using `react-router-dom`.

**Styling:**
-   The overall layout will use `AdminLayout` for consistent branding and navigation.
-   Headings will use `text-4xl md:text-5xl font-bold text-[#36454F]`.
-   Navigation cards will be styled with `bg-white rounded-xl shadow-md border border-gray-100 p-6` and feature `text-[#800020]` for titles and `text-[#D4AF37]` for accents or icons. Hover effects will be subtle, e.g., `hover:shadow-lg`.
-   The main content area will be contained within `<div className="max-w-7xl mx-auto py-8 px-4">`.

---

## Menu Display (Frontend)

**Name:** `menu-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/menu.ts` — Generated from the backend API contract — defines TypeScript interfaces for MenuItem and MenuItemCategory.
- `frontend/src/services/menuService.ts` — SERVICE layer — provides functions to fetch and manage menu data from the backend API, including getAllMenuItems(): Promise<MenuItem[]>, getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]>, getMenuItemById(id: number): Promise<MenuItem>, getAllMenuItemCategories(): Promise<MenuItemCategory[]>, createMenuItem(item: MenuItem): Promise<MenuItem>, updateMenuItem(id: number, item: MenuItem): Promise<MenuItem>, deleteMenuItem(id: number): Promise<void>, createMenuItemCategory(category: MenuItemCategory): Promise<MenuItemCategory>, updateMenuItemCategory(id: number, category: MenuItemCategory): Promise<MenuItemCategory>, and deleteMenuItemCategory(id: number): Promise<void>.
- `frontend/src/hooks/useMenu.ts` — React Query hook for fetching and caching menu data, providing useMenuItems(), useMenuItemCategories(), useMenuItem(id), useCreateMenuItem(), useUpdateMenuItem(), useDeleteMenuItem(), useCreateMenuItemCategory(), useUpdateMenuItemCategory(), and useDeleteMenuItemCategory().
- `frontend/src/pages/MenuPage.tsx` — PAGE layer — displays the full restaurant menu with category filters and high-quality food photography.
- `frontend/src/components/menu/MenuCategoryTabs.tsx` — COMPONENT layer — a navigation component to filter the menu by category, accepting categories: MenuItemCategory[] and onSelectCategory: (categoryId: number | null) => void as props.
- `frontend/src/components/menu/MenuItemCard.tsx` — COMPONENT layer — card component to display a single menu item with image, name, price, and an 'Add to Order' button, accepting menuItem: MenuItem as props.
- `frontend/src/pages/AdminMenuPage.tsx` — PAGE layer — admin interface for managing the restaurant menu, composed of a data table and creation/edit forms.
- `frontend/src/components/menu/MenuTable.tsx` — COMPONENT layer — a data table displaying all menu items with controls for editing and deleting, accepting menuItems: MenuItem[], onEditMenuItem: (item: MenuItem) => void, and onDeleteMenuItem: (id: number) => void as props.
- `frontend/src/components/menu/MenuItemFormDialog.tsx` — COMPONENT layer — a dialog containing a form to create or edit a menu item, accepting isOpen: boolean, onClose: () => void, initialData?: MenuItem, categories: MenuItemCategory[], and onSubmit: (item: MenuItem) => void as props.

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

This feature provides the frontend components and logic for displaying the Farmaaish Restaurant menu to customers and managing it in the admin portal. It consists of TypeScript types, a service for API interaction, a React Query hook for data fetching, and several React components and pages.

`frontend/src/types/menu.ts` defines the `MenuItem` and `MenuItemCategory` interfaces, mirroring the backend DTOs from the `menu-management` feature. These types are used throughout the frontend for consistent data structures.

`frontend/src/services/menuService.ts` acts as the data access layer, providing asynchronous functions to interact with the backend `menu-management` API. It uses `apiClient` from `shared-frontend` to make HTTP requests. It includes functions for fetching all menu items, menu items by category, a single menu item by ID, and all menu item categories. For admin operations, it provides functions to create, update, and delete menu items and categories.

`frontend/src/hooks/useMenu.ts` is a React Query hook that leverages `menuService.ts` to fetch and cache menu data. It exports `useMenuItems`, `useMenuItemCategories`, `useMenuItem`, `useCreateMenuItem`, `useUpdateMenuItem`, `useDeleteMenuItem`, `useCreateMenuItemCategory`, `useUpdateMenuItemCategory`, and `useDeleteMenuItemCategory` for efficient data management and UI updates. These hooks handle loading, error states, and data invalidation.

`frontend/src/pages/MenuPage.tsx` is the public-facing menu page. It uses `Layout` from `@/components/Layout` and fetches all menu items and categories using `useMenu.ts`. It renders a hero section with a background image (https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80), a title "Our Exquisite Menu", and a subheadline "A Culinary Journey Through Mughlai Delicacies". It then displays `MenuCategoryTabs.tsx` for filtering and a grid of `MenuItemCard.tsx` components for each menu item. Each `MenuItemCard` must include an 'Add to Order' button that calls `useCart().addItem({ id: menuItem.id, name: menuItem.name, unitPrice: menuItem.price, imageUrl: menuItem.imageUrl })` from the `cart` framework.

`frontend/src/components/menu/MenuCategoryTabs.tsx` receives `categories` and `onSelectCategory` props. It renders a set of clickable tabs, allowing users to filter menu items by category. The active tab should be visually distinct.

`frontend/src/components/menu/MenuItemCard.tsx` displays a single menu item. It receives a `menuItem` prop of type `MenuItem`. It shows the item's image, name, description, and price (formatted in ₹ using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`). It includes an "Add to Order" button that, when clicked, adds the item to the cart using the `useCart` hook from the pre-scaffolded cart framework. The button should call `addItem({ id: menuItem.id, name: menuItem.name, unitPrice: menuItem.price, imageUrl: menuItem.imageUrl })`.

`frontend/src/pages/AdminMenuPage.tsx` is the administrative interface for menu management. It uses `AdminLayout` from `@/components/AdminLayout` and fetches all menu items and categories using `useMenu.ts`. It displays a `MenuTable.tsx` component to list all menu items and provides functionality to open `MenuItemFormDialog.tsx` for creating or editing menu items. It also includes a button to add new menu items.

`frontend/src/components/menu/MenuTable.tsx` receives `menuItems`, `onEditMenuItem`, and `onDeleteMenuItem` props. It renders a data table showing all menu items with columns for image, name, category, price, vegetarian status, and availability. Each row includes 'Edit' and 'Delete' buttons. The price should be formatted in ₹.

`frontend/src/components/menu/MenuItemFormDialog.tsx` is a dialog component containing a form for creating or editing a menu item. It receives `isOpen`, `onClose`, `initialData` (for editing), `categories`, and `onSubmit` props. The form fields include `name`, `description`, `price`, `imageUrl`, `vegetarian` (checkbox), `available` (checkbox), and `categoryId` (dropdown). On submission, it calls `useCreateMenuItem` or `useUpdateMenuItem` from `useMenu.ts`.

All monetary values (prices) displayed in `MenuPage.tsx`, `MenuItemCard.tsx`, and `MenuTable.tsx` must be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.


---

## Reservation Booking (Frontend)

**Name:** `reservation-booking`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/reservation.ts` — TypeScript types for reservation data, mirroring backend DTOs for consistent frontend-backend contracts.
- `frontend/src/services/reservationService.ts` — SERVICE layer — provides functions to interact with the backend reservation API for creating, fetching, updating, and deleting reservations.
- `frontend/src/hooks/useReservations.ts` — React Query hook for creating, fetching, updating, and deleting reservation data, providing caching and state management.
- `frontend/src/pages/ReservationPage.tsx` — PAGE layer — renders the customer-facing reservation booking form, including a hero section and the ReservationForm component.
- `frontend/src/components/reservation/ReservationForm.tsx` — COMPONENT layer — provides a form for users to input reservation details, using `useCreateReservation` to submit data.
- `frontend/src/pages/AdminReservationsPage.tsx` — PAGE layer — renders the administrative interface for viewing and managing all customer reservations, using `useAllReservations` and `ReservationsTable`.
- `frontend/src/components/reservation/ReservationsTable.tsx` — COMPONENT layer — displays a data table of reservations with options to confirm, cancel, or delete, consuming `useUpdateReservationStatus` and `useDeleteReservation`.

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

This feature provides the frontend interface for customers to book reservations and for administrators to manage them. It consists of TypeScript types, a service layer for API interaction, React Query hooks for data fetching and mutation, and two main pages: `ReservationPage.tsx` for customer bookings and `AdminReservationsPage.tsx` for administrative management. Supporting components `ReservationForm.tsx` and `ReservationsTable.tsx` handle the UI for booking and displaying reservations respectively.

### Data Structures (`reservation.ts`)
The `reservation.ts` file defines the TypeScript interfaces for `Reservation`, `CreateReservationRequest`, and `ReservationStatus` which mirror the backend `ReservationDto`, `CreateReservationRequest`, and `ReservationStatus` data shapes from the `reservation-system` feature. These types ensure strong typing throughout the frontend application.

### API Service (`reservationService.ts`)
The `reservationService.ts` file encapsulates all direct API calls to the `reservation-system` backend. It uses the `apiClient` from `@/api/client.ts` to make HTTP requests. It provides the following asynchronous functions:

1.  `createReservation(reservationData: CreateReservationRequest): Promise<Reservation>`
    -   Sends a POST request to `/api/v1/reservations` with the `reservationData` to create a new reservation.
    -   Returns the created `Reservation` object on success.
    -   Throws an error if the API call fails.

2.  `getAllReservations(): Promise<Reservation[]>`
    -   Sends a GET request to `/api/v1/admin/reservations` to fetch all reservations.
    -   Requires authentication (handled by `apiClient` interceptor).
    -   Returns a list of `Reservation` objects.
    -   Throws an error if the API call fails.

3.  `updateReservationStatus(id: number, status: ReservationStatus): Promise<Reservation>`
    -   Sends a PUT request to `/api/v1/admin/reservations/{id}/status` with the new `status`.
    -   Requires authentication.
    -   Returns the updated `Reservation` object.
    -   Throws an error if the API call fails.

4.  `deleteReservation(id: number): Promise<void>`
    -   Sends a DELETE request to `/api/v1/admin/reservations/{id}`.
    -   Requires authentication.
    -   Returns nothing on successful deletion.
    -   Throws an error if the API call fails.

### React Query Hooks (`useReservations.ts`)
The `useReservations.ts` file provides React Query hooks for managing reservation data, offering caching, background refetching, and simplified state management. It depends on `reservationService.ts` for actual API interaction.

1.  `useCreateReservation()`
    -   Returns a mutation hook for creating reservations.
    -   `mutate(reservationData: CreateReservationRequest)`: Calls `reservationService.createReservation`.
    -   On success, it invalidates the `['reservations']` query to refetch the list of all reservations.

2.  `useAllReservations()`
    -   Returns a query hook for fetching all reservations.
    -   `queryKey: ['reservations']`
    -   `queryFn: reservationService.getAllReservations`

3.  `useUpdateReservationStatus()`
    -   Returns a mutation hook for updating reservation status.
    -   `mutate({ id: number, status: ReservationStatus })`: Calls `reservationService.updateReservationStatus`.
    -   On success, it invalidates the `['reservations']` query.

4.  `useDeleteReservation()`
    -   Returns a mutation hook for deleting reservations.
    -   `mutate(id: number)`: Calls `reservationService.deleteReservation`.
    -   On success, it invalidates the `['reservations']` query.

### Customer Reservation Page (`ReservationPage.tsx`)
The `ReservationPage.tsx` renders the `ReservationForm` component within the main `Layout` from `@/components/Layout`. It presents a welcoming section with a hero image and a call to action for booking a table. The form itself is designed to be elegant and user-friendly, capturing all necessary details for a reservation.

**Sections:**
- **Hero Section:** A full-width hero image (Unsplash URL for restaurant) with a dark overlay. Contains a prominent `h1` with the business name "Farmaaish Restaurant" and a subheadline "Experience the Grandeur of Mughlai Cuisine. Book Your Table Today.". Text color is white.
- **Reservation Form Section:** A section with a `bg-white` background. Contains a `div` with `max-w-3xl mx-auto` for content. A `h2` with text "Reserve Your Table" and a brief inviting paragraph. The `ReservationForm` component is rendered here.

### Reservation Form Component (`ReservationForm.tsx`)
The `ReservationForm.tsx` component is a client-side form for submitting reservation details. It uses `react-hook-form` for form management and `zod` for validation. It consumes the `useCreateReservation` hook to submit the form data to the backend. Upon successful submission, it should display a success toast message (using `sonner`) and clear the form. On error, it should display an error toast.

**Form Fields:**
- `customerName`: Text input, required.
- `customerPhone`: Text input, required, Indian phone number format.
- `customerEmail`: Email input, required, valid email format.
- `partySize`: Number input, required, minimum 1.
- `reservationDate`: Date picker, required, future date only.
- `reservationTime`: Time picker, required, within opening hours (11:00 AM to 11:00 PM).
- `specialRequests`: Textarea, optional.

**Styling:**
- Uses Tailwind CSS for styling, adhering to the design tokens. Inputs should have a clean, modern look with focus states.
- The submit button should use the `Primary CTA` design token.

### Admin Reservations Page (`AdminReservationsPage.tsx`)
The `AdminReservationsPage.tsx` provides an administrative view of all reservations. It uses the `useAllReservations` hook to fetch reservation data and renders the `ReservationsTable` component to display them. This page is wrapped in `AdminLayout` from `@/components/AdminLayout`.

**Sections:**
- **Header Section:** Contains an `h1` with text "Manage Reservations" and a brief description.
- **Reservations Table Section:** Displays the `ReservationsTable` component, showing all fetched reservations.

### Reservations Table Component (`ReservationsTable.tsx`)
The `ReservationsTable.tsx` component displays a list of reservations in a tabular format. It receives reservation data as props and provides actions to update the status (e.g., confirm, cancel) or delete a reservation. It uses `useUpdateReservationStatus` and `useDeleteReservation` hooks for these actions. Each action should trigger a toast notification for success or failure.

**Table Columns:**
- `ID`
- `Customer Name`
- `Phone`
- `Email`
- `Party Size`
- `Date` (formatted `DD/MM/YYYY`)
- `Time` (formatted `HH:MM AM/PM`)
- `Special Requests`
- `Status` (with a visual indicator, e.g., badge)
- `Created At` (formatted `DD/MM/YYYY HH:MM AM/PM`)
- `Actions` (buttons for "Confirm", "Cancel", "Delete")

**Styling:**
- Uses Tailwind CSS for a clean, readable table. Status badges should use appropriate colors (e.g., gold for PENDING, green for CONFIRMED, red for CANCELLED).
- Action buttons should be styled consistently with the admin portal theme.


---

## Online Ordering Flow (Frontend)

**Name:** `order-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/order.ts`
- `frontend/src/services/orderService.ts`
- `frontend/src/hooks/useOrders.ts`
- `frontend/src/pages/CheckoutPage.tsx`
- `frontend/src/components/order/OrderSummary.tsx`
- `frontend/src/components/order/DeliveryDetailsForm.tsx`
- `frontend/src/components/order/PaymentSection.tsx`
- `frontend/src/pages/OrderConfirmationPage.tsx`
- `frontend/src/pages/AdminOrdersPage.tsx`
- `frontend/src/components/order/OrdersTable.tsx`

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

This feature implements the complete online ordering flow for Farmaaish Restaurant, from cart checkout to order confirmation and admin management. It integrates with the pre-scaffolded cart framework and the backend `order-management` feature.

### `order.ts`
Defines the TypeScript interfaces for `Order`, `OrderItem`, `CreateOrderRequest`, `OrderItemRequest`, and `OrderResponse` based on the backend `order-management` feature's DTOs. These types ensure strong typing throughout the frontend order flow.

### `orderService.ts`
This service provides asynchronous functions to interact with the backend `order-management` API. It exports `createOrder` to submit a new order, `getOrderById` to fetch a specific order, `getOrdersByCustomerId` to retrieve all orders for a given customer, `getAllOrders` for admin purposes, and `updateOrderStatus` to change an order's status. All functions use the `apiClient` from `shared-frontend` and handle request/response mapping to the defined types in `order.ts`.

### `useOrders.ts`
This React Query hook centralizes data fetching and mutation logic for orders. It exports:
- `useCreateOrder()`: A mutation hook for creating new orders. It takes a `CreateOrderRequest` as input and calls `orderService.createOrder()`. On success, it invalidates relevant queries (e.g., `['orders']`).
- `useOrder(orderId: Long)`: A query hook to fetch a single order by its ID, calling `orderService.getOrderById(orderId)`.
- `useCustomerOrders(customerId: Long)`: A query hook to fetch all orders for a specific customer, calling `orderService.getOrdersByCustomerId(customerId)`.
- `useAllOrders()`: A query hook for admin use to fetch all orders, calling `orderService.getAllOrders()`.
- `useUpdateOrderStatus()`: A mutation hook to update an order's status, calling `orderService.updateOrderStatus(orderId, newStatus)`.

### `CheckoutPage.tsx`
This page orchestrates the multi-step checkout process. It uses the `useCart` hook from `@/cart` to display cart items and totals. The page will have three main sections:
1.  **Order Summary**: Displays items from `useCart().cartItems` and `useCart().totals`. This section will render the `OrderSummary` component.
2.  **Delivery Details**: A form for the user to input `customerName`, `customerPhone`, and `deliveryAddress`. This section will render the `DeliveryDetailsForm` component.
3.  **Payment**: Integrates with the payment gateway. This section will render the `PaymentSection` component, which will use `useCreateOrder` from `useOrders.ts` to submit the order.

The `CheckoutPage` will manage the state for delivery details and pass them down to `PaymentSection` when the user proceeds to payment. Upon successful order creation, it will navigate the user to the `OrderConfirmationPage`.

### `OrderSummary.tsx`
This component receives `cartItems` and `totals` as props. It renders a detailed list of items, their quantities, unit prices, and sub-totals. It also displays the overall `subtotal`, `adjustments`, and `total` from the cart. All monetary values must be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### `DeliveryDetailsForm.tsx`
This component provides a form for capturing customer delivery information. It will have input fields for `customerName`, `customerPhone`, and `deliveryAddress`. It should include basic client-side validation for these fields. The component will expose an `onSubmit` prop that passes the collected delivery details to its parent (`CheckoutPage.tsx`).

### `PaymentSection.tsx`
This component is responsible for initiating the order creation and payment process. It receives the `deliveryDetails` from `CheckoutPage.tsx`. When the user clicks the "Place Order" button, it constructs a `CreateOrderRequest` using `deliveryDetails` and `useCart().cartItems`. Each `CartItem` from `useCart().cartItems` will be mapped to an `OrderItemRequest` with `menuItemId`, and `quantity`. The `totalAmount` will be `useCart().totals.total`. It then calls `useCreateOrder().mutate()` to submit the order to the backend. Upon successful order creation, it should clear the cart using `useCart().clearCart()` and navigate to the `OrderConfirmationPage` with the `orderId`.

### `OrderConfirmationPage.tsx`
This page displays the details of a successfully placed order. It retrieves the `orderId` from the URL parameters and uses `useOrder(orderId)` to fetch the order details. It presents the `OrderResponse` data, including `orderId`, `customerName`, `deliveryAddress`, `totalAmount`, `orderDate`, and a list of `orderItems`. It should also display an estimated delivery time (placeholder text: "Estimated delivery in 45-60 minutes"). All monetary values must be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### `AdminOrdersPage.tsx`
This page provides an administrative interface for viewing and managing all online orders. It uses `useAllOrders()` to fetch a list of all orders. It renders the `OrdersTable` component, passing the fetched orders as props. It should also include controls for filtering orders by status (e.g., "PENDING_PAYMENT", "RECEIVED", "DELIVERED").

### `OrdersTable.tsx`
This component displays a tabular view of orders. It receives a list of `OrderResponse` objects as props. Each row in the table will show `orderId`, `customerName`, `totalAmount` (formatted in INR), `status`, and `orderDate`. It should also include a dropdown or buttons to update the `status` of an order, which will trigger the `useUpdateOrderStatus()` mutation from `useOrders.ts`. The table should be sortable by columns and allow for pagination if the order list is long.

## Inter-file Wiring
- `CheckoutPage.tsx` imports `OrderSummary.tsx`, `DeliveryDetailsForm.tsx`, `PaymentSection.tsx`.
- `PaymentSection.tsx` imports `useOrders.ts` and `@/cart`.
- `OrderConfirmationPage.tsx` imports `useOrders.ts`.
- `AdminOrdersPage.tsx` imports `useOrders.ts` and `OrdersTable.tsx`.
- `OrdersTable.tsx` imports `order.ts` and `useOrders.ts`.
- `useOrders.ts` imports `orderService.ts` and `order.ts`.
- `orderService.ts` imports `apiClient` from `shared-frontend` and `order.ts`.

## Cross-Feature Contracts
- This feature consumes the `order-management` backend API endpoints:
  - `POST /api/v1/orders` to create new orders.
  - `GET /api/v1/orders/{orderId}` to fetch a specific order.
  - `GET /api/v1/orders/customer/{customerId}` to fetch orders for a customer.
  - `GET /api/v1/admin/orders` to fetch all orders (admin).
  - `PUT /api/v1/admin/orders/{orderId}/status` to update order status (admin).
- This feature uses the `useCart` hook from the pre-scaffolded `@/cart` framework.
- This feature uses `apiClient` from `shared-frontend` to make API calls.

---

## Inquiry Forms (Frontend)

**Name:** `inquiry-form`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/inquiry.ts` — Generated from the backend API contract — TypeScript types for catering inquiry data.
- `frontend/src/services/inquiryService.ts` — SERVICE layer — provides functions to submitCateringInquiry(inquiry: CateringInquiryDto): Promise<CateringInquiryDto> and getAllCateringInquiries(): Promise<CateringInquiryDto[]>.
- `frontend/src/hooks/useInquiries.ts` — HOOK layer — provides React Query hooks useSubmitCateringInquiry() and useAllCateringInquiries() for managing catering inquiry data.
- `frontend/src/pages/CateringPage.tsx` — PAGE layer — renders the public-facing catering information and inquiry form.
- `frontend/src/components/inquiry/CateringInquiryForm.tsx` — COMPONENT layer — renders a form for users to submit catering inquiry details.
- `frontend/src/pages/AdminCateringInquiriesPage.tsx` — PAGE layer — renders the admin interface for viewing and managing catering inquiries.
- `frontend/src/components/inquiry/InquiriesTable.tsx` — COMPONENT layer — displays a data table listing all catering inquiries.

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

This feature provides a frontend interface for users to submit catering inquiries and for administrators to manage them. It consists of TypeScript types, a service for API interaction, a React Query hook for data management, a public-facing catering page with an inquiry form, an admin page to view inquiries, and a component to display inquiries in a table.

`inquiry.ts` defines the `CateringInquiryDto` interface, which mirrors the backend DTO for catering inquiries. This ensures type safety across the frontend application.

`inquiryService.ts` handles the communication with the backend API. It exports `submitCateringInquiry(inquiry: CateringInquiryDto): Promise<CateringInquiryDto>` for creating new inquiries and `getAllCateringInquiries(): Promise<CateringInquiryDto[]>` for fetching all inquiries. It uses the `apiClient` from `@/api/client` for making HTTP requests.

`useInquiries.ts` provides React Query hooks built on top of `inquiryService.ts`. It exports `useSubmitCateringInquiry()` for submitting new inquiries and `useAllCateringInquiries()` for fetching all inquiries. These hooks manage loading states, error handling, and data caching, simplifying data management in components.

`CateringPage.tsx` is the public-facing page where users can learn about Farmaaish Restaurant's catering services and submit an inquiry. It will feature a hero section with a relevant image and compelling copy, followed by sections detailing catering offerings. The page will include the `CateringInquiryForm` component. The page content should be wrapped in the `Layout` component from `@/components/Layout`.

`CateringInquiryForm.tsx` is a reusable component that renders a form for users to input their catering inquiry details. It uses `react-hook-form` for form management and `useSubmitCateringInquiry()` from `useInquiries.ts` to submit the form data. Upon successful submission, it should display a success toast message (using `sonner`) and clear the form. The form fields include `customerName`, `customerEmail`, `customerPhone`, `eventType`, `eventDate`, `numberOfGuests`, `budget`, and `specialRequests`.

`AdminCateringInquiriesPage.tsx` is an authenticated page for administrators to view and manage all submitted catering inquiries. It uses `useAllCateringInquiries()` from `useInquiries.ts` to fetch the data and renders the `InquiriesTable` component to display them. The page content should be wrapped in the `AdminLayout` component from `@/components/AdminLayout`.

`InquiriesTable.tsx` is a presentational component that displays a list of `CateringInquiryDto` objects in a table format. It receives the inquiries as props and renders each inquiry's details, including `customerName`, `customerEmail`, `customerPhone`, `eventType`, `eventDate`, `numberOfGuests`, `budget` (formatted in INR), and `inquiryDate`.

---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

