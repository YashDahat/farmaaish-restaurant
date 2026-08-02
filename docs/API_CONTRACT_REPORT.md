# API Contract Report

Effective client baseURL: `(empty)`

## Mismatches (0)
_None — every resolvable frontend call maps to a backend route._

## Backend routes (42)
- DELETE /api/admin/events/*
- DELETE /api/admin/menu/categories/*
- DELETE /api/admin/menu/items/*
- DELETE /api/v1/admin/inquiries/*
- DELETE /api/v1/admin/reservations/*
- GET /api/admin/events
- GET /api/admin/events/*
- GET /api/admin/orders
- GET /api/admin/orders/*
- GET /api/events/*
- GET /api/events/active
- GET /api/events/type/*
- GET /api/menu/categories
- GET /api/menu/categories/*
- GET /api/menu/items
- GET /api/menu/items/*
- GET /api/menu/items/category/*
- GET /api/orders/*
- GET /api/orders/customer/*
- GET /api/v1/admin/inquiries
- GET /api/v1/admin/inquiries/*
- GET /api/v1/admin/reservations
- GET /api/v1/admin/reservations/*
- GET /api/v1/customers/profile
- GET /api/v1/customers/profile/orders
- POST /api/admin/events
- POST /api/admin/menu/categories
- POST /api/admin/menu/items
- POST /api/orders
- POST /api/v1/auth/login
- POST /api/v1/inquiries
- POST /api/v1/payments/create-order
- POST /api/v1/payments/verify
- POST /api/v1/payments/webhook
- POST /api/v1/reservations
- PUT /api/admin/events/*
- PUT /api/admin/menu/categories/*
- PUT /api/admin/menu/items/*
- PUT /api/admin/orders/*/status
- PUT /api/v1/admin/inquiries/*/status
- PUT /api/v1/admin/reservations/*
- PUT /api/v1/customers/profile

## Frontend calls (38)
- DELETE /api/admin/events/${id}
- DELETE /api/admin/menu/items/${id}
- DELETE /api/admin/menu/categories/${id}
- GET /api/events/active
- GET /api/events/type/${eventType}
- GET /api/events/${id}
- POST /api/admin/events
- GET /api/admin/events
- GET /api/admin/events/${id}
- PUT /api/admin/events/${id}
- GET /api/menu/items
- GET /api/menu/items/${id}
- GET /api/menu/items/category/${categoryId}
- GET /api/menu/categories
- GET /api/menu/categories/${id}
- POST /api/admin/menu/items
- PUT /api/admin/menu/items/${id}
- POST /api/admin/menu/categories
- PUT /api/admin/menu/categories/${id}
- GET /api/v1/customers/profile
- PUT /api/v1/customers/profile
- POST /api/orders
- GET /api/orders/${orderId}
- GET /api/orders/customer/${customerId}
- GET /api/v1/customers/profile/orders
- GET /api/admin/orders
- GET /api/admin/orders/${orderId}
- PUT /api/admin/orders/${orderId}/status
- POST /api/v1/inquiries
- GET /api/v1/admin/inquiries
- GET /api/v1/admin/inquiries/${id}
- PUT /api/v1/admin/inquiries/${id}/status
- DELETE /api/v1/admin/inquiries/${id}
- POST /api/v1/reservations
- GET /api/v1/admin/reservations
- GET /api/v1/admin/reservations/${id}
- PUT /api/v1/admin/reservations/${id}
- DELETE /api/v1/admin/reservations/${id}
