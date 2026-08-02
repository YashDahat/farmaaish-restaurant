# Feature Enrichment — Attempt 3

Generated: 2026-08-02

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend Utilities

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/exception/GlobalExceptionHandler.java` — Centralized exception handler that catches application-wide exceptions and translates them into standardized HTTP responses using the `ErrorResponse` DTO. It handles `ResourceNotFoundException` by returning a 404 Not Found status.
- `backend/src/main/java/com/farmaaishrestaurant/exception/ResourceNotFoundException.java` — Custom unchecked exception that can be thrown by service layers when a requested resource is not found, allowing the `GlobalExceptionHandler` to catch and process it.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ErrorResponse.java` — DTO layer — defines the structure for standardized error responses returned by the API, including timestamp, HTTP status, error message, and request path.
- `backend/src/main/java/com/farmaaishrestaurant/config/DataSeeder.java` — Configuration component that implements `CommandLineRunner` to populate the database with initial `MenuItem`, `MenuItemCategory`, and `Event` data on application startup.

**Feature Instruction:**

This feature provides core backend utilities, including a global exception handler, a custom resource not found exception, a standardized error response DTO, and a data seeder for initial application setup. The `GlobalExceptionHandler` intercepts specific exceptions, such as `ResourceNotFoundException`, and maps them to a consistent `ErrorResponse` DTO, ensuring a uniform error structure for API consumers. The `ResourceNotFoundException` is a custom unchecked exception that services can throw when an entity is not found. The `ErrorResponse` DTO defines the structure for error messages, including a timestamp, status, error message, and path. The `DataSeeder` component is responsible for populating the database with initial data for menu items, menu item categories, and events upon application startup. It injects `MenuItemRepository`, `MenuItemCategoryRepository`, and `EventRepository` to persist the initial data. This ensures that the application has essential data available immediately after deployment.

---

## Menu Management (Backend)

**Name:** `menu-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItem.java` — MODEL layer — defines the structure and relationships for a menu item.
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItemCategory.java` — MODEL layer — defines the structure for a menu item category.
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemRepository.java` — REPOSITORY layer — provides CRUD operations and custom queries for `MenuItem` entities.
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemCategoryRepository.java` — REPOSITORY layer — provides CRUD operations and custom queries for `MenuItemCategory` entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/MenuService.java` — SERVICE layer — implements business logic for menu items and categories, exposing methods like `getAllMenuItems(): List<MenuItemDto>` and `createMenuItem(MenuItemDto): MenuItemDto`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/MenuController.java` — CONTROLLER layer — exposes public REST endpoints for fetching menu items and categories.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminMenuController.java` — CONTROLLER layer — exposes admin-only REST endpoints for CRUD operations on menu items and categories.
- `backend/src/main/java/com/farmaaishrestaurant/dto/MenuItemDto.java` — DTO layer — defines the data structure for transferring menu item information between layers.

**Feature Instruction:**

The Menu Management feature provides a complete backend solution for managing the restaurant's menu items and categories. It includes models for `MenuItem` and `MenuItemCategory`, repositories for data persistence, a service layer for business logic, and two controllers: one for public access to the menu and another for administrative CRUD operations. The public `MenuController` allows any user to view menu items and categories, while the `AdminMenuController` provides authenticated administrators with the ability to create, update, and delete menu items and categories.

### Data Models
- `MenuItem.java`: Represents a single dish or beverage. It includes fields for `id` (UUID), `name` (String), `description` (String), `price` (BigDecimal), `imageUrl` (String), `vegetarian` (boolean), `spicy` (boolean), and a many-to-one relationship with `MenuItemCategory`.
- `MenuItemCategory.java`: Represents a category like 'Appetizers' or 'Main Course'. It includes fields for `id` (UUID), `name` (String), and `description` (String).

### Repositories
- `MenuItemRepository.java`: Extends `JpaRepository` for `MenuItem` entities. It will include a custom query method `findByCategoryId(UUID categoryId)` to fetch menu items by their category.
- `MenuItemCategoryRepository.java`: Extends `JpaRepository` for `MenuItemCategory` entities. It will include a custom query method `findByName(String name)` to find a category by its name.

### Service Layer (`MenuService.java`)
`MenuService` orchestrates data access and business logic for menu items and categories. It injects `MenuItemRepository` and `MenuItemCategoryRepository`.

**Public Methods:**

1.  `List<MenuItemDto> getAllMenuItems()`:
    -   **Logic:**
        1.  Retrieve all `MenuItem` entities from `MenuItemRepository`.
        2.  Map each `MenuItem` to a `MenuItemDto`.
        3.  Return the list of `MenuItemDto`s.
    -   **Returns:** `List<MenuItemDto>`

2.  `MenuItemDto getMenuItemById(UUID id)`:
    -   **Logic:**
        1.  Find `MenuItem` by `id` using `MenuItemRepository`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Map the found `MenuItem` to a `MenuItemDto`.
        4.  Return the `MenuItemDto`.
    -   **Returns:** `MenuItemDto`
    -   **Errors:** `ResourceNotFoundException` (HTTP 404)

3.  `List<MenuItemDto> getMenuItemsByCategoryId(UUID categoryId)`:
    -   **Logic:**
        1.  Find `MenuItem`s by `categoryId` using `MenuItemRepository.findByCategoryId`.
        2.  Map each `MenuItem` to a `MenuItemDto`.
        3.  Return the list of `MenuItemDto`s.
    -   **Returns:** `List<MenuItemDto>`

4.  `List<MenuItemCategory> getAllMenuItemCategories()`:
    -   **Logic:**
        1.  Retrieve all `MenuItemCategory` entities from `MenuItemCategoryRepository`.
        2.  Return the list of `MenuItemCategory` entities.
    -   **Returns:** `List<MenuItemCategory>`

5.  `MenuItemCategory getMenuItemCategoryById(UUID id)`:
    -   **Logic:**
        1.  Find `MenuItemCategory` by `id` using `MenuItemCategoryRepository`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Return the `MenuItemCategory`.
    -   **Returns:** `MenuItemCategory`
    -   **Errors:** `ResourceNotFoundException` (HTTP 404)

6.  `MenuItemDto createMenuItem(MenuItemDto menuItemDto)`:
    -   **Logic:**
        1.  Validate `menuItemDto` (e.g., category exists).
        2.  If `menuItemDto.getCategoryId()` is provided, retrieve the `MenuItemCategory` using `MenuItemCategoryRepository.findById`. If not found, throw `ResourceNotFoundException`.
        3.  Map `menuItemDto` to a `MenuItem` entity.
        4.  Save the `MenuItem` entity using `MenuItemRepository`.
        5.  Map the saved `MenuItem` back to a `MenuItemDto`.
        6.  Return the `MenuItemDto`.
    -   **Returns:** `MenuItemDto`
    -   **Errors:** `ResourceNotFoundException` (HTTP 404 if category not found), `IllegalArgumentException` (HTTP 400 for invalid input)

7.  `MenuItemDto updateMenuItem(UUID id, MenuItemDto menuItemDto)`:
    -   **Logic:**
        1.  Find existing `MenuItem` by `id` using `MenuItemRepository`. If not found, throw `ResourceNotFoundException`.
        2.  If `menuItemDto.getCategoryId()` is provided, retrieve the `MenuItemCategory` using `MenuItemCategoryRepository.findById`. If not found, throw `ResourceNotFoundException`.
        3.  Update the existing `MenuItem` entity with data from `menuItemDto`.
        4.  Save the updated `MenuItem` entity using `MenuItemRepository`.
        5.  Map the saved `MenuItem` back to a `MenuItemDto`.
        6.  Return the `MenuItemDto`.
    -   **Returns:** `MenuItemDto`
    -   **Errors:** `ResourceNotFoundException` (HTTP 404), `IllegalArgumentException` (HTTP 400 for invalid input)

8.  `void deleteMenuItem(UUID id)`:
    -   **Logic:**
        1.  Check if `MenuItem` exists by `id` using `MenuItemRepository`. If not found, throw `ResourceNotFoundException`.
        2.  Delete the `MenuItem` entity using `MenuItemRepository`.
    -   **Returns:** `void`
    -   **Errors:** `ResourceNotFoundException` (HTTP 404)

9.  `MenuItemCategory createMenuItemCategory(MenuItemCategory category)`:
    -   **Logic:**
        1.  Save the `MenuItemCategory` entity using `MenuItemCategoryRepository`.
        2.  Return the saved `MenuItemCategory`.
    -   **Returns:** `MenuItemCategory`

10. `MenuItemCategory updateMenuItemCategory(UUID id, MenuItemCategory category)`:
    -   **Logic:**
        1.  Find existing `MenuItemCategory` by `id` using `MenuItemCategoryRepository`. If not found, throw `ResourceNotFoundException`.
        2.  Update the existing `MenuItemCategory` entity with data from `category`.
        3.  Save the updated `MenuItemCategory` entity using `MenuItemCategoryRepository`.
        4.  Return the saved `MenuItemCategory`.
    -   **Returns:** `MenuItemCategory`
    -   **Errors:** `ResourceNotFoundException` (HTTP 404)

11. `void deleteMenuItemCategory(UUID id)`:
    -   **Logic:**
        1.  Check if `MenuItemCategory` exists by `id` using `MenuItemCategoryRepository`. If not found, throw `ResourceNotFoundException`.
        2.  Check if any `MenuItem`s are associated with this category using `MenuItemRepository.findByCategoryId`. If items exist, throw `IllegalStateException`.
        3.  Delete the `MenuItemCategory` entity using `MenuItemCategoryRepository`.
    -   **Returns:** `void`
    -   **Errors:** `ResourceNotFoundException` (HTTP 404), `IllegalStateException` (HTTP 409 if items are associated)

### Controllers

-   `MenuController.java`: Exposes public API endpoints for fetching menu items and categories. It injects `MenuService`.
    -   `getAllMenuItems()` calls `menuService.getAllMenuItems()`.
    -   `getMenuItemById(UUID id)` calls `menuService.getMenuItemById(id)`.
    -   `getMenuItemsByCategoryId(UUID categoryId)` calls `menuService.getMenuItemsByCategoryId(categoryId)`.
    -   `getAllMenuItemCategories()` calls `menuService.getAllMenuItemCategories()`.
    -   `getMenuItemCategoryById(UUID id)` calls `menuService.getMenuItemCategoryById(id)`.

-   `AdminMenuController.java`: Exposes admin-only API endpoints for CRUD operations on menu items and categories. It injects `MenuService`.
    -   `createMenuItem(MenuItemDto menuItemDto)` calls `menuService.createMenuItem(menuItemDto)`.
    -   `updateMenuItem(UUID id, MenuItemDto menuItemDto)` calls `menuService.updateMenuItem(id, menuItemDto)`.
    -   `deleteMenuItem(UUID id)` calls `menuService.deleteMenuItem(id)`.
    -   `createMenuItemCategory(MenuItemCategory category)` calls `menuService.createMenuItemCategory(category)`.
    -   `updateMenuItemCategory(UUID id, MenuItemCategory category)` calls `menuService.updateMenuItemCategory(id, category)`.
    -   `deleteMenuItemCategory(UUID id)` calls `menuService.deleteMenuItemCategory(id)`.

### DTOs
-   `MenuItemDto.java`: Used for transferring menu item data between the service and controller layers. It mirrors the `MenuItem` entity but includes `categoryId` (UUID) instead of the full `MenuItemCategory` object, and omits the `id` for creation requests.

---

## Reservation System (Backend)

**Name:** `reservation-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Reservation.java` — MODEL layer — represents a customer's table reservation with details like name, contact, date, time, party size, and status.
- `backend/src/main/java/com/farmaaishrestaurant/model/ReservationStatus.java` — MODEL layer — defines the possible states for a reservation.
- `backend/src/main/java/com/farmaaishrestaurant/repository/ReservationRepository.java` — REPOSITORY layer — provides standard CRUD operations for `Reservation` entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/ReservationService.java` — SERVICE layer — implements `createReservation(ReservationRequest): Reservation`, `getAllReservations(): List<Reservation>`, `getReservationById(UUID): Reservation`, `updateReservation(UUID, Reservation): Reservation`, and `deleteReservation(UUID): void`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/ReservationController.java` — CONTROLLER layer — exposes public API endpoints for creating reservations.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminReservationController.java` — CONTROLLER layer — exposes admin API endpoints for viewing and managing all reservations.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ReservationRequest.java` — DTO layer — defines the data structure for creating a new reservation.

**Feature Instruction:**

The Reservation System (Backend) feature manages customer table reservations for Farmaaish Restaurant. It provides public-facing APIs for customers to create new reservations and admin-only APIs for staff to view and manage all reservations. The core of this feature is the `Reservation` entity, which tracks details like customer name, contact, date, time, party size, and status. Reservations are created via the `ReservationController` using the `ReservationRequest` DTO. The `ReservationService` handles the business logic, including persisting reservations through the `ReservationRepository`. Admin staff can access and modify all reservations through the `AdminReservationController`.

### Reservation Creation Flow
1.  A customer submits a reservation request to `POST /api/v1/reservations` with a `ReservationRequest` body.
2.  The `ReservationController.createReservation` method receives the request.
3.  It calls `reservationService.createReservation(request)`.
4.  `ReservationService.createReservation` performs the following steps:
    a.  Validates the `ReservationRequest` (e.g., date/time in future, party size within limits).
    b.  Creates a new `Reservation` entity, setting its initial `status` to `PENDING`.
    c.  Persists the `Reservation` entity using `reservationRepository.save()`.
    d.  Returns the saved `Reservation` entity.
5.  The `ReservationController` returns a `201 Created` response with the created `Reservation` entity.

### Admin Reservation Management Flow
1.  An authenticated admin user requests to view all reservations via `GET /api/v1/admin/reservations`.
2.  The `AdminReservationController.getAllReservations` method receives the request.
3.  It calls `reservationService.getAllReservations()`.
4.  `ReservationService.getAllReservations` retrieves all `Reservation` entities from `reservationRepository.findAll()`.
5.  The `AdminReservationController` returns a `200 OK` response with a list of `Reservation` entities.

6.  An authenticated admin user requests to update a reservation via `PUT /api/v1/admin/reservations/{id}` with a `Reservation` body.
7.  The `AdminReservationController.updateReservation` method receives the request.
8.  It calls `reservationService.updateReservation(id, reservation)`.
9.  `ReservationService.updateReservation` performs the following steps:
    a.  Retrieves the existing `Reservation` by `id` using `reservationRepository.findById(id)`. If not found, throws `ResourceNotFoundException`.
    b.  Updates the fields of the existing `Reservation` with the provided data.
    c.  Persists the updated `Reservation` entity using `reservationRepository.save()`.
    d.  Returns the updated `Reservation` entity.
10. The `AdminReservationController` returns a `200 OK` response with the updated `Reservation` entity.

11. An authenticated admin user requests to delete a reservation via `DELETE /api/v1/admin/reservations/{id}`.
12. The `AdminReservationController.deleteReservation` method receives the request.
13. It calls `reservationService.deleteReservation(id)`.
14. `ReservationService.deleteReservation` performs the following steps:
    a.  Checks if the `Reservation` exists by `id` using `reservationRepository.existsById(id)`. If not found, throws `ResourceNotFoundException`.
    b.  Deletes the `Reservation` entity using `reservationRepository.deleteById(id)`.
15. The `AdminReservationController` returns a `204 No Content` response.

### Error Handling
-   If a reservation is not found during an update or delete operation, `ReservationService` throws a `ResourceNotFoundException`, which the global exception handler will translate to a `404 Not Found` HTTP status.

---

## Order Management (Backend)

**Name:** `order-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Order.java` — MODEL layer — Represents a customer's food order, containing details like customer information, total amount, status, and a list of order items.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderItem.java` — MODEL layer — Represents a single menu item within an order, detailing its quantity, price, and subtotal.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderStatus.java` — MODEL layer — An enum defining the possible states an order can be in.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderRepository.java` — REPOSITORY layer — Provides data access operations for `Order` entities, including custom queries to find orders by customer ID or status.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderItemRepository.java` — REPOSITORY layer — Provides data access operations for `OrderItem` entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/OrderService.java` — SERVICE layer — Implements business logic for `createOrder(CreateOrderRequest request): Order`, `getOrderById(UUID orderId): Order`, `getAllOrders(): List<Order>`, `updateOrderStatus(UUID orderId, OrderStatus newStatus): Order`, `getOrdersByCustomerId(UUID customerId): List<Order>`, and `getOrdersByStatus(OrderStatus status): List<Order>`. It orchestrates order persistence, menu item validation via `MenuService`, and payment initiation via `PaymentService`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/OrderController.java` — CONTROLLER layer — Exposes public REST endpoints for customers to create new orders and check the status of their orders.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminOrderController.java` — CONTROLLER layer — Exposes admin-only REST endpoints for viewing and managing all customer orders, including updating their status.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateOrderRequest.java` — DTO layer — Used to encapsulate the data required to create a new order, including customer details and a list of requested menu items.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderItemRequest.java` — DTO layer — Used within `CreateOrderRequest` to specify a menu item and its quantity for an order.

**Feature Instruction:**

This feature handles the complete lifecycle of a customer's food order, from creation and payment initiation to status tracking and administration. It integrates with the `menu-management` feature to retrieve menu item details and with a pre-scaffolded `PaymentService` for payment processing.

## Order Creation Flow
1.  A `CreateOrderRequest` DTO is received by `OrderController.createOrder()`.
2.  `OrderController` delegates to `OrderService.createOrder(CreateOrderRequest request)`.
3.  `OrderService` performs the following steps:
    a.  Validates the `CreateOrderRequest` to ensure all required fields are present and `orderItems` are not empty.
    b.  For each `OrderItemRequest` in `CreateOrderRequest.orderItems`:
        i.  Calls `menuService.getMenuItemById(item.menuItemId)` to retrieve the `MenuItemDto` from the `menu-management` feature. If any `MenuItem` is not found, throw `ResourceNotFoundException`.
        ii. Calculates the `subTotal` for the `OrderItem` (item.quantity * menuItem.price).
        iii. Creates an `OrderItem` entity.
    c.  Calculates the total amount of the order by summing up all `orderItems`' `subTotal`s.
    d.  Creates an `Order` entity with `OrderStatus.PENDING_PAYMENT`.
    e.  Saves the `Order` and its `OrderItems` using `OrderRepository.save()` and `OrderItemRepository.saveAll()`.
    f.  Constructs a `CreatePaymentRequest` using the order ID and total amount.
    g.  Calls `paymentService.createOrder(createPaymentRequest)` to initiate payment. The `PaymentService` is pre-scaffolded and its methods are `createOrder(CreatePaymentRequest)` which returns `PaymentOrderResponse` and `verify(VerifyPaymentRequest)` which returns `PaymentVerificationResponse`. Do not invent other payment methods.
    h.  Updates the `Order` entity with the `paymentOrderId` and `paymentLink` from the `PaymentOrderResponse`.
    i.  Saves the updated `Order`.
    j.  Returns the `Order` entity.
4.  `OrderController` returns the created `Order` with payment details.

## Order Status Updates
-   `OrderService.updateOrderStatus(UUID orderId, OrderStatus newStatus)`: Updates the status of an existing order. Throws `ResourceNotFoundException` if the order does not exist.

## Order Retrieval
-   `OrderService.getOrderById(UUID orderId)`: Retrieves a single order by its ID. Throws `ResourceNotFoundException` if the order does not exist.
-   `OrderService.getAllOrders()`: Retrieves all orders.
-   `OrderService.getOrdersByStatus(OrderStatus status)`: Retrieves orders filtered by status.
-   `OrderService.getOrdersByCustomerId(UUID customerId)`: Retrieves orders for a specific customer.

## Admin Functionality
-   `AdminOrderController` provides endpoints for administrators to view all orders, view a specific order, and update an order's status.
-   All admin endpoints require `ADMIN` role authentication.

## Error Handling
-   `ResourceNotFoundException` should be thrown when an order or menu item is not found. This should be handled by a global exception handler to return a 404 Not Found status.
-   `PaymentGatewayException` should be thrown if there's an issue with the payment gateway interaction. This should be handled by a global exception handler to return a 500 Internal Server Error status.

## Data Shapes
-   `Order`: Represents the main order entity with fields like `id`, `customerId`, `orderDate`, `totalAmount`, `status`, `deliveryAddress`, `contactPhone`, `paymentOrderId`, `paymentLink`, `orderItems`.
-   `OrderItem`: Represents a single item in an order with fields like `id`, `order`, `menuItemId`, `menuItemName`, `quantity`, `unitPrice`, `subTotal`.
-   `OrderStatus`: An enum defining possible states of an order.
-   `CreateOrderRequest`: DTO for creating an order, containing `customerId`, `deliveryAddress`, `contactPhone`, and a list of `OrderItemRequest`.
-   `OrderItemRequest`: DTO for an item within `CreateOrderRequest`, containing `menuItemId` and `quantity`.

## Inter-feature Wiring
-   `OrderService` injects `OrderRepository`, `OrderItemRepository`, `MenuService` (from `menu-management`), and `PaymentService` (pre-scaffolded).
-   `OrderController` injects `OrderService`.
-   `AdminOrderController` injects `OrderService`.

---

## Inquiry Management (Backend)

**Name:** `inquiry-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Inquiry.java` — MODEL layer — represents a customer inquiry with fields for contact details, event information, and status.
- `backend/src/main/java/com/farmaaishrestaurant/model/InquiryStatus.java` — MODEL layer — defines the possible states for a customer inquiry.
- `backend/src/main/java/com/farmaaishrestaurant/repository/InquiryRepository.java` — REPOSITORY layer — provides standard CRUD operations for `Inquiry` entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/InquiryService.java` — SERVICE layer — implements `createInquiry(InquiryDto): InquiryDto`, `getAllInquiries(): List<InquiryDto>`, `getInquiryById(UUID): InquiryDto`, `updateInquiryStatus(UUID, InquiryStatus): InquiryDto`, and `deleteInquiry(UUID): void`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/InquiryController.java` — CONTROLLER layer — exposes a public endpoint for submitting new inquiries via `createInquiry(InquiryDto): ResponseEntity<InquiryDto>`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminInquiryController.java` — CONTROLLER layer — exposes admin-only endpoints for managing inquiries via `getAllInquiries(): ResponseEntity<List<InquiryDto>>`, `getInquiryById(UUID): ResponseEntity<InquiryDto>`, `updateInquiryStatus(UUID, InquiryStatus): ResponseEntity<InquiryDto>`, and `deleteInquiry(UUID): ResponseEntity<Void>`.
- `backend/src/main/java/com/farmaaishrestaurant/dto/InquiryDto.java` — DTO layer — Data Transfer Object for inquiry data, used for requests and responses.

**Feature Instruction:**

This feature manages customer inquiries for catering and private events for Farmaaish Restaurant. It consists of a `Inquiry` entity, an `InquiryStatus` enum, a `InquiryRepository` for persistence, an `InquiryService` for business logic, and two controllers: `InquiryController` for public submission and `AdminInquiryController` for administrative management.

### Inquiry Data Model
The `Inquiry` entity represents a customer inquiry and includes fields such as `id`, `customerName`, `customerEmail`, `customerPhone`, `eventType`, `eventDate`, `numberOfGuests`, `message`, `inquiryDate`, and `status`. The `status` field will be an `InquiryStatus` enum, which defines the lifecycle of an inquiry (e.g., NEW, CONTACTED, CLOSED).

### Persistence Layer
The `InquiryRepository` extends `JpaRepository` and provides standard CRUD operations for `Inquiry` entities. No custom query methods are required for this feature.

### Service Layer
The `InquiryService` class handles the core business logic:

1.  **`createInquiry(InquiryDto inquiryDto): InquiryDto`**
    -   Receives an `InquiryDto` containing the inquiry details.
    -   Maps the `InquiryDto` to an `Inquiry` entity.
    -   Sets the `inquiryDate` to the current timestamp and `status` to `InquiryStatus.NEW`.
    -   Saves the `Inquiry` entity using `inquiryRepository.save()`.
    -   Maps the saved `Inquiry` entity back to an `InquiryDto` and returns it.

2.  **`getAllInquiries(): List<InquiryDto>`**
    -   Retrieves all `Inquiry` entities from the database using `inquiryRepository.findAll()`.
    -   Maps each `Inquiry` entity to an `InquiryDto`.
    -   Returns a list of `InquiryDto`.

3.  **`getInquiryById(UUID id): InquiryDto`**
    -   Retrieves an `Inquiry` entity by its `id` using `inquiryRepository.findById(id)`.
    -   If the inquiry is not found, throws a `ResourceNotFoundException`.
    -   Maps the `Inquiry` entity to an `InquiryDto` and returns it.

4.  **`updateInquiryStatus(UUID id, InquiryStatus newStatus): InquiryDto`**
    -   Retrieves an `Inquiry` entity by its `id` using `inquiryRepository.findById(id)`.
    -   If the inquiry is not found, throws a `ResourceNotFoundException`.
    -   Updates the `status` of the inquiry to `newStatus`.
    -   Saves the updated `Inquiry` entity using `inquiryRepository.save()`.
    -   Maps the updated `Inquiry` entity to an `InquiryDto` and returns it.

5.  **`deleteInquiry(UUID id): void`**
    -   Checks if an `Inquiry` with the given `id` exists using `inquiryRepository.existsById(id)`.
    -   If not found, throws a `ResourceNotFoundException`.
    -   Deletes the `Inquiry` entity using `inquiryRepository.deleteById(id)`.

### Controller Layer

**`InquiryController`**
This controller exposes a public endpoint for submitting new inquiries.

-   **`createInquiry(@RequestBody @Valid InquiryDto inquiryDto): ResponseEntity<InquiryDto>`**
    -   Handles POST requests to `/api/v1/inquiries`.
    -   Calls `inquiryService.createInquiry(inquiryDto)`.
    -   Returns `201 Created` with the created `InquiryDto`.

**`AdminInquiryController`**
This controller exposes admin-only endpoints for managing inquiries.

-   **`getAllInquiries(): ResponseEntity<List<InquiryDto>>`**
    -   Handles GET requests to `/api/v1/admin/inquiries`.
    -   Calls `inquiryService.getAllInquiries()`.
    -   Returns `200 OK` with a list of all `InquiryDto`.

-   **`getInquiryById(@PathVariable UUID id): ResponseEntity<InquiryDto>`**
    -   Handles GET requests to `/api/v1/admin/inquiries/{id}`.
    -   Calls `inquiryService.getInquiryById(id)`.
    -   Returns `200 OK` with the `InquiryDto`.
    -   Throws `ResourceNotFoundException` if the inquiry is not found, which will be handled by `GlobalExceptionHandler` returning `404 Not Found`.

-   **`updateInquiryStatus(@PathVariable UUID id, @RequestParam InquiryStatus status): ResponseEntity<InquiryDto>`**
    -   Handles PUT requests to `/api/v1/admin/inquiries/{id}/status`.
    -   Calls `inquiryService.updateInquiryStatus(id, status)`.
    -   Returns `200 OK` with the updated `InquiryDto`.
    -   Throws `ResourceNotFoundException` if the inquiry is not found, which will be handled by `GlobalExceptionHandler` returning `404 Not Found`.

-   **`deleteInquiry(@PathVariable UUID id): ResponseEntity<Void>`**
    -   Handles DELETE requests to `/api/v1/admin/inquiries/{id}`.
    -   Calls `inquiryService.deleteInquiry(id)`.
    -   Returns `204 No Content`.
    -   Throws `ResourceNotFoundException` if the inquiry is not found, which will be handled by `GlobalExceptionHandler` returning `404 Not Found`.

### Data Transfer Object
`InquiryDto` is used for transferring inquiry data between the controller and service layers. It mirrors the `Inquiry` entity but includes validation annotations.

### Error Handling
`ResourceNotFoundException` will be thrown by the service layer when an inquiry is not found. This exception will be caught by the `GlobalExceptionHandler` (from `shared-backend` feature) and translated into an appropriate HTTP 404 Not Found response.

---

## Content Management (Backend)

**Name:** `content-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Event.java` — MODEL layer — defines the `Event` entity with fields for title, description, image URL, event date, type, and active status.
- `backend/src/main/java/com/farmaaishrestaurant/repository/EventRepository.java` — REPOSITORY layer — provides data access operations for `Event` entities, including custom queries for active events and events by type.
- `backend/src/main/java/com/farmaaishrestaurant/service/EventService.java` — SERVICE layer — implements business logic for managing events and gallery items, including CRUD operations and retrieval of active/typed content.
- `backend/src/main/java/com/farmaaishrestaurant/controller/EventController.java` — CONTROLLER layer — exposes public REST API endpoints for fetching active events and gallery items by ID or type.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminEventController.java` — CONTROLLER layer — exposes admin-only REST API endpoints for full CRUD operations on events and gallery items.
- `backend/src/main/java/com/farmaaishrestaurant/dto/EventDto.java` — DTO layer — Data Transfer Object for event data, used for requests and responses.

**Feature Instruction:**

This feature, Content Management, provides the backend infrastructure for managing events and gallery items for Farmaaish Restaurant. It includes an `Event` entity, a Spring Data JPA `EventRepository` for persistence, an `EventService` for business logic, and two controllers: `EventController` for public access to view events and `AdminEventController` for authenticated administrators to perform CRUD operations. The `EventDto` serves as the Data Transfer Object for transferring event data between the service and controller layers.

### Event Entity (`Event.java`)
Represents a special event, promotion, or gallery item. It includes fields such as `id` (UUID), `title` (String), `description` (String), `imageUrl` (String), `eventDate` (LocalDate, nullable for gallery items), `eventType` (String, e.g., "event", "gallery"), and `active` (boolean).

### Event Repository (`EventRepository.java`)
Extends `JpaRepository` to provide standard CRUD operations for `Event` entities. It will include custom query methods to find active events and gallery items, and to find events by type.

### Event DTO (`EventDto.java`)
This DTO is used for data transfer, ensuring that only necessary information is exposed and received. It mirrors the `Event` entity fields but is used for API requests and responses.

### Event Service (`EventService.java`)
This service handles the core business logic for events. It injects `EventRepository` to interact with the database. All methods should validate input and handle `ResourceNotFoundException` where appropriate.

**Public Functions:**

1.  `EventDto createEvent(EventDto eventDto)`
    *   **Logic:**
        1.  Validate `eventDto`.
        2.  Convert `eventDto` to an `Event` entity.
        3.  Save the `Event` entity using `eventRepository.save()`.
        4.  Convert the saved `Event` entity back to `EventDto`.
        5.  Return the `EventDto`.
    *   **Error Cases:** `IllegalArgumentException` if `eventDto` is invalid.

2.  `EventDto getEventById(UUID id)`
    *   **Logic:**
        1.  Retrieve the `Event` by `id` using `eventRepository.findById()`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Convert the `Event` entity to `EventDto`.
        4.  Return the `EventDto`.
    *   **Error Cases:** `ResourceNotFoundException` if no event with the given ID exists.

3.  `List<EventDto> getAllEvents()`
    *   **Logic:**
        1.  Retrieve all `Event` entities using `eventRepository.findAll()`.
        2.  Convert the list of `Event` entities to a list of `EventDto`.
        3.  Return the list of `EventDto`s.

4.  `List<EventDto> getActiveEvents()`
    *   **Logic:**
        1.  Retrieve all active `Event` entities using `eventRepository.findByActiveTrue()`.
        2.  Convert the list of `Event` entities to a list of `EventDto`.
        3.  Return the list of `EventDto`s.

5.  `List<EventDto> getEventsByType(String eventType)`
    *   **Logic:**
        1.  Retrieve `Event` entities by `eventType` using `eventRepository.findByEventTypeAndActiveTrue(eventType)`.
        2.  Convert the list of `Event` entities to a list of `EventDto`.
        3.  Return the list of `EventDto`s.

6.  `EventDto updateEvent(UUID id, EventDto eventDto)`
    *   **Logic:**
        1.  Check if an `Event` with the given `id` exists using `eventRepository.existsById()`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Validate `eventDto`.
        4.  Convert `eventDto` to an `Event` entity, setting its ID to the provided `id`.
        5.  Save the updated `Event` entity using `eventRepository.save()`.
        6.  Convert the saved `Event` entity back to `EventDto`.
        7.  Return the `EventDto`.
    *   **Error Cases:** `ResourceNotFoundException` if no event with the given ID exists, `IllegalArgumentException` if `eventDto` is invalid.

7.  `void deleteEvent(UUID id)`
    *   **Logic:**
        1.  Check if an `Event` with the given `id` exists using `eventRepository.existsById()`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Delete the `Event` by `id` using `eventRepository.deleteById()`.
    *   **Error Cases:** `ResourceNotFoundException` if no event with the given ID exists.

### Event Controller (`EventController.java`)
This controller exposes public API endpoints for fetching events and gallery items. It injects `EventService`.

**Public Functions:**

1.  `ResponseEntity<List<EventDto>> getAllActiveEvents()`
    *   **Logic:** Calls `eventService.getActiveEvents()` and returns the result with HTTP status 200 OK.

2.  `ResponseEntity<List<EventDto>> getEventsByType(@PathVariable String eventType)`
    *   **Logic:** Calls `eventService.getEventsByType(eventType)` and returns the result with HTTP status 200 OK.

3.  `ResponseEntity<EventDto> getEventById(@PathVariable UUID id)`
    *   **Logic:** Calls `eventService.getEventById(id)` and returns the result with HTTP status 200 OK. Handles `ResourceNotFoundException` by returning 404 NOT FOUND.

### Admin Event Controller (`AdminEventController.java`)
This controller exposes admin-only API endpoints for CRUD operations on events. It injects `EventService`.

**Public Functions:**

1.  `ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventDto)`
    *   **Logic:** Calls `eventService.createEvent(eventDto)` and returns the result with HTTP status 201 CREATED. Handles `IllegalArgumentException` by returning 400 BAD REQUEST.

2.  `ResponseEntity<List<EventDto>> getAllEvents()`
    *   **Logic:** Calls `eventService.getAllEvents()` and returns the result with HTTP status 200 OK.

3.  `ResponseEntity<EventDto> getEventById(@PathVariable UUID id)`
    *   **Logic:** Calls `eventService.getEventById(id)` and returns the result with HTTP status 200 OK. Handles `ResourceNotFoundException` by returning 404 NOT FOUND.

4.  `ResponseEntity<EventDto> updateEvent(@PathVariable UUID id, @RequestBody EventDto eventDto)`
    *   **Logic:** Calls `eventService.updateEvent(id, eventDto)` and returns the result with HTTP status 200 OK. Handles `ResourceNotFoundException` by returning 404 NOT FOUND and `IllegalArgumentException` by returning 400 BAD REQUEST.

5.  `ResponseEntity<Void> deleteEvent(@PathVariable UUID id)`
    *   **Logic:** Calls `eventService.deleteEvent(id)` and returns HTTP status 204 NO CONTENT. Handles `ResourceNotFoundException` by returning 404 NOT FOUND.

**Cross-Feature Interactions:**
This feature does not directly call any services or endpoints from other features. It is a self-contained backend feature for content management. The `shared-backend` feature's `GlobalExceptionHandler` will handle exceptions thrown by this feature's services and controllers.

---

## Customer Management (Backend)

**Name:** `customer-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Customer.java` — JPA Entity — defines the schema for customer profile data in the database.
- `backend/src/main/java/com/farmaaishrestaurant/repository/CustomerRepository.java` — REPOSITORY layer — provides data access operations for Customer entities, including findByUserId(UUID userId).
- `backend/src/main/java/com/farmaaishrestaurant/service/CustomerService.java` — SERVICE layer — implements createCustomer(CustomerDto), getCustomerById(UUID), getCustomerByUserId(UUID), and updateCustomer(UUID, CustomerDto) for managing customer profiles.
- `backend/src/main/java/com/farmaaishrestaurant/controller/CustomerController.java` — REST CONTROLLER — exposes API endpoints for authenticated customers to manage their profile and view order history.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CustomerDto.java` — Data Transfer Object — defines the structure for customer profile data exchanged between layers.

**Feature Instruction:**

The Customer Management feature provides backend services for managing customer profiles and linking them to user accounts. It allows authenticated users to view and update their personal details. This feature integrates with the `order-management` feature to allow customers to view their past orders.

### Customer.java
This JPA entity represents a customer's profile. It contains fields such as `id`, `userId` (linking to an authentication user), `firstName`, `lastName`, `email`, `phone`, and `address`. The `id` is a UUID and serves as the primary key. `userId` is also a UUID and must be unique. `firstName`, `lastName`, `email`, `phone`, and `address` are String fields with appropriate length constraints. `email` must be unique.

### CustomerRepository.java
This is a Spring Data JPA repository for the `Customer` entity. It extends `JpaRepository<Customer, UUID>` and provides standard CRUD operations. It will also include a custom query method `findByUserId(UUID userId)` to retrieve a customer profile based on their associated user ID.

### CustomerDto.java
This DTO is used for transferring customer profile data between the service layer and the controller. It includes fields `id`, `userId`, `firstName`, `lastName`, `email`, `phone`, and `address`. All fields are nullable except `userId`, `firstName`, `lastName`, and `email` for creation/update requests. For updates, `id` is also required.

### CustomerService.java
This service class handles the business logic for customer profiles. It injects `CustomerRepository` for data persistence. It exposes the following public methods:

1.  `createCustomer(CustomerDto customerDto): CustomerDto`
    -   **Logic:**
        1.  Validates the `customerDto` (e.g., `userId` and `email` are not null and unique).
        2.  Maps the `customerDto` to a `Customer` entity.
        3.  Saves the `Customer` entity using `customerRepository.save()`.
        4.  Maps the saved `Customer` entity back to a `CustomerDto` and returns it.
    -   **Error Cases:** Throws `IllegalArgumentException` if `userId` or `email` already exists, or if required fields are missing.

2.  `getCustomerById(UUID id): CustomerDto`
    -   **Logic:**
        1.  Retrieves a `Customer` entity by its `id` using `customerRepository.findById(id)`.
        2.  If the customer is not found, throws `ResourceNotFoundException`.
        3.  Maps the `Customer` entity to a `CustomerDto` and returns it.
    -   **Error Cases:** Throws `ResourceNotFoundException` if no customer with the given `id` is found.

3.  `getCustomerByUserId(UUID userId): CustomerDto`
    -   **Logic:**
        1.  Retrieves a `Customer` entity by its `userId` using `customerRepository.findByUserId(userId)`.
        2.  If the customer is not found, throws `ResourceNotFoundException`.
        3.  Maps the `Customer` entity to a `CustomerDto` and returns it.
    -   **Error Cases:** Throws `ResourceNotFoundException` if no customer with the given `userId` is found.

4.  `updateCustomer(UUID id, CustomerDto customerDto): CustomerDto`
    -   **Logic:**
        1.  Retrieves the existing `Customer` entity by `id` using `customerRepository.findById(id)`. If not found, throws `ResourceNotFoundException`.
        2.  Updates the fields of the existing `Customer` entity with non-null values from `customerDto` (e.g., `firstName`, `lastName`, `email`, `phone`, `address`). The `userId` cannot be changed.
        3.  If `email` is updated, ensure it remains unique.
        4.  Saves the updated `Customer` entity using `customerRepository.save()`.
        5.  Maps the updated `Customer` entity back to a `CustomerDto` and returns it.
    -   **Error Cases:** Throws `ResourceNotFoundException` if no customer with the given `id` is found. Throws `IllegalArgumentException` if the updated `email` already exists.

### CustomerController.java
This REST controller exposes endpoints for authenticated customers to manage their profiles and view order history. It injects `CustomerService` and `OrderService`.

1.  `GET /api/v1/customers/profile`
    -   **Access:** Authenticated
    -   **Logic:**
        1.  Retrieves the `userId` from the authenticated user's security context.
        2.  Calls `customerService.getCustomerByUserId(userId)` to get the customer profile.
        3.  Returns the `CustomerDto` with HTTP status 200 OK.
    -   **Error Cases:** Returns 404 NOT FOUND if the customer profile is not found (from `ResourceNotFoundException`). Returns 401 UNAUTHORIZED if no user is authenticated.

2.  `PUT /api/v1/customers/profile`
    -   **Access:** Authenticated
    -   **Request Body:** `CustomerDto` (containing fields to update, `id` is not needed in the request body as it's derived from the authenticated user)
    -   **Logic:**
        1.  Retrieves the `userId` from the authenticated user's security context.
        2.  Calls `customerService.getCustomerByUserId(userId)` to get the customer's existing ID.
        3.  Calls `customerService.updateCustomer(customerId, customerDto)` with the retrieved ID and the request body.
        4.  Returns the updated `CustomerDto` with HTTP status 200 OK.
    -   **Error Cases:** Returns 404 NOT FOUND if the customer profile is not found. Returns 400 BAD REQUEST if validation fails (from `IllegalArgumentException`). Returns 401 UNAUTHORIZED if no user is authenticated.

3.  `GET /api/v1/customers/profile/orders`
    -   **Access:** Authenticated
    -   **Logic:**
        1.  Retrieves the `userId` from the authenticated user's security context.
        2.  Calls `customerService.getCustomerByUserId(userId)` to get the customer's ID.
        3.  Calls `orderService.getOrdersByCustomerId(customerId)` to retrieve the customer's order history.
        4.  Returns a `List<Order>` with HTTP status 200 OK.
    -   **Error Cases:** Returns 404 NOT FOUND if the customer profile is not found. Returns 401 UNAUTHORIZED if no user is authenticated. Returns 500 INTERNAL SERVER ERROR for other issues from `OrderService`.


---

## Core UI & Configuration

**Name:** `core-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/App.tsx` — The root component of the React application, responsible for setting up routing and integrating global context providers like AuthContext.
- `frontend/src/api/client.ts` — Configures the global Axios instance with base URL and an interceptor for attaching authentication tokens from localStorage.
- `frontend/src/config/siteConfig.ts` — Central configuration for site-wide content like brand name, navigation links, and contact info, using the Farmaaish maroon and gold palette.
- `frontend/src/components/ProtectedRoute.tsx` — A wrapper component that restricts access to routes based on user authentication status and an optional required role, redirecting unauthenticated users to the login page.

**Feature Instruction:**

The Core UI & Configuration feature establishes the foundational structure and global settings for the Farmaaish Restaurant frontend application. It defines the main application component (`App.tsx`) responsible for routing and integrating global context providers like `AuthContext`. It also configures the global Axios instance (`client.ts`) to handle API requests, including attaching authentication tokens from `localStorage` and setting the base URL. Site-wide configuration, including brand name, navigation links, and contact information, is centralized in `siteConfig.ts`, adhering to the Farmaaish maroon and gold color palette. Finally, `ProtectedRoute.tsx` provides a reusable component to secure routes, ensuring only authenticated users with appropriate roles can access specific parts of the application by checking the authentication status via `useAuth`.

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-[#F5F5DC] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

### `App.tsx`
This file serves as the root component, setting up the main routing structure using `react-router-dom`. It wraps the application with necessary context providers, including `AuthContext`, to make authentication state globally available. The routes should include public pages (Home, Menu, Reservations, About, Contact, Catering, Events), authenticated customer pages (Profile, Orders), and admin pages (Dashboard, Menu Management, Reservations Management, Orders Management, Events Management, Inquiries Management). Admin routes must be wrapped with `ProtectedRoute` to enforce authentication and role-based access. All public pages should be wrapped in the `<Layout>` component, and all admin pages in `<AdminLayout>`.

### `client.ts`
This file configures the Axios HTTP client. It sets the `baseURL` for all API requests to `/api/v1`. An Axios interceptor must be implemented to automatically include the JWT authentication token in the `Authorization` header for every outgoing request. The token is retrieved from `localStorage` using the key 'token'. If no token is found, the request proceeds without the header. The interceptor should also handle `401 Unauthorized` responses by clearing the token from `localStorage` and redirecting the user to the login page.

### `siteConfig.ts`
This file exports a constant object, `siteConfig`, containing global configuration details. This includes `businessName` ('Farmaaish Restaurant'), `tagline` ('Experience the Royal Flavors of Mughlai Cuisine'), `contactInfo` (address, phone, email, coordinates, opening hours), and `socialLinks`. It also defines the main navigation links for both public and admin sections, specifying their `path`, `name`, and `requiresAuth` (boolean) and `requiredRole` (string, e.g., 'ADMIN') properties. The color palette defined in the design context should be reflected in any color-related variables or utility functions exported from this file.

### `ProtectedRoute.tsx`
This component takes `children` (the components to protect) and an optional `requiredRole` prop (string, e.g., 'ADMIN'). It uses the `useAuth` hook to check the current authentication status and user role. If the user is not authenticated, it redirects them to the `/login` page. If `requiredRole` is provided and the authenticated user does not have that role, it should redirect them to a `/` or `/unauthorized` page (the latter can be a simple placeholder for now). Otherwise, it renders the `children`.

---

## Authentication UI

**Name:** `auth-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/context/AuthContext.tsx` — React Context for managing and providing global authentication state. It exposes `isAuthenticated: boolean`, `user: User | null`, `token: string | null`, `login: (token: string, user: User) => void`, and `logout: () => void`.
- `frontend/src/hooks/useAuth.ts` — Custom hook for accessing authentication context and performing login/logout actions. It returns `isAuthenticated: boolean`, `user: User | null`, `token: string | null`, `login: (request: LoginRequest) => Promise<void>`, and `logout: () => void`.
- `frontend/src/services/authService.ts` — Service for making API calls to authentication-related endpoints. It exposes `login(request: LoginRequest): Promise<LoginResponse>`.
- `frontend/src/types/auth.ts` — TypeScript types and interfaces for authentication data structures. Generated from the backend API contract — authentication data structures.
- `frontend/src/pages/LoginPage.tsx` — Displays the login form for both customers and administrators. It uses `useAuth` to handle authentication and redirection.

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

This feature provides the core authentication functionality for the Farmaaish Restaurant application, enabling users (both customers and administrators) to log in and manage their sessions. It consists of a React Context (`AuthContext.tsx`) to hold the global authentication state, a custom hook (`useAuth.ts`) to interact with this context and perform login/logout actions, a service (`authService.ts`) to handle API calls to the backend authentication endpoints, and a type definition file (`auth.ts`) for data structures. The `LoginPage.tsx` provides the user interface for logging in.

### AuthContext.tsx
This file defines the `AuthContext` using React's `createContext` and provides an `AuthProvider` component. The `AuthProvider` manages the authentication state, including `isAuthenticated` (boolean), `user` (User type), and `token` (string | null). It also exposes `login` and `logout` functions. The `token` is stored in `localStorage` under the key 'token' upon successful login and removed upon logout. The `user` object should contain `id`, `email`, and `role` properties. The `AuthProvider` should initialize its state by checking `localStorage` for an existing token and, if found, attempt to validate it (though for this feature, simply setting `isAuthenticated` to true and parsing basic user info from the token is sufficient).

### useAuth.ts
This custom hook provides a convenient way for components to access the authentication context. It exports the `useAuth` function, which returns the `isAuthenticated`, `user`, `token`, `login`, and `logout` values from the `AuthContext`. The `login` function in `useAuth` will take `LoginRequest` (email, password) as input, call `authService.login(request)`, and if successful, update the `AuthContext` state with the received token and user information. It should store the token in `localStorage` using the key 'token'. The `logout` function will clear the token from `localStorage` and update the `AuthContext` state to reflect a logged-out user.

### authService.ts
This service is responsible for making HTTP requests to the backend authentication API. It exports an `authService` object with a `login` method. The `login` method takes a `LoginRequest` (email, password) and sends a POST request to `/api/v1/auth/login`. On a successful response, it returns a `LoginResponse` containing the JWT token and user details. Error handling should be implemented to catch network errors or API errors (e.g., 401 Unauthorized) and throw appropriate exceptions or return a rejected promise. The `api/client.ts` should be used for making these requests, ensuring the interceptor correctly attaches the JWT token for subsequent authenticated requests.

### auth.ts
This file defines the TypeScript interfaces for `User`, `LoginRequest`, and `LoginResponse`. The `User` interface should include `id: string`, `email: string`, and `role: 'CUSTOMER' | 'ADMIN'`. `LoginRequest` should have `email: string` and `password: string`. `LoginResponse` should contain `token: string` and `user: User`.

### LoginPage.tsx
This page provides the user interface for logging in. It should use the `useAuth` hook to access the `login` function and the `isAuthenticated` state. If the user is already authenticated, they should be redirected to the home page (`/`). The page should display a form with fields for email and password, and a submit button. Upon successful login, the user should be redirected to the home page (`/`). The form should include basic validation and display error messages if login fails. The page should be wrapped in the `<Layout>` component from `@/components/Layout`.

**Page Sections:**
- **Login Form Section:** A central, elegant card with a heading "Welcome Back to Farmaaish" (text-[#36454F] font-bold text-3xl) and a sub-heading "Savor the Royal Flavors" (text-gray-600 text-lg). The form fields (email, password) should have clear labels and placeholder text like "Enter your email" and "Enter your password". The submit button should use the Primary CTA design token with text "Login". Include a link for "Forgot Password?" (text-[#D4AF37] hover:underline) below the form. The background of this section should be a subtle cream (#F5F5DC).

**Styling:**
- The main container for the login form should be centered on the page, perhaps with a `max-w-md` width and `mx-auto` for horizontal centering, and `py-16` for vertical padding.
- The form itself should be within a `bg-white rounded-xl shadow-lg p-8` card.
- Input fields should have `border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent` styling.
- Error messages should be `text-red-500 text-sm mt-1`.
- The page should use the `Layout` component from `core-ui`.

**Redirect Logic:**
- After successful login, redirect to `/`.
- If `isAuthenticated` is true, redirect to `/`.


---

## Static Pages & Components

**Name:** `static-pages`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/HomePage.tsx` — PAGE layer — orchestrates the display of the main landing page by composing `HeroSection`, `FeaturedDishes`, and `Testimonials` components.
- `frontend/src/components/home/HeroSection.tsx` — COMPONENT layer — displays a full-bleed hero section with the restaurant's branding and calls to action.
- `frontend/src/components/home/FeaturedDishes.tsx` — COMPONENT layer — displays a curated selection of menu items, allowing users to add them to the cart by calling `useCart().addItem()`.
- `frontend/src/components/home/Testimonials.tsx` — COMPONENT layer — displays a selection of customer testimonials.
- `frontend/src/pages/AboutPage.tsx` — PAGE layer — presents detailed information about the restaurant's history and culinary philosophy.
- `frontend/src/pages/ContactPage.tsx` — PAGE layer — provides contact information, an embedded map, and a general inquiry form that calls `useInquiries().createInquiry()`.
- `frontend/src/components/contact/LocationMap.tsx` — COMPONENT layer — embeds an interactive Google Map centered on the restaurant's location.
- `frontend/src/pages/CateringPage.tsx` — PAGE layer — showcases catering services and includes a detailed inquiry form that calls `useInquiries().createInquiry()`.
- `frontend/src/components/catering/CateringInquiryForm.tsx` — COMPONENT layer — provides a form for customers to submit catering inquiries, calling `useInquiries().createInquiry()` on submission.

**Feature Instruction:**

This feature provides the static pages and core components for the Farmaaish Restaurant frontend, including the home page, about page, contact page, and catering page. It establishes the visual identity and user experience through a regal design, high-fidelity imagery, and elegant typography, consistent with the Mughlai heritage. All monetary values will be displayed in Indian Rupees (₹) using the `en-IN` locale.

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Secondary CTA: border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

### HomePage.tsx
This page serves as the main landing page, composed of several key sections:
1.  **HeroSection**: Displays a full-bleed hero image with the restaurant's name and primary calls to action for 'View Menu' and 'Book a Table'.
2.  **FeaturedDishes**: Showcases a selection of signature Mughlai dishes. This component will fetch menu items using `useMenu().getAllMenuItems()` from the `menu-display` feature and filter them to display a curated selection. Each dish card will include a button to add the item to the cart, calling `useCart().addItem()`.
3.  **Testimonials**: Presents glowing customer reviews.
4.  **About Farmaaish Story**: A brief section summarizing the restaurant's heritage and culinary philosophy.
5.  **Call to Action for Reservations**: A prominent section encouraging users to book a table.

### HeroSection.tsx
This component will render a visually striking hero section. It will feature a background image relevant to a restaurant (e.g., https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80) with a dark overlay. The main headline will be "Farmaaish Restaurant" with a sub-headline like "Experience the Royal Flavors of Mughlai Cuisine". It will include two call-to-action buttons: one for "View Our Menu" (linking to `/menu`) and another for "Book a Table" (linking to `/reservations`).

### FeaturedDishes.tsx
This component will display a grid of 3-4 featured dishes. It will use the `useMenu` hook from the `menu-display` feature to fetch all menu items. It will then filter and display a selection of these items. Each dish card will show the `name`, `description`, `price` (formatted in INR), and `imageUrl`. A button on each card, labeled "Add to Cart" or "Order Now", will call `useCart().addItem({ id: menuItem.id, name: menuItem.name, unitPrice: menuItem.price, imageUrl: menuItem.imageUrl })` from the pre-scaffolded cart framework. Prices will be formatted using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### Testimonials.tsx
This component will render a section showcasing customer testimonials. It will include placeholder text for reviews, emphasizing the warm, sophisticated, and inviting tone of the restaurant.

### AboutPage.tsx
This page will detail the history, culinary philosophy, and heritage of Farmaaish Restaurant. It will include sections like "Our Story", "Culinary Philosophy", and "The Farmaaish Experience", using rich descriptive text and relevant imagery.

### ContactPage.tsx
This page will provide comprehensive contact information for Farmaaish Restaurant. It will include:
1.  **Contact Details**: Displaying the address "Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069" and phone number "020 2729 1111".
2.  **Opening Hours**: Placeholder text for daily opening hours.
3.  **LocationMap**: An embedded Google Map pointing to the restaurant's coordinates (18.55557, 73.77665).
4.  **Contact Form**: A simple form for general inquiries (not catering). This form will submit data to the `/api/v1/inquiries` endpoint via `useInquiries().createInquiry()` from the `inquiry-form` feature. The form fields will include `customerName`, `customerEmail`, `customerPhone`, and `message`.

### LocationMap.tsx
This component will embed an interactive Google Map. It will use an iframe or a React Google Maps library to display a map centered at the restaurant's coordinates (18.55557, 73.77665) with a marker at the exact location.

### CateringPage.tsx
This page will showcase the catering services offered by Farmaaish Restaurant. It will include:
1.  **Hero Section**: A brief introduction to the catering services.
2.  **Service Offerings**: Details about different catering packages and types of events.
3.  **CateringInquiryForm**: A detailed form for customers to submit inquiries about catering and private events.

### CateringInquiryForm.tsx
This component will provide a form for catering inquiries. It will collect `customerName`, `customerEmail`, `customerPhone`, `eventType`, `eventDate`, `numberOfGuests`, and `message`. Upon submission, it will call `useInquiries().createInquiry()` from the `inquiry-form` feature, sending the form data to the `/api/v1/inquiries` endpoint. The `eventDate` field will be a date picker, and `numberOfGuests` will be a number input.

---

## Menu Display

**Name:** `menu-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useMenu.ts` — Custom React Query hook for fetching and managing menu categories and items. It exposes `useMenu()` which provides menu data, active category state, and loading/error indicators.
- `frontend/src/services/menuService.ts` — Frontend service layer for interacting with the backend menu API. It provides functions to fetch all menu categories and all menu items.
- `frontend/src/types/menu.ts` — Generated from the backend API contract — defines TypeScript types for menu items and categories.
- `frontend/src/pages/MenuPage.tsx` — Page component that displays the full restaurant menu, integrating menu categories as tabs and menu items in a grid. It orchestrates data fetching via `useMenu` and renders child components.
- `frontend/src/components/menu/MenuCategoryTabs.tsx` — Presentational component that renders a tabbed navigation for menu categories. It receives categories and an active category, and emits changes when a tab is clicked.
- `frontend/src/components/menu/MenuItemsGrid.tsx` — Presentational component that displays a grid of menu item cards. Each card includes an image, name, price, and an 'Add to Order' button that interacts with the cart.

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

This feature provides the frontend components and logic for displaying Farmaaish Restaurant's menu. It consists of a `MenuPage` which acts as the main entry point, displaying menu categories as tabs and menu items in a grid. The `useMenu` hook handles data fetching and state management using React Query, interacting with the `menuService` to call the backend API. The `menuService` is responsible for making actual HTTP requests to the `/api/v1/menu` endpoints provided by the `menu-management` feature. The `menu.ts` file defines the TypeScript types for menu items and categories, ensuring type safety across the feature. `MenuCategoryTabs` is a presentational component that renders the menu categories as clickable tabs, allowing users to filter menu items. `MenuItemsGrid` displays individual `MenuItemCard` components, each showing a dish's image, name, price, and an "Add to Order" button that integrates with the pre-scaffolded cart framework.

### Data Flow and Interactions:
1.  **`MenuPage.tsx`**: Renders the overall menu structure. It uses `useMenu()` to fetch `menuItems` and `menuCategories`. It passes `menuCategories` to `MenuCategoryTabs` and `menuItems` (filtered by the currently selected category) to `MenuItemsGrid`.
2.  **`useMenu.ts`**: This custom React Query hook exports `useMenu()` which fetches all menu categories and all menu items from the `menuService`. It manages the loading and error states, and also handles the active category selection. It exposes `menuCategories: MenuItemCategory[]`, `menuItems: MenuItemDto[]`, `activeCategory: string`, `setActiveCategory: (categoryName: string) => void`, `isLoading: boolean`, and `isError: boolean`.
3.  **`menuService.ts`**: This service exports asynchronous functions `getAllMenuItemCategories(): Promise<MenuItemCategory[]>` and `getAllMenuItems(): Promise<MenuItemDto[]>`. These functions use the `apiClient` from `@/api/client` to make GET requests to `/api/v1/menu/categories` and `/api/v1/menu/items` respectively, as defined in the `menu-management` feature's API contract.
4.  **`menu.ts`**: Defines the `MenuItemDto` and `MenuItemCategory` interfaces, which are used throughout the frontend to ensure consistent data structures.
5.  **`MenuCategoryTabs.tsx`**: Receives `categories: MenuItemCategory[]` and `activeCategory: string`, `onCategoryChange: (categoryName: string) => void` as props. It renders a list of tabs, highlighting the `activeCategory`. When a tab is clicked, it calls `onCategoryChange` with the selected category's name.
6.  **`MenuItemsGrid.tsx`**: Receives `items: MenuItemDto[]` as props. It iterates over the `items` and renders a `MenuItemCard` for each. Each `MenuItemCard` will display the `name`, `description`, `price`, and `imageUrl` of the `MenuItemDto`.
7.  **`MenuItemCard` (within `MenuItemsGrid.tsx`)**: Each card will feature an "Add to Order" button. The handler for this button will call `useCart().addItem({ id: item.id, name: item.name, unitPrice: item.price, imageUrl: item.imageUrl })` from the pre-scaffolded cart framework. The price should be displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### Error Handling:
-   The `useMenu` hook should capture and expose `isError` and `error` states from React Query. `MenuPage` should display a user-friendly error message if `isError` is true, indicating that the menu could not be loaded.

### Styling:
-   All components in this feature will adhere to the design tokens defined above, using Tailwind CSS classes for styling. Monetary values will be formatted for the Indian locale.

---

## Reservation Booking

**Name:** `reservation-booking`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useReservations.ts` — Custom React hook for managing reservation-related state and actions, specifically providing the `createReservation` function to submit new reservation requests to the backend.
- `frontend/src/services/reservationService.ts` — Frontend service layer for interacting with the backend reservation API, exposing `createReservation` to handle HTTP requests.
- `frontend/src/types/reservation.ts` — Generated from the backend API contract — defines TypeScript interfaces for reservation data structures.
- `frontend/src/pages/ReservationPage.tsx` — Public-facing page for customers to book a table, rendering the `ReservationForm` component within the standard `Layout`.
- `frontend/src/components/reservation/ReservationForm.tsx` — React component providing a form for users to input reservation details and submit them using the `useReservations` hook.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-[#F5F5DC] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

This feature provides a customer-facing page for booking table reservations at Farmaaish Restaurant. It consists of a custom hook (`useReservations.ts`) for managing reservation state and interactions, a service (`reservationService.ts`) for communicating with the backend API, TypeScript types (`reservation.ts`) for data structures, a page (`ReservationPage.tsx`) to host the reservation form, and the reservation form component itself (`ReservationForm.tsx`).

The `ReservationPage.tsx` will be a public-facing page accessible via a route like `/reservations`. It will use the `Layout` component from `@/components/Layout` for consistent navigation and footer. The page will feature a prominent heading and a `ReservationForm` component.

The `ReservationForm.tsx` component will allow users to select a date, time, and number of guests. It will also include fields for customer name, phone, email, and special requests. This form will utilize the `useReservations` hook to handle form submission and interact with the backend. Upon successful submission, the form should provide user feedback, such as a success message using a toast notification (e.g., from `sonner`).

The `useReservations.ts` hook will expose functions to create a reservation and manage loading/error states. It will call `reservationService.createReservation` to send the reservation data to the backend.

The `reservationService.ts` will contain the `createReservation` asynchronous function, which makes an HTTP POST request to the `/api/v1/reservations` endpoint of the `reservation-system` backend feature. It will send a `ReservationRequest` object and expect a `Reservation` object in response. It should handle potential API errors and re-throw them for the hook to catch.

The `reservation.ts` file defines the TypeScript interfaces for `Reservation`, `ReservationRequest`, and `ReservationStatus` to ensure type safety across the frontend components and services, mirroring the backend `reservation-system` feature's `Reservation` and `ReservationRequest` data shapes.

### Data Flow:
1. User navigates to `/reservations` which renders `ReservationPage.tsx`.
2. `ReservationPage.tsx` renders `ReservationForm.tsx`.
3. User fills out `ReservationForm.tsx` and submits it.
4. `ReservationForm.tsx` calls `useReservations().createReservation`.
5. `useReservations().createReservation` calls `reservationService.createReservation`.
6. `reservationService.createReservation` makes a POST request to `/api/v1/reservations` with the `ReservationRequest` payload.
7. Backend `reservation-system` processes the request and returns a `Reservation` object or an error.
8. `reservationService.createReservation` returns the result to `useReservations`.
9. `useReservations` updates its state and `ReservationForm` displays success/error feedback to the user.

---

## Online Ordering Flow

**Name:** `order-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useOrders.ts` — Custom hook to manage order data, including creating new orders and fetching history, by calling `orderService.createOrder(CreateOrderRequest): Promise<Order>` and `orderService.getOrderById(string): Promise<Order>`.
- `frontend/src/services/orderService.ts` — Provides functions for interacting with the order-related API endpoints, specifically `createOrder(CreateOrderRequest): Promise<Order>` and `getOrderById(string): Promise<Order>`.
- `frontend/src/types/order.ts` — TypeScript types and interfaces for order data, mirroring the backend DTOs from the `order-management` feature.
- `frontend/src/pages/OrderPage.tsx` — The multi-step checkout page for online ordering, guiding users through cart review, delivery details, and payment, orchestrating `CartSummary`, `DeliveryAddressForm`, and `PaymentStep` components.
- `frontend/src/components/order/CartSummary.tsx` — A component displaying the items in the user's cart, quantities, and total price, allowing users to adjust quantities or remove items by calling `useCart()` methods.
- `frontend/src/components/order/DeliveryAddressForm.tsx` — A form for users to enter their delivery address and contact information, providing `deliveryAddress: string` and `contactPhone: string` to the parent component.
- `frontend/src/components/order/PaymentStep.tsx` — Handles the payment gateway integration and final order submission by calling `useOrders().createOrder(CreateOrderRequest)` and redirecting to the payment link.

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

This feature implements the multi-step online ordering flow for Farmaaish Restaurant, guiding users from their cart through delivery details and payment to final order submission. It integrates with the pre-scaffolded cart framework and the backend `order-management` feature.

The `OrderPage.tsx` serves as the main entry point, orchestrating the checkout process using the `useCheckout` hook from `@/cart`. It displays the `CartSummary.tsx` component, which renders the current items in the cart and their totals, allowing users to adjust quantities or remove items by calling `useCart()` methods. The `DeliveryAddressForm.tsx` collects the customer's delivery address and contact information. The `PaymentStep.tsx` handles the final order submission and payment processing. It utilizes the `useOrders` hook to interact with the backend `order-management` service.

The `orderService.ts` provides the API client functions for creating and fetching orders, calling the `/api/v1/orders` endpoint. The `useOrders.ts` hook abstracts these service calls for use in components, managing loading and error states. The `order.ts` file defines the TypeScript interfaces for order-related data, ensuring type safety across the frontend.

### OrderPage.tsx
This page is a multi-step form. It uses `useCheckout` from `@/cart` to manage the steps. The steps are:
1. **Cart Review**: Displays the `CartSummary` component. Users can review items, adjust quantities, or remove items. A button styled with `Primary CTA` token proceeds to the next step.
2. **Delivery Details**: Displays the `DeliveryAddressForm` component. Users input their delivery address and contact phone. A button styled with `Primary CTA` token proceeds to the next step.
3. **Payment**: Displays the `PaymentStep` component. This step initiates the order creation and payment process. It will show the final `totals.total` from `useCart()` in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### CartSummary.tsx
This component receives `cartItems` and `totals` from `useCart()`. It renders a list of items, each showing `name`, `quantity`, `unitPrice`, and `subtotal`. Quantity adjustments will call `useCart().setItemQuantity(id, newQty, variantKey?)`. Item removal will call `useCart().removeItem(id, variantKey?)`. All monetary values are displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### DeliveryAddressForm.tsx
This component is a form that collects `deliveryAddress: string` and `contactPhone: string`. It should include input fields for these details and validate them (e.g., phone number format). The form should have a submit button styled with the `Primary CTA` token.

### PaymentStep.tsx
This component is responsible for initiating the order and payment. It will display the total amount to be paid, formatted in Indian Rupees (₹). When the user confirms, it will:
1. Construct a `CreateOrderRequest` object using `customerId` (obtained from `useAuth().user.id`), `deliveryAddress`, `contactPhone` (from `DeliveryAddressForm`), and `orderItems` (mapped from `useCart().cartItems`). Each `CartItem` will be mapped to an `OrderItemRequest` with `menuItemId: item.id` and `quantity: item.quantity`.
2. Call `useOrders().createOrder(request)`. This will internally call `orderService.createOrder`.
3. Upon successful order creation, the backend will return an `Order` object which includes `paymentOrderId` and `paymentLink`. The `PaymentStep` component will then redirect the user to the `paymentLink` to complete the payment. If the payment link is not provided, it means the order is created but payment is pending, and the user should be informed.
4. Handle loading and error states using `useOrders().isLoading` and `useOrders().error`. Display appropriate feedback to the user (e.g., a spinner during loading, an error message if `createOrder` fails).

### orderService.ts
This service provides `createOrder` and `getOrderById` functions. `createOrder` makes a POST request to `/api/v1/orders` with a `CreateOrderRequest` body. `getOrderById` makes a GET request to `/api/v1/orders/{orderId}`.

### useOrders.ts
This hook provides `createOrder` and `getOrderById` functions, along with `isLoading` and `error` states. It uses `orderService` to make API calls and manages the state for components.

### order.ts
This file defines the `Order`, `OrderItem`, `OrderStatus`, `CreateOrderRequest`, and `OrderItemRequest` interfaces, mirroring the backend DTOs from the `order-management` feature.

---

## Inquiry Form (Frontend)

**Name:** `inquiry-form`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useInquiries.ts` — Custom React hook for managing the submission of customer inquiries, exposing `submitInquiry(inquiry: InquiryRequest): Promise<void>` along with loading and error states.
- `frontend/src/services/inquiryService.ts` — Frontend service layer — implements `submitInquiry(request: InquiryRequest): Promise<InquiryDto>` by calling the backend inquiry API.
- `frontend/src/types/inquiry.ts` — Generated from the backend API contract — defines TypeScript types for inquiry data.

**Feature Instruction:**

This feature provides the frontend logic for submitting customer inquiries to the Farmaaish Restaurant backend. It consists of a TypeScript type definition for inquiry data, a service for making API calls, and a custom React hook to manage the inquiry submission process. The `Inquiry` type in `frontend/src/types/inquiry.ts` defines the structure of an inquiry, mirroring the `InquiryDto` from the `inquiry-management` backend feature. The `inquiryService.ts` file in `frontend/src/services/inquiryService.ts` exports an asynchronous function `submitInquiry` that takes an `InquiryRequest` object and sends it to the backend's `/api/v1/inquiries` endpoint using the shared `apiClient`. The `useInquiries.ts` custom hook in `frontend/src/hooks/useInquiries.ts` provides a `submitInquiry` function that components can call to send inquiry data. This hook manages loading and error states, and internally calls `inquiryService.submitInquiry`. The `static-pages` feature, specifically `CateringInquiryForm.tsx`, will consume this hook to allow users to submit inquiries for catering or other events. Upon successful submission, the UI should provide appropriate feedback to the user, such as a success message. Error handling should gracefully inform the user of any issues during submission.

---

## Content Display (Events/Gallery)

**Name:** `content-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useEvents.ts`
- `frontend/src/services/eventService.ts`
- `frontend/src/types/event.ts`
- `frontend/src/pages/EventsPage.tsx`

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-[#F5F5DC] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

This feature provides a frontend interface for displaying events and gallery content from the backend `content-management` feature. It consists of a custom hook (`useEvents.ts`) for data fetching, a service (`eventService.ts`) for API interactions, type definitions (`event.ts`), and a page (`EventsPage.tsx`) to render the content.

The `event.ts` file defines the `EventDto` interface, which mirrors the backend `EventDto` data shape from the `content-management` feature. This ensures type safety and consistency across the frontend.

The `eventService.ts` file exports asynchronous functions to interact with the `/api/v1/events` and `/api/v1/events/type/{eventType}` endpoints of the `content-management` backend. Specifically, it provides `getAllActiveEvents()` to fetch all active events and `getEventsByType(eventType: string)` to fetch events filtered by their type. These functions use the shared `apiClient` from `@/api/client.ts` for making HTTP requests.

The `useEvents.ts` hook consumes the `eventService.ts` to provide a convenient way for components to fetch event and gallery data. It exposes `events` (a list of `EventDto`), `galleryItems` (a list of `EventDto` filtered by `eventType: 'GALLERY'`), `isLoading` (a boolean indicating data fetching status), and `error` (any error encountered during fetching). It calls `eventService.getAllActiveEvents()` on mount and filters the results to populate `events` and `galleryItems`.

The `EventsPage.tsx` renders the main gallery and events page. It uses the `Layout` component from `@/components/Layout` for consistent navigation and footer. The page is structured into a hero section, an events section, and a gallery section. It consumes the `useEvents` hook to fetch and display the data. The hero section will feature a large background image, a bold headline, and a subheadline. The events section will display active events with their titles, descriptions, and images. The gallery section will showcase high-quality images of the restaurant's ambiance and food. All monetary values, if any, will be displayed in Indian Rupees (₹) using the `en-IN` locale.

---

## Customer Portal

**Name:** `customer-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useCustomer.ts` — Custom React hook for fetching and updating the logged-in customer's profile information; it exposes `customer`, `isLoading`, `error`, `updateCustomerProfile(customer: CustomerDto)`, and `refetchCustomer()`.
- `frontend/src/services/customerService.ts` — Frontend service for making API calls to customer-related endpoints; it provides `getCustomerProfile(): Promise<CustomerDto>` and `updateCustomerProfile(customer: CustomerDto): Promise<CustomerDto>`.
- `frontend/src/types/customer.ts` — TypeScript types for customer profile and related data.
- `frontend/src/pages/ProfilePage.tsx` — Customer profile page for viewing order history and managing personal details, composed of `UserProfileForm` and `OrderHistoryList`.
- `frontend/src/components/profile/UserProfileForm.tsx` — A form component for customers to update their personal information, consuming the `useCustomer` hook.
- `frontend/src/components/profile/OrderHistoryList.tsx` — Displays a list of the customer's past orders, consuming the `useOrders` hook from the `order-flow` feature.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8902e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

The Customer Portal feature provides a personalized experience for logged-in users of Farmaaish Restaurant, allowing them to view and update their profile information and review their past orders. This feature consists of a `ProfilePage.tsx` which acts as the main entry point, displaying a `UserProfileForm.tsx` for managing personal details and an `OrderHistoryList.tsx` for showcasing past orders. 

The `ProfilePage.tsx` will be a protected route, accessible only to authenticated users, and will utilize the shared `<Layout>` component from `core-ui`. It will fetch the customer's profile data and order history using custom hooks.

`useCustomer.ts` is a custom React hook responsible for fetching and updating the logged-in customer's profile. It uses `customerService.ts` to interact with the backend API. It exposes `customer` (the current profile data), `isLoading`, `error`, `updateCustomerProfile` (a function to update the profile), and `refetchCustomer` (to re-fetch the profile data). The `updateCustomerProfile` function takes a `CustomerDto` as input and calls `customerService.updateCustomerProfile`.

`customerService.ts` handles the direct API communication for customer-related operations. It exports `getCustomerProfile()` to fetch the current user's profile and `updateCustomerProfile(customer: CustomerDto)` to send updated profile data to the backend. Both functions use the `apiClient` from `@/api/client.ts` and handle authentication by including the JWT token from `localStorage` (key: 'token').

`customer.ts` defines the TypeScript interfaces for `CustomerDto` and `UpdateCustomerRequest` to ensure type safety across the frontend application when dealing with customer data. These types mirror the backend `CustomerDto` data shape from the `customer-management` feature.

`UserProfileForm.tsx` is a presentational component that renders a form for the customer to view and edit their `firstName`, `lastName`, `email`, `phone`, and `address`. It consumes the `useCustomer` hook to get the initial data and to submit updates. The form will include input fields pre-populated with the current customer data and a submit button. Upon successful update, it should provide user feedback (e.g., a toast notification).

`OrderHistoryList.tsx` is a presentational component that displays a list of the customer's past orders. It consumes the `useOrders` hook from the `order-flow` feature to fetch the order history. Each order in the list should display key details such as `orderDate`, `totalAmount`, `status`, and a list of `orderItems`. Monetary values (e.g., `totalAmount`, `unitPrice`, `subTotal`) must be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

**Inter-file Wiring:**
- `ProfilePage.tsx` imports and uses `UserProfileForm.tsx` and `OrderHistoryList.tsx`.
- `UserProfileForm.tsx` imports and uses `useCustomer.ts`.
- `useCustomer.ts` imports `customerService.ts` and `CustomerDto` from `customer.ts`.
- `customerService.ts` imports `apiClient` from `frontend/src/api/client.ts` and `CustomerDto` from `customer.ts`.
- `OrderHistoryList.tsx` imports and uses `useOrders.ts` from the `order-flow` feature.

**Cross-Feature Contracts:**
- `customerService.ts` calls the `customer-management` backend feature's API endpoints:
    - `GET /api/v1/customers/profile` to fetch the customer's profile.
    - `PUT /api/v1/customers/profile` to update the customer's profile.
- `OrderHistoryList.tsx` uses the `useOrders` hook from the `order-flow` feature, which in turn calls the `order-management` backend feature's API endpoint:
    - `GET /api/v1/customers/profile/orders` to fetch the customer's order history.
- `ProfilePage.tsx` will be wrapped in the `<Layout>` component from `core-ui`.
- Authentication is handled by `auth-ui`. The JWT token is stored in `localStorage` with the key 'token'.

---

## Admin Portal

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/AdminDashboardPage.tsx` — Admin page — the main landing page for the admin panel, showing summary stats and links to management sections.
- `frontend/src/pages/AdminMenuPage.tsx` — Admin page — manages the restaurant menu, composed of a menu item table and creation/edit forms.
- `frontend/src/components/admin/menu/MenuTable.tsx` — COMPONENT layer — displays a data table for managing all menu items, consuming data from the `useMenu` hook.
- `frontend/src/components/admin/menu/MenuItemForm.tsx` — COMPONENT layer — provides a form for creating or editing a menu item, interacting with the `useMenu` hook.
- `frontend/src/components/admin/menu/DeleteMenuItemDialog.tsx` — COMPONENT layer — a confirmation dialog for deleting a menu item, interacting with the `useMenu` hook.
- `frontend/src/pages/AdminReservationsPage.tsx` — Admin page — views and manages customer reservations.
- `frontend/src/components/admin/reservations/ReservationsTable.tsx` — COMPONENT layer — displays a data table for managing all reservations, consuming data from the `useReservations` hook.
- `frontend/src/pages/AdminOrdersPage.tsx` — Admin page — views and manages customer orders.
- `frontend/src/components/admin/orders/OrdersTable.tsx` — COMPONENT layer — displays a data table for managing all online orders, consuming data from the `useOrders` hook.
- `frontend/src/pages/AdminEventsPage.tsx` — Admin page — manages events and gallery content.
- `frontend/src/components/admin/events/EventsTable.tsx` — COMPONENT layer — displays a data table for managing all events, consuming data from the `useEvents` hook.
- `frontend/src/components/admin/events/EventForm.tsx` — COMPONENT layer — provides a form for creating or editing an event or gallery item, interacting with the `useEvents` hook.
- `frontend/src/pages/AdminInquiriesPage.tsx` — Admin page — views and manages catering and event inquiries.
- `frontend/src/components/admin/inquiries/InquiriesTable.tsx` — COMPONENT layer — displays a data table for managing all customer inquiries, consuming data from the `useInquiries` hook.

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

This feature provides the administrative interface for Farmaaish Restaurant, allowing staff to manage menu items, reservations, orders, events, and customer inquiries. It consists of several pages, each dedicated to a specific management area, and reusable components for data display (tables) and data entry (forms/dialogs). All pages are wrapped in the `<AdminLayout>` component from `@/components/AdminLayout` to ensure consistent navigation and authentication enforcement for administrative users. All API calls are made to the `/api/v1/admin/**` endpoints and require authentication with an 'admin' role.

### AdminDashboardPage.tsx
This page serves as the main entry point for the admin portal. It will display a welcome message, summary statistics (e.g., total reservations, pending orders, new inquiries – these will be placeholder values as no specific API for dashboard stats is available), and navigation links to other admin sections. It uses the `<AdminLayout>` for overall structure.

### AdminMenuPage.tsx
This page is responsible for managing the restaurant's menu. It integrates the `MenuTable` component to display existing menu items, and `MenuItemForm` (likely within a dialog) for creating and editing menu items. The `DeleteMenuItemDialog` will handle confirmation for item deletion. This page orchestrates the data flow between these components using the `useMenu` hook.

### MenuTable.tsx
This component renders a data table displaying all menu items. It fetches menu items using the `useMenu` hook, which in turn calls the `getAllMenuItems()` function from the generated menu service. The table will include columns for `name`, `categoryName`, `price`, `vegetarian`, `spicy`, and `imageUrl`. It will provide actions to edit or delete a menu item, triggering the `MenuItemForm` or `DeleteMenuItemDialog` respectively. Monetary values (price) will be displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### MenuItemForm.tsx
This component provides a form for creating or updating a menu item. It will accept an optional `MenuItemDto` prop for pre-filling the form in edit mode. The form will include fields for `name`, `description`, `price`, `imageUrl`, `vegetarian` (checkbox), `spicy` (checkbox), and `categoryId` (dropdown populated by `getAllMenuItemCategories()` from `useMenu`). Upon submission, it will call either `createMenuItem()` or `updateMenuItem()` from the `useMenu` hook. Price input should be handled as a number and formatted to Indian Rupees (₹) for display.

### DeleteMenuItemDialog.tsx
This component is a confirmation dialog for deleting a menu item. It will receive the `id` of the menu item to be deleted as a prop. Upon confirmation, it will call the `deleteMenuItem()` function from the `useMenu` hook.

### AdminReservationsPage.tsx
This page manages customer reservations. It uses the `ReservationsTable` component to display all reservations and allows for actions like updating reservation status or deleting a reservation. It orchestrates data flow using the `useReservations` hook.

### ReservationsTable.tsx
This component displays a table of all reservations. It fetches reservations using the `useReservations` hook, which calls the generated service function `getAllReservations()`. The table will show `customerName`, `reservationDate`, `reservationTime`, `numberOfGuests`, `status`, and `specialRequests`. It will provide actions to update the status of a reservation (e.g., CONFIRMED, CANCELLED, COMPLETED) or delete a reservation, calling `updateReservation()` or `deleteReservation()` from the `useReservations` hook respectively. Dates and times will be formatted according to Indian conventions.

### AdminOrdersPage.tsx
This page manages customer orders. It uses the `OrdersTable` component to display all orders and allows for updating order statuses. It orchestrates data flow using the `useOrders` hook.

### OrdersTable.tsx
This component displays a table of all online orders. It fetches orders using the `useOrders` hook, which calls the generated service function `getAllOrders()`. The table will include `id`, `customerName` (placeholder, as `Order` DTO does not have `customerName` directly; this will require a lookup or a backend DTO enrichment), `orderDate`, `totalAmount`, and `status`. It will provide actions to update the order status (e.g., PREPARING, OUT_FOR_DELIVERY, DELIVERED), calling `updateOrderStatus()` from the `useOrders` hook. Monetary values (totalAmount) will be displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`. Dates will be formatted according to Indian conventions.

### AdminEventsPage.tsx
This page manages restaurant events and gallery content. It integrates the `EventsTable` component to display existing events and `EventForm` (likely within a dialog) for creating and editing events. This page orchestrates the data flow between these components using the `useEvents` hook.

### EventsTable.tsx
This component renders a data table displaying all events. It fetches events using the `useEvents` hook, which calls the generated service function `getAllEvents()`. The table will include columns for `title`, `eventType`, `eventDate`, and `active`. It will provide actions to edit or delete an event, triggering the `EventForm` or a confirmation dialog respectively. Dates will be formatted according to Indian conventions.

### EventForm.tsx
This component provides a form for creating or updating an event. It will accept an optional `EventDto` prop for pre-filling the form in edit mode. The form will include fields for `title`, `description`, `imageUrl`, `eventDate`, `eventType`, and `active` (checkbox). Upon submission, it will call either `createEvent()` or `updateEvent()` from the `useEvents` hook. Dates will be handled as date pickers and formatted according to Indian conventions.

### AdminInquiriesPage.tsx
This page manages customer inquiries, such as catering or event inquiries. It uses the `InquiriesTable` component to display all inquiries and allows for updating inquiry statuses. It orchestrates data flow using the `useInquiries` hook.

### InquiriesTable.tsx
This component displays a table of all customer inquiries. It fetches inquiries using the `useInquiries` hook, which calls the generated service function `getAllInquiries()`. The table will show `customerName`, `eventType`, `eventDate`, `inquiryDate`, `status`, and `message`. It will provide actions to update the status of an inquiry (e.g., CONTACTED, CLOSED) or delete an inquiry, calling `updateInquiryStatus()` or `deleteInquiry()` from the `useInquiries` hook respectively. Dates will be formatted according to Indian conventions.


---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

