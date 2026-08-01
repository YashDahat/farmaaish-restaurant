# Feature Enrichment — Attempt 1

Generated: 2026-08-01

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend Utilities

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/exception/GlobalExceptionHandler.java` — EXCEPTION layer — provides centralized exception handling for the application, mapping `ResourceNotFoundException` to a 404 Not Found HTTP status and other exceptions to a 500 Internal Server Error, returning a standardized `ErrorResponse` DTO.
- `backend/src/main/java/com/farmaaishrestaurant/exception/ResourceNotFoundException.java` — EXCEPTION layer — a custom runtime exception that indicates a requested resource was not found, used by services to signal this specific error condition.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ErrorResponse.java` — DTO layer — defines the data structure for consistent error responses from the API, including timestamp, HTTP status, error message, and request path.
- `backend/src/main/java/com/farmaaishrestaurant/controller/SpaController.java` — CONTROLLER layer — handles all non-API and non-static requests, redirecting them to the `index.html` file to enable client-side routing for the React SPA.
- `backend/src/main/java/com/farmaaishrestaurant/config/DataSeeder.java` — CONFIG layer — populates the database with initial `MenuItem` and `BlogPost` data upon application startup, ensuring a baseline dataset for the application.

**Feature Instruction:**

This feature provides essential shared backend utilities including global exception handling, a custom resource not found exception, a standardized error response DTO, a controller to enable client-side routing for the React SPA, and a data seeder for initial database population. The `GlobalExceptionHandler` intercepts all unhandled exceptions, specifically `ResourceNotFoundException`, and transforms them into a consistent `ErrorResponse` DTO with an appropriate HTTP status code. `ResourceNotFoundException` is a custom exception that services can throw when a requested entity is not found. The `ErrorResponse` DTO defines the structure for API error messages, including a timestamp, status, error message, and path. The `SpaController` ensures that all non-API and non-static requests are forwarded to `index.html`, allowing the React frontend to handle routing. The `DataSeeder` component is responsible for populating the database with initial data for `MenuItem` and `BlogPost` entities upon application startup, ensuring the application has baseline data for demonstration and initial use. It injects `MenuItemRepository` from the `menu-management` feature and `BlogPostRepository` from the `blog-management` feature to persist the seeded data.

---

## Menu Management (Backend)

**Name:** `menu-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItem.java` — JPA Entity — represents a single menu item with its details and category.
- `backend/src/main/java/com/farmaaishrestaurant/model/MenuItemCategory.java` — Enum — defines the predefined categories for menu items.
- `backend/src/main/java/com/farmaaishrestaurant/repository/MenuItemRepository.java` — Spring Data JPA Repository — provides CRUD operations for `MenuItem` entities and custom queries for fetching by category.
- `backend/src/main/java/com/farmaaishrestaurant/service/MenuService.java` — SERVICE layer — implements `getAllMenuItems(): List<MenuItemDto>`, `getMenuItemsByCategory(MenuItemCategory): List<MenuItemDto>`, `getMenuItemById(UUID): MenuItemDto`, `createMenuItem(MenuItemDto): MenuItemDto`, `updateMenuItem(UUID, MenuItemDto): MenuItemDto`, and `deleteMenuItem(UUID): void`.
- `backend/src/main/java/com/farmaaishrestaurant/dto/MenuItemDto.java` — Data Transfer Object — used for API requests and responses for menu items.
- `backend/src/main/java/com/farmaaishrestaurant/controller/MenuController.java` — Public REST Controller — exposes endpoints for public users to view menu items.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminMenuController.java` — Admin REST Controller — exposes authenticated endpoints for administrators to manage menu items (CRUD operations).

**Feature Instruction:**

The Menu Management feature provides the backend API for Farmaaish Restaurant's menu. It allows public users to view the menu and administrators to perform full CRUD operations on menu items. The feature consists of `MenuItem` and `MenuItemCategory` models, a `MenuItemRepository` for data access, `MenuItemDto` for data transfer, and `MenuService` for business logic. `MenuController` exposes public endpoints for fetching menu items, while `AdminMenuController` provides authenticated and authorized endpoints for managing menu items.

### MenuItem.java
This JPA entity represents a single dish on the restaurant's menu. It will have fields for `id` (UUID), `name` (String, not null, max 100), `description` (String, not null, max 500), `price` (BigDecimal, not null, precision 10, scale 2), `imageUrl` (String, nullable, max 255), and `category` (MenuItemCategory enum, not null). It will be annotated with `@Entity` and `@Table(name = "menu_items")`.

### MenuItemCategory.java
This enum defines the categories for menu items, such as `APPETIZER`, `MAIN_COURSE`, `DESSERT`, `BEVERAGE`, and `SPECIAL`. It will be used by the `MenuItem` entity.

### MenuItemRepository.java
This interface extends `JpaRepository<MenuItem, UUID>` to provide standard CRUD operations. It will include a custom query method `findAllByCategory(MenuItemCategory category)` to fetch menu items by their category.

### MenuItemDto.java
This DTO is used for transferring menu item data between the service layer and the controllers. It will include fields mirroring `MenuItem.java`: `id` (UUID), `name` (String), `description` (String), `price` (BigDecimal), `imageUrl` (String), and `category` (MenuItemCategory). It will use `@NotNull` and `@Size` annotations for validation where appropriate.

### MenuService.java
This service contains the core business logic for menu management. It injects `MenuItemRepository`.

1.  `getAllMenuItems()`: Returns `List<MenuItemDto>`. Fetches all menu items from the repository and maps them to DTOs.
2.  `getMenuItemsByCategory(MenuItemCategory category)`: Returns `List<MenuItemDto>`. Fetches menu items by category from the repository and maps them to DTOs.
3.  `getMenuItemById(UUID id)`: Returns `MenuItemDto`. Fetches a single menu item by ID. If not found, throws `ResourceNotFoundException`.
4.  `createMenuItem(MenuItemDto menuItemDto)`: Returns `MenuItemDto`. Validates the DTO, maps it to a `MenuItem` entity, saves it via the repository, and returns the saved entity mapped back to a DTO.
5.  `updateMenuItem(UUID id, MenuItemDto menuItemDto)`: Returns `MenuItemDto`. Fetches the existing menu item by ID. If not found, throws `ResourceNotFoundException`. Updates the fields from the DTO, saves the updated entity, and returns it mapped back to a DTO.
6.  `deleteMenuItem(UUID id)`: Returns `void`. Fetches the existing menu item by ID. If not found, throws `ResourceNotFoundException`. Deletes the item from the repository.

### MenuController.java
This REST controller exposes public API endpoints for customers to view the menu. It injects `MenuService`.

1.  `GET /api/v1/menu`: Returns `List<MenuItemDto>`. Calls `menuService.getAllMenuItems()`.
2.  `GET /api/v1/menu/category/{category}`: Returns `List<MenuItemDto>`. Takes `MenuItemCategory` as a path variable. Calls `menuService.getMenuItemsByCategory(category)`.
3.  `GET /api/v1/menu/{id}`: Returns `MenuItemDto`. Takes `UUID id` as a path variable. Calls `menuService.getMenuItemById(id)`. Handles `ResourceNotFoundException` by returning HTTP 404.

### AdminMenuController.java
This REST controller exposes admin-only API endpoints for managing the menu. It injects `MenuService`. All endpoints require authentication and admin role.

1.  `GET /api/v1/admin/menu`: Returns `List<MenuItemDto>`. Calls `menuService.getAllMenuItems()`.
2.  `GET /api/v1/admin/menu/{id}`: Returns `MenuItemDto`. Takes `UUID id` as a path variable. Calls `menuService.getMenuItemById(id)`. Handles `ResourceNotFoundException` by returning HTTP 404.
3.  `POST /api/v1/admin/menu`: Request body `MenuItemDto`. Returns `MenuItemDto`. Calls `menuService.createMenuItem(menuItemDto)`. Returns HTTP 201 on success.
4.  `PUT /api/v1/admin/menu/{id}`: Request body `MenuItemDto`. Returns `MenuItemDto`. Takes `UUID id` as a path variable. Calls `menuService.updateMenuItem(id, menuItemDto)`. Handles `ResourceNotFoundException` by returning HTTP 404.
5.  `DELETE /api/v1/admin/menu/{id}`: Returns `void`. Takes `UUID id` as a path variable. Calls `menuService.deleteMenuItem(id)`. Handles `ResourceNotFoundException` by returning HTTP 404. Returns HTTP 204 on successful deletion.

---

## Reservation System (Backend)

**Name:** `reservation-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Reservation.java` — MODEL layer — defines the Reservation entity, representing a customer's table booking with details like date, time, party size, and status.
- `backend/src/main/java/com/farmaaishrestaurant/model/ReservationStatus.java` — MODEL layer — defines an enum for the possible states of a reservation.
- `backend/src/main/java/com/farmaaishrestaurant/repository/ReservationRepository.java` — REPOSITORY layer — provides data access operations for Reservation entities, including custom queries to find reservations by status.
- `backend/src/main/java/com/farmaaishrestaurant/service/ReservationService.java` — SERVICE layer — implements createReservation(CreateReservationRequest): ReservationResponse, getReservationById(UUID): ReservationResponse, getAllReservations(): List<ReservationResponse>, getReservationsByStatus(ReservationStatus): List<ReservationResponse>, updateReservationStatus(UUID, ReservationStatus): ReservationResponse, and deleteReservation(UUID): void; delegates persistence to ReservationRepository.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateReservationRequest.java` — DTO layer — defines the data structure for incoming reservation requests.
- `backend/src/main/java/com/farmaaishrestaurant/dto/ReservationResponse.java` — DTO layer — defines the data structure for outgoing reservation details.
- `backend/src/main/java/com/farmaaishrestaurant/controller/ReservationController.java` — CONTROLLER layer — exposes public API endpoints for customers to create new reservations.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminReservationController.java` — CONTROLLER layer — exposes admin-only API endpoints for viewing and managing all reservations.

**Feature Instruction:**

The Reservation System (Backend) feature provides a robust API for customers to book table reservations and for administrators to manage these reservations. It encompasses data models for reservations and their statuses, a repository for database interactions, a service layer for business logic, and DTOs for API communication. Two controllers expose the API endpoints: one for public customer access and another for authenticated administrative operations.

### Data Models
`Reservation.java` defines the core entity for a table reservation, storing details such as the reservation ID, customer name, contact information, date, time, party size, and current status. It uses `ReservationStatus.java` to represent the lifecycle of a reservation.
`ReservationStatus.java` is an enum defining the possible states a reservation can be in: PENDING, CONFIRMED, CANCELLED, COMPLETED.

### Repository Layer
`ReservationRepository.java` is a Spring Data JPA repository that extends `JpaRepository<Reservation, UUID>`, providing standard CRUD operations. It will also include custom query methods to find reservations by date, status, or customer contact information.

### DTOs
`CreateReservationRequest.java` is used by the `ReservationController` to receive new reservation requests from customers. It includes fields for customerName, customerEmail, customerPhone, reservationDate, reservationTime, and partySize. All fields are mandatory and include appropriate validation annotations.
`ReservationResponse.java` is used to return reservation details to both customers and administrators. It includes the reservation ID, all fields from `CreateReservationRequest`, and the current `ReservationStatus`.

### Service Layer
`ReservationService.java` orchestrates the business logic for reservations. It injects `ReservationRepository` to interact with the database. It provides the following public methods:

1.  `createReservation(CreateReservationRequest request): ReservationResponse`
    -   **Logic:**
        1.  Validate the `CreateReservationRequest` for business rules (e.g., party size limits, valid date/time).
        2.  Create a new `Reservation` entity from the request, setting its initial status to `PENDING`.
        3.  Save the `Reservation` entity using `reservationRepository.save()`.
        4.  Convert the saved `Reservation` entity to a `ReservationResponse` and return it.
    -   **Error Cases:** Throws `IllegalArgumentException` if business validation fails.

2.  `getReservationById(UUID id): ReservationResponse`
    -   **Logic:**
        1.  Retrieve the `Reservation` entity by `id` using `reservationRepository.findById()`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Convert the `Reservation` entity to a `ReservationResponse` and return it.
    -   **Error Cases:** Throws `ResourceNotFoundException` if no reservation with the given ID exists.

3.  `getAllReservations(): List<ReservationResponse>`
    -   **Logic:**
        1.  Retrieve all `Reservation` entities using `reservationRepository.findAll()`.
        2.  Convert each `Reservation` entity to a `ReservationResponse`.
        3.  Return the list of `ReservationResponse` DTOs.

4.  `getReservationsByStatus(ReservationStatus status): List<ReservationResponse>`
    -   **Logic:**
        1.  Retrieve `Reservation` entities by `status` using `reservationRepository.findByStatus()`.
        2.  Convert each `Reservation` entity to a `ReservationResponse`.
        3.  Return the list of `ReservationResponse` DTOs.

5.  `updateReservationStatus(UUID id, ReservationStatus newStatus): ReservationResponse`
    -   **Logic:**
        1.  Retrieve the `Reservation` entity by `id` using `reservationRepository.findById()`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Update the `status` of the `Reservation` entity to `newStatus`.
        4.  Save the updated `Reservation` entity using `reservationRepository.save()`.
        5.  Convert the saved `Reservation` entity to a `ReservationResponse` and return it.
    -   **Error Cases:** Throws `ResourceNotFoundException` if no reservation with the given ID exists.

6.  `deleteReservation(UUID id): void`
    -   **Logic:**
        1.  Check if the `Reservation` entity exists by `id` using `reservationRepository.existsById()`.
        2.  If not found, throw `ResourceNotFoundException`.
        3.  Delete the `Reservation` entity using `reservationRepository.deleteById()`.
    -   **Error Cases:** Throws `ResourceNotFoundException` if no reservation with the given ID exists.

### Controller Layer
`ReservationController.java` handles public-facing API endpoints for customers to create reservations. It injects `ReservationService`.

`AdminReservationController.java` handles administrative API endpoints for managing reservations. It injects `ReservationService`. This controller requires `ADMIN` authentication.

Both controllers will catch `ResourceNotFoundException` and return an HTTP 404 Not Found response, and `IllegalArgumentException` returning an HTTP 400 Bad Request response.

---

## Order Management Core (Backend)

**Name:** `order-core`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Order.java` — JPA Entity representing a customer's food order. It contains details such as order items, total price, current status, and delivery information.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderItem.java` — JPA Entity representing a single line item within an order, linking a menu item with a quantity and price.
- `backend/src/main/java/com/farmaaishrestaurant/model/OrderStatus.java` — Enum defining the possible states of a food order.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderRepository.java` — Spring Data JPA repository for `Order` entities, providing standard CRUD operations and custom query methods for order retrieval.
- `backend/src/main/java/com/farmaaishrestaurant/repository/OrderItemRepository.java` — Spring Data JPA repository for `OrderItem` entities, providing standard CRUD operations.
- `backend/src/main/java/com/farmaaishrestaurant/service/OrderService.java` — SERVICE layer — implements `createOrder(CreateOrderRequest): OrderResponse` and `getOrderById(UUID): OrderResponse`; delegates persistence to `OrderRepository` and `OrderItemRepository`, and retrieves menu item details from `MenuItemRepository`.

**Feature Instruction:**

The Order Management Core (Backend) feature provides the foundational models, repositories, and service logic for handling customer food orders. It defines the `Order` and `OrderItem` entities, their respective JPA repositories, and an `OrderStatus` enum to manage the lifecycle of an order. The `OrderService` orchestrates the creation of new orders, interacting with the `MenuItemRepository` from the `menu-management` feature to validate menu items and retrieve their prices. It will also integrate with a payment service (not part of this feature) to process payments for new orders. This feature focuses purely on the backend data and business logic, with its API surface exposed by the `order-api` feature.

---

## Order Management API (Backend)

**Name:** `order-api`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/dto/CreateOrderRequest.java` — DTO for creating a new food order, containing a list of items and customer details.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderItemRequest.java` — Record representing a single item within a new order request.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderResponse.java` — DTO for returning details of a created or retrieved order.
- `backend/src/main/java/com/farmaaishrestaurant/dto/OrderItemResponse.java` — Record representing a single item within an order response.
- `backend/src/main/java/com/farmaaishrestaurant/controller/OrderController.java` — Public REST controller for customers to create and view their food orders, exposing createOrder(CreateOrderRequest) and getCustomerOrders(UUID) methods.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminOrderController.java` — Admin-only REST controller for viewing and managing all customer orders, exposing getAllOrders(), getOrderById(UUID), and updateOrderStatus(UUID, OrderStatus) methods.

**Feature Instruction:**

The Order Management API provides endpoints for customers to create and view their food orders, and for administrators to manage all orders. This feature relies on the `order-core` feature for its core business logic and persistence, and the `menu-management` feature to retrieve menu item details. It defines DTOs for order creation and response, and two controllers: `OrderController` for customer-facing operations and `AdminOrderController` for administrative tasks.

### Order Creation Flow
1.  A customer initiates an order by sending a `POST` request to `/api/v1/orders` with a `CreateOrderRequest` body.
2.  `OrderController.createOrder` receives the request and delegates to `OrderService.createOrder` from the `order-core` feature.
3.  `OrderService.createOrder` will:
    a.  Validate the `menuItemId` for each `OrderItemRequest` by calling `MenuService.getMenuItemById(UUID id)` from the `menu-management` feature to ensure the item exists and retrieve its `unitPrice`.
    b.  Construct an `Order` entity and `OrderItem` entities.
    c.  Set the initial `OrderStatus` to `PENDING_PAYMENT`.
    d.  Persist the order using `OrderRepository.save()`.
    e.  Return an `OrderResponse` DTO.
4.  `OrderController` returns a `201 Created` response with the `OrderResponse`.

### Customer Order Retrieval
1.  A customer can retrieve their orders by sending a `GET` request to `/api/v1/orders` (to get all their orders) or `/api/v1/orders/{orderId}` (to get a specific order).
2.  `OrderController.getCustomerOrders` and `OrderController.getCustomerOrderById` delegate to `OrderService.getCustomerOrders(UUID customerId)` and `OrderService.getOrderById(UUID id)` respectively.
3.  `OrderService` retrieves the order(s) and maps them to `OrderResponse` DTOs.
4.  `OrderController` returns a `200 OK` response with the `OrderResponse` or `List<OrderResponse>`.

### Admin Order Management
1.  Administrators can view all orders via `GET /api/v1/admin/orders` or a specific order via `GET /api/v1/admin/orders/{orderId}`.
2.  `AdminOrderController.getAllOrders` and `AdminOrderController.getOrderById` delegate to `OrderService.getAllOrders()` and `OrderService.getOrderById(UUID id)` respectively.
3.  Administrators can update the status of an order via `PUT /api/v1/admin/orders/{orderId}/status`.
4.  `AdminOrderController.updateOrderStatus` delegates to `OrderService.updateOrderStatus(UUID orderId, OrderStatus newStatus)`.
5.  `OrderService.updateOrderStatus` will:
    a.  Retrieve the `Order` by `orderId`.
    b.  Update its `status` field.
    c.  Persist the updated `Order`.
    d.  Return an `OrderResponse` DTO.
6.  `AdminOrderController` returns a `200 OK` response with the updated `OrderResponse`.

### Error Handling
-   If a `menuItemId` in `CreateOrderRequest` does not exist, `OrderService` will throw a `ResourceNotFoundException` (from `shared-backend`), which `OrderController` will catch and return a `404 Not Found` response.
-   If an `orderId` for retrieval or update does not exist, `OrderService` will throw a `ResourceNotFoundException`, which the respective controller will catch and return a `404 Not Found` response.
-   Invalid input (e.g., negative quantity) will result in `400 Bad Request` due to `@Valid` annotations on DTOs.

---

## Blog Management (Backend)

**Name:** `blog-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/BlogPost.java` — JPA Entity — represents a blog post in the database.
- `backend/src/main/java/com/farmaaishrestaurant/repository/BlogPostRepository.java` — Spring Data JPA Repository — provides standard CRUD operations for BlogPost entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/BlogPostService.java` — SERVICE layer — implements getAllBlogPosts(): List<BlogPostDto>, getBlogPostById(UUID): BlogPostDto, createBlogPost(BlogPostDto): BlogPostDto, updateBlogPost(UUID, BlogPostDto): BlogPostDto, and deleteBlogPost(UUID): void; delegates persistence to BlogPostRepository.
- `backend/src/main/java/com/farmaaishrestaurant/dto/BlogPostDto.java` — Data Transfer Object — used for API communication of blog post data.
- `backend/src/main/java/com/farmaaishrestaurant/controller/BlogController.java` — Public REST Controller — exposes endpoints for fetching blog posts for public display.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminBlogController.java` — Admin REST Controller — exposes endpoints for CRUD operations on blog posts, requiring admin authentication.

**Feature Instruction:**

The Blog Management feature provides a complete backend solution for creating, managing, and serving blog posts for Farmaaish Restaurant. It consists of a `BlogPost` entity for persistence, a `BlogPostRepository` for database interactions, a `BlogPostService` for business logic, a `BlogPostDto` for data transfer, and two controllers: `BlogController` for public access to blog posts and `AdminBlogController` for administrative CRUD operations. This feature is designed to be consumed by the `blog-ui` frontend feature.

### Data Model and DTO

- **BlogPost.java**: This JPA entity represents a single blog post. It includes fields for `id` (UUID, primary key), `title` (String, not null, max 255 characters), `content` (String, not null, stored as TEXT), `author` (String, not null, max 100 characters), `publicationDate` (LocalDate, not null), and `imageUrl` (String, nullable, max 255 characters).
- **BlogPostDto.java**: This DTO mirrors the `BlogPost` entity but is used for all API communication. It contains `id` (UUID), `title` (String), `content` (String), `author` (String), `publicationDate` (LocalDate), and `imageUrl` (String). It includes validation annotations for `title`, `content`, and `author` to ensure they are not null or empty.

### Persistence Layer

- **BlogPostRepository.java**: This interface extends `JpaRepository<BlogPost, UUID>`, providing standard CRUD operations. No custom methods are required as the service layer will handle all necessary queries using the default methods provided by Spring Data JPA.

### Service Layer

- **BlogPostService.java**: This service class encapsulates the core business logic for blog posts. It injects `BlogPostRepository` to interact with the database. All methods in this service operate on `BlogPostDto` objects, converting them to `BlogPost` entities for persistence and back to DTOs for returning to the controllers.
  - `getAllBlogPosts()`: Returns `List<BlogPostDto>`. Fetches all blog posts from the repository, orders them by `publicationDate` in descending order, and converts them to DTOs.
  - `getBlogPostById(UUID id)`: Returns `BlogPostDto`. Fetches a single blog post by its ID. If the blog post is not found, it throws a `ResourceNotFoundException`.
  - `createBlogPost(BlogPostDto blogPostDto)`: Returns `BlogPostDto`. Creates a new blog post. It takes a `BlogPostDto`, converts it to a `BlogPost` entity, sets the `publicationDate` to the current date, saves it via the repository, and returns the saved entity as a DTO.
  - `updateBlogPost(UUID id, BlogPostDto blogPostDto)`: Returns `BlogPostDto`. Updates an existing blog post. It first retrieves the existing blog post by ID, throws `ResourceNotFoundException` if not found, updates its fields from the provided `blogPostDto`, saves the updated entity, and returns it as a DTO. The `id` and `publicationDate` fields are not updated from the DTO.
  - `deleteBlogPost(UUID id)`: Returns `void`. Deletes a blog post by its ID. It first checks if the blog post exists, throwing `ResourceNotFoundException` if not found, then deletes it.

### Controller Layer

- **BlogController.java**: This REST controller handles public-facing requests for blog posts. It injects `BlogPostService`.
  - `getAllBlogPosts()`: `GET /api/v1/blog`. Returns `ResponseEntity<List<BlogPostDto>>`. Calls `blogPostService.getAllBlogPosts()` and returns the list of DTOs with HTTP status 200 OK.
  - `getBlogPostById(UUID id)`: `GET /api/v1/blog/{id}`. Returns `ResponseEntity<BlogPostDto>`. Calls `blogPostService.getBlogPostById(id)`. If `ResourceNotFoundException` is thrown, it will be handled by the `GlobalExceptionHandler` (from `shared-backend`) which returns a 404 Not Found response. Otherwise, returns the DTO with HTTP status 200 OK.

- **AdminBlogController.java**: This REST controller handles administrative requests for blog posts, requiring authentication and admin privileges. It injects `BlogPostService`.
  - `getAllBlogPosts()`: `GET /api/v1/admin/blog`. Returns `ResponseEntity<List<BlogPostDto>>`. Calls `blogPostService.getAllBlogPosts()` and returns the list of DTOs with HTTP status 200 OK.
  - `getBlogPostById(UUID id)`: `GET /api/v1/admin/blog/{id}`. Returns `ResponseEntity<BlogPostDto>`. Calls `blogPostService.getBlogPostById(id)`. Handles `ResourceNotFoundException` via `GlobalExceptionHandler`.
  - `createBlogPost(BlogPostDto blogPostDto)`: `POST /api/v1/admin/blog`. Returns `ResponseEntity<BlogPostDto>`. Takes a `@Valid` `BlogPostDto` in the request body, calls `blogPostService.createBlogPost()`, and returns the created DTO with HTTP status 201 Created.
  - `updateBlogPost(UUID id, BlogPostDto blogPostDto)`: `PUT /api/v1/admin/blog/{id}`. Returns `ResponseEntity<BlogPostDto>`. Takes a `@Valid` `BlogPostDto` in the request body, calls `blogPostService.updateBlogPost(id, blogPostDto)`. Handles `ResourceNotFoundException` via `GlobalExceptionHandler`. Returns the updated DTO with HTTP status 200 OK.
  - `deleteBlogPost(UUID id)`: `DELETE /api/v1/admin/blog/{id}`. Returns `ResponseEntity<Void>`. Calls `blogPostService.deleteBlogPost(id)`. Handles `ResourceNotFoundException` via `GlobalExceptionHandler`. Returns HTTP status 204 No Content on successful deletion.

---

## Inquiry Management (Backend)

**Name:** `inquiry-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/CateringInquiry.java` — MODEL layer — defines the entity structure for catering inquiries, including its status.
- `backend/src/main/java/com/farmaaishrestaurant/model/InquiryStatus.java` — MODEL layer — defines an enum for the possible states of a catering inquiry.
- `backend/src/main/java/com/farmaaishrestaurant/repository/CateringInquiryRepository.java` — REPOSITORY layer — provides data access operations for `CateringInquiry` entities, including `findByInquiryStatus(InquiryStatus status)`.
- `backend/src/main/java/com/farmaaishrestaurant/service/CateringInquiryService.java` — SERVICE layer — implements `submitInquiry(CateringInquiryDto)`, `getAllInquiries()`, `getInquiryById(UUID)`, `getInquiriesByStatus(InquiryStatus)`, `updateInquiryStatus(UUID, InquiryStatus)`, and `deleteInquiry(UUID)` for catering inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/dto/CateringInquiryDto.java` — DTO layer — defines the data transfer object for catering inquiries.
- `backend/src/main/java/com/farmaaishrestaurant/controller/CateringInquiryController.java` — CONTROLLER layer — exposes a public endpoint for customers to submit catering inquiries via `submitCateringInquiry(CateringInquiryDto)`.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminCateringInquiryController.java` — CONTROLLER layer — exposes admin-only endpoints for managing catering inquiries, including `getAllCateringInquiries()`, `getCateringInquiryById(UUID)`, `getCateringInquiriesByStatus(InquiryStatus)`, `updateCateringInquiryStatus(UUID, InquiryStatus)`, and `deleteCateringInquiry(UUID)`.

**Feature Instruction:**

The Inquiry Management feature provides a backend system for Farmaaish Restaurant to handle customer inquiries for catering and private events. It includes models for storing inquiry details and their status, a repository for data access, a service layer for business logic (including creating inquiries and updating their status), and two controllers: one public-facing for submitting new inquiries and one admin-only for managing existing inquiries.

### Data Models
- `CateringInquiry.java`: Represents a catering inquiry with fields like `id`, `customerName`, `customerEmail`, `customerPhone`, `eventType`, `eventDate`, `numberOfGuests`, `budget`, `message`, `inquiryStatus`, `createdAt`, and `updatedAt`. The `inquiryStatus` field will be an `InquiryStatus` enum.
- `InquiryStatus.java`: An enum defining the possible states of a catering inquiry: `NEW`, `CONTACTED`, `CLOSED`.

### Data Transfer Object
- `CateringInquiryDto.java`: A DTO used for transferring catering inquiry data between the service layer and controllers. It mirrors the fields of `CateringInquiry` but omits `createdAt` and `updatedAt` for creation/update requests, and includes them for responses.

### Persistence Layer
- `CateringInquiryRepository.java`: Extends `JpaRepository` to provide standard CRUD operations for `CateringInquiry` entities. It will also include custom query methods to find inquiries by status.

### Service Layer
- `CateringInquiryService.java`: This service orchestrates the business logic for catering inquiries. It injects `CateringInquiryRepository`.
  - `submitInquiry(CateringInquiryDto inquiryDto)`: 
    1. Validates the incoming `inquiryDto`.
    2. Maps the `CateringInquiryDto` to a `CateringInquiry` entity.
    3. Sets the initial `inquiryStatus` to `NEW` and `createdAt`/`updatedAt` timestamps.
    4. Saves the `CateringInquiry` entity using `CateringInquiryRepository.save()`.
    5. Maps the saved entity back to a `CateringInquiryDto` and returns it.
    6. Throws `IllegalArgumentException` if `inquiryDto` is invalid.
  - `getAllInquiries()`: 
    1. Retrieves all `CateringInquiry` entities from `CateringInquiryRepository.findAll()`.
    2. Maps the entities to a `List<CateringInquiryDto>` and returns it.
  - `getInquiryById(UUID id)`: 
    1. Retrieves a `CateringInquiry` entity by `id` from `CateringInquiryRepository.findById(id)`.
    2. If not found, throws `ResourceNotFoundException`.
    3. Maps the entity to a `CateringInquiryDto` and returns it.
  - `getInquiriesByStatus(InquiryStatus status)`: 
    1. Retrieves `CateringInquiry` entities by `status` from `CateringInquiryRepository.findByInquiryStatus(status)`.
    2. Maps the entities to a `List<CateringInquiryDto>` and returns it.
  - `updateInquiryStatus(UUID id, InquiryStatus newStatus)`: 
    1. Retrieves the `CateringInquiry` entity by `id` from `CateringInquiryRepository.findById(id)`.
    2. If not found, throws `ResourceNotFoundException`.
    3. Updates the `inquiryStatus` to `newStatus` and `updatedAt` timestamp.
    4. Saves the updated entity using `CateringInquiryRepository.save()`.
    5. Maps the updated entity back to a `CateringInquiryDto` and returns it.
    6. Throws `IllegalArgumentException` if `newStatus` is null.
  - `deleteInquiry(UUID id)`: 
    1. Retrieves the `CateringInquiry` entity by `id` from `CateringInquiryRepository.findById(id)`.
    2. If not found, throws `ResourceNotFoundException`.
    3. Deletes the entity using `CateringInquiryRepository.deleteById(id)`.

### Controllers
- `CateringInquiryController.java`: This public controller handles requests from customers to submit catering inquiries. It injects `CateringInquiryService`.
  - `submitCateringInquiry(@RequestBody CateringInquiryDto inquiryDto)`: 
    1. Calls `cateringInquiryService.submitInquiry(inquiryDto)`.
    2. Returns a `201 Created` response with the created `CateringInquiryDto`.
    3. Handles `IllegalArgumentException` by returning `400 Bad Request`.
- `AdminCateringInquiryController.java`: This admin-only controller provides endpoints for managing catering inquiries. It injects `CateringInquiryService`.
  - `getAllCateringInquiries()`: 
    1. Calls `cateringInquiryService.getAllInquiries()`.
    2. Returns a `200 OK` response with a `List<CateringInquiryDto>`.
  - `getCateringInquiryById(UUID id)`: 
    1. Calls `cateringInquiryService.getInquiryById(id)`.
    2. Returns a `200 OK` response with the `CateringInquiryDto`.
    3. Handles `ResourceNotFoundException` by returning `404 Not Found`.
  - `getCateringInquiriesByStatus(InquiryStatus status)`: 
    1. Calls `cateringInquiryService.getInquiriesByStatus(status)`.
    2. Returns a `200 OK` response with a `List<CateringInquiryDto>`.
  - `updateCateringInquiryStatus(UUID id, InquiryStatus newStatus)`: 
    1. Calls `cateringInquiryService.updateInquiryStatus(id, newStatus)`.
    2. Returns a `200 OK` response with the updated `CateringInquiryDto`.
    3. Handles `ResourceNotFoundException` by returning `404 Not Found`.
    4. Handles `IllegalArgumentException` by returning `400 Bad Request`.
  - `deleteCateringInquiry(UUID id)`: 
    1. Calls `cateringInquiryService.deleteInquiry(id)`.
    2. Returns a `204 No Content` response.
    3. Handles `ResourceNotFoundException` by returning `404 Not Found`.

---

## Testimonial Management (Backend)

**Name:** `testimonial-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/Testimonial.java` — JPA Entity — represents a customer testimonial in the database.
- `backend/src/main/java/com/farmaaishrestaurant/repository/TestimonialRepository.java` — Spring Data JPA Repository — provides CRUD operations for `Testimonial` entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/TestimonialService.java` — SERVICE layer — implements `getAllVisibleTestimonials(): List<TestimonialDto>`, `getAllTestimonials(): List<TestimonialDto>`, `getTestimonialById(UUID id): TestimonialDto`, `createTestimonial(TestimonialDto testimonialDto): TestimonialDto`, `updateTestimonial(UUID id, TestimonialDto testimonialDto): TestimonialDto`, and `deleteTestimonial(UUID id): void`; delegates persistence to `TestimonialRepository`.
- `backend/src/main/java/com/farmaaishrestaurant/dto/TestimonialDto.java` — Data Transfer Object — used for transferring testimonial data between layers.
- `backend/src/main/java/com/farmaaishrestaurant/controller/TestimonialController.java` — Public REST Controller — exposes read-only endpoints for fetching visible testimonials.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminTestimonialController.java` — Admin REST Controller — exposes CRUD endpoints for managing testimonials, accessible only to authenticated administrators.

**Feature Instruction:**

The Testimonial Management feature provides a backend API for managing customer testimonials. It includes a `Testimonial` entity to store testimonial data, a `TestimonialRepository` for database interactions, a `TestimonialService` for business logic, and `TestimonialDto` for data transfer. Two controllers expose API endpoints: `TestimonialController` provides public read-only access to testimonials, while `AdminTestimonialController` provides authenticated admin-only CRUD operations. The `TestimonialService` handles mapping between `Testimonial` entities and `TestimonialDto` objects, and interacts with `TestimonialRepository` to persist and retrieve data. When a testimonial is not found, a `ResourceNotFoundException` (from the `shared-backend` feature) is thrown, which `GlobalExceptionHandler` (also from `shared-backend`) will catch and convert into an appropriate HTTP 404 response.

---

## Gallery Management (Backend)

**Name:** `gallery-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/farmaaishrestaurant/model/GalleryImage.java` — JPA Entity — represents an image in the restaurant's gallery, mapping to the 'gallery_images' table.
- `backend/src/main/java/com/farmaaishrestaurant/repository/GalleryImageRepository.java` — Spring Data JPA Repository — provides CRUD and custom query operations for GalleryImage entities.
- `backend/src/main/java/com/farmaaishrestaurant/service/GalleryImageService.java` — SERVICE layer — implements business logic for managing gallery images, including getAllGalleryImages(), getGalleryImageById(UUID), createGalleryImage(GalleryImageDto), updateGalleryImage(UUID, GalleryImageDto), and deleteGalleryImage(UUID).
- `backend/src/main/java/com/farmaaishrestaurant/dto/GalleryImageDto.java` — Data Transfer Object — used for transferring gallery image data between layers, including validation annotations.
- `backend/src/main/java/com/farmaaishrestaurant/controller/GalleryController.java` — Public REST Controller — exposes read-only endpoints for fetching gallery images for public display.
- `backend/src/main/java/com/farmaaishrestaurant/controller/AdminGalleryController.java` — Admin REST Controller — provides authenticated endpoints for CRUD operations on gallery images.

**Feature Instruction:**

The Gallery Management feature provides a backend system for Farmaaish Restaurant to manage its image gallery, showcasing ambiance and event photos. It consists of a `GalleryImage` entity for persistence, a `GalleryImageRepository` for data access, a `GalleryImageService` for business logic, and two controllers: `GalleryController` for public access to view images and `AdminGalleryController` for authenticated administrators to perform CRUD operations on gallery images. A `GalleryImageDto` is used for data transfer between the service and controllers.

### GalleryImage.java
This JPA entity maps to the `gallery_images` table in the database. It stores `id` (UUID, primary key), `imageUrl` (String, not null, unique), `caption` (String, nullable), `displayOrder` (Integer, not null, unique), and `createdAt` (LocalDateTime, not null) and `updatedAt` (LocalDateTime, not null) for auditing.

### GalleryImageRepository.java
This repository extends `JpaRepository<GalleryImage, UUID>` and provides standard CRUD operations. It also defines a custom query method `findAllByOrderByDisplayOrderAsc()` to retrieve all gallery images sorted by their `displayOrder`.

### GalleryImageDto.java
This DTO mirrors the `GalleryImage` entity but is used for API communication. It includes `id` (UUID), `imageUrl` (String, @NotBlank), `caption` (String, @Size(max=255)), `displayOrder` (Integer, @NotNull, @Min(0)), `createdAt` (LocalDateTime), and `updatedAt` (LocalDateTime).

### GalleryImageService.java
This service encapsulates the business logic for gallery image management. It injects `GalleryImageRepository`.

**Public Functions:**
1. `List<GalleryImageDto> getAllGalleryImages()`:
   - Retrieves all gallery images, sorted by `displayOrder`.
   - Steps:
     1. Call `galleryImageRepository.findAllByOrderByDisplayOrderAsc()`.
     2. Map the list of `GalleryImage` entities to `GalleryImageDto`s.
     3. Return the list of DTOs.
2. `GalleryImageDto getGalleryImageById(UUID id)`:
   - Retrieves a single gallery image by its ID.
   - Steps:
     1. Call `galleryImageRepository.findById(id)`.
     2. If the image is not found, throw `ResourceNotFoundException`.
     3. Map the `GalleryImage` entity to a `GalleryImageDto`.
     4. Return the DTO.
3. `GalleryImageDto createGalleryImage(GalleryImageDto galleryImageDto)`:
   - Creates a new gallery image.
   - Steps:
     1. Validate `galleryImageDto` (e.g., `imageUrl` not null/empty, `displayOrder` not null/negative).
     2. Check if an image with the same `imageUrl` or `displayOrder` already exists to prevent duplicates. If so, throw `IllegalArgumentException`.
     3. Map the `GalleryImageDto` to a `GalleryImage` entity.
     4. Set `createdAt` and `updatedAt` to `LocalDateTime.now()`.
     5. Call `galleryImageRepository.save()`.
     6. Map the saved `GalleryImage` entity back to a `GalleryImageDto`.
     7. Return the DTO.
4. `GalleryImageDto updateGalleryImage(UUID id, GalleryImageDto galleryImageDto)`:
   - Updates an existing gallery image.
   - Steps:
     1. Call `galleryImageRepository.findById(id)`.
     2. If the image is not found, throw `ResourceNotFoundException`.
     3. Validate `galleryImageDto` (e.g., `imageUrl` not null/empty, `displayOrder` not null/negative).
     4. Check for `imageUrl` and `displayOrder` uniqueness against other images (excluding the current one). If a conflict exists, throw `IllegalArgumentException`.
     5. Update the fields of the retrieved `GalleryImage` entity with values from `galleryImageDto`.
     6. Set `updatedAt` to `LocalDateTime.now()`.
     7. Call `galleryImageRepository.save()`.
     8. Map the updated `GalleryImage` entity back to a `GalleryImageDto`.
     9. Return the DTO.
5. `void deleteGalleryImage(UUID id)`:
   - Deletes a gallery image by its ID.
   - Steps:
     1. Call `galleryImageRepository.findById(id)`.
     2. If the image is not found, throw `ResourceNotFoundException`.
     3. Call `galleryImageRepository.deleteById(id)`.

### GalleryController.java
This controller handles public requests for gallery images. It injects `GalleryImageService`.

**Public Functions:**
1. `ResponseEntity<List<GalleryImageDto>> getAllGalleryImages()`:
   - Handles GET requests to `/api/v1/gallery`.
   - Calls `galleryImageService.getAllGalleryImages()`.
   - Returns a `200 OK` response with the list of `GalleryImageDto`s.

### AdminGalleryController.java
This controller handles authenticated admin requests for CRUD operations on gallery images. It injects `GalleryImageService`.

**Public Functions:**
1. `ResponseEntity<List<GalleryImageDto>> getAllGalleryImages()`:
   - Handles GET requests to `/api/v1/admin/gallery`.
   - Calls `galleryImageService.getAllGalleryImages()`.
   - Returns a `200 OK` response with the list of `GalleryImageDto`s.
2. `ResponseEntity<GalleryImageDto> getGalleryImageById(UUID id)`:
   - Handles GET requests to `/api/v1/admin/gallery/{id}`.
   - Calls `galleryImageService.getGalleryImageById(id)`.
   - Returns a `200 OK` response with the `GalleryImageDto` or `404 NOT FOUND` if `ResourceNotFoundException` is thrown.
3. `ResponseEntity<GalleryImageDto> createGalleryImage(@Valid @RequestBody GalleryImageDto galleryImageDto)`:
   - Handles POST requests to `/api/v1/admin/gallery`.
   - Calls `galleryImageService.createGalleryImage(galleryImageDto)`.
   - Returns a `201 CREATED` response with the created `GalleryImageDto` or `400 BAD REQUEST` if `IllegalArgumentException` is thrown.
4. `ResponseEntity<GalleryImageDto> updateGalleryImage(UUID id, @Valid @RequestBody GalleryImageDto galleryImageDto)`:
   - Handles PUT requests to `/api/v1/admin/gallery/{id}`.
   - Calls `galleryImageService.updateGalleryImage(id, galleryImageDto)`.
   - Returns a `200 OK` response with the updated `GalleryImageDto` or `404 NOT FOUND` if `ResourceNotFoundException` is thrown, or `400 BAD REQUEST` if `IllegalArgumentException` is thrown.
5. `ResponseEntity<Void> deleteGalleryImage(UUID id)`:
   - Handles DELETE requests to `/api/v1/admin/gallery/{id}`.
   - Calls `galleryImageService.deleteGalleryImage(id)`.
   - Returns a `204 NO CONTENT` response or `404 NOT FOUND` if `ResourceNotFoundException` is thrown.

---

## Core Application (Frontend)

**Name:** `core-app`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/api/client.ts` — Axios client configuration — sets base URL and adds an interceptor to attach the 'token' from localStorage to all outgoing requests.
- `frontend/src/App.tsx` — Root React component — sets up React Router for navigation and provides global contexts like authentication and React Query.
- `frontend/src/pages/HomePage.tsx` — Public-facing landing page — composes various sections to showcase the restaurant's offerings and drive user engagement.
- `frontend/src/components/home/HeroSection.tsx` — Homepage hero component — displays a full-bleed image, a branded headline, and a call-to-action for reservations.
- `frontend/src/components/home/FeaturedDishesSection.tsx` — Homepage section — displays a grid of signature menu items fetched using `useMenu`.
- `frontend/src/components/home/TestimonialsSection.tsx` — Homepage section — displays a rotating carousel of customer testimonials fetched using `useTestimonials`.
- `frontend/src/components/home/BookingCtaSection.tsx` — Homepage call-to-action component — prompts users to book a table with a prominent button.
- `frontend/src/pages/NotFoundPage.tsx` — Error page — displays a 404 message for unmatched routes and provides navigation back to the homepage.

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

This `core-app` feature provides the foundational frontend structure, including the global Axios client configuration, the root `App.tsx` component for routing and context providers, and the main public-facing pages like the `HomePage.tsx` and `NotFoundPage.tsx`. It also includes the core components that make up the homepage: `HeroSection.tsx`, `FeaturedDishesSection.tsx`, `TestimonialsSection.tsx`, and `BookingCtaSection.tsx`. All monetary values displayed should be formatted in Indian Rupees (₹) using the `en-IN` locale.

### `frontend/src/api/client.ts`
This file configures the global Axios instance. It sets the `baseURL` to `/api/v1` and includes an interceptor to attach the authentication token to outgoing requests. The token is retrieved from `localStorage` using the key 'token'.

### `frontend/src/App.tsx`
This is the root component of the application. It sets up the `BrowserRouter` from `react-router-dom` to define the application's routes. It wraps the entire application with necessary context providers, including `AuthContext` from `auth-ui` and `QueryClientProvider` for React Query. It defines the main routes for the `HomePage`, `NotFoundPage`, and other feature pages, ensuring that all public pages are wrapped with the `Layout` component from `shared-ui`.

### `frontend/src/pages/HomePage.tsx`
This page serves as the landing page for Farmaaish Restaurant. It composes several section components to present a rich and inviting experience. It includes a `HeroSection` at the top, followed by `FeaturedDishesSection` to showcase signature items, `TestimonialsSection` for social proof, and a `BookingCtaSection` to encourage table reservations. All content is designed to evoke the regality and richness of Mughlai heritage.

### `frontend/src/components/home/HeroSection.tsx`
This component renders a full-bleed hero section for the homepage. It features a stunning background image of Mughlai cuisine (using `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80`) with a dark overlay (`bg-black bg-opacity-50`). The headline should be "Experience the Grandeur of Farmaaish Restaurant" and the subheadline "A Culinary Journey Through Royal Mughlai Flavors." It includes a primary call-to-action button, styled with the `Primary CTA` design token, that navigates to the reservation booking page (`/reservations`).

### `frontend/src/components/home/FeaturedDishesSection.tsx`
This section displays a curated grid of signature dishes. It utilizes the `useMenu` hook from the `menu-display` feature to fetch a list of `MenuItemDto` objects. The section title should be "Our Signature Creations" and the description "Savor the rich and aromatic flavors of our most beloved Mughlai dishes, crafted with tradition and passion." Each dish card will display the `name`, `description`, `price`, and `imageUrl` of the `MenuItemDto`. Prices must be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### `frontend/src/components/home/TestimonialsSection.tsx`
This component renders a rotating carousel of customer testimonials. It uses the `useTestimonials` hook from the `testimonial-ui` feature to fetch `TestimonialDto` objects. The section title should be "What Our Guests Say" and the description "Hear from those who have experienced the unparalleled taste and hospitality of Farmaaish Restaurant." Each testimonial card will display the `customerName` and `reviewText` from the `TestimonialDto`.

### `frontend/src/components/home/BookingCtaSection.tsx`
This prominent call-to-action section encourages users to book a table. It features a background image (e.g., a luxurious dining setting) and a clear message: "Reserve Your Table at Farmaaish Restaurant." The subheadline should be "Indulge in an unforgettable dining experience. Book your table now." It includes a primary call-to-action button, styled with the `Primary CTA` design token, that navigates to the reservation booking page (`/reservations`).

### `frontend/src/pages/NotFoundPage.tsx`
This page is displayed for any routes that do not match. It should present a clear "404 - Page Not Found" message with a friendly subtext like "The culinary journey you sought seems to have taken a detour. Please return to the homepage to discover our exquisite offerings." It includes a button to navigate back to the homepage, styled with the `Primary CTA` design token.


---

## Shared UI Components

**Name:** `shared-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/components/Layout.tsx` — Main layout component for public-facing pages, wrapping content with the Header and Footer components.
- `frontend/src/components/Header.tsx` — Site-wide header component, displaying navigation, logo, user authentication status, and the cart drawer.
- `frontend/src/components/Footer.tsx` — Site-wide footer component, displaying contact information, social media links, and sitemap.
- `frontend/src/components/AdminLayout.tsx` — Layout component for the admin section, providing a sidebar for navigation and a main content area.

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

This feature provides the foundational UI layouts and shared components for the Farmaaish Restaurant frontend application. It includes `Layout.tsx` for public-facing pages, `AdminLayout.tsx` for the administrative section, and common components like `Header.tsx` and `Footer.tsx`.

### Layout.tsx
This component serves as the main wrapper for all public-facing pages. It integrates the `Header` and `Footer` components and provides a consistent structure for content. The `Layout` component accepts `children` as props, which will be rendered within the main content area. It ensures that all public pages have a consistent look and feel, adhering to the brand's visual identity. The header will include navigation links, the restaurant logo, and user authentication status (via `AuthContext`) and a cart drawer (via `CartDrawer`). The footer will display contact information, social media links, and a sitemap.

### Header.tsx
This component renders the site-wide header. It includes the Farmaaish Restaurant logo, primary navigation links (Home, Menu, Reservations, Catering, Blog, Gallery, About, Contact), and a user authentication section. The authentication section will display 'Login' or 'My Account'/'Logout' based on the user's authentication status, which is managed by `AuthContext`. It also integrates the `CartDrawer` component from the `order-flow` feature to display the shopping cart. The header will have a deep maroon background (`bg-[#800020]`) and white text, reflecting the regal color palette.

### Footer.tsx
This component renders the site-wide footer. It displays essential business information such as the restaurant's address, phone number, and opening hours. It also includes links to social media profiles and a sitemap for easy navigation. The footer will maintain the sophisticated tone and color scheme of the brand, using dark charcoal text on a cream background or similar subtle contrast.

### AdminLayout.tsx
This component provides the layout for all administrative pages. It includes a sidebar for admin navigation and a main content area. This layout is distinct from the public-facing `Layout.tsx` to clearly separate the user experience for administrators. It will not include the public-facing header or footer, instead focusing on administrative tools and navigation. The sidebar will provide links to manage menu items, reservations, orders, blog posts, catering inquiries, testimonials, and gallery images. The main content area will render the `children` passed to it.

---

## Authentication UI

**Name:** `auth-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/components/ProtectedRoute.tsx` — React component that acts as a route guard; it checks authentication status using `useAuth()` and redirects unauthenticated users to the login page.
- `frontend/src/context/AuthContext.tsx` — React Context for managing global authentication state, providing `isAuthenticated: boolean`, `user: { id: string; email: string; role: string } | null`, `token: string | null`, `login(email: string, password: string): Promise<void>`, and `logout(): void` to its consumers.
- `frontend/src/hooks/useAuth.ts` — Custom React hook for consuming the `AuthContext`, providing direct access to authentication state and functions.
- `frontend/src/pages/LoginPage.tsx` — React page component that renders a login form, handles user authentication via `useAuth()`, and redirects on success.

**Feature Instruction:**

This feature provides the core authentication UI for the Farmaaish Restaurant application, enabling users (both customers and administrators) to log in and access protected routes. It consists of a React Context (`AuthContext.tsx`) to manage the global authentication state, a custom hook (`useAuth.ts`) for easy consumption of this context, a `LoginPage.tsx` component for user login, and a `ProtectedRoute.tsx` component to guard routes requiring authentication.

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#B8860B] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

### AuthContext.tsx
This file defines the `AuthContext` and `AuthProvider`. The `AuthProvider` manages the authentication state, including `user` (an object containing user details like `id`, `email`, `role`), `token` (JWT string), `isAuthenticated` (boolean), `login` function, and `logout` function. The `token` is stored in `localStorage` under the key 'token'. The `login` function takes `email` and `password`, makes an API call to `/api/auth/login` (from the `user-management` backend feature), and on success, stores the received JWT token and user details, updating the context state. The `logout` function clears the token from `localStorage` and resets the context state. The `AuthProvider` also initializes the state by checking for an existing token in `localStorage` on mount.

### useAuth.ts
This custom React hook, `useAuth`, provides a convenient way for any component to access the authentication context. It simply consumes the `AuthContext` and returns its value, allowing components to easily check authentication status, access user data, and call `login` or `logout`.

### LoginPage.tsx
This page provides a login form for users. It uses the `useAuth` hook to access the `login` function. The form will have fields for `email` and `password`. Upon successful login, the user should be redirected to the home page (`/`) or a previously intended protected route. The page should display a loading indicator during the API call and error messages for invalid credentials or other login failures. The design should be clean and elegant, aligning with the overall brand.

**Page Structure and Content:**
- The page should be centered, with a clean, elegant login form.
- **Heading:** <h1 className="text-3xl font-bold text-[#36454F]">Welcome Back to Farmaaish</h1>
- **Sub-heading:** <p className="mt-2 text-gray-600">Sign in to savor the authentic Mughlai experience.</p>
- **Form:** Two input fields for 'Email' and 'Password', and a submit button.
- **Login Button:** <button className="bg-[#D4AF37] hover:bg-[#B8860B] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">Login</button>
- Error messages should be displayed clearly below the form if login fails.

### ProtectedRoute.tsx
This component acts as a route guard. It takes `children` as props. It uses the `useAuth` hook to check if the user is authenticated. If the user is not authenticated, it redirects them to the `/login` page. Otherwise, it renders its `children` components. This ensures that only authenticated users can access certain parts of the application.

---

## Menu Display (Frontend)

**Name:** `menu-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/menu.ts` — TypeScript types and interfaces for the Menu domain, mirroring the backend DTOs.
- `frontend/src/services/menuService.ts` — SERVICE layer — provides functions to interact with the backend menu API, specifically getAllMenuItems(): Promise<MenuItem[]> and getMenuItemsByCategory(category: MenuItemCategory): Promise<MenuItem[]>.
- `frontend/src/hooks/useMenu.ts` — React Query hook for fetching and managing menu data, exposing useAllMenuItems(): QueryResult<MenuItem[]> and useMenuItemsByCategory(category: MenuItemCategory): QueryResult<MenuItem[]>.
- `frontend/src/pages/MenuPage.tsx` — PAGE layer — displays the full restaurant menu, orchestrating MenuCategoryTabs and MenuItemGrid components.
- `frontend/src/components/menu/MenuCategoryTabs.tsx` — COMPONENT layer — provides tab-based navigation to filter menu items by category.
- `frontend/src/components/menu/MenuItemGrid.tsx` — COMPONENT layer — displays a responsive grid of MenuItemCard components.
- `frontend/src/components/menu/MenuItemCard.tsx` — COMPONENT layer — displays a single menu item with details and an add-to-cart button.

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

## Feature Instruction: Menu Display (Frontend)

This feature is responsible for displaying Farmaaish Restaurant's menu to customers, allowing them to browse dishes by category and add them to their cart. It integrates with the `menu-management` backend feature to fetch menu data and with the `order-flow` feature's cart functionality to enable adding items.

### `frontend/src/types/menu.ts`
This file defines the TypeScript interfaces for `MenuItem` and `MenuItemCategory`, mirroring the `MenuItemDto` from the `menu-management` backend. `MenuItemCategory` will be an enum representing categories like 'STARTERS', 'MAIN_COURSE', 'DESSERTS', 'BEVERAGES'.

### `frontend/src/services/menuService.ts`
This service provides asynchronous functions to interact with the backend menu API. It will expose `getAllMenuItems()` to fetch all menu items and `getMenuItemsByCategory(category: MenuItemCategory)` to fetch items filtered by category. These functions will use the `apiClient` from `@/api/client.ts` to make HTTP GET requests to `/api/v1/menu` and `/api/v1/menu/category/{category}` respectively. Error handling should be robust, logging errors and re-throwing them for the calling hooks to handle.

### `frontend/src/hooks/useMenu.ts`
This React Query hook will encapsulate the logic for fetching menu data. It will provide `useAllMenuItems()` to fetch all items and `useMenuItemsByCategory(category: MenuItemCategory)` to fetch items for a specific category. These hooks will leverage `menuService.ts` and manage loading states, errors, and caching. The `useAllMenuItems` hook should return a list of all `MenuItem` objects, while `useMenuItemsByCategory` should return a filtered list based on the provided category.

### `frontend/src/pages/MenuPage.tsx`
This page will serve as the main entry point for displaying the restaurant's menu. It will use the `Layout` component from `shared-ui` for consistent navigation and footer. The page will feature a prominent heading "Our Culinary Delights" in `text-4xl md:text-6xl font-bold text-[#36454F]`. Below the heading, it will render the `MenuCategoryTabs` component to allow users to filter by category. The `MenuItemGrid` component will display the actual menu items based on the selected category. The page will manage the active category state and pass it down to `MenuCategoryTabs` and `MenuItemGrid`. Loading states and error messages from `useMenu` hooks should be handled gracefully, displaying a loading spinner or an error message to the user.

### `frontend/src/components/menu/MenuCategoryTabs.tsx`
This component will render a set of clickable tabs, each representing a `MenuItemCategory`. It will receive the `activeCategory` and an `onCategoryChange` callback as props. When a tab is clicked, it should call `onCategoryChange` with the new category. The active tab should be visually distinct using Tailwind classes like `bg-[#D4AF37] text-white` for active and `bg-gray-200 text-gray-700` for inactive. The categories should be dynamically rendered based on a predefined list of categories (e.g., 'STARTERS', 'MAIN_COURSE', 'DESSERTS', 'BEVERAGES').

### `frontend/src/components/menu/MenuItemGrid.tsx`
This component will display a responsive grid of `MenuItemCard` components. It will receive a `List<MenuItem>` as a prop. Each `MenuItem` in the list will be rendered as a `MenuItemCard`. The grid should be responsive, adapting to different screen sizes (e.g., `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).

### `frontend/src/components/menu/MenuItemCard.tsx`
This component will display a single menu item. It will receive a `MenuItem` object as a prop. Each card will feature a high-quality image of the dish (`w-full h-48 object-cover rounded-t-xl`), the dish name (`text-xl font-semibold text-[#36454F]`), a brief description (`text-gray-600`), and the price formatted in Indian Rupees (`toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`). An "Add to Cart" button (using `AddToCartButton` from `order-flow`) will be prominently displayed at the bottom of the card. When the "Add to Cart" button is clicked, it should call `useCart().addItem()` with the `MenuItem`'s `id`, `name`, `unitPrice`, and `imageUrl`.

## Inter-file Wiring
- `MenuPage.tsx` imports and uses `useMenu.ts` to fetch menu data, `MenuCategoryTabs.tsx` to display category filters, and `MenuItemGrid.tsx` to display the menu items.
- `MenuCategoryTabs.tsx` receives `activeCategory` and `onCategoryChange` props from `MenuPage.tsx`.
- `MenuItemGrid.tsx` receives a list of `MenuItem` objects from `MenuPage.tsx` and renders `MenuItemCard.tsx` for each item.
- `MenuItemCard.tsx` receives a `MenuItem` object as a prop and uses the `AddToCartButton` component from the `order-flow` feature to add items to the cart.
- `menuService.ts` uses `apiClient` from `@/api/client.ts` to make API calls.
- `useMenu.ts` uses `menuService.ts` to fetch data.

## Cross-Feature Contracts
- This feature consumes the `GET /api/v1/menu` and `GET /api/v1/menu/category/{category}` endpoints from the `menu-management` backend feature.
- `MenuItemCard.tsx` calls `useCart().addItem()` from the `order-flow` feature's cart framework.


---

## Reservation Booking (Frontend)

**Name:** `reservation-booking`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/reservation.ts` — TypeScript types and interfaces for the Reservation domain, derived from the backend API contract.
- `frontend/src/services/reservationService.ts` — Provides functions for interacting with the reservation-related API endpoints, specifically createReservation(CreateReservationRequest): Promise<ReservationResponse>.
- `frontend/src/hooks/useReservations.ts` — React Query hook for creating reservation data, exposing useCreateReservation(options?): UseMutationResult.
- `frontend/src/pages/ReservationPage.tsx` — Page for customers to book a table, featuring an interactive reservation form.
- `frontend/src/components/reservations/ReservationForm.tsx` — A form for customers to select date, time, party size, and enter contact details for a reservation, using useCreateReservation for submission.
- `frontend/src/components/reservations/ReservationSuccessDialog.tsx` — A dialog to confirm that a reservation has been successfully submitted, exposing ReservationSuccessDialog({ isOpen: boolean, onClose: () => void }).

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#36454F] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-[#F5F5DC] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

This feature enables customers to book a table at Farmaaish Restaurant through an interactive frontend form. It consists of TypeScript types, a service for API interaction, a React Query hook for state management, a page to host the form, the reservation form component itself, and a success dialog. The `ReservationPage.tsx` will serve as the main entry point for customers to initiate a reservation. It will utilize the `ReservationForm.tsx` component, which handles user input for date, time, party size, and contact details. Upon successful submission, a `ReservationSuccessDialog.tsx` will confirm the booking. The `reservationService.ts` will communicate with the backend `reservation-system` feature's API endpoints, specifically `POST /api/v1/reservations` to create new reservations. The `useReservations.ts` hook will abstract the data fetching and mutation logic using React Query, providing a clean interface for components to interact with reservation data. All monetary values, if any, will be displayed in Indian Rupees (₹) using the `en-IN` locale.

### `reservation.ts`
This file defines the TypeScript interfaces for `CreateReservationRequest` and `ReservationResponse`, mirroring the backend DTOs from the `reservation-system` feature. It also defines `ReservationStatus` enum.

### `reservationService.ts`
This service provides an asynchronous function `createReservation` that takes a `CreateReservationRequest` object and sends it to the `POST /api/v1/reservations` endpoint. It returns a `Promise<ReservationResponse>` upon successful creation or throws an error.

### `useReservations.ts`
This React Query hook exports a `useCreateReservation` mutation. This mutation takes a `CreateReservationRequest` as input and calls `reservationService.createReservation`. It should handle loading states, success, and error scenarios, providing appropriate callbacks for UI updates (e.g., showing a success dialog or error message).

### `ReservationPage.tsx`
This page component renders the `Layout` from `shared-ui` and contains a prominent heading "Book Your Table at Farmaaish" followed by the `ReservationForm` component. The background should alternate between white and cream sections, and the text should use the dark charcoal color token. The hero section should feature a relevant Unsplash image for a restaurant.

### `ReservationForm.tsx`
This component is responsible for collecting reservation details. It will include input fields for `customerName`, `customerEmail`, `customerPhone`, `reservationDate`, `reservationTime`, and `partySize`. It will use the `useCreateReservation` hook to submit the form data to the backend. Upon successful submission, it will open the `ReservationSuccessDialog`. The form should include validation for all fields (e.g., required fields, valid email format, future date/time). The submit button should use the primary CTA design token.

### `ReservationSuccessDialog.tsx`
This dialog component is displayed after a successful reservation. It should confirm the reservation and thank the customer. It should include a message like "Your reservation at Farmaaish Restaurant has been successfully placed! We look forward to welcoming you." and a button to close the dialog or navigate back to the home page.

---

## Ordering and Checkout Flow (Frontend)

**Name:** `order-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/order.ts` — Generated from the backend API contract — TypeScript types and interfaces for the Order domain, mirroring the backend DTOs.
- `frontend/src/services/orderService.ts` — SERVICE layer — provides asynchronous functions to interact with the backend order-api, specifically createOrder(CreateOrderRequest): Promise<OrderResponse> and getOrderById(string): Promise<OrderResponse>.
- `frontend/src/hooks/useOrders.ts` — HOOK layer — provides React Query hooks for creating and fetching order data: useCreateOrder and useOrderById(string).
- `frontend/src/pages/CheckoutPage.tsx` — PAGE layer — orchestrates the multi-step checkout process, managing state and rendering child components for delivery address, order summary, and payment.
- `frontend/src/pages/OrderConfirmationPage.tsx` — PAGE layer — displays a summary of a completed order, fetching details using the useOrderById hook.
- `frontend/src/components/cart/CartDrawer.tsx` — COMPONENT layer — a slide-out drawer that displays and manages the contents of the shopping cart using useCart() from the cart framework.
- `frontend/src/components/cart/AddToCartButton.tsx` — COMPONENT layer — a reusable button to add a MenuItem to the cart via useCart().addItem().
- `frontend/src/components/checkout/DeliveryAddressForm.tsx` — COMPONENT layer — a form for users to input their delivery address details, validating inputs and passing them to the parent component.
- `frontend/src/components/checkout/OrderSummary.tsx` — COMPONENT layer — displays a read-only summary of cart items, totals, and delivery information, allowing users to review before payment.
- `frontend/src/components/checkout/PaymentSection.tsx` — COMPONENT layer — handles the final step of checkout, integrating with the order creation API and managing payment submission.

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

This feature implements the complete customer ordering and checkout flow for Farmaaish Restaurant, from adding items to the cart to placing an order and viewing confirmation. It leverages the pre-scaffolded headless cart framework (`@/cart`) for managing cart state and pricing, and interacts with the `order-api` backend feature to create and retrieve orders. The UI is designed to be warm, sophisticated, and inviting, reflecting the Mughlai heritage of the restaurant.

### Core Components and Flow:

1.  **Adding to Cart (`AddToCartButton.tsx`, `CartDrawer.tsx`):**
    -   `AddToCartButton.tsx` is a reusable component that will be integrated into `MenuItemCard.tsx` (from `menu-display` feature) or any other product display. When clicked, it calls `useCart().addItem()` with the `MenuItem` details (id, name, unitPrice, imageUrl). It should display a toast notification on success using `sonner`.
    -   `CartDrawer.tsx` provides a slide-out UI for viewing and managing cart contents. It uses `useCart()` to display `cartItems`, `totals.subtotal`, `totals.adjustments`, and `totals.total`. Users can adjust item quantities using `useCart().setItemQuantity()` or remove items using `useCart().removeItem()`. All monetary values must be formatted in Indian Rupees (₹) using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

2.  **Checkout Process (`CheckoutPage.tsx`, `DeliveryAddressForm.tsx`, `OrderSummary.tsx`, `PaymentSection.tsx`):**
    -   `CheckoutPage.tsx` orchestrates a multi-step checkout process. It uses `useCheckout()` from `@/cart` to manage the steps. The steps will include:
        1.  **Delivery Address:** Rendered by `DeliveryAddressForm.tsx`. This component collects `customerName`, `customerPhone`, and `deliveryAddress`. It uses `react-hook-form` and `zod` for validation. The collected data is passed up to `CheckoutPage.tsx`.
        2.  **Order Summary:** Rendered by `OrderSummary.tsx`. This component displays the `cartItems` and `totals` from `useCart()`, along with the delivery address provided in the previous step. It allows users to review their order before proceeding to payment. All monetary values must be formatted in Indian Rupees (₹).
        3.  **Payment:** Rendered by `PaymentSection.tsx`. This component is responsible for initiating the payment process. It will use the `useCreateOrder` hook to call the backend `order-api` to create an order. The `createOrder` mutation expects a `CreateOrderRequest` which includes `orderItems` (mapped from `cartItems`), `customerName`, `customerPhone`, and `deliveryAddress`. Upon successful order creation, it should clear the cart using `useCart().clearCart()` and navigate the user to the `OrderConfirmationPage.tsx` with the `orderId`.

3.  **Order Service and Hooks (`order.ts`, `orderService.ts`, `useOrders.ts`):**
    -   `order.ts` defines the TypeScript interfaces for `Order`, `OrderItem`, `CreateOrderRequest`, `OrderItemRequest`, `OrderResponse`, and `OrderItemResponse`, mirroring the backend `order-api` DTOs.
    -   `orderService.ts` provides asynchronous functions to interact with the backend `order-api` endpoints. It will have `createOrder(request: CreateOrderRequest): Promise<OrderResponse>` and `getOrderById(orderId: string): Promise<OrderResponse>`. It uses `apiClient` from `frontend/src/api/client.ts`.
    -   `useOrders.ts` provides React Query hooks for `orderService.ts`. It will include `useCreateOrder` for creating new orders and `useOrderById` for fetching a specific order by its ID.

4.  **Order Confirmation (`OrderConfirmationPage.tsx`):**
    -   `OrderConfirmationPage.tsx` displays a detailed summary of the successfully placed order. It retrieves the `orderId` from the URL parameters and uses `useOrders().useOrderById(orderId)` to fetch the order details. It should display the order ID, status, items, total amount, and delivery details. All monetary values must be formatted in Indian Rupees (₹).

### Inter-file Wiring:
-   `AddToCartButton.tsx` and `CartDrawer.tsx` directly interact with the `@/cart` framework's `useCart()` hook.
-   `CheckoutPage.tsx` uses `useCheckout()` from `@/cart` to manage steps and passes data between its child components.
-   `DeliveryAddressForm.tsx` and `OrderSummary.tsx` are presentational components that receive data and callbacks as props from `CheckoutPage.tsx`.
-   `PaymentSection.tsx` uses the `useCreateOrder` mutation from `useOrders.ts` to submit the order to the backend. It also calls `useCart().clearCart()` after a successful order.
-   `OrderConfirmationPage.tsx` uses the `useOrderById` query from `useOrders.ts` to fetch order details.
-   `useOrders.ts` depends on `orderService.ts` for actual API calls.
-   `orderService.ts` depends on `frontend/src/api/client.ts` for making HTTP requests and `frontend/src/types/order.ts` for type definitions.

### Error Handling:
-   All API calls should include appropriate error handling, typically displaying a toast notification using `sonner` for user feedback.
-   If an order creation fails, `PaymentSection.tsx` should display an error message and allow the user to retry or go back.
-   If an order cannot be found on `OrderConfirmationPage.tsx`, it should display a user-friendly error message.


---

## Blog UI (Frontend)

**Name:** `blog-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/blog.ts` — TypeScript types and interfaces for the Blog domain, mirroring the backend's BlogPostDto.
- `frontend/src/services/blogService.ts` — SERVICE layer — provides functions for interacting with the blog-related API endpoints: getAllBlogPosts(): Promise<BlogPost[]> and getBlogPostById(id: string): Promise<BlogPost>.
- `frontend/src/hooks/useBlog.ts` — HOOK layer — provides React Query hooks for fetching and managing blog data: useAllBlogPosts(): UseQueryResult<BlogPost[]> and useBlogPost(id: string): UseQueryResult<BlogPost>.
- `frontend/src/pages/BlogPage.tsx` — PAGE layer — displays a list of all blog posts in a grid format, using the useAllBlogPosts hook and BlogPostGrid component.
- `frontend/src/pages/BlogPostDetailPage.tsx` — PAGE layer — displays the full content of a single blog post, using the useBlogPost hook and BlogPostContent component.
- `frontend/src/components/blog/BlogPostGrid.tsx` — COMPONENT layer — a grid layout for displaying multiple blog post cards, consuming a List<BlogPost> and rendering BlogPostCard for each.
- `frontend/src/components/blog/BlogPostCard.tsx` — COMPONENT layer — a card component to display a summary of a single blog post, consuming a BlogPost object.
- `frontend/src/components/blog/BlogPostContent.tsx` — COMPONENT layer — renders the main content of a blog post, including title, metadata, and body, consuming a BlogPost object.

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

This feature provides the frontend UI for displaying blog posts from Farmaaish Restaurant. It consists of TypeScript types, a service for API interaction, a React Query hook for data fetching, and React components for rendering blog posts in a list and detail view.

### Data Flow and Interaction:
1.  **`blog.ts`**: Defines the `BlogPost` interface, mirroring the `BlogPostDto` from the `blog-management` backend feature. This ensures type safety across the frontend.
2.  **`blogService.ts`**: Contains asynchronous functions `getAllBlogPosts()` and `getBlogPostById(id: string)`. These functions use the shared `apiClient` to make HTTP GET requests to the `/api/v1/blog` and `/api/v1/blog/{id}` endpoints exposed by the `blog-management` backend feature. They return `Promise<BlogPost[]>` and `Promise<BlogPost>` respectively.
3.  **`useBlog.ts`**: Provides two React Query hooks:
    *   `useAllBlogPosts()`: Fetches all blog posts using `blogService.getAllBlogPosts()`. It manages loading, error, and data states for displaying a list of posts.
    *   `useBlogPost(id: string)`: Fetches a single blog post by its ID using `blogService.getBlogPostById(id)`. It also handles loading, error, and data states for the detail view.
4.  **`BlogPage.tsx`**: This page component is responsible for displaying a grid of all blog posts. It uses the `useAllBlogPosts()` hook to fetch data. While loading, it should display a loading indicator. If an error occurs, it should display an error message. Once data is successfully fetched, it renders the `BlogPostGrid` component, passing the fetched `BlogPost[]` as props.
5.  **`BlogPostGrid.tsx`**: A presentational component that receives an array of `BlogPost` objects. It maps over this array and renders a `BlogPostCard` for each blog post in a responsive grid layout. The grid should have 3 columns on large screens, 2 on medium, and 1 on small.
6.  **`BlogPostCard.tsx`**: A presentational component that receives a single `BlogPost` object. It displays a summary of the blog post, including its `imageUrl`, `title`, `author`, `publicationDate`, and a brief excerpt of its `content`. The card should be clickable, navigating to the `BlogPostDetailPage` for the specific post using `react-router-dom`'s `Link` component, with the URL path `/blog/:id`.
7.  **`BlogPostDetailPage.tsx`**: This page component displays the full content of a single blog post. It extracts the blog post `id` from the URL parameters using `react-router-dom`'s `useParams()` hook. It then uses the `useBlogPost(id)` hook to fetch the specific blog post data. Similar to `BlogPage.tsx`, it handles loading and error states. Upon successful data fetch, it renders the `BlogPostContent` component, passing the fetched `BlogPost` as props.
8.  **`BlogPostContent.tsx`**: A presentational component that receives a single `BlogPost` object. It renders the full `title`, `author`, `publicationDate`, `imageUrl`, and `content` of the blog post. The `content` should be rendered as rich text, assuming it's HTML or Markdown that can be safely injected (e.g., using `dangerouslySetInnerHTML` or a Markdown renderer library if applicable).

### Styling and Design:
All components will adhere to the design tokens defined above. The `BlogPage` will use the `Layout` component from `shared-ui`. Blog post images should be high-quality and cover the card/header area. Dates should be formatted using the `en-IN` locale.

### Error Handling:
Both `BlogPage.tsx` and `BlogPostDetailPage.tsx` should display user-friendly error messages if the blog posts fail to load or if a specific blog post is not found (e.g., a 404 message).


---

## Inquiry UI (Frontend)

**Name:** `inquiry-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/inquiry.ts` — TypeScript types and interfaces for the Catering Inquiry domain, mirroring the backend DTO.
- `frontend/src/services/inquiryService.ts` — SERVICE layer — provides `submitInquiry(request: SubmitCateringInquiryRequest): Promise<CateringInquiryDto>` for interacting with the inquiry-management backend.
- `frontend/src/hooks/useInquiries.ts` — HOOK layer — provides `useSubmitInquiry()` for submitting catering inquiries using React Query.
- `frontend/src/pages/CateringPage.tsx` — PAGE layer — displays information about Farmaaish Restaurant's catering services and embeds the `CateringInquiryForm` component.
- `frontend/src/components/catering/CateringInquiryForm.tsx` — COMPONENT layer — provides a form for customers to submit catering inquiries, using `useSubmitInquiry` hook.
- `frontend/src/components/catering/InquirySuccessMessage.tsx` — COMPONENT layer — displays a confirmation message after a successful catering inquiry submission.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8952b] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

This feature provides a frontend interface for customers to submit catering and private event inquiries to Farmaaish Restaurant. It consists of a dedicated `CateringPage.tsx` that presents information about catering services and hosts the `CateringInquiryForm.tsx`. The form collects customer details, event specifics, and a message. Upon successful submission, an `InquirySuccessMessage.tsx` is displayed.

The `inquiry.ts` file defines the TypeScript types for the inquiry data, mirroring the `CateringInquiryDto` from the `inquiry-management` backend feature. The `inquiryService.ts` handles the API communication, specifically calling the `POST /api/v1/inquiries/catering` endpoint to submit new inquiries. The `useInquiries.ts` React Query hook wraps `inquiryService.ts` to provide a convenient way for components to interact with the inquiry submission logic, handling loading and error states.

### `CateringPage.tsx`
This page serves as the entry point for catering inquiries. It will display a hero section with a relevant image and compelling text about Farmaaish's catering services, followed by detailed information about the offerings. The `CateringInquiryForm.tsx` component will be embedded within this page. The page will use the `Layout` component from `shared-ui`.

**Sections:**
1.  **Hero Section:**
    -   Background Image: `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80` with a `bg-black bg-opacity-50` overlay.
    -   Headline (`h1`): "Experience Farmaaish Catering: Royal Flavors for Your Special Occasions"
    -   Subheadline (`p`): "From intimate gatherings to grand celebrations, Farmaaish brings the authentic taste of Mughlai cuisine to your event, crafted with passion and served with elegance."
2.  **Catering Services Overview:**
    -   Heading (`h2`): "Our Catering Services"
    -   Content: Detailed description of catering options, event types (weddings, corporate, private parties), menu customization, and service philosophy. Emphasize quality ingredients and experienced chefs.
3.  **Inquiry Form Section:**
    -   Heading (`h2`): "Inquire About Your Event"
    -   Description: "Tell us about your event, and our team will get back to you to craft a memorable culinary experience."
    -   Includes the `CateringInquiryForm` component.

### `CateringInquiryForm.tsx`
This component is a form for submitting catering inquiries. It will use `react-hook-form` for form management and `zod` for validation. Upon successful submission, it will display the `InquirySuccessMessage.tsx` and reset the form. It will use the `useInquiries` hook to submit the data.

**Form Fields:**
-   `customerName`: Text input, required.
-   `customerEmail`: Email input, required, valid email format.
-   `customerPhone`: Text input, required, valid Indian phone number format.
-   `eventType`: Text input (e.g., "Wedding", "Corporate Event", "Birthday Party"), required.
-   `eventDate`: Date picker, required, must be in the future.
-   `numberOfGuests`: Number input, required, minimum 10.
-   `budget`: Number input, optional, displayed in INR.
-   `message`: Textarea, optional.

**Submission Logic:**
1.  On form submission, call `useInquiries().mutateAsync(formData)`.
2.  If successful, set a state variable to `true` to display `InquirySuccessMessage` and reset the form fields.
3.  Handle loading states by disabling the submit button and showing a spinner.
4.  Display error messages using `react-toastify` (ensure `<Toaster/>` is in `Layout.tsx` from `shared-ui`).

### `InquirySuccessMessage.tsx`
This component displays a confirmation message after a successful inquiry submission. It should be visually appealing and reassuring, reinforcing the brand's sophisticated tone.

**Content:**
-   Headline (`h3`): "Thank You for Your Inquiry!"
-   Message: "Your catering inquiry has been successfully submitted. Our team will review your request and get in touch with you shortly to discuss the exquisite details of your event. We look forward to crafting a memorable experience for you."
-   Optional: A button to "Return to Home" or "Explore Menu".

### Data Flow and Interactions
-   `CateringPage.tsx` renders `CateringInquiryForm.tsx`.
-   `CateringInquiryForm.tsx` uses the `useInquiries` hook.
-   `useInquiries` hook calls `inquiryService.submitInquiry`.
-   `inquiryService.submitInquiry` makes an API call to `POST /api/v1/inquiries/catering` (from `inquiry-management` feature) with `CateringInquiryDto`.
-   Upon successful API response, `CateringInquiryForm.tsx` displays `InquirySuccessMessage.tsx`.


---

## Testimonial UI (Frontend)

**Name:** `testimonial-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/testimonial.ts` — TypeScript types and interfaces for the Testimonial domain, mirroring the backend's TestimonialDto.
- `frontend/src/services/testimonialService.ts` — SERVICE layer — implements getAllVisibleTestimonials(): Promise<Testimonial[]>; calls the testimonial-management backend.
- `frontend/src/hooks/useTestimonials.ts` — React Query hook — implements useAllVisibleTestimonials(): UseQueryResult<Testimonial[], Error>; fetches testimonial data using testimonialService.

**Feature Instruction:**

This feature provides the frontend components and logic for displaying customer testimonials for Farmaaish Restaurant. It includes TypeScript types for testimonials, a service to interact with the backend testimonial API, and a React Query hook to manage testimonial data fetching. The `testimonial.ts` file defines the `Testimonial` interface, mirroring the `TestimonialDto` from the `testimonial-management` backend feature. The `testimonialService.ts` file contains asynchronous functions to fetch testimonials from the backend. The `useTestimonials.ts` hook leverages `react-query` to provide a convenient way for React components to fetch and cache testimonial data, specifically `getAllVisibleTestimonials` to retrieve testimonials marked as visible and ordered for display on the public-facing site.

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#B8860B] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-[#F5F5DC] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

### `frontend/src/types/testimonial.ts`
This file defines the TypeScript interface for a `Testimonial`, which directly corresponds to the `TestimonialDto` exposed by the `testimonial-management` backend feature. It includes fields such as `id`, `customerName`, `reviewText`, `rating`, `displayOrder`, `isVisible`, `createdAt`, and `updatedAt`.

### `frontend/src/services/testimonialService.ts`
This service provides functions to interact with the backend's testimonial API. It exports an asynchronous function `getAllVisibleTestimonials()` that makes a GET request to `/api/v1/testimonials` to retrieve all testimonials that are marked as visible and ordered for display. It uses the `apiClient` from `@/api/client` to perform the HTTP request and expects a `List<TestimonialDto>` as the response.

### `frontend/src/hooks/useTestimonials.ts`
This React Query hook provides a convenient way to fetch and manage testimonial data within React components. It exports `useAllVisibleTestimonials()` which uses `react-query`'s `useQuery` to call `testimonialService.getAllVisibleTestimonials()`. This hook handles loading states, error handling, and caching of testimonial data, making it easy for UI components to consume this data. The data returned by this hook will be an array of `Testimonial` objects.

---

## Gallery UI (Frontend)

**Name:** `gallery-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/gallery.ts` — Generated from the backend API contract — defines the TypeScript interface for a gallery image.
- `frontend/src/services/galleryService.ts` — SERVICE layer — provides functions for interacting with the gallery-related API endpoints, specifically getAllGalleryImages(): Promise<GalleryImage[]>
- `frontend/src/hooks/useGallery.ts` — HOOK layer — provides a React Query hook useAllGalleryImages(): UseQueryResult<GalleryImage[], Error> for fetching and managing gallery data.
- `frontend/src/pages/GalleryPage.tsx` — PAGE layer — displays a gallery of high-quality photos of the restaurant's ambiance and events, using the useAllGalleryImages hook and ImageGrid component.
- `frontend/src/components/gallery/ImageGrid.tsx` — COMPONENT layer — a responsive grid component for displaying gallery images, accepting an array of GalleryImage as props.

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

This feature provides a frontend gallery for Farmaaish Restaurant, showcasing high-quality images of its ambiance, dishes, and events. It consists of TypeScript types, a service for API interaction, a React Query hook for data fetching, a page to display the gallery, and a responsive image grid component.

1.  **`gallery.ts`**: Defines the `GalleryImage` interface, which mirrors the `GalleryImageDto` from the `gallery-management` backend feature. This ensures type safety across the frontend.

2.  **`galleryService.ts`**: This service acts as an intermediary between the React components and the backend API. It exports an asynchronous function `getAllGalleryImages()` that makes a GET request to the `/api/v1/gallery` endpoint provided by the `gallery-management` feature. It uses the `apiClient` from `@/api/client` for making HTTP requests and returns a `Promise<GalleryImage[]>`. Error handling should log the error and re-throw it.

3.  **`useGallery.ts`**: This React Query hook (`useAllGalleryImages()`) leverages the `galleryService.ts` to fetch gallery images. It uses `react-query`'s `useQuery` to manage the fetching, caching, and re-fetching of gallery data. The hook should return the query result, including `data` (list of `GalleryImage`), `isLoading`, and `isError` states. It should call `galleryService.getAllGalleryImages` as its query function.

4.  **`GalleryPage.tsx`**: This page component is responsible for rendering the main gallery view. It will use the `Layout` component from `shared-ui` for consistent navigation and footer. The page will fetch gallery images using the `useAllGalleryImages` hook. It should display a prominent heading like "Our Culinary Journey" or "A Glimpse into Farmaaish" in `text-4xl md:text-6xl font-bold text-[#36454F]` and a sub-heading in `text-xl text-gray-600`. If data is loading, it should show a loading indicator. If there's an error, it should display an error message. Once data is successfully fetched, it will pass the `GalleryImage[]` data to the `ImageGrid` component for display. The page should incorporate a hero section with a relevant Unsplash image (e.g., a restaurant interior or food spread) and an overlay.

5.  **`ImageGrid.tsx`**: This component receives an array of `GalleryImage` objects as props and renders them in a responsive grid layout. Each image should be displayed within a card-like structure, showing the `imageUrl` and `caption`. The grid should be responsive, adapting to different screen sizes, and images should be styled to maintain aspect ratio and provide a visually appealing presentation. Use `object-cover` for images and ensure a consistent height for each image within the grid. The caption should be displayed clearly, perhaps on hover or below the image. The component should use the `Card` design token for individual image containers.

**Inter-file Wiring:**
- `GalleryPage.tsx` imports and uses the `useAllGalleryImages` hook from `useGallery.ts`.
- `GalleryPage.tsx` imports and uses the `ImageGrid` component from `ImageGrid.tsx`.
- `useGallery.ts` imports and calls `galleryService.getAllGalleryImages()` from `galleryService.ts`.
- `galleryService.ts` uses `apiClient` to make HTTP requests to the `/api/v1/gallery` endpoint of the `gallery-management` backend feature.
- `galleryService.ts` and `useGallery.ts` import types from `gallery.ts`.
- `ImageGrid.tsx` imports types from `gallery.ts`.
- `GalleryPage.tsx` wraps its content in `<Layout>` from `shared-ui`.


---

## Static Pages (Frontend)

**Name:** `static-pages`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/AboutPage.tsx` — PAGE layer — displays static information about the restaurant's heritage and culinary philosophy; consumes the `Layout` component from `shared-ui`.
- `frontend/src/pages/ContactPage.tsx` — PAGE layer — displays contact information, a contact form, and an embedded map; consumes the `Layout` component from `shared-ui` and the `MapEmbed` component from this feature.
- `frontend/src/components/contact/MapEmbed.tsx` — COMPONENT layer — renders an interactive Google Map embedded in an iframe; consumed by `ContactPage.tsx`.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#800020] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-[#F5F5DC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#36454F] leading-relaxed

This feature provides static informational pages for Farmaaish Restaurant: an About Us page and a Contact Us page, along with a reusable map embed component. All pages will be wrapped in the `Layout` component from the `shared-ui` feature to ensure consistent navigation and footer.

### AboutPage.tsx
This page will present the story of Farmaaish Restaurant, its rich Mughlai heritage, and its culinary philosophy. It will be structured into several sections, each with a heading and descriptive text, using the defined design tokens for styling. The content should evoke a warm, sophisticated, and inviting tone, emphasizing authenticity and passion for culinary excellence.

**Sections:**
1.  **Hero Section:** A full-width hero image (Unsplash URL for restaurant) with an overlay, featuring a prominent headline "Experience the Legacy of Farmaaish Restaurant" and a subheadline "Where Every Dish Tells a Story of Mughlai Grandeur."
2.  **Our Story:** A section detailing the restaurant's origins, history, and commitment to traditional Mughlai cuisine. Use a two-column layout with text on one side and an image on the other.
3.  **Culinary Philosophy:** Describe the restaurant's approach to food, ingredients, and the art of Mughlai cooking. This section can highlight key values like authenticity, quality, and innovation within tradition.
4.  **The Ambiance:** A section showcasing the restaurant's interior design and atmosphere, inviting guests to dine in a regal setting. Include high-fidelity images.

### ContactPage.tsx
This page will provide all necessary contact information for Farmaaish Restaurant, including its address, phone number, opening hours, a contact form for general inquiries, and an embedded Google Map. The page will be structured to be easily navigable and user-friendly.

**Sections:**
1.  **Hero Section:** A full-width hero image (Unsplash URL for restaurant) with an overlay, featuring a prominent headline "Connect With Farmaaish Restaurant" and a subheadline "Your Gateway to Exquisite Mughlai Dining."
2.  **Contact Details:** Display the restaurant's address, phone number, and opening hours clearly. Use the exact business context details provided.
    - Address: Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069
    - Phone: 020 2729 1111
    - Opening hours: Not provided, use placeholder "Daily: 12:00 PM - 3:00 PM, 7:00 PM - 11:00 PM"
3.  **Send Us a Message (Contact Form):** A simple contact form with fields for `name`, `email`, `subject`, and `message`. This form will be a client-side component and will not submit to a backend endpoint in this feature. The form should include a primary CTA button "Send Message" styled with the design tokens.
4.  **Our Location (MapEmbed):** This section will integrate the `MapEmbed` component to display an interactive Google Map centered on the restaurant's coordinates. The map should be clearly labeled with the restaurant's name.

### MapEmbed.tsx
This component will render an embedded Google Map. It will accept `latitude`, `longitude`, and `restaurantName` as props. It will use an `iframe` to embed the Google Maps URL, ensuring the map is interactive and centered on the provided coordinates with a marker for the restaurant. The `restaurantName` will be used in the map's title for accessibility and context. The component should have a responsive design to fit various screen sizes.

**Interaction with other features:**
- Both `AboutPage.tsx` and `ContactPage.tsx` will import and use the `Layout` component from the `shared-ui` feature to provide a consistent header and footer.
- `ContactPage.tsx` will import and use the `MapEmbed` component from within this feature.
- No backend API calls are made by any files in this feature.

---

## Customer Portal (Frontend)

**Name:** `customer-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/ProfilePage.tsx` — PAGE layer — displays the logged-in customer's personal details and integrates the OrderHistory component to show past orders.
- `frontend/src/components/profile/OrderHistory.tsx` — COMPONENT layer — fetches and displays a list of the logged-in customer's past orders using the `useOrders` hook.

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

This feature provides the customer-facing profile page and its associated components for Farmaaish Restaurant. The `ProfilePage.tsx` will display the logged-in customer's personal details and a list of their past orders. It will use the `useAuth` hook from the `auth-ui` feature to retrieve the authenticated user's information and ensure the user is logged in. The `OrderHistory.tsx` component, nested within `ProfilePage.tsx`, will be responsible for fetching and rendering the customer's order history. It will utilize the `useOrders` hook from the `order-flow` feature to retrieve the orders associated with the logged-in customer. All monetary values will be displayed in Indian Rupees (₹) using the `en-IN` locale.

### `ProfilePage.tsx`
This page will be wrapped in the `Layout` component from `shared-ui`. It will display a prominent heading "My Profile" and two main sections: "Personal Details" and "Order History".

1.  **Personal Details Section:**
    *   Display the customer's email (from `useAuth().user.email`).
    *   Add a placeholder for customer name, which can be updated in a future iteration.
    *   Add a placeholder for customer phone, which can be updated in a future iteration.
    *   Add a placeholder for delivery address, which can be updated in a future iteration.
    *   Include a "Logout" button that calls `useAuth().logout()`.

2.  **Order History Section:**
    *   Render the `OrderHistory` component, passing the customer's ID (from `useAuth().user.id`) as a prop if needed, though `OrderHistory` will internally use the authenticated user's context.

### `OrderHistory.tsx`
This component will display a list of the customer's past orders in a visually appealing, card-based layout.

1.  **Data Fetching:**
    *   Use the `useOrders` hook from `order-flow` to fetch the customer's orders. The `useOrders` hook should internally call the `/api/v1/orders` endpoint from the `order-api` feature, which returns `List<OrderResponse>` for the authenticated user.
    *   Handle loading states by displaying a loading spinner or message.
    *   Handle error states by displaying an error message.

2.  **Order Display:**
    *   If no orders are found, display a message like "You haven't placed any orders yet. Explore our exquisite menu!".
    *   For each `OrderResponse` in the fetched list, render an individual order card.
    *   Each order card should display:
        *   Order ID: `order.id`
        *   Order Date: `order.createdAt` (formatted as `DD/MM/YYYY`)
        *   Total Amount: `order.totalAmount` (formatted in `en-IN` locale as currency `INR`)
        *   Status: `order.status`
        *   A list of `order.orderItems`, showing `orderItem.name` and `orderItem.quantity`.
    *   The order cards should be styled according to the design tokens for cards, using a clean and elegant presentation.

---

## Admin Portal (Frontend)

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/admin/AdminDashboardPage.tsx` — Admin panel landing page — displays a welcome message and navigation links to other administrative sections, wrapped in `AdminLayout`.
- `frontend/src/pages/admin/AdminMenuPage.tsx` — Admin page for managing menu items — fetches all menu items, renders `MenuTable`, and provides functionality for creating, editing, and deleting items via `MenuItemForm` and `DeleteMenuItemDialog`.
- `frontend/src/components/admin/menu/MenuTable.tsx` — Component for displaying a data table of menu items — receives `menuItems`, `onEdit`, and `onDelete` props.
- `frontend/src/components/admin/menu/MenuItemForm.tsx` — Component for a form to create or edit menu items — receives `initialData` and `onSubmit` props.
- `frontend/src/components/admin/menu/DeleteMenuItemDialog.tsx` — Component for a confirmation dialog to delete a menu item — receives `menuItemId` and `onClose` props.
- `frontend/src/pages/admin/AdminReservationsPage.tsx` — Admin page for managing reservations — fetches all reservations, renders `ReservationsTable`, and provides functionality to view details and update status via `ReservationDetailModal`.
- `frontend/src/components/admin/reservations/ReservationsTable.tsx` — Component for displaying a data table of reservations — receives `reservations` and `onViewDetails` props.
- `frontend/src/components/admin/reservations/ReservationDetailModal.tsx` — Component for a modal dialog to view reservation details and update status — receives `reservation` and `onClose` props.
- `frontend/src/pages/admin/AdminOrdersPage.tsx` — Admin page for managing orders — fetches all orders, renders `OrdersTable`, and provides functionality to view details and update status via `OrderDetailView`.
- `frontend/src/components/admin/orders/OrdersTable.tsx` — Component for displaying a data table of orders — receives `orders` and `onViewDetails` props.
- `frontend/src/components/admin/orders/OrderDetailView.tsx` — Component for displaying detailed order information and updating status — receives `order` and `onClose` props.
- `frontend/src/pages/admin/AdminBlogPage.tsx` — Admin page for managing blog posts — fetches all blog posts, renders `BlogPostsTable`, and provides functionality for creating, editing, and deleting posts via `BlogPostForm` and `DeleteBlogPostDialog`.
- `frontend/src/components/admin/blog/BlogPostsTable.tsx` — Component for displaying a data table of blog posts — receives `blogPosts`, `onEdit`, and `onDelete` props.
- `frontend/src/components/admin/blog/BlogPostForm.tsx` — Component for a form to create or edit blog posts — receives `initialData` and `onSubmit` props.
- `frontend/src/components/admin/blog/DeleteBlogPostDialog.tsx` — Component for a confirmation dialog to delete a blog post — receives `blogPostId` and `onClose` props.
- `frontend/src/pages/admin/AdminCateringInquiriesPage.tsx` — Admin page for managing catering inquiries — fetches all inquiries, renders `InquiriesTable`, and provides functionality to view details and update status via `InquiryDetailModal`.
- `frontend/src/components/admin/inquiries/InquiriesTable.tsx` — Component for displaying a data table of inquiries — receives `inquiries` and `onViewDetails` props.
- `frontend/src/components/admin/inquiries/InquiryDetailModal.tsx` — Component for a modal dialog to view inquiry details and update status — receives `inquiry` and `onClose` props.
- `frontend/src/pages/admin/AdminTestimonialsPage.tsx` — Admin page for managing testimonials — fetches all testimonials, renders `TestimonialsTable`, and provides functionality for creating, editing, and deleting testimonials via `TestimonialForm` and `DeleteTestimonialDialog`.
- `frontend/src/components/admin/testimonials/TestimonialsTable.tsx` — Component for displaying a data table of testimonials — receives `testimonials`, `onEdit`, and `onDelete` props.
- `frontend/src/components/admin/testimonials/TestimonialForm.tsx` — Component for a form to create or edit testimonials — receives `initialData` and `onSubmit` props.
- `frontend/src/components/admin/testimonials/DeleteTestimonialDialog.tsx` — Component for a confirmation dialog to delete a testimonial — receives `testimonialId` and `onClose` props.
- `frontend/src/pages/admin/AdminGalleryPage.tsx` — Admin page for managing gallery images — fetches all gallery images, renders `GalleryImageTable`, and provides functionality for creating, editing, and deleting images via `GalleryImageForm` and `DeleteGalleryImageDialog`.
- `frontend/src/components/admin/gallery/GalleryImageTable.tsx` — Component for displaying a data table of gallery images — receives `galleryImages`, `onEdit`, and `onDelete` props.
- `frontend/src/components/admin/gallery/GalleryImageForm.tsx` — Component for a form to upload new gallery images and edit details — receives `initialData` and `onSubmit` props.

**Feature Instruction:**

The Admin Portal feature provides a comprehensive web interface for restaurant staff to manage various aspects of Farmaaish Restaurant's operations, including menu items, reservations, orders, blog posts, catering inquiries, testimonials, and gallery images. This feature is built using React and TypeScript, leveraging React Query hooks for data fetching and mutations, and Tailwind CSS for styling based on the provided design tokens. All pages within this feature are protected by the `AdminLayout` from the `shared-ui` feature, ensuring that only authenticated administrators can access them. Authentication is handled by the `auth-ui` feature, specifically `useAuth` for checking `isAuthenticated` and `user.role`.

## Design Tokens
- Primary background: bg-[#800020]
- Accent color: text-[#D4AF37]
- Text color: text-[#36454F]
- Background color: bg-[#F5F5DC]
- Button Primary: bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200
- Button Secondary: bg-[#36454F] hover:bg-[#2a353c] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200
- Card: bg-white rounded-lg shadow-sm border border-gray-100 p-4
- Input field: border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]
- Table header: bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider
- Section container: <section className="py-8 px-4"><div className="max-w-7xl mx-auto">

### AdminDashboardPage.tsx
This page serves as the entry point for the admin panel, displaying a welcome message and navigation links to other administrative sections. It uses the `AdminLayout` for consistent navigation and styling.

### AdminMenuPage.tsx
This page allows administrators to manage menu items. It fetches all menu items using `useMenu.useAllMenuItems()` from the `menu-display` feature. It renders a `MenuTable` to display the items and provides functionality to create, edit, and delete menu items using `MenuItemForm` and `DeleteMenuItemDialog`. The `MenuItemForm` utilizes `useMenu.useCreateMenuItem()` and `useMenu.useUpdateMenuItem()` for mutations, while `DeleteMenuItemDialog` uses `useMenu.useDeleteMenuItem()`.

### MenuTable.tsx
This component displays a paginated and sortable table of `MenuItemDto` objects. Each row includes actions for editing and deleting a menu item. It receives `menuItems`, `onEdit`, and `onDelete` as props. It uses the `MenuItemDto` data shape from the `menu-management` feature.

### MenuItemForm.tsx
This component provides a form for creating or updating a `MenuItemDto`. It takes an optional `initialData` prop for editing existing items and an `onSubmit` prop for handling form submission. It uses `useMenu.useCreateMenuItem()` and `useMenu.useUpdateMenuItem()` from `menu-display` to interact with the backend. The form includes fields for `name`, `description`, `price` (formatted as Indian Rupees), `imageUrl`, and `category`.

### DeleteMenuItemDialog.tsx
This component is a confirmation dialog for deleting a menu item. It receives the `menuItemId` and `onClose` as props. It uses `useMenu.useDeleteMenuItem()` from `menu-display` to perform the deletion.

### AdminReservationsPage.tsx
This page allows administrators to view and manage customer reservations. It fetches all reservations using `useReservations.useAllReservations()` from the `reservation-booking` feature. It renders a `ReservationsTable` to display the reservations and provides functionality to view details and update reservation status using `ReservationDetailModal`.

### ReservationsTable.tsx
This component displays a paginated and sortable table of `ReservationResponse` objects. Each row includes an action to view reservation details. It receives `reservations` and `onViewDetails` as props. It uses the `ReservationResponse` data shape from the `reservation-system` feature.

### ReservationDetailModal.tsx
This component is a modal dialog for viewing the details of a `ReservationResponse` and updating its status. It receives `reservation` and `onClose` as props. It uses `useReservations.useUpdateReservationStatus()` from `reservation-booking` to update the reservation status.

### AdminOrdersPage.tsx
This page allows administrators to view and manage customer food orders. It fetches all orders using `useOrders.useAllOrders()` from the `order-flow` feature. It renders an `OrdersTable` to display the orders and provides functionality to view order details and update order status using `OrderDetailView`.

### OrdersTable.tsx
This component displays a paginated and sortable table of `OrderResponse` objects. Each row includes an action to view order details. It receives `orders` and `onViewDetails` as props. It uses the `OrderResponse` data shape from the `order-api` feature.

### OrderDetailView.tsx
This component is a modal dialog for viewing the detailed information of an `OrderResponse` and updating its status. It receives `order` and `onClose` as props. It uses `useOrders.useUpdateOrderStatus()` from `order-flow` to update the order status. Monetary values are formatted as Indian Rupees.

### AdminBlogPage.tsx
This page allows administrators to create, edit, and delete blog posts. It fetches all blog posts using `useBlog.useAllBlogPosts()` from the `blog-ui` feature. It renders a `BlogPostsTable` to display the posts and provides functionality to create, edit, and delete blog posts using `BlogPostForm` and `DeleteBlogPostDialog`. The `BlogPostForm` utilizes `useBlog.useCreateBlogPost()` and `useBlog.useUpdateBlogPost()` for mutations, while `DeleteBlogPostDialog` uses `useBlog.useDeleteBlogPost()`.

### BlogPostsTable.tsx
This component displays a paginated and sortable table of `BlogPostDto` objects. Each row includes actions for editing and deleting a blog post. It receives `blogPosts`, `onEdit`, and `onDelete` as props. It uses the `BlogPostDto` data shape from the `blog-management` feature.

### BlogPostForm.tsx
This component provides a form for creating or updating a `BlogPostDto`. It takes an optional `initialData` prop for editing existing posts and an `onSubmit` prop for handling form submission. It uses `useBlog.useCreateBlogPost()` and `useBlog.useUpdateBlogPost()` from `blog-ui` to interact with the backend. The form includes fields for `title`, `content` (with a rich text editor), `author`, `publicationDate`, and `imageUrl`.

### DeleteBlogPostDialog.tsx
This component is a confirmation dialog for deleting a blog post. It receives the `blogPostId` and `onClose` as props. It uses `useBlog.useDeleteBlogPost()` from `blog-ui` to perform the deletion.

### AdminCateringInquiriesPage.tsx
This page allows administrators to view and manage catering and event inquiries. It fetches all inquiries using `useInquiries.useAllInquiries()` from the `inquiry-ui` feature. It renders an `InquiriesTable` to display the inquiries and provides functionality to view details and update inquiry status using `InquiryDetailModal`.

### InquiriesTable.tsx
This component displays a paginated and sortable table of `CateringInquiryDto` objects. Each row includes an action to view inquiry details. It receives `inquiries` and `onViewDetails` as props. It uses the `CateringInquiryDto` data shape from the `inquiry-management` feature.

### InquiryDetailModal.tsx
This component is a modal dialog for viewing the detailed information of a `CateringInquiryDto` and updating its status. It receives `inquiry` and `onClose` as props. It uses `useInquiries.useUpdateInquiryStatus()` from `inquiry-ui` to update the inquiry status. Monetary values are formatted as Indian Rupees.

### AdminTestimonialsPage.tsx
This page allows administrators to curate and manage customer testimonials. It fetches all testimonials using `useTestimonials.useAllTestimonials()` from the `testimonial-ui` feature. It renders a `TestimonialsTable` to display the testimonials and provides functionality to create, edit, and delete testimonials using `TestimonialForm` and `DeleteTestimonialDialog`. The `TestimonialForm` utilizes `useTestimonials.useCreateTestimonial()` and `useTestimonials.useUpdateTestimonial()` for mutations, while `DeleteTestimonialDialog` uses `useTestimonials.useDeleteTestimonial()`.

### TestimonialsTable.tsx
This component displays a paginated and sortable table of `TestimonialDto` objects. Each row includes actions for editing and deleting a testimonial. It receives `testimonials`, `onEdit`, and `onDelete` as props. It uses the `TestimonialDto` data shape from the `testimonial-management` feature.

### TestimonialForm.tsx
This component provides a form for creating or updating a `TestimonialDto`. It takes an optional `initialData` prop for editing existing testimonials and an `onSubmit` prop for handling form submission. It uses `useTestimonials.useCreateTestimonial()` and `useTestimonials.useUpdateTestimonial()` from `testimonial-ui` to interact with the backend. The form includes fields for `customerName`, `reviewText`, `rating`, `displayOrder`, and `isVisible`.

### DeleteTestimonialDialog.tsx
This component is a confirmation dialog for deleting a testimonial. It receives the `testimonialId` and `onClose` as props. It uses `useTestimonials.useDeleteTestimonial()` from `testimonial-ui` to perform the deletion.

### AdminGalleryPage.tsx
This page allows administrators to upload and manage gallery images. It fetches all gallery images using `useGallery.useAllGalleryImages()` from the `gallery-ui` feature. It renders a `GalleryImageTable` to display the images and provides functionality to create, edit, and delete images using `GalleryImageForm` and `DeleteGalleryImageDialog`. The `GalleryImageForm` utilizes `useGallery.useCreateGalleryImage()` and `useGallery.useUpdateGalleryImage()` for mutations, while `DeleteGalleryImageDialog` uses `useGallery.useDeleteGalleryImage()`.

### GalleryImageTable.tsx
This component displays a paginated and sortable table of `GalleryImageDto` objects. Each row includes actions for editing and deleting a gallery image. It receives `galleryImages`, `onEdit`, and `onDelete` as props. It uses the `GalleryImageDto` data shape from the `gallery-management` feature.

### GalleryImageForm.tsx
This component provides a form for uploading new gallery images and editing their details. It takes an optional `initialData` prop for editing existing images and an `onSubmit` prop for handling form submission. It uses `useGallery.useCreateGalleryImage()` and `useGallery.useUpdateGalleryImage()` from `gallery-ui` to interact with the backend. The form includes fields for `imageUrl` (with an upload mechanism), `caption`, and `displayOrder`.

All monetary values displayed in tables and forms (e.g., menu item prices, order totals, inquiry budgets) must be formatted using the Indian Rupee symbol (₹) and the `en-IN` locale, e.g., `amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

