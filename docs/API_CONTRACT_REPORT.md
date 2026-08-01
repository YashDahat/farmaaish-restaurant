# API Contract Report

Effective client baseURL: `(empty)`

## Mismatches (0)
_None — every resolvable frontend call maps to a backend route._

## Backend routes (40)
- DELETE /api/v1/admin/blog/posts/*
- DELETE /api/v1/admin/gallery/*
- DELETE /api/v1/admin/menu/categories/*
- DELETE /api/v1/admin/menu/items/*
- GET /api/admin/orders
- GET /api/admin/orders/*
- GET /api/admin/reservations
- GET /api/admin/reservations/*
- GET /api/admin/reservations/status/*
- GET /api/orders/*
- GET /api/v1/admin/inquiries
- GET /api/v1/admin/inquiries/*
- GET /api/v1/blog/posts
- GET /api/v1/blog/posts/*
- GET /api/v1/gallery
- GET /api/v1/gallery/*
- GET /api/v1/gallery/category/*
- GET /api/v1/menu/categories
- GET /api/v1/menu/categories/*
- GET /api/v1/menu/items
- GET /api/v1/menu/items/*
- GET /api/v1/menu/items/category/*
- POST /api/orders
- POST /api/reservations
- POST /api/v1/admin/blog/posts
- POST /api/v1/admin/gallery
- POST /api/v1/admin/menu/categories
- POST /api/v1/admin/menu/items
- POST /api/v1/auth/login
- POST /api/v1/inquiries
- POST /api/v1/payments/create-order
- POST /api/v1/payments/verify
- POST /api/v1/payments/webhook
- PUT /api/admin/orders/*/status
- PUT /api/admin/reservations/*/status
- PUT /api/v1/admin/blog/posts/*
- PUT /api/v1/admin/gallery/*
- PUT /api/v1/admin/inquiries/*/status
- PUT /api/v1/admin/menu/categories/*
- PUT /api/v1/admin/menu/items/*

## Frontend calls (40)
- POST /api/v1/payments/verify
- POST /api/v1/payments/webhook
- POST /api/v1/auth/login
- GET /api/v1/menu/items
- GET /api/v1/menu/items/${id}
- GET /api/v1/menu/items/category/${categoryId}
- GET /api/v1/menu/categories
- GET /api/v1/menu/categories/${id}
- POST /api/v1/admin/menu/items
- PUT /api/v1/admin/menu/items/${id}
- DELETE /api/v1/admin/menu/items/${id}
- POST /api/v1/admin/menu/categories
- PUT /api/v1/admin/menu/categories/${id}
- DELETE /api/v1/admin/menu/categories/${id}
- GET /api/v1/gallery
- GET /api/v1/gallery/category/${category}
- GET /api/v1/gallery/${id}
- POST /api/v1/admin/gallery
- PUT /api/v1/admin/gallery/${id}
- DELETE /api/v1/admin/gallery/${id}
- POST /api/v1/payments/create-order
- POST /api/orders
- GET /api/orders/${orderId}
- GET /api/admin/orders
- GET /api/admin/orders/${orderId}
- PUT /api/admin/orders/${orderId}/status
- GET /api/v1/blog/posts
- GET /api/v1/blog/posts/${id}
- POST /api/v1/admin/blog/posts
- PUT /api/v1/admin/blog/posts/${id}
- DELETE /api/v1/admin/blog/posts/${id}
- POST /api/v1/inquiries
- GET /api/v1/admin/inquiries
- GET /api/v1/admin/inquiries/${id}
- PUT /api/v1/admin/inquiries/${id}/status
- POST /api/reservations
- GET /api/admin/reservations
- GET /api/admin/reservations/${id}
- GET /api/admin/reservations/status/${status}
- PUT /api/admin/reservations/${id}/status
