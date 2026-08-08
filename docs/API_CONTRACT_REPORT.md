# API Contract Report

Effective client baseURL: `(empty)`

## Mismatches (0)
_None — every resolvable frontend call maps to a backend route._

## Backend routes (32)
- DELETE /api/admin/gallery/*
- DELETE /api/v1/admin/menu/categories/*
- DELETE /api/v1/admin/menu/items/*
- DELETE /api/v1/admin/reservations/*
- GET /api/admin/inquiries
- GET /api/admin/inquiries/*
- GET /api/gallery
- GET /api/v1/admin/orders
- GET /api/v1/admin/orders/*
- GET /api/v1/admin/reservations
- GET /api/v1/admin/reservations/*
- GET /api/v1/menu/categories
- GET /api/v1/menu/categories/*/items
- GET /api/v1/menu/items
- GET /api/v1/menu/items/*
- GET /api/v1/orders/*
- GET /api/v1/orders/my-orders
- POST /api/admin/gallery
- POST /api/public/inquiries
- POST /api/v1/admin/menu/categories
- POST /api/v1/admin/menu/items
- POST /api/v1/auth/login
- POST /api/v1/orders
- POST /api/v1/payments/create-order
- POST /api/v1/payments/verify
- POST /api/v1/payments/webhook
- POST /api/v1/reservations
- PUT /api/admin/inquiries/*/status
- PUT /api/v1/admin/menu/categories/*
- PUT /api/v1/admin/menu/items/*
- PUT /api/v1/admin/orders/*/status
- PUT /api/v1/admin/reservations/*/status

## Frontend calls (28)
- DELETE /api/admin/gallery/${id}
- GET /api/v1/menu/items
- GET /api/v1/menu/items/${id}
- GET /api/v1/menu/categories/${categoryId}/items
- GET /api/v1/menu/categories
- POST /api/v1/admin/menu/items
- PUT /api/v1/admin/menu/items/${id}
- DELETE /api/v1/admin/menu/items/${id}
- POST /api/v1/admin/menu/categories
- PUT /api/v1/admin/menu/categories/${id}
- DELETE /api/v1/admin/menu/categories/${id}
- GET /api/gallery
- POST /api/admin/gallery
- POST /api/v1/orders
- GET /api/v1/orders/my-orders
- GET /api/v1/orders/${orderId}
- GET /api/v1/admin/orders
- GET /api/v1/admin/orders/${orderId}
- PUT /api/v1/admin/orders/${orderId}/status
- POST /api/public/inquiries
- GET /api/admin/inquiries
- GET /api/admin/inquiries/${inquiryId}
- PUT /api/admin/inquiries/${inquiryId}/status
- POST /api/v1/reservations
- GET /api/v1/admin/reservations
- GET /api/v1/admin/reservations/${id}
- PUT /api/v1/admin/reservations/${id}/status
- DELETE /api/v1/admin/reservations/${id}
