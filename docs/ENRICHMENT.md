# Feature Enrichment — Attempt 1

Generated: 2026-08-01

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend Utilities

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/exception/GlobalExceptionHandler.java` — Centralized exception handler for the backend API, mapping specific exceptions to standardized `ErrorResponse` DTOs with appropriate HTTP status codes.
- `backend/src/main/java/com/farmaaishrestaurant/exception/ResourceNotFoundException.java` — Custom unchecked exception to indicate that a requested resource (domain entity) could not be found, typically handled by `GlobalExceptionHandler`.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ErrorResponse.java` — Data Transfer Object (DTO) defining the standardized JSON structure for all API error responses.
- `backend/src/main/java/com/farmaaishrestaurant/controller/SpaController.java` — Controller responsible for forwarding all non-API, non-static requests to the React application's `index.html` to enable client-side routing.
- `backend/src/main/java/com/farmaaishrestaurant/config/DataSeeder.java` — Configuration component that implements `CommandLineRunner` to seed the database with initial `MenuItemCategory` and `MenuItem` data on application startup.

**Feature Instruction:**

The Shared Backend Utilities feature provides foundational components for error handling, initial data seeding, and single-page application (SPA) routing. It ensures a consistent error response format across the API, populates the database with essential data on startup, and correctly serves the React frontend's `index.html` for all non-API, non-static routes.

`GlobalExceptionHandler.java` acts as a centralized exception handler, intercepting specific exceptions like `ResourceNotFoundException` and generic `Exception` instances. It maps these to a standardized `ErrorResponse` DTO, ensuring that API consumers receive predictable and informative error messages with appropriate HTTP status codes. For `ResourceNotFoundException`, it returns a 404 Not Found status. For all other `Exception` types, it returns a 500 Internal Server Error, logging the full stack trace for debugging.

`ResourceNotFoundException.java` is a custom unchecked exception that should be thrown by services when a requested entity (e.g., a `MenuItem` or `Reservation`) cannot be found in the database. This allows for specific error handling at the controller level via `GlobalExceptionHandler`.

`ErrorResponse.java` defines the structure for all API error responses. It includes fields for a timestamp, HTTP status code, error message, and the path of the request that caused the error.

`SpaController.java` is crucial for integrating the Spring Boot backend with the React frontend. It contains a catch-all `GET` mapping (`/**`) that forwards all requests not matching other API or static resource paths to `index.html`. This enables client-side routing for the React application, ensuring that direct URL access to frontend routes (e.g., `/menu`, `/reservations`) correctly loads the SPA.

`DataSeeder.java` is responsible for populating the database with initial data required for the application to function. This includes `MenuItemCategory` and `MenuItem` entities. It implements `CommandLineRunner` to execute the seeding logic once the application context is loaded. It injects `MenuItemRepository` and `MenuItemCategoryRepository` from the `menu-management` feature to perform `saveAll` operations. The seeding logic first checks if categories already exist to prevent duplicate entries on successive application restarts. If not, it creates a set of predefined categories and menu items, associating each item with its respective category. This ensures that the restaurant's menu is available immediately upon application startup.

### Inter-file Wiring:
- `GlobalExceptionHandler` catches `ResourceNotFoundException` and other `Exception` types, constructing `ErrorResponse` objects.
- `SpaController` serves `index.html` for frontend routing.
- `DataSeeder` injects `MenuItemRepository` and `MenuItemCategoryRepository` (from `menu-management` feature) to seed initial data.

---

## Menu Management (Backend)

**Name:** `menu-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItem.java` — MODEL layer — Represents a single dish or beverage on the restaurant menu, linked to a MenuItemCategory.
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItemCategory.java` — MODEL layer — Represents a category for menu items.
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemRepository.java` — REPOSITORY layer — provides CRUD operations for MenuItem entities and custom queries like findByCategoryId(UUID).
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemCategoryRepository.java` — REPOSITORY layer — provides CRUD operations for MenuItemCategory entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/MenuService.java` — SERVICE layer — implements business logic for menu items and categories, including getAllMenuItems(): List<MenuItemDto>, getMenuItemById(UUID): MenuItemDto, createMenuItem(CreateMenuItemRequest): MenuItemDto, updateMenuItem(UUID, CreateMenuItemRequest): MenuItemDto, deleteMenuItem(UUID): void, getAllMenuItemCategories(): List<MenuItemCategoryDto>, getMenuItemCategoryById(UUID): MenuItemCategoryDto, createMenuItemCategory(MenuItemCategoryDto): MenuItemCategoryDto, updateMenuItemCategory(UUID, MenuItemCategoryDto): MenuItemCategoryDto, and deleteMenuItemCategory(UUID): void.
- `backend/src/main/java/com/farmaaishrestaurant/controller/MenuController.java` — CONTROLLER layer — exposes public REST API endpoints for retrieving menu items and categories.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminMenuController.java` — CONTROLLER layer — exposes admin-only REST API endpoints for CRUD operations on menu items and categories.
- `backend/src/main/java/com/farmaaishrestaurant/dto/MenuItemDto.java` — DTO layer — Data Transfer Object for representing a menu item in API responses.
- `backend/src/main/java/com/farmaaishrestaurant/dto/MenuItemCategoryDto.java` — DTO layer — Data Transfer Object for representing a menu category in API responses and for creating/updating categories.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateMenuItemRequest.java` — DTO layer — Data Transfer Object for creating or updating a menu item via the admin API.

**Feature Instruction:**

The Menu Management feature provides a complete backend solution for managing the Farmaaish Restaurant's menu, including dishes and their categories. It exposes public APIs for customers to view the menu and admin-only APIs for managing menu items and categories. The core components include `MenuItem` and `MenuItemCategory` models for persistence, `MenuItemRepository` and `MenuItemCategoryRepository` for data access, `MenuService` for business logic, and `MenuController` and `AdminMenuController` for exposing RESTful APIs.

**Data Models:**
*   `MenuItem.java`: Represents a single dish or beverage. It includes fields like `id` (UUID), `name` (String), `description` (String), `price` (BigDecimal), `imageUrl` (String), `vegetarian` (boolean), `spicy` (boolean), `available` (boolean), and a `category` (MenuItemCategory).
*   `MenuItemCategory.java`: Represents a category for menu items. It includes `id` (UUID), `name` (String), and `description` (String).

**Repositories:**
*   `MenuItemRepository.java`: Extends `JpaRepository<MenuItem, UUID>` to provide standard CRUD operations for `MenuItem` entities. It will also include a custom query method `findByCategoryId(UUID categoryId)` to retrieve menu items by their category.
*   `MenuItemCategoryRepository.java`: Extends `JpaRepository<MenuItemCategory, UUID>` to provide standard CRUD operations for `MenuItemCategory` entities.

**Service Layer (`MenuService.java`):**
`MenuService` orchestrates interactions between controllers and repositories, handling all business logic related to menu items and categories. It injects `MenuItemRepository` and `MenuItemCategoryRepository`.

**Public Methods:**
1.  `List<MenuItemDto> getAllMenuItems()`:
    *   Retrieves all available menu items.
    *   Steps:
        1.  Call `menuItemRepository.findAll()`.
        2.  Map `MenuItem` entities to `MenuItemDto` objects.
        3.  Return the list of `MenuItemDto`.
2.  `MenuItemDto getMenuItemById(UUID id)`:
    *   Retrieves a single menu item by its ID.
    *   Steps:
        1.  Call `menuItemRepository.findById(id)`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Map `MenuItem` entity to `MenuItemDto`.
        4.  Return the `MenuItemDto`.
3.  `List<MenuItemDto> getMenuItemsByCategoryId(UUID categoryId)`:
    *   Retrieves all menu items belonging to a specific category.
    *   Steps:
        1.  Call `menuItemRepository.findByCategoryId(categoryId)`.
        2.  Map `MenuItem` entities to `MenuItemDto` objects.
        3.  Return the list of `MenuItemDto`.
4.  `List<MenuItemCategoryDto> getAllMenuItemCategories()`:
    *   Retrieves all menu item categories.
    *   Steps:
        1.  Call `menuItemCategoryRepository.findAll()`.
        2.  Map `MenuItemCategory` entities to `MenuItemCategoryDto` objects.
        3.  Return the list of `MenuItemCategoryDto`.
5.  `MenuItemCategoryDto getMenuItemCategoryById(UUID id)`:
    *   Retrieves a single menu item category by its ID.
    *   Steps:
        1.  Call `menuItemCategoryRepository.findById(id)`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Map `MenuItemCategory` entity to `MenuItemCategoryDto`.
        4.  Return the `MenuItemCategoryDto`.
6.  `MenuItemDto createMenuItem(CreateMenuItemRequest request)`:
    *   Creates a new menu item.
    *   Steps:
        1.  Validate `request` fields.
        2.  Retrieve `MenuItemCategory` by `request.getCategoryId()` using `menuItemCategoryRepository.findById()`. If not found, throw `ResourceNotFoundException`.
        3.  Create a new `MenuItem` entity from the `request` and the retrieved category.
        4.  Call `menuItemRepository.save(menuItem)`.
        5.  Map the saved `MenuItem` to `MenuItemDto`.
        6.  Return the `MenuItemDto`.
7.  `MenuItemDto updateMenuItem(UUID id, CreateMenuItemRequest request)`:
    *   Updates an existing menu item.
    *   Steps:
        1.  Call `menuItemRepository.findById(id)`. If not found, throw `ResourceNotFoundException`.
        2.  Retrieve `MenuItemCategory` by `request.getCategoryId()` using `menuItemCategoryRepository.findById()`. If not found, throw `ResourceNotFoundException`.
        3.  Update the existing `MenuItem` entity with fields from the `request` and the retrieved category.
        4.  Call `menuItemRepository.save(menuItem)`.
        5.  Map the updated `MenuItem` to `MenuItemDto`.
        6.  Return the `MenuItemDto`.
8.  `void deleteMenuItem(UUID id)`:
    *   Deletes a menu item by its ID.
    *   Steps:
        1.  Call `menuItemRepository.findById(id)`. If not found, throw `ResourceNotFoundException`.
        2.  Call `menuItemRepository.deleteById(id)`.
9.  `MenuItemCategoryDto createMenuItemCategory(MenuItemCategoryDto request)`:
    *   Creates a new menu item category.
    *   Steps:
        1.  Validate `request` fields.
        2.  Create a new `MenuItemCategory` entity from the `request`.
        3.  Call `menuItemCategoryRepository.save(category)`.
        4.  Map the saved `MenuItemCategory` to `MenuItemCategoryDto`.
        5.  Return the `MenuItemCategoryDto`.
10. `MenuItemCategoryDto updateMenuItemCategory(UUID id, MenuItemCategoryDto request)`:
    *   Updates an existing menu item category.
    *   Steps:
        1.  Call `menuItemCategoryRepository.findById(id)`. If not found, throw `ResourceNotFoundException`.
        2.  Update the existing `MenuItemCategory` entity with fields from the `request`.
        3.  Call `menuItemCategoryRepository.save(category)`.
        4.  Map the updated `MenuItemCategory` to `MenuItemCategoryDto`.
        5.  Return the `MenuItemCategoryDto`.
11. `void deleteMenuItemCategory(UUID id)`:
    *   Deletes a menu item category by its ID.
    *   Steps:
        1.  Call `menuItemCategoryRepository.findById(id)`. If not found, throw `ResourceNotFoundException`.
        2.  Check if any `MenuItem` is associated with this category using `menuItemRepository.findByCategoryId(id)`. If items are found, throw `IllegalStateException` with a message like "Cannot delete category with associated menu items."
        3.  Call `menuItemCategoryRepository.deleteById(id)`.

**Controllers:**
*   `MenuController.java`: Exposes public API endpoints for retrieving menu items and categories. It injects `MenuService`.
    *   `GET /api/v1/menu/items`: Returns a list of all `MenuItemDto`.
    *   `GET /api/v1/menu/items/{id}`: Returns a single `MenuItemDto` by ID.
    *   `GET /api/v1/menu/items/category/{categoryId}`: Returns a list of `MenuItemDto` for a given category ID.
    *   `GET /api/v1/menu/categories`: Returns a list of all `MenuItemCategoryDto`.
    *   `GET /api/v1/menu/categories/{id}`: Returns a single `MenuItemCategoryDto` by ID.
*   `AdminMenuController.java`: Exposes admin-only API endpoints for CRUD operations on menu items and categories. It injects `MenuService`.
    *   `POST /api/v1/admin/menu/items`: Creates a new `MenuItem`.
    *   `PUT /api/v1/admin/menu/items/{id}`: Updates an existing `MenuItem`.
    *   `DELETE /api/v1/admin/menu/items/{id}`: Deletes a `MenuItem`.
    *   `POST /api/v1/admin/menu/categories`: Creates a new `MenuItemCategory`.
    *   `PUT /api/v1/admin/menu/categories/{id}`: Updates an existing `MenuItemCategory`.
    *   `DELETE /api/v1/admin/menu/categories/{id}`: Deletes a `MenuItemCategory`.

**Data Transfer Objects (DTOs):**
*   `MenuItemDto.java`: Used for API responses, containing fields like `id`, `name`, `description`, `price`, `imageUrl`, `vegetarian`, `spicy`, `available`, and `categoryName` (String, derived from `MenuItemCategory`).
*   `MenuItemCategoryDto.java`: Used for API responses and creating/updating categories, containing fields like `id`, `name`, and `description`.
*   `CreateMenuItemRequest.java`: Used for creating and updating menu items, containing fields like `name`, `description`, `price`, `imageUrl`, `vegetarian`, `spicy`, `available`, and `categoryId` (UUID).

**Error Handling:**
*   `ResourceNotFoundException`: Thrown by `MenuService` when a requested `MenuItem` or `MenuItemCategory` is not found. Controllers will return HTTP 404 NOT FOUND.
*   `IllegalStateException`: Thrown by `MenuService` when attempting to delete a `MenuItemCategory` that still has associated `MenuItem`s. Controllers will return HTTP 400 BAD REQUEST.

---

## Reservation System (Backend)

**Name:** `reservation-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Reservation.java` — MODEL layer — represents a customer's table reservation with details like customer information, date, time, party size, and current status.
- `backend/src/main/java/com/farmaaishrestaurant/model/ReservationStatus.java` — MODEL layer — an enum defining the possible states a reservation can be in.
- `backend/src/main/java/com/farmaaishrestaurant/repository/ReservationRepository.java` — REPOSITORY layer — provides data access operations for the Reservation entity, including custom queries to find reservations by status or date.
- `backend/src/main/java/com/farmaaishrestaurant/service/ReservationService.java` — SERVICE layer — implements createReservation(CreateReservationRequest): ReservationResponse, getReservationById(UUID): ReservationResponse, getAllReservations(): List<ReservationResponse>, getReservationsByStatus(ReservationStatus): List<ReservationResponse>, and updateReservationStatus(UUID, UpdateReservationStatusRequest): ReservationResponse; delegates persistence to ReservationRepository.
- `backend/src/main/java/com/farmaaishrestaurant/controller/ReservationController.java` — CONTROLLER layer — exposes public REST API endpoints for customers to create new table reservations.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminReservationController.java` — CONTROLLER layer — exposes admin-only REST API endpoints for viewing and managing all customer reservations.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateReservationRequest.java` — DTO layer — data transfer object for capturing customer input when creating a new reservation.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ReservationResponse.java` — DTO layer — data transfer object for representing a reservation in API responses.
- `backend/src/main/java/com/farmaaishrestaurant/dto/UpdateReservationStatusRequest.java` — DTO layer — data transfer object for updating the status of a reservation via the admin API.

**Feature Instruction:**

This feature implements the backend for managing table reservations at Farmaaish Restaurant. It includes models for reservations and their statuses, a repository for database interactions, a service layer for business logic, and two controllers: one for public customer reservations and another for administrative management. The system allows customers to create new reservations, and administrators to view, confirm, or cancel reservations.

### Models
`Reservation.java` defines the core entity for a reservation, capturing details such as customer name, contact information, date, time, party size, and status. `ReservationStatus.java` is an enum that defines the lifecycle of a reservation (PENDING, CONFIRMED, CANCELLED).

### Repository
`ReservationRepository.java` extends `JpaRepository` to provide standard CRUD operations for `Reservation` entities. It will also include custom query methods to find reservations by date, status, or customer ID.

### Service
`ReservationService.java` encapsulates the business logic. It injects `ReservationRepository` to interact with the database. Key methods include:
1. `createReservation(CreateReservationRequest request): ReservationResponse`:
   - Validates the incoming request (e.g., party size, date/time availability).
   - Creates a new `Reservation` entity with `ReservationStatus.PENDING`.
   - Saves the reservation using `reservationRepository.save()`.
   - Sends a confirmation email (placeholder for future integration).
   - Returns a `ReservationResponse`.
   - Throws `IllegalArgumentException` if validation fails.
2. `getReservationById(UUID id): ReservationResponse`:
   - Retrieves a reservation by its ID using `reservationRepository.findById()`.
   - Throws `ResourceNotFoundException` if the reservation is not found.
   - Returns a `ReservationResponse`.
3. `getAllReservations(): List<ReservationResponse>`:
   - Retrieves all reservations from the database.
   - Returns a list of `ReservationResponse`.
4. `getReservationsByStatus(ReservationStatus status): List<ReservationResponse>`:
   - Retrieves reservations filtered by their status.
   - Returns a list of `ReservationResponse`.
5. `updateReservationStatus(UUID id, UpdateReservationStatusRequest request): ReservationResponse`:
   - Retrieves the reservation by ID.
   - Updates its status based on the `UpdateReservationStatusRequest`.
   - Saves the updated reservation.
   - Throws `ResourceNotFoundException` if the reservation is not found.
   - Returns a `ReservationResponse`.

### Controllers
`ReservationController.java` exposes public API endpoints for customers to create reservations. It injects `ReservationService`.
`AdminReservationController.java` provides admin-only endpoints for viewing and managing all reservations. It also injects `ReservationService`.

### DTOs
- `CreateReservationRequest.java`: Used for customer input when booking a new reservation. Contains fields like `customerName`, `customerEmail`, `customerPhone`, `reservationDate`, `reservationTime`, `partySize`, `specialRequests`.
- `ReservationResponse.java`: Used to return reservation details in API responses. Contains fields like `id`, `customerName`, `customerEmail`, `customerPhone`, `reservationDate`, `reservationTime`, `partySize`, `specialRequests`, `status`, `createdAt`, `updatedAt`.
- `UpdateReservationStatusRequest.java`: Used by the admin to update the status of a reservation. Contains `status`.

### Error Handling
Both controllers will leverage `GlobalExceptionHandler` (from `shared-backend`) to handle `ResourceNotFoundException` (returning HTTP 404) and `IllegalArgumentException` (returning HTTP 400).

---

## Order Management Core (Backend)

**Name:** `order-core`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Order.java` — MODEL layer — represents a customer's online food order with its associated items and status.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderItem.java` — MODEL layer — represents a single line item within a customer's order.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderStatus.java` — MODEL layer — enum defining the possible statuses of an order.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderRepository.java` — REPOSITORY layer — Spring Data JPA repository for CRUD operations on Order entities, and custom queries for order status and customer email.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderItemRepository.java` — REPOSITORY layer — Spring Data JPA repository for CRUD operations on OrderItem entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/OrderService.java` — SERVICE layer — implements createOrder(CreateOrderRequest): OrderResponse, getOrderById(UUID): OrderResponse, and updateOrderStatus(UUID, OrderStatus): OrderResponse; delegates persistence to OrderRepository and OrderItemRepository, and payment initiation to PaymentService, and menu item validation to MenuItemRepository.

**Feature Instruction:**

The Order Management Core (Backend) feature provides the foundational data models, repositories, and business logic for handling customer food orders. It defines the `Order` and `OrderItem` entities, their relationships, and the lifecycle of an order through the `OrderStatus` enum. The `OrderService` orchestrates the creation of new orders, including validating menu items, calculating totals, and interacting with the payment system. It also provides methods for retrieving and updating order information.

### Order Creation Flow
1.  A request to create an order (`CreateOrderRequest`) is received by the `OrderService`.
2.  The `OrderService` validates each `OrderItemRequest` against the `MenuItemRepository` to ensure the menu items exist and are available. If any item is not found or unavailable, a `ResourceNotFoundException` is thrown.
3.  The service calculates the total amount of the order based on the prices of the menu items.
4.  An `Order` entity is created with `OrderStatus.PENDING_PAYMENT`.
5.  The `Order` and associated `OrderItem` entities are persisted using `OrderRepository` and `OrderItemRepository`.
6.  The `OrderService` then calls the pre-scaffolded `PaymentService.createOrder(CreatePaymentRequest)` to initiate a payment. The `CreatePaymentRequest` will include the order ID, total amount, and currency (INR).
7.  The `PaymentOrderResponse` from the `PaymentService` is used to update the `Order` status to `PENDING_PAYMENT_VERIFICATION` and store any relevant payment gateway transaction IDs.
8.  The `OrderService` returns an `OrderResponse` DTO containing the created order's details.

### Order Status Updates
-   `OrderService.updateOrderStatus(UUID orderId, OrderStatus newStatus)`: This method updates the status of an existing order. It first retrieves the order using `OrderRepository.findById()`. If the order is not found, it throws a `ResourceNotFoundException`. It then updates the order's status and saves the changes.

### Data Models
-   `Order.java`: Represents the main order entity, containing fields like `id`, `customerName`, `customerEmail`, `deliveryAddress`, `totalAmount`, `orderStatus`, `createdAt`, `updatedAt`, and a one-to-many relationship with `OrderItem`.
-   `OrderItem.java`: Represents a single item within an order, with fields like `id`, `menuItemId`, `menuItemName`, `quantity`, `unitPrice`, and a many-to-one relationship with `Order`.
-   `OrderStatus.java`: An enum defining the various states an order can be in (e.g., `PENDING_PAYMENT`, `RECEIVED`, `PREPARING`, `READY_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`).

### Repositories
-   `OrderRepository.java`: Extends `JpaRepository` for `Order` entities, providing standard CRUD operations and custom queries like `findByOrderStatus` and `findByCustomerEmail`.
-   `OrderItemRepository.java`: Extends `JpaRepository` for `OrderItem` entities, providing standard CRUD operations.

### Services
-   `OrderService.java`: Orchestrates order-related business logic. It injects `OrderRepository`, `OrderItemRepository`, `MenuItemRepository` (from `menu-management` feature), and `PaymentService` (pre-scaffolded). It exposes methods for creating, retrieving, and updating orders.

### Error Handling
-   `ResourceNotFoundException`: Thrown when an order or menu item is not found. This exception is handled globally by `GlobalExceptionHandler` in the `shared-backend` feature, returning an HTTP 404 status.

---

## Order Management API (Backend)

**Name:** `order-api`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/controller/OrderController.java` — CONTROLLER layer — exposes public-facing REST API endpoints for creating orders via `createOrder(CreateOrderRequest)` and retrieving customer order history via `getOrdersByCustomerEmail(String customerEmail)`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminOrderController.java` — CONTROLLER layer — exposes admin-only REST API endpoints for viewing all orders via `getAllOrders()`, retrieving a specific order via `getOrderById(UUID orderId)`, and updating order status via `updateOrderStatus(UUID orderId, OrderStatus newStatus)`.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateOrderRequest.java` — DTO layer — defines the data structure for requests to create a new order, including customer details, delivery information, and a list of `OrderItemRequest` objects.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderItemRequest.java` — DTO layer — defines the data structure for a single item within an order creation request, specifying the menu item and its quantity.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderResponse.java` — DTO layer — defines the data structure for representing a complete order in API responses, including all order details, status, and associated items.

**Feature Instruction:**

The Order Management API feature provides backend services for customers to create and view their orders, and for administrators to manage all orders. It consists of two DTOs for order creation (`CreateOrderRequest` and `OrderItemRequest`), one DTO for order responses (`OrderResponse`), and two controllers (`OrderController` and `AdminOrderController`) that expose REST API endpoints.

`CreateOrderRequest` and `OrderItemRequest` define the structure for incoming order data, including customer details, delivery address, and a list of menu items with quantities. `OrderResponse` provides a comprehensive view of an order, including its status, total amount, and individual order items.

`OrderController` handles public-facing API endpoints. It allows authenticated customers to create new orders and retrieve their order history. When creating an order, `OrderController.createOrder` will call `OrderService.createOrder` from the `order-core` feature. When fetching order history, it will call `OrderService.getOrdersByCustomerEmail`.

`AdminOrderController` provides administrative endpoints for managing all orders. It allows authenticated administrators to retrieve all orders, get a specific order by ID, and update an order's status. These operations will delegate to `OrderService.getAllOrders`, `OrderService.getOrderById`, and `OrderService.updateOrderStatus` respectively, all from the `order-core` feature.

All controllers will handle `ResourceNotFoundException` by returning an HTTP 404 status code with an `ErrorResponse` body, and other general exceptions with an HTTP 500 status code, leveraging the `GlobalExceptionHandler` from the `shared-backend` feature.

---

## Gallery Management (Backend)

**Name:** `gallery-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/GalleryItem.java` — JPA Entity layer — represents an image or video in the restaurant's gallery.
- `backend/src/main/java/com/farmaaishrestaurant/repository/GalleryItemRepository.java` — REPOSITORY layer — provides CRUD operations and custom queries for GalleryItem entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/GalleryService.java` — SERVICE layer — implements business logic for managing gallery content, including CRUD operations and category-based retrieval.
- `backend/src/main/java/com/farmaaishrestaurant/controller/GalleryController.java` — CONTROLLER layer — exposes public REST API endpoints for retrieving gallery items.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminGalleryController.java` — CONTROLLER layer — exposes admin-only REST API endpoints for managing gallery content.
- `backend/src/main/java/com/farmaaishrestaurant/dto/GalleryItemDto.java` — DTO layer — Data Transfer Object for representing a gallery item in API requests and responses.

**Feature Instruction:**

The Gallery Management feature provides backend services for storing and retrieving images and videos that showcase Farmaaish Restaurant's food and ambiance. It consists of a `GalleryItem` JPA entity, a `GalleryItemRepository` for data access, a `GalleryService` for business logic, and two controllers: `GalleryController` for public access to gallery items and `AdminGalleryController` for administrative CRUD operations.

### GalleryItem.java
This JPA entity represents a single gallery item. It will have fields for `id` (UUID, primary key), `title` (String, e.g., "Biryani Platter"), `description` (String, optional, e.g., "Our signature Hyderabadi Biryani"), `imageUrl` (String, URL to the image/video), `category` (String, e.g., "Food", "Ambiance", "Events"), and `uploadDate` (LocalDateTime, automatically set on creation).

### GalleryItemRepository.java
This is a Spring Data JPA repository extending `JpaRepository<GalleryItem, UUID>`. It will provide standard CRUD operations. Additionally, it will include a custom query method `findByCategory(String category)` to retrieve gallery items filtered by their category.

### GalleryItemDto.java
This DTO is used for transferring gallery item data between the service layer and the controllers. It will mirror the `GalleryItem` entity's fields: `id` (UUID), `title` (String), `description` (String), `imageUrl` (String), `category` (String), and `uploadDate` (LocalDateTime).

### GalleryService.java
This service class encapsulates the business logic for gallery management. It injects `GalleryItemRepository`.

**Public Functions:**
1. `public List<GalleryItemDto> getAllGalleryItems()`:
   - Retrieves all gallery items from the repository.
   - Maps `GalleryItem` entities to `GalleryItemDto`s.
   - Returns a `List<GalleryItemDto>`.
2. `public List<GalleryItemDto> getGalleryItemsByCategory(String category)`:
   - Retrieves gallery items filtered by the given `category` from the repository.
   - Throws `ResourceNotFoundException` if no items are found for the category.
   - Maps `GalleryItem` entities to `GalleryItemDto`s.
   - Returns a `List<GalleryItemDto>`.
3. `public GalleryItemDto getGalleryItemById(UUID id)`:
   - Retrieves a single gallery item by its `id`.
   - Throws `ResourceNotFoundException` if the item is not found.
   - Maps the `GalleryItem` entity to a `GalleryItemDto`.
   - Returns a `GalleryItemDto`.
4. `public GalleryItemDto createGalleryItem(GalleryItemDto galleryItemDto)`:
   - Creates a new gallery item.
   - Maps the `GalleryItemDto` to a `GalleryItem` entity.
   - Sets `uploadDate` to `LocalDateTime.now()`.
   - Saves the entity using `galleryItemRepository.save()`.
   - Maps the saved entity back to a `GalleryItemDto`.
   - Returns the created `GalleryItemDto`.
5. `public GalleryItemDto updateGalleryItem(UUID id, GalleryItemDto galleryItemDto)`:
   - Updates an existing gallery item identified by `id`.
   - Retrieves the existing item using `galleryItemRepository.findById(id)`. Throws `ResourceNotFoundException` if not found.
   - Updates the `title`, `description`, `imageUrl`, and `category` fields of the existing entity from the `galleryItemDto`.
   - Saves the updated entity using `galleryItemRepository.save()`.
   - Maps the updated entity back to a `GalleryItemDto`.
   - Returns the updated `GalleryItemDto`.
6. `public void deleteGalleryItem(UUID id)`:
   - Deletes a gallery item by its `id`.
   - Checks if the item exists using `galleryItemRepository.existsById(id)`. Throws `ResourceNotFoundException` if not found.
   - Deletes the item using `galleryItemRepository.deleteById(id)`.

### GalleryController.java
This REST controller handles public-facing requests for gallery items. It injects `GalleryService`.

**API Endpoints:**
1. `GET /api/v1/gallery`:
   - Returns a `ResponseEntity<List<GalleryItemDto>>` containing all gallery items.
   - Calls `galleryService.getAllGalleryItems()`.
   - Access: public.
2. `GET /api/v1/gallery/category/{category}`:
   - Returns a `ResponseEntity<List<GalleryItemDto>>` containing gallery items filtered by `category`.
   - Calls `galleryService.getGalleryItemsByCategory(category)`.
   - Handles `ResourceNotFoundException` by returning `HttpStatus.NOT_FOUND`.
   - Access: public.
3. `GET /api/v1/gallery/{id}`:
   - Returns a `ResponseEntity<GalleryItemDto>` containing a single gallery item by `id`.
   - Calls `galleryService.getGalleryItemById(id)`.
   - Handles `ResourceNotFoundException` by returning `HttpStatus.NOT_FOUND`.
   - Access: public.

### AdminGalleryController.java
This REST controller handles administrative requests for gallery items, requiring authentication. It injects `GalleryService`.

**API Endpoints:**
1. `POST /api/v1/admin/gallery`:
   - Creates a new gallery item.
   - Accepts a `GalleryItemDto` in the request body.
   - Calls `galleryService.createGalleryItem(galleryItemDto)`.
   - Returns `ResponseEntity<GalleryItemDto>` with `HttpStatus.CREATED`.
   - Access: admin.
2. `PUT /api/v1/admin/gallery/{id}`:
   - Updates an existing gallery item.
   - Accepts `id` as a path variable and `GalleryItemDto` in the request body.
   - Calls `galleryService.updateGalleryItem(id, galleryItemDto)`.
   - Handles `ResourceNotFoundException` by returning `HttpStatus.NOT_FOUND`.
   - Returns `ResponseEntity<GalleryItemDto>`.
   - Access: admin.
3. `DELETE /api/v1/admin/gallery/{id}`:
   - Deletes a gallery item by `id`.
   - Calls `galleryService.deleteGalleryItem(id)`.
   - Handles `ResourceNotFoundException` by returning `HttpStatus.NOT_FOUND`.
   - Returns `ResponseEntity<Void>` with `HttpStatus.NO_CONTENT`.
   - Access: admin.

---

## Inquiry System (Backend)

**Name:** `inquiry-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Inquiry.java` — MODEL layer — represents a customer inquiry with details for catering or private events, including its current status.
- `backend/src/main/java/com/farmaaishrestaurant/model/InquiryStatus.java` — MODEL layer — an enum defining the possible lifecycle statuses for a customer inquiry.
- `backend/src/main/java/com/farmaaishrestaurant/repository/InquiryRepository.java` — REPOSITORY layer — provides standard CRUD operations for `Inquiry` entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/InquiryService.java` — SERVICE layer — implements business logic for `Inquiry` entities, including `createInquiry(CreateInquiryRequest): InquiryResponse`, `getAllInquiries(): List<InquiryResponse>`, `getInquiryById(UUID): InquiryResponse`, and `updateInquiryStatus(UUID, InquiryStatus): InquiryResponse`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/InquiryController.java` — CONTROLLER layer — exposes a public API endpoint for customers to submit new inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminInquiryController.java` — CONTROLLER layer — exposes admin-only API endpoints for viewing and managing customer inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateInquiryRequest.java` — DTO layer — defines the data structure for incoming requests to create a new inquiry.
- `backend/src/main/java/com/farmaaishrestaurant/dto/InquiryResponse.java` — DTO layer — defines the data structure for inquiry details returned in API responses.

**Feature Instruction:**

The Inquiry System (Backend) feature provides the API and business logic for customers to submit catering or private event inquiries, and for administrators to manage these inquiries. It consists of the `Inquiry` entity and `InquiryStatus` enum, a Spring Data JPA `InquiryRepository`, an `InquiryService` for business logic, and two controllers: `InquiryController` for public inquiry submission and `AdminInquiryController` for administrative management.

### Inquiry Submission Flow
1.  A customer fills out an inquiry form on the frontend (handled by the `inquiry-form` feature).
2.  The frontend sends a POST request to `/api/v1/inquiries` with a `CreateInquiryRequest` body.
3.  `InquiryController.submitInquiry(CreateInquiryRequest request)` receives the request.
4.  The controller calls `inquiryService.createInquiry(request)`.
5.  `InquiryService.createInquiry(CreateInquiryRequest request)`:
    a.  Maps the `CreateInquiryRequest` to an `Inquiry` entity.
    b.  Sets the `status` of the new `Inquiry` to `InquiryStatus.NEW`.
    c.  Sets `createdAt` and `updatedAt` timestamps.
    d.  Calls `inquiryRepository.save(inquiry)` to persist the new inquiry.
    e.  Maps the saved `Inquiry` entity to an `InquiryResponse` DTO.
    f.  Returns the `InquiryResponse`.
6.  The `InquiryController` returns a `ResponseEntity` with `HttpStatus.CREATED` and the `InquiryResponse`.

### Admin Inquiry Management Flow
1.  An administrator accesses the admin portal (handled by the `admin-portal` feature).
2.  To view all inquiries, the frontend sends a GET request to `/api/v1/admin/inquiries`.
3.  `AdminInquiryController.getAllInquiries()`:
    a.  Calls `inquiryService.getAllInquiries()`.
    b.  `InquiryService.getAllInquiries()` retrieves all `Inquiry` entities from `inquiryRepository.findAll()`.
    c.  Maps each `Inquiry` to an `InquiryResponse`.
    d.  Returns a `List<InquiryResponse>`.
    e.  The controller returns a `ResponseEntity` with `HttpStatus.OK` and the list of `InquiryResponse` DTOs.
4.  To view a specific inquiry, the frontend sends a GET request to `/api/v1/admin/inquiries/{id}`.
5.  `AdminInquiryController.getInquiryById(UUID id)`:
    a.  Calls `inquiryService.getInquiryById(id)`.
    b.  `InquiryService.getInquiryById(UUID id)`:
        i.   Calls `inquiryRepository.findById(id)`.
        ii.  If the inquiry is not found, throws `ResourceNotFoundException`.
        iii. Maps the found `Inquiry` to an `InquiryResponse`.
        iv.  Returns the `InquiryResponse`.
    c.  The controller returns a `ResponseEntity` with `HttpStatus.OK` and the `InquiryResponse`.
    d.  If `ResourceNotFoundException` is thrown, the `GlobalExceptionHandler` (from `shared-backend`) will catch it and return `HttpStatus.NOT_FOUND`.
6.  To update an inquiry's status, the frontend sends a PUT request to `/api/v1/admin/inquiries/{id}/status` with an `UpdateInquiryStatusRequest` body.
7.  `AdminInquiryController.updateInquiryStatus(UUID id, UpdateInquiryStatusRequest request)`:
    a.  Calls `inquiryService.updateInquiryStatus(id, request.getStatus())`.
    b.  `InquiryService.updateInquiryStatus(UUID id, InquiryStatus newStatus)`:
        i.   Calls `inquiryRepository.findById(id)`.
        ii.  If the inquiry is not found, throws `ResourceNotFoundException`.
        iii. Updates the `status` of the found `Inquiry` entity.
        iv.  Sets the `updatedAt` timestamp.
        v.   Calls `inquiryRepository.save(inquiry)`.
        vi.  Maps the updated `Inquiry` to an `InquiryResponse`.
        vii. Returns the `InquiryResponse`.
    c.  The controller returns a `ResponseEntity` with `HttpStatus.OK` and the `InquiryResponse`.
    d.  If `ResourceNotFoundException` is thrown, the `GlobalExceptionHandler` will catch it and return `HttpStatus.NOT_FOUND`.

### Data Models
-   `Inquiry`: Represents the core entity for an inquiry, storing details like customer name, contact, event details, and status.
-   `InquiryStatus`: An enum defining the lifecycle states of an inquiry (e.g., NEW, CONTACTED, CLOSED).
-   `CreateInquiryRequest`: DTO for public inquiry submission, containing all necessary fields for a new inquiry.
-   `InquiryResponse`: DTO for returning inquiry details in API responses.
-   `UpdateInquiryStatusRequest`: DTO for updating an inquiry's status by administrators.

---

## Blog System (Backend)

**Name:** `blog-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Post.java` — JPA Entity — defines the structure and relationships for a blog post in the database.
- `backend/src/main/java/com/farmaaishrestaurant/repository/PostRepository.java` — REPOSITORY layer — provides CRUD operations and custom queries for Post entities, including findAllByOrderByPublishedAtDesc().
- `backend/src/main/java/com/farmaaishrestaurant/service/BlogService.java` — SERVICE layer — implements business logic for blog posts, including getAllPosts(), getPostById(UUID), createPost(PostDto), updatePost(UUID, PostDto), and deletePost(UUID).
- `backend/src/main/java/com/farmaaishrestaurant/controller/BlogController.java` — CONTROLLER layer — exposes public REST API endpoints for retrieving blog posts, specifically getAllPosts() and getPostById(UUID).
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminBlogController.java` — CONTROLLER layer — exposes admin-only REST API endpoints for managing blog posts, including createPost(PostDto), updatePost(UUID, PostDto), and deletePost(UUID).
- `backend/src/main/java/com/farmaaishrestaurant/dto/PostDto.java` — Data Transfer Object — defines the structure for blog post data exchanged via API.

**Feature Instruction:**

The Blog System (Backend) feature provides a complete set of REST API endpoints for managing and retrieving blog posts for Farmaaish Restaurant. It allows both public access to view blog posts and authenticated admin access to create, update, and delete them. The feature is composed of a `Post` entity, a `PostRepository` for data access, a `BlogService` for business logic, and two controllers: `BlogController` for public access and `AdminBlogController` for administrative operations. A `PostDto` is used for transferring blog post data between the service and controllers.

### Post.java
This JPA entity represents a single blog post. It will have fields for `id` (UUID, primary key), `title` (String, not null, max 255), `content` (String, not null), `author` (String, not null, max 100), `imageUrl` (String, nullable, max 255), `publishedAt` (LocalDateTime, not null), and `updatedAt` (LocalDateTime, not null).

### PostRepository.java
This interface extends `JpaRepository<Post, UUID>` to provide standard CRUD operations for `Post` entities. It will also define a custom query method `findAllByOrderByPublishedAtDesc()` to retrieve all posts ordered by their publication date in descending order.

### PostDto.java
This DTO will mirror the `Post` entity but will be used for API requests and responses. It will include fields for `id` (UUID), `title` (String), `content` (String), `author` (String), `imageUrl` (String), `publishedAt` (LocalDateTime), and `updatedAt` (LocalDateTime). For creation and update requests, `id`, `publishedAt`, and `updatedAt` will be omitted or handled internally by the service.

### BlogService.java
This service class encapsulates the business logic for blog posts. It injects `PostRepository` to interact with the database. It will expose the following public methods:

1.  `getAllPosts()`: Returns `List<PostDto>`. Fetches all posts from the repository, orders them by `publishedAt` in descending order, and maps them to `PostDto`s.
2.  `getPostById(UUID id)`: Returns `PostDto`. Fetches a single post by its ID. If the post is not found, it throws a `ResourceNotFoundException`.
3.  `createPost(PostDto postDto)`: Returns `PostDto`. Creates a new blog post. It sets `publishedAt` and `updatedAt` to the current time, saves the entity, and returns the mapped `PostDto`.
4.  `updatePost(UUID id, PostDto postDto)`: Returns `PostDto`. Updates an existing blog post. It first fetches the existing post by ID, throws `ResourceNotFoundException` if not found, updates the `title`, `content`, `author`, and `imageUrl` fields, sets `updatedAt` to the current time, saves the updated entity, and returns the mapped `PostDto`.
5.  `deletePost(UUID id)`: Returns `void`. Deletes a blog post by its ID. It first checks if the post exists, throws `ResourceNotFoundException` if not found, then deletes it.

### BlogController.java
This REST controller exposes public API endpoints for retrieving blog posts. It injects `BlogService`. All endpoints will return `ResponseEntity<?>`.

1.  `getAllPosts()`: `GET /api/v1/blog/posts`. Calls `blogService.getAllPosts()` and returns a `200 OK` with a list of `PostDto`s.
2.  `getPostById(UUID id)`: `GET /api/v1/blog/posts/{id}`. Calls `blogService.getPostById(id)`. Returns a `200 OK` with the `PostDto` or `404 NOT FOUND` if `ResourceNotFoundException` is thrown.

### AdminBlogController.java
This REST controller exposes admin-only API endpoints for managing blog posts. It injects `BlogService`. All endpoints will return `ResponseEntity<?>` and require admin authentication.

1.  `createPost(@RequestBody PostDto postDto)`: `POST /api/v1/admin/blog/posts`. Calls `blogService.createPost(postDto)`. Returns `201 CREATED` with the new `PostDto`.
2.  `updatePost(@PathVariable UUID id, @RequestBody PostDto postDto)`: `PUT /api/v1/admin/blog/posts/{id}`. Calls `blogService.updatePost(id, postDto)`. Returns `200 OK` with the updated `PostDto` or `404 NOT FOUND` if `ResourceNotFoundException` is thrown.
3.  `deletePost(@PathVariable UUID id)`: `DELETE /api/v1/admin/blog/posts/{id}`. Calls `blogService.deletePost(id)`. Returns `204 NO CONTENT` on success or `404 NOT FOUND` if `ResourceNotFoundException` is thrown.

---

## Core UI & Layout

**Name:** `core-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/api/client.ts` — SERVICE layer — configures the global Axios instance for API requests, including authentication token injection and error handling.
- `frontend/src/App.tsx` — Root component — sets up the application's context providers and defines the main routing structure using `react-router-dom`.
- `frontend/src/components/Layout.tsx` — COMPONENT — provides the main layout structure for public-facing pages, composing `Header`, `Footer`, and `WhatsAppCTA`.
- `frontend/src/components/Header.tsx` — COMPONENT — displays the site-wide header with navigation links, logo, and cart access.
- `frontend/src/components/Footer.tsx` — COMPONENT — displays the site-wide footer with contact information, quick links, and social media.
- `frontend/src/components/AdminLayout.tsx` — COMPONENT — provides the layout for the admin section, including a sidebar for navigation and a main content area.
- `frontend/src/components/ProtectedRoute.tsx` — COMPONENT — a route guard that redirects unauthenticated users or users without required roles, consuming `useAuth`.
- `frontend/src/components/common/WhatsAppCTA.tsx` — COMPONENT — a floating action button that opens a WhatsApp chat with the restaurant.
- `frontend/src/pages/AdminDashboardPage.tsx` — PAGE — the main landing page for the admin portal, displaying a welcome message.
- `frontend/src/pages/NotFoundPage.tsx` — PAGE — a user-friendly 404 page that helps users navigate back to the main site.

**Feature Instruction:**

This feature establishes the foundational UI structure and global configurations for the Farmaaish Restaurant frontend application. It includes the main application entry point (`App.tsx`), global Axios client setup (`client.ts`), public-facing layout components (`Layout.tsx`, `Header.tsx`, `Footer.tsx`, `WhatsAppCTA.tsx`), admin-specific layout (`AdminLayout.tsx`), and core routing components like `ProtectedRoute.tsx` and error pages (`NotFoundPage.tsx`, `AdminDashboardPage.tsx`).

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-[#F5F5DC] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

`client.ts` configures the Axios instance used throughout the application for API calls. It sets the `baseURL` to `/api/v1` and includes an interceptor to attach the JWT token from `localStorage` (key: 'token') to every outgoing request's `Authorization` header. This ensures all authenticated API calls are made with the necessary credentials. It also includes an interceptor to handle 401 Unauthorized responses by clearing the token and redirecting to the login page.

`App.tsx` is the root component. It wraps the entire application with necessary context providers, including `AuthContext` (from `auth-ui` feature) and `BrowserRouter` from `react-router-dom`. It defines the main routing structure, including public routes, protected routes using `ProtectedRoute.tsx`, and the admin dashboard route.

`Layout.tsx` provides the common structure for all public-facing pages. It includes the `Header.tsx` at the top, a main content area where `children` are rendered, and the `Footer.tsx` at the bottom. It also integrates `WhatsAppCTA.tsx` for easy customer communication. The layout ensures a consistent look and feel across the public storefront.

`Header.tsx` displays the Farmaaish Restaurant logo, primary navigation links (Home, Menu, Reservations, Gallery, Catering, Blog, About, Contact), and a cart icon that opens the `CartDrawer` (from `order-flow` feature). Navigation links should use `react-router-dom`'s `Link` component. The logo should be a prominent brand element.

`Footer.tsx` contains essential business information: Farmaaish Restaurant's address (Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069), phone number (020 2729 1111), and opening hours. It also includes quick navigation links and placeholder social media icons. All monetary values (if any were displayed here) would use the 'en-IN' locale for currency formatting.

`AdminLayout.tsx` provides the layout for all administrative pages. It features a sidebar for admin navigation (e.g., Dashboard, Menu Management, Reservations, Orders, Gallery, Inquiries, Blog) and a main content area for rendering admin-specific views. This layout is distinct from the public `Layout.tsx`.

`ProtectedRoute.tsx` is a higher-order component that guards routes requiring authentication or specific roles. It consumes the `useAuth` hook (from `auth-ui` feature) to check the user's authentication status and roles. If the user is not authenticated, they are redirected to `/login`. If they are authenticated but lack the required role (e.g., 'ADMIN' for admin routes), they are redirected to `/` or an unauthorized page.

`WhatsAppCTA.tsx` renders a floating WhatsApp icon that, when clicked, opens a WhatsApp chat with the restaurant's phone number (+91 020 2729 1111). It should be positioned fixed on the bottom right of the screen on public pages.

`AdminDashboardPage.tsx` serves as the landing page for the admin portal. It should display a welcoming message and potentially links to key admin sections. This page is protected by `ProtectedRoute.tsx` and requires an 'ADMIN' role.

`NotFoundPage.tsx` is displayed when a user navigates to an invalid URL. It provides a user-friendly message and a link back to the home page.

Interactions:
- `App.tsx` renders `Layout.tsx` for public routes and `AdminLayout.tsx` for admin routes, wrapping them with `AuthContext.Provider`.
- `Layout.tsx` composes `Header.tsx`, `Footer.tsx`, and `WhatsAppCTA.tsx`.
- `Header.tsx` imports and renders `CartDrawer` from the `order-flow` feature.
- `ProtectedRoute.tsx` uses `useAuth` from the `auth-ui` feature to determine access.
- `client.ts` interacts with `localStorage` to store and retrieve the 'token' for authentication, which is managed by the `auth-ui` feature.

---

## Authentication UI

**Name:** `auth-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/context/AuthContext.tsx` — React context for managing global authentication state, including user information and JWT token, and providing authentication actions like login and logout to the application. Exports `AuthContext` and `AuthProvider`.
- `frontend/src/hooks/useAuth.ts` — Custom React hook for conveniently accessing the authentication state and actions provided by `AuthContext`. Exports `useAuth()`.
- `frontend/src/services/authService.ts` — Service layer for making API calls to the backend authentication endpoints. Exports `login(credentials: LoginRequest)` and `register(registrationData: RegisterRequest)`.
- `frontend/src/types/auth.ts` — TypeScript types and interfaces for authentication data structures, including user details, login requests, and authentication responses. Generated from the backend API contract — authentication domain.
- `frontend/src/pages/LoginPage.tsx` — Page component that renders the login form within a visually appealing layout, serving as the entry point for user authentication. Exports `LoginPage`.
- `frontend/src/components/auth/LoginForm.tsx` — Reusable form component for user authentication, handling input fields and submission logic. Exports `LoginForm`.

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

## Authentication UI Feature Instruction
This feature provides the client-side authentication logic and UI for Farmaaish Restaurant, allowing users (customers and administrators) to log in and manage their sessions. It consists of a React Context (`AuthContext.tsx`) for global state management, a custom hook (`useAuth.ts`) for easy access to authentication state and actions, a service (`authService.ts`) for interacting with the backend authentication API, TypeScript types (`auth.ts`) for data structures, and the UI components for login (`LoginPage.tsx`, `LoginForm.tsx`).

### Core Concepts
1.  **Authentication State**: The application's authentication state (user, token, isAuthenticated, isLoading) is managed within `AuthContext.tsx`. The JWT token is stored in `localStorage` under the key `'token'`. User information is derived from the token or fetched after successful login.
2.  **Login Process**: When a user submits the `LoginForm.tsx`, `useAuth().login()` is called. This in turn calls `authService.login()`, which makes an API request to `/api/v1/auth/login`. On successful login, the received JWT token is stored in `localStorage`, and the user state is updated in `AuthContext`.
3.  **Logout Process**: `useAuth().logout()` clears the token from `localStorage` and resets the authentication state in `AuthContext`.
4.  **Initial Load**: On application load, `AuthContext` attempts to read the token from `localStorage`. If a token exists, it's validated (e.g., by checking its expiry or making a `/api/v1/auth/me` call if such an endpoint exists for validation, though for this feature, simple presence and decoding is sufficient for initial state). The `isLoading` state ensures that components dependent on authentication state don't render prematurely.
5.  **Role-Based Access**: The `AuthContext` should store the user's role (e.g., 'CUSTOMER', 'ADMIN') if available in the JWT token. This role information will be consumed by the `ProtectedRoute` component from `core-ui` to restrict access to certain routes.

### File Interactions
-   `LoginPage.tsx` renders the `LoginForm.tsx`.
-   `LoginForm.tsx` uses the `useAuth` hook to trigger login.
-   `useAuth.ts` consumes `AuthContext` for state and actions, and calls `authService.ts` for API interactions.
-   `authService.ts` makes HTTP requests to the backend authentication endpoints and uses types defined in `auth.ts`.
-   `AuthContext.tsx` provides the authentication state and actions to the entire application via `useAuth.ts`.

### Detailed API Contracts (authService.ts calls)

#### `authService.login(credentials: LoginRequest): Promise<AuthResponse>`
1.  **Parameters**: `credentials` (object with `username: string`, `password: string`).
2.  **Logic**: Sends a POST request to `/api/v1/auth/login` with the provided credentials.
3.  **Returns**: A Promise that resolves to `AuthResponse` on success, containing `token: string` and `user: User`.
4.  **Error Cases**: Throws an error if the API call fails (e.g., invalid credentials, network error). The calling component should handle this, typically by displaying a toast notification.

#### `authService.register(registrationData: RegisterRequest): Promise<AuthResponse>`
1.  **Parameters**: `registrationData` (object with `username: string`, `password: string`, `email: string`, `customerName: string`).
2.  **Logic**: Sends a POST request to `/api/v1/auth/register` with the provided registration data.
3.  **Returns**: A Promise that resolves to `AuthResponse` on success, containing `token: string` and `user: User`.
4.  **Error Cases**: Throws an error if the API call fails (e.g., username/email already exists, network error). The calling component should handle this.

### UI Design for LoginPage.tsx
-   The `LoginPage` should feature a full-bleed background image relevant to Farmaaish Restaurant (e.g., a beautifully plated Mughlai dish or the restaurant interior) with a dark overlay (`bg-black bg-opacity-50`).
-   A central, elegant card (`bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-md w-full`) should contain the login form.
-   The card should have a prominent heading "Welcome to Farmaaish" (`text-3xl font-bold text-[#36454F] mb-6 text-center`) and a sub-heading "Savor the Royal Flavors" (`text-md text-gray-600 mb-8 text-center`).
-   The `LoginForm` will be embedded within this card.
-   All text inputs should have a modern, clean design with appropriate labels and placeholders.
-   The submit button should use the primary CTA design token: `bg-[#D4AF37] hover:bg-[#b8942b] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 w-full`.
-   Consider adding a link for "Forgot Password?" (though the functionality is out of scope for this feature) and a "Register" link if registration is enabled for customers.

### Local Storage Key
The JWT token will be stored in `localStorage` using the key `'token'`.


---

## Static Pages

**Name:** `static-pages`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/HomePage.tsx` — PAGE layer — orchestrates the display of various home page components including hero, featured menu items, testimonials, and calls to action.
- `frontend/src/components/home/HeroSection.tsx` — COMPONENT layer — displays a prominent hero banner with the restaurant's branding and a call to action.
- `frontend/src/components/home/FeaturedMenuItems.tsx` — COMPONENT layer — fetches and displays a curated selection of menu items.
- `frontend/src/components/home/TestimonialsSection.tsx` — COMPONENT layer — showcases hardcoded customer testimonials.
- `frontend/src/components/home/CallToActionSection.tsx` — COMPONENT layer — provides prominent calls to action for reservations and menu browsing.
- `frontend/src/pages/AboutPage.tsx` — PAGE layer — presents information about the restaurant's history and culinary team.
- `frontend/src/components/about/OurStory.tsx` — COMPONENT layer — displays the restaurant's historical narrative.
- `frontend/src/components/about/ChefProfile.tsx` — COMPONENT layer — introduces the head chef with their background.
- `frontend/src/pages/ContactPage.tsx` — PAGE layer — provides contact details and an interactive map.
- `frontend/src/components/contact/ContactInfoMap.tsx` — COMPONENT layer — displays the restaurant's address, phone, hours, and an embedded Google Map.

**Feature Instruction:**

This feature implements the static public-facing pages of the Farmaaish Restaurant website, including the Home, About, and Contact pages. These pages are designed to showcase the restaurant's ambiance, culinary offerings, heritage, and contact information, adhering to a sophisticated Mughlai aesthetic.

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b08d23] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

### HomePage.tsx
This page serves as the landing page for Farmaaish Restaurant. It is composed of several distinct sections:
1.  **HeroSection**: Displays a full-bleed hero image with the restaurant's name and a compelling tagline, along with a primary call to action for reservations.
2.  **FeaturedMenuItems**: Presents a curated selection of signature dishes. This section will fetch menu items from the backend using the `useMenu` hook from the `menu-display` feature. It will display the `name`, `description`, `price`, and `imageUrl` for each `MenuItemDto`. Prices should be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.
3.  **TestimonialsSection**: Showcases customer reviews to build trust and social proof.
4.  **CallToActionSection**: A prominent section encouraging users to book a table or order online.

All sections on the HomePage will use the defined design tokens for colors, typography, and spacing to maintain a consistent and luxurious feel.

### HeroSection.tsx
This component receives no props. It renders a full-width hero banner with a background image, an overlay, and centered text. The main heading will be "Farmaaish Restaurant" and the sub-headline will be a warm, sophisticated tagline like "Experience the Grandeur of Mughlai Cuisine". It includes a primary CTA button styled with `bg-[#D4AF37]` that navigates to the `/reservations` page.

### FeaturedMenuItems.tsx
This component fetches a list of `MenuItemDto` objects using the `useMenu().getAllMenuItems()` hook. It then renders a grid of these items, displaying their `name`, `description`, `price`, and `imageUrl`. Each menu item card will be styled according to the 'Card' design token. Prices will be displayed in Indian Rupees (₹).

### TestimonialsSection.tsx
This component renders a section showcasing customer testimonials. It will contain hardcoded placeholder testimonials that align with the warm and inviting tone, emphasizing culinary excellence and a special dining experience. Each testimonial will include a customer name and their review.

### CallToActionSection.tsx
This component provides a prominent call to action. It will feature a heading like "Reserve Your Table" or "Order Online Now" and two buttons: one for navigating to `/reservations` (styled as Primary CTA) and another for `/menu` or `/order-online` (styled as a secondary CTA, e.g., `border-[#D4AF37] text-[#D4AF37]`).

### AboutPage.tsx
This page provides information about Farmaaish Restaurant's history and culinary philosophy. It is composed of:
1.  **OurStory**: Details the restaurant's heritage and journey.
2.  **ChefProfile**: Introduces the head chef and their culinary background.

Content on this page will use the defined design tokens for text and background colors.

### OurStory.tsx
This component renders a content block detailing the story and heritage of Farmaaish Restaurant. It will include placeholder text that conveys authenticity and a passion for culinary excellence, using the defined body text color.

### ChefProfile.tsx
This component introduces the head chef of Farmaaish Restaurant. It will include a placeholder image of a chef, their name, and a brief biography highlighting their culinary background and philosophy, aligning with the sophisticated tone.

### ContactPage.tsx
This page provides essential contact information for Farmaaish Restaurant. It includes:
1.  **ContactInfoMap**: Displays the restaurant's address, phone number, opening hours, and an embedded Google Map.

### ContactInfoMap.tsx
This component displays the restaurant's contact details: address (Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069), phone number (020 2729 1111), and opening hours (placeholder: "Mon-Sun: 12:00 PM - 11:00 PM"). It also embeds an iframe for a Google Map centered at the provided coordinates (18.55557, 73.77492). The map iframe will use the `src="https://www.google.com/maps/embed/v1/place?q=18.55557,73.77492&key=YOUR_GOOGLE_MAPS_API_KEY"` (API key needs to be replaced with an actual key).

---

## Menu Display

**Name:** `menu-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/services/menuService.ts` — Service layer for making API calls to the menu-management backend feature, exposing `getAllMenuItems()` and `getAllMenuItemCategories()`.
- `frontend/src/hooks/useMenu.ts` — Custom React Query hook for fetching and managing menu data, providing `useAllMenuItems()` and `useAllMenuItemCategories()`.
- `frontend/src/types/menu.ts` — Generated from the backend API contract — TypeScript types and interfaces for menu items and categories.
- `frontend/src/pages/MenuPage.tsx` — Page component that displays the full restaurant menu, orchestrating data fetching and rendering of categories and items.
- `frontend/src/components/menu/MenuCategoryTabs.tsx` — Component for a tabbed interface to filter menu items by category, exposing `MenuCategoryTabs` with `categories` and `onSelectCategory` props.
- `frontend/src/components/menu/MenuItemsGrid.tsx` — Component that displays a grid layout of individual menu item cards, exposing `MenuItemsGrid` with `items` prop.
- `frontend/src/components/menu/MenuItemCard.tsx` — Component for a single menu item card, displaying details and an add-to-cart button, exposing `MenuItemCard` with `item` prop.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-gray-700 leading-relaxed

This feature provides the frontend functionality for displaying Farmaaish Restaurant's menu. It consists of a service (`menuService.ts`) for interacting with the backend menu API, a custom React Query hook (`useMenu.ts`) for data fetching and caching, TypeScript types (`menu.ts`) for menu entities, and several React components to render the menu.

The `MenuPage.tsx` serves as the main entry point, displaying the full menu. It utilizes `useMenu` to fetch all menu categories and items. The categories are rendered using `MenuCategoryTabs.tsx`, allowing users to filter menu items. The filtered items are then displayed in a grid layout by `MenuItemsGrid.tsx`, which in turn renders individual `MenuItemCard.tsx` components for each dish. Each `MenuItemCard` includes an `AddToCartButton` (from the `order-flow` feature) to enable users to add dishes to their cart. All monetary values (prices) must be displayed in Indian Rupees (₹) using the `en-IN` locale.

### `menuService.ts`
This service is responsible for making API calls to the `menu-management` backend feature. It exports two asynchronous functions: `getAllMenuItems` and `getAllMenuItemCategories`. These functions use the pre-scaffolded `apiClient` to perform GET requests to the respective public endpoints.

### `useMenu.ts`
This custom React Query hook provides a convenient way to fetch and manage menu data. It exports `useAllMenuItems` and `useAllMenuItemCategories` hooks. `useAllMenuItems` fetches all menu items and returns them, along with a `getMenuItemsByCategory` helper function to filter items by category on the client-side. `useAllMenuItemCategories` fetches all available menu categories. Both hooks handle loading and error states.

### `menu.ts`
This file defines the TypeScript interfaces for `MenuItem` and `MenuItemCategory` based on the `MenuItemDto` and `MenuItemCategoryDto` data shapes from the `menu-management` backend feature. These types ensure strong typing throughout the frontend application when dealing with menu data.

### `MenuPage.tsx`
This page component orchestrates the display of the entire menu. It uses the `useAllMenuItemCategories` and `useAllMenuItems` hooks to fetch data. It manages the currently selected category state. The `MenuCategoryTabs` component receives the categories and a callback to update the selected category. The `MenuItemsGrid` component receives the filtered menu items based on the selected category. The page layout should be wrapped in the `Layout` component from `@/components/Layout`.

### `MenuCategoryTabs.tsx`
This component renders a tabbed interface for menu categories. It receives an array of `MenuItemCategory` objects and a callback function `onSelectCategory`. When a tab is clicked, it invokes `onSelectCategory` with the `id` of the selected category. The active tab should be visually distinct.

### `MenuItemsGrid.tsx`
This component displays a grid of `MenuItemCard` components. It receives an array of `MenuItem` objects. For each `MenuItem`, it renders a `MenuItemCard`, passing the item's data as props. The grid should be responsive and visually appealing, showcasing the high-quality images of the dishes.

### `MenuItemCard.tsx`
This component represents a single menu item. It receives a `MenuItem` object as a prop. It displays the item's `name`, `description`, `price` (formatted in INR), and `imageUrl`. It also includes an `AddToCartButton` from the `order-flow` feature, which, when clicked, adds the specific menu item to the cart using `useCart().addItem({ id: menuItem.id, name: menuItem.name, unitPrice: menuItem.price, imageUrl: menuItem.imageUrl })`.


---

## Reservation Booking

**Name:** `reservation-booking`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/services/reservationService.ts` — Service layer for making API calls to reservation-related endpoints, specifically `createReservation(request: CreateReservationRequest): Promise<ReservationResponse>`.
- `frontend/src/hooks/useReservations.ts` — Custom React Query hook for creating and managing reservation data, exposing `useCreateReservation()` for form submission.
- `frontend/src/types/reservation.ts` — Generated from the backend API contract – TypeScript types and interfaces for reservation data, including CreateReservationRequest, ReservationResponse, and ReservationStatus.
- `frontend/src/pages/ReservationsPage.tsx` — Page for customers to book a table, rendering `ReservationForm` and `ReservationSuccessDialog`.
- `frontend/src/components/reservation/ReservationForm.tsx` — A form component for customers to input reservation details and submit them via `useCreateReservation`.
- `frontend/src/components/reservation/ReservationSuccessDialog.tsx` — A dialog component to display confirmation details after a successful reservation.

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

This feature enables customers to book a table at Farmaaish Restaurant through an interactive online form. It consists of a `ReservationsPage.tsx` which hosts the `ReservationForm.tsx` component. The form collects customer details, desired date, time, and party size. Upon successful submission, a `ReservationSuccessDialog.tsx` is displayed to confirm the booking. The frontend interacts with the backend `reservation-system` feature via `reservationService.ts` to create new reservations. The `useReservations.ts` hook manages the state and API calls using React Query, providing a clean interface for components to interact with reservation logic. All monetary values, if any, will be displayed in Indian Rupees (₹) using the `en-IN` locale.

### `reservationService.ts`
This service is responsible for making API calls to the backend `reservation-system` feature. It exports an asynchronous function `createReservation` that takes a `CreateReservationRequest` object and sends a POST request to `/api/v1/reservations`. It returns a `Promise<ReservationResponse>`.

### `useReservations.ts`
This custom React Query hook provides an interface for components to interact with reservation data. It exposes a `createReservation` mutation that calls `reservationService.createReservation`. It manages loading states, errors, and success feedback. Upon successful reservation, it should invalidate any relevant queries (though none are defined for fetching reservations in this feature, it's good practice).

### `reservation.ts`
This file defines the TypeScript interfaces for `CreateReservationRequest` and `ReservationResponse`, mirroring the backend DTOs from the `reservation-system` feature. It also defines `ReservationStatus` enum.

### `ReservationsPage.tsx`
This page serves as the entry point for customers to book a table. It uses the `Layout` component from `@/components/Layout` for consistent navigation and footer. It renders the `ReservationForm` component. Upon successful submission of the form, it will display the `ReservationSuccessDialog` with the confirmed reservation details. The page title will be "Book Your Table at Farmaaish Restaurant".

### `ReservationForm.tsx`
This component provides the interactive form for customers to enter their reservation details. It will include fields for:
1.  **Customer Name:** Text input.
2.  **Customer Email:** Email input.
3.  **Customer Phone:** Text input, formatted for Indian phone numbers.
4.  **Reservation Date:** Date picker.
5.  **Reservation Time:** Time picker.
6.  **Party Size:** Number input.
7.  **Special Requests:** Textarea for any additional notes.

It utilizes the `useReservations` hook to handle the form submission. Upon successful submission, it will trigger the display of the `ReservationSuccessDialog` and clear the form. The form will have a primary CTA button with the text "Confirm Reservation" styled with the primary CTA design token.

### `ReservationSuccessDialog.tsx`
This component is a modal dialog that appears after a reservation is successfully created. It displays a confirmation message and the details of the reservation (date, time, party size, customer name, and a unique reservation ID). It should include a button to close the dialog, styled with the primary CTA design token, with the text "Done". The dialog should convey a warm and inviting tone, reinforcing the restaurant's commitment to culinary excellence.

---

## Ordering & Checkout Flow

**Name:** `order-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/services/orderService.ts` — Service for making API calls to order-related endpoints. It exposes `createOrder(request: CreateOrderRequest): Promise<OrderResponse>` and `getOrdersByCustomerEmail(email: string): Promise<OrderResponse[]>`.
- `frontend/src/hooks/useOrders.ts` — Custom hook for creating orders and fetching order history using React Query. It exposes `useCreateOrder()` and `useCustomerOrders(customerEmail: string)`.
- `frontend/src/types/order.ts` — Generated from the backend API contract — TypeScript types and interfaces for order data.
- `frontend/src/pages/CheckoutPage.tsx` — Page component that orchestrates the multi-step checkout process, including delivery details, order summary, and payment.
- `frontend/src/components/checkout/DeliveryAddressForm.tsx` — Component for users to enter their delivery address and contact information. It takes `onSubmit` and `initialData` props.
- `frontend/src/components/checkout/OrderSummary.tsx` — Component that displays the items in the cart, calculates totals, and allows for final review before payment. It takes `cartItems` and `totals` as props.
- `frontend/src/components/checkout/PaymentComponent.tsx` — Component that integrates with the payment gateway to handle the payment process. It takes `onPaymentSuccess` and `orderData` as props.
- `frontend/src/pages/OrderHistoryPage.tsx` — Page component that allows logged-in customers to view their past orders.
- `frontend/src/components/order/OrderHistoryList.tsx` — Component that displays a list or table of a user's past orders with key details. It takes `orders` as a prop.
- `frontend/src/components/cart/CartDrawer.tsx` — Component that displays the current contents of the shopping cart in a slide-out panel. It takes `isOpen` and `onClose` props.
- `frontend/src/components/cart/CartItem.tsx` — Component representing a single item within the cart, with quantity controls. It takes `item` as a prop.
- `frontend/src/components/cart/AddToCartButton.tsx` — Component that adds a specific menu item to the cart. It takes `item` and `quantity` as props.

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

This feature implements the complete ordering and checkout flow for Farmaaish Restaurant, allowing customers to add menu items to a cart, proceed through a multi-step checkout process, and view their order history. It integrates with the pre-scaffolded cart framework and the backend order-api feature.

### Core Logic and Interactions

1.  **Cart Management (`CartDrawer.tsx`, `CartItem.tsx`, `AddToCartButton.tsx`)**:
    -   `AddToCartButton.tsx` is a reusable component that will be placed on `MenuItemCard.tsx` (from `menu-display` feature). When clicked, it calls `useCart().addItem({ id: item.id, name: item.name, unitPrice: item.price, imageUrl: item.imageUrl })` to add the selected menu item to the cart. It should display a toast notification (using `sonner`) on successful addition.
    -   `CartDrawer.tsx` displays the contents of the shopping cart in a slide-out panel. It uses `useCart()` to access `cartItems`, `totals`, and `cartCount`. It renders a list of `CartItem.tsx` components.
    -   `CartItem.tsx` displays a single item from the cart. It uses `useCart().setItemQuantity(id, qty)` to update item quantities and `useCart().removeItem(id)` to remove items. All monetary values are displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

2.  **Checkout Process (`CheckoutPage.tsx`, `DeliveryAddressForm.tsx`, `OrderSummary.tsx`, `PaymentComponent.tsx`)**:
    -   `CheckoutPage.tsx` orchestrates the multi-step checkout process using the `useCheckout` hook from the cart framework. The steps are: Delivery Details, Order Summary, and Payment.
    -   **Step 1: Delivery Details (`DeliveryAddressForm.tsx`)**:
        -   This component collects the customer's `customerName`, `customerEmail`, `customerPhone`, and `deliveryAddress`. It includes validation for all fields.
        -   On submission, it passes the collected data to the `useCheckout` hook to advance to the next step.
    -   **Step 2: Order Summary (`OrderSummary.tsx`)**:
        -   This component displays a read-only summary of the items in the cart (`useCart().cartItems`) and the calculated `totals` (subtotal, adjustments, total).
        -   All monetary values are displayed in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.
        -   It allows the user to review the order before proceeding to payment.
    -   **Step 3: Payment (`PaymentComponent.tsx`)**:
        -   This component is responsible for initiating the order creation and payment process.
        -   It uses the `useCreateOrder` mutation from `useOrders.ts`.
        -   When the user confirms payment, it constructs a `CreateOrderRequest` DTO using the delivery details from `useCheckout` and the `cartItems` from `useCart`. Each `CartItem` is mapped to an `OrderItemRequest` with `menuItemId` (from `cartItem.id`) and `quantity`.
        -   It calls `createOrder.mutate(request)`.
        -   On successful order creation, it clears the cart (`useCart().clearCart()`) and navigates the user to an order confirmation page (not part of this feature, but a placeholder toast or redirect is acceptable).
        -   Error handling: If `createOrder` fails, it displays an error toast.

3.  **Order Service (`orderService.ts`)**:
    -   `orderService.ts` provides functions to interact with the backend `order-api` feature.
    -   `createOrder(request: CreateOrderRequest): Promise<OrderResponse>`: Makes a POST request to `/api/v1/orders` with the provided `CreateOrderRequest`.
    -   `getOrdersByCustomerEmail(email: string): Promise<OrderResponse[]>`: Makes a GET request to `/api/v1/orders/customer/{customerEmail}` to fetch a customer's order history.

4.  **Order Hooks (`useOrders.ts`)**:
    -   `useOrders.ts` provides React Query hooks for managing order-related data.
    -   `useCreateOrder()`: A mutation hook that wraps `orderService.createOrder`. It handles loading, success, and error states.
    -   `useCustomerOrders(customerEmail: string)`: A query hook that wraps `orderService.getOrdersByCustomerEmail`. It fetches and caches the order history for a given customer email.

5.  **Order History (`OrderHistoryPage.tsx`, `OrderHistoryList.tsx`)**:
    -   `OrderHistoryPage.tsx` displays a logged-in user's past orders. It uses `useAuth().user.email` to get the current user's email and then calls `useCustomerOrders(email)` to fetch their order history.
    -   It renders the `OrderHistoryList.tsx` component, passing the fetched orders.
    -   `OrderHistoryList.tsx` displays the list of `OrderResponse` objects. Each order should show key details like `id`, `createdAt`, `totalAmount`, and `orderStatus`. All monetary values are displayed in Indian Rupees (₹).

6.  **Order Types (`order.ts`)**:
    -   Defines TypeScript interfaces for `CreateOrderRequest`, `OrderItemRequest`, `OrderResponse`, and `OrderItem` based on the backend `order-api` data shapes.

### Styling and Theming
All components will adhere to the provided design tokens. For `CheckoutPage.tsx` and `OrderHistoryPage.tsx`, use the `<Layout>` component from `@/components/Layout` for consistent navigation and footer.

### Error Handling
-   All API calls in `orderService.ts` should include basic error handling, logging errors, and potentially throwing custom `Error` objects that can be caught by React Query hooks.
-   React Query hooks (`useOrders.ts`) will manage `isError` and `error` states, which `CheckoutPage.tsx` and `OrderHistoryPage.tsx` will use to display user-friendly error messages (e.g., using `sonner` for toasts).


---

## Photo Gallery

**Name:** `gallery-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/services/galleryService.ts` — Service layer for interacting with the backend gallery API. It exposes `getAllGalleryItems(): Promise<GalleryItemDto[]>` to fetch all gallery items.
- `frontend/src/hooks/useGallery.ts` — Custom React Query hook for fetching and managing gallery data. It exposes `useGalleryItems()` to provide gallery data, loading state, and error state.
- `frontend/src/types/gallery.ts` — Generated from the backend API contract — defines the TypeScript interface for a gallery item.
- `frontend/src/pages/GalleryPage.tsx` — Page component that displays the restaurant's photo gallery. It uses `useGalleryItems()` to fetch data and renders `GalleryGrid`.
- `frontend/src/components/gallery/GalleryGrid.tsx` — Reusable component for displaying a grid of gallery images. It accepts an array of `GalleryItemDto` as props.

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

This feature provides a visually rich photo gallery for Farmaaish Restaurant, showcasing its exquisite Mughlai dishes and elegant ambiance. It consists of a service (`galleryService.ts`) for fetching gallery data from the backend, a custom React Query hook (`useGallery.ts`) to manage the data fetching and caching, TypeScript types (`gallery.ts`) for the gallery items, a dedicated page (`GalleryPage.tsx`) to display the gallery, and a reusable grid component (`GalleryGrid.tsx`) to render the images.

The `GalleryPage.tsx` will be the main entry point, wrapping its content with the `Layout` component from `@/components/Layout`. It will utilize the `useGallery` hook to fetch all gallery items. Once data is loaded, it will pass the `GalleryItemDto` array to the `GalleryGrid` component for rendering. The `GalleryGrid` component will display the images in a responsive, visually appealing layout, emphasizing large, high-fidelity images.

`galleryService.ts` will contain the `getAllGalleryItems` function, which makes an asynchronous GET request to the `/api/v1/gallery` endpoint provided by the `gallery-management` backend feature. It will use the `apiClient` from `frontend/src/api/client.ts` for making the HTTP call and will return a `Promise<GalleryItemDto[]>`. Error handling will be implemented to catch network errors or API response issues.

`useGallery.ts` will export a `useGalleryItems` hook that leverages `react-query`'s `useQuery` to call `galleryService.getAllGalleryItems`. This hook will provide loading, error, and data states to the `GalleryPage.tsx`, ensuring efficient data fetching and caching.

`gallery.ts` will define the `GalleryItemDto` interface, mirroring the `GalleryItemDto` data shape from the `gallery-management` backend feature, ensuring type safety across the frontend.

`GalleryPage.tsx` will render a hero section with a background image and a title, followed by a section containing the `GalleryGrid`. The page will display a loading spinner while data is being fetched and an error message if the fetch fails. The images will be displayed with titles and descriptions, reflecting the sophisticated and inviting tone of Farmaaish Restaurant.

`GalleryGrid.tsx` will receive an array of `GalleryItemDto` objects and render them in a responsive grid. Each image will be displayed within a card, showcasing the image, title, and description. The layout should be clean and modern, allowing the high-fidelity images to stand out.

---

## Catering Inquiry Form

**Name:** `inquiry-form`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/services/inquiryService.ts` — Service layer for interacting with the backend inquiry API. It exposes the `submitInquiry(inquiryData: InquiryFormValues): Promise<InquiryResponse>` function.
- `frontend/src/hooks/useInquiry.ts` — Custom React Query hook for managing the submission of catering inquiries. It provides `mutate` for submission, and `isLoading`, `isSuccess`, `isError`, `error`, `data` for status.
- `frontend/src/types/inquiry.ts` — Generated from the backend API contract — defines TypeScript types for catering inquiry data.
- `frontend/src/pages/CateringPage.tsx` — Page component that displays information about Farmaaish Restaurant's catering services and hosts the `CateringInquiryForm`.
- `frontend/src/components/inquiry/CateringInquiryForm.tsx` — React component that renders a detailed form for customers to submit catering inquiries. It consumes the `useInquiry` hook for submission.

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

This feature provides a dedicated page for Farmaaish Restaurant's catering and private event inquiries, allowing customers to submit their event details and special requests. It consists of a service for API communication, a React Query hook for state management, type definitions for inquiry data, a page component to display catering information and host the inquiry form, and the inquiry form component itself.

The `inquiry.ts` file defines the `InquiryFormValues` interface, which mirrors the `CreateInquiryRequest` DTO from the `inquiry-system` backend feature. This ensures type safety and consistency between the frontend form data and the backend API.

The `inquiryService.ts` file contains the `submitInquiry` asynchronous function, which takes `InquiryFormValues` as input and makes a POST request to the `/api/v1/inquiries` endpoint of the `inquiry-system` backend. It uses the pre-scaffolded `apiClient` for network requests.

The `useInquiry.ts` hook leverages `react-query`'s `useMutation` to provide a convenient way for components to submit inquiry data. It encapsulates the loading, success, and error states of the inquiry submission process, calling `inquiryService.submitInquiry` internally. Upon successful submission, it should display a success toast message using `sonner`.

The `CateringInquiryForm.tsx` component is a detailed form that collects all necessary information for a catering inquiry, including customer contact details, event type, date, number of guests, budget, and special requests. It uses `react-hook-form` for form management and validation, and `zod` for schema definition. It consumes the `useInquiry` hook to handle form submission. The form fields should correspond directly to the `InquiryFormValues` interface. Upon successful submission, it should reset the form and display a success message.

The `CateringPage.tsx` is the main page for catering inquiries. It provides an inviting introduction to Farmaaish Restaurant's catering services, showcasing high-quality images of catered events or exquisite dishes. It includes a prominent heading, a descriptive paragraph, and then renders the `CateringInquiryForm` component. The page should be wrapped in the `Layout` component from `@/components/Layout`.

All monetary values (e.g., budget) displayed or entered on the frontend must be formatted in Indian Rupees (₹) using the `en-IN` locale.

---

## Blog UI

**Name:** `blog-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/services/blogService.ts` — Frontend service for interacting with the backend blog API, providing functions to fetch all blog posts and a single blog post.
- `frontend/src/hooks/useBlog.ts` — Custom React Query hooks for fetching blog post data, abstracting API calls and managing loading/error states.
- `frontend/src/types/blog.ts` — Generated from the backend API contract — defines TypeScript types for blog post data.
- `frontend/src/pages/BlogPage.tsx` — Page component that displays a list of all blog posts, utilizing the `useAllPosts` hook and rendering `PostList`.
- `frontend/src/components/blog/PostList.tsx` — Component that renders a collection of `PostCard` components in a grid, taking an array of `PostDto` as props.
- `frontend/src/components/blog/PostCard.tsx` — Component that displays a summary of a single blog post, including its title, author, date, image, and a link to its full content.
- `frontend/src/pages/BlogPostPage.tsx` — Page component that displays the full content of a single blog post, using the `usePost` hook and rendering `PostContent`.
- `frontend/src/components/blog/PostContent.tsx` — Component that renders the main body content of a blog post, including its title, author, date, image, and full text.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8942b] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

This feature provides the user interface for displaying blog posts for Farmaaish Restaurant. It consists of a service for API communication, a custom React Query hook for data fetching, TypeScript types, and several React components and pages for rendering the blog content.

`blog.ts` defines the `PostDto` interface, which mirrors the `PostDto` from the `blog-system` backend feature. This interface is used throughout the frontend to ensure type safety for blog post data.

`blogService.ts` acts as the intermediary for all API calls related to blog posts. It exports two asynchronous functions: `getAllPosts()` and `getPostById(id: string)`. These functions use the `apiClient` from `@/api/client.ts` to make HTTP GET requests to the `/api/v1/blog/posts` and `/api/v1/blog/posts/{id}` endpoints, respectively. It handles potential errors by logging them and re-throwing, allowing the calling hooks to manage error states.

`useBlog.ts` provides custom React Query hooks for fetching blog data. `useAllPosts()` fetches all blog posts and returns the data, loading state, and error state. `usePost(id: string)` fetches a single blog post by its ID. These hooks abstract the data fetching logic and provide a clean interface for components to consume blog data, leveraging React Query's caching and background refetching capabilities.

`BlogPage.tsx` is the main page for displaying a list of all blog posts. It uses the `useAllPosts()` hook to fetch the data. While loading, it displays a loading indicator. If an error occurs, it displays an error message. Once data is successfully fetched, it renders the `PostList` component, passing the fetched `PostDto[]` as props. The page content is wrapped in the `Layout` component from `core-ui`.

`PostList.tsx` is a presentational component that receives an array of `PostDto` objects. It iterates over this array and renders a `PostCard` component for each blog post. It arranges these cards in a responsive grid layout.

`PostCard.tsx` displays a summary of a single blog post. It receives a `PostDto` as a prop and renders the post's title, author, published date, and a truncated content preview. It includes an image (using `imageUrl` from `PostDto`) and a "Read More" link that navigates to the `BlogPostPage` for the specific post, using the post's `id` in the URL. The card uses the defined design tokens for styling, including a shadow and rounded corners.

`BlogPostPage.tsx` displays the full content of a single blog post. It extracts the `id` from the URL parameters using `useParams()` from `react-router-dom`. It then uses the `usePost(id)` hook to fetch the specific blog post. Similar to `BlogPage.tsx`, it handles loading and error states. Upon successful data retrieval, it renders the `PostContent` component, passing the `PostDto` as props. The page content is wrapped in the `Layout` component from `core-ui`.

`PostContent.tsx` is a presentational component that receives a `PostDto` and renders the full title, author, published date, image, and the complete content of the blog post. It ensures the content is displayed in a readable format, potentially using `dangerouslySetInnerHTML` if the content is expected to contain HTML, or rendering as plain text otherwise. It applies appropriate typography and spacing based on the design tokens.

All monetary values (if any were to be displayed, though not applicable for this feature) would be formatted using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.


---

## Admin Portal

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/AdminMenuPage.tsx` — Admin page for managing menu items; orchestrates data fetching and displays UI components for creation, editing, and deletion.
- `frontend/src/components/menu/MenuTable.tsx` — React component that displays a tabular view of menu items with actions for editing and deleting.
- `frontend/src/components/menu/MenuItemForm.tsx` — React component providing a form for creating or updating menu items.
- `frontend/src/components/menu/DeleteMenuItemDialog.tsx` — React component for a confirmation dialog before deleting a menu item.
- `frontend/src/pages/AdminReservationsPage.tsx` — Admin page for managing restaurant reservations; orchestrates data fetching and displays UI components for viewing and updating reservations.
- `frontend/src/components/reservation/ReservationsTable.tsx` — React component that displays a tabular view of reservations with actions for viewing details.
- `frontend/src/components/reservation/ReservationDetailView.tsx` — React component for viewing and updating the details of a single reservation.
- `frontend/src/pages/AdminOrdersPage.tsx` — Admin page for managing customer orders; orchestrates data fetching and displays UI components for viewing and updating orders.
- `frontend/src/components/order/OrdersTable.tsx` — React component that displays a tabular view of customer orders with actions for viewing details.
- `frontend/src/components/order/OrderDetailView.tsx` — React component for viewing and updating the details of a single order.
- `frontend/src/pages/AdminGalleryPage.tsx` — Admin page for managing gallery images; orchestrates data fetching and displays UI components for uploading, editing, and deleting images.
- `frontend/src/pages/AdminInquiriesPage.tsx` — Admin page for managing catering and event inquiries; orchestrates data fetching and displays UI components for viewing and updating inquiries.
- `frontend/src/pages/AdminBlogPage.tsx` — Admin page for managing blog posts; orchestrates data fetching and displays UI components for creating, editing, and deleting posts.

**Feature Instruction:**

## Design Tokens
- Admin Navbar: bg-[#36454F] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200
- Secondary CTA: bg-[#800020] hover:bg-[#66001a] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-8 px-4"><div className="max-w-7xl mx-auto">
- Body: text-gray-700 leading-relaxed

This feature provides the administrative interface for Farmaaish Restaurant, allowing staff to manage menu items, reservations, orders, gallery images, inquiries, and blog posts. All pages within this feature are protected and accessible only to authenticated administrators, leveraging the `AdminLayout` from `core-ui` for consistent navigation and styling. Each administrative page interacts with its respective backend feature (menu-management, reservation-system, order-api, gallery-management, inquiry-system, blog-system) through dedicated React hooks (e.g., `useMenu`, `useReservations`, `useOrders`, `useGallery`, `useInquiry`, `useBlog`).

### AdminMenuPage.tsx
This page serves as the central hub for menu item management. It fetches all menu items using `useMenu.useAllMenuItems()` and displays them in the `MenuTable` component. It also provides functionality to create new menu items, edit existing ones, and delete them. The `MenuItemForm` component is used for both creation and editing, typically within a modal dialog. The `DeleteMenuItemDialog` handles confirmation for item deletion. All interactions with the backend for menu items (create, update, delete) are handled via the `useMenu` hook, specifically `useMenu.useCreateMenuItem()`, `useMenu.useUpdateMenuItem()`, and `useMenu.useDeleteMenuItem()`.

### MenuTable.tsx
This component renders a data table of menu items. It receives a list of `MenuItemDto` objects as props. Each row in the table will display the item's `name`, `categoryName`, `price` (formatted in INR), `vegetarian` status, `spicy` status, and `available` status. It includes action buttons for each item to trigger edit and delete operations. These actions will call the `onEdit` and `onDelete` callback functions passed as props, which will be implemented by `AdminMenuPage.tsx` to open the respective dialogs.

### MenuItemForm.tsx
This component provides a form for creating or editing a `MenuItemDto`. It takes an optional `initialData` prop of type `MenuItemDto` for editing, and `onSubmit` and `onCancel` callback functions. The form fields include `name`, `description`, `price`, `imageUrl`, `vegetarian`, `spicy`, `available`, and `categoryId`. The `categoryId` field will be a dropdown populated by `MenuItemCategoryDto` data fetched using `useMenu.useAllMenuItemCategories()`. Upon submission, it calls either `useMenu.useCreateMenuItem().mutate()` or `useMenu.useUpdateMenuItem().mutate()` based on whether `initialData` is provided.

### DeleteMenuItemDialog.tsx
This component is a confirmation dialog for deleting a menu item. It takes `isOpen`, `onClose`, and `onConfirm` props. When `onConfirm` is called, it triggers `useMenu.useDeleteMenuItem().mutate()` with the `id` of the menu item to be deleted.

### AdminReservationsPage.tsx
This page manages restaurant reservations. It fetches all reservations using `useReservations.useAllReservations()` and displays them in the `ReservationsTable` component. It also allows administrators to view detailed information about a reservation and update its status using the `ReservationDetailView` component. All interactions with the backend for reservations (fetching, updating status) are handled via the `useReservations` hook, specifically `useReservations.useAllReservations()` and `useReservations.useUpdateReservationStatus()`.

### ReservationsTable.tsx
This component displays a table of reservations. It receives a list of `ReservationResponse` objects as props. Each row will show `customerName`, `reservationDate`, `reservationTime`, `partySize`, and `status`. It will include an action button to view details of a reservation, which will trigger an `onViewDetails` callback function passed as props.

### ReservationDetailView.tsx
This component displays the full details of a single reservation and allows for status updates. It receives a `ReservationResponse` object as `reservation` prop and `onClose` callback. It displays fields like `customerName`, `customerEmail`, `customerPhone`, `reservationDate`, `reservationTime`, `partySize`, `specialRequests`, and `status`. It provides a dropdown to change the `status` (PENDING, CONFIRMED, CANCELLED) and a button to save the change, which calls `useReservations.useUpdateReservationStatus().mutate()`.

### AdminOrdersPage.tsx
This page is for managing customer orders. It fetches all orders using `useOrders.useAllOrders()` and displays them in the `OrdersTable` component. It allows administrators to view detailed information about an order and update its status using the `OrderDetailView` component. All interactions with the backend for orders (fetching, updating status) are handled via the `useOrders` hook, specifically `useOrders.useAllOrders()` and `useOrders.useUpdateOrderStatus()`.

### OrdersTable.tsx
This component displays a table of customer orders. It receives a list of `OrderResponse` objects as props. Each row will show `customerName`, `totalAmount` (formatted in INR), `orderStatus`, and `createdAt`. It will include an action button to view details of an order, which will trigger an `onViewDetails` callback function passed as props.

### OrderDetailView.tsx
This component displays the full details of a single order and allows for status updates. It receives an `OrderResponse` object as `order` prop and `onClose` callback. It displays fields like `customerName`, `customerEmail`, `customerPhone`, `deliveryAddress`, `totalAmount` (formatted in INR), `orderStatus`, `paymentTransactionId`, and a list of `orderItems`. It provides a dropdown to change the `orderStatus` and a button to save the change, which calls `useOrders.useUpdateOrderStatus().mutate()`.

### AdminGalleryPage.tsx
This page allows administrators to upload and manage gallery images. It fetches all gallery items using `useGallery.useGalleryItems()` and displays them in a grid. It provides functionality to create new gallery items (upload image, add title, description, category), edit existing ones, and delete them. All interactions with the backend for gallery items (create, update, delete) are handled via the `useGallery` hook, specifically `useGallery.useCreateGalleryItem()`, `useGallery.useUpdateGalleryItem()`, and `useGallery.useDeleteGalleryItem()`.

### AdminInquiriesPage.tsx
This page is for viewing and managing catering and event inquiries. It fetches all inquiries using `useInquiry.useAllInquiries()` and displays them in a table. It allows administrators to view detailed information about an inquiry and update its status. All interactions with the backend for inquiries (fetching, updating status) are handled via the `useInquiry` hook, specifically `useInquiry.useAllInquiries()` and `useInquiry.useUpdateInquiryStatus()`.

### AdminBlogPage.tsx
This page enables administrators to create, edit, and delete blog posts. It fetches all blog posts using `useBlog.useAllPosts()` and displays them in a list or table. It provides functionality to create new posts, edit existing ones, and delete them. All interactions with the backend for blog posts (create, update, delete) are handled via the `useBlog` hook, specifically `useBlog.useCreatePost()`, `useBlog.useUpdatePost()`, and `useBlog.useDeletePost()`.

All pages in this feature are wrapped with `<AdminLayout>` from `core-ui` to ensure consistent administrative navigation and styling. Data fetching and mutations are handled by the respective `use*` hooks, which in turn interact with the generated API client for the backend services. Error handling and loading states are managed within these hooks and reflected in the UI.


---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

