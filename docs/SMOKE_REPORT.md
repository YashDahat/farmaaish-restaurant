# Smoke Flow Report

Probed live at `http://smoke-7fc94b76:8080` — 31 of 57 journeys working.

These are runtime journeys, not compilation. Everything below compiled cleanly.

## Broken (26)

- **admin GET /api/v1/admin/reservations/by-date** — 500 server error
- **place order POST /api/v1/orders** — 500 server error — the write/persist path is broken: {"timestamp":"2026-08-09T03:51:20.379522844","status":500,"error":"Internal Server Error","message":"Invalid UUID string: 1","path":"/api/v1/orders"}
- **unauth POST /api/v1/orders** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth GET /api/v1/orders/{orderId}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth GET /api/v1/orders/user/{userId}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth GET /api/admin/reviews** — 200 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth GET /api/admin/reviews/{id}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth POST /api/admin/reviews** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth PUT /api/admin/reviews/{id}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth DELETE /api/admin/reviews/{id}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth POST /api/admin/reviews/sync** — 200 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth GET /api/admin/menu/categories** — 200 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth GET /api/admin/menu/categories/{categoryId}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth POST /api/admin/menu/categories** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth PUT /api/admin/menu/categories/{categoryId}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth DELETE /api/admin/menu/categories/{categoryId}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth GET /api/admin/menu/items** — 200 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth GET /api/admin/menu/items/{itemId}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth POST /api/admin/menu/items** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth PUT /api/admin/menu/items/{itemId}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth DELETE /api/admin/menu/items/{itemId}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth POST /api/admin/special-offers** — 400 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth GET /api/admin/special-offers** — 200 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth GET /api/admin/special-offers/{id}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth PUT /api/admin/special-offers/{id}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves
- **unauth DELETE /api/admin/special-offers/{id}** — 500 — reachable WITHOUT authentication; the security matcher does not cover the path this controller actually serves

## Working (31)

- public GET /api/v1/menu/categories — 200
- public GET /api/v1/menu/items — 200
- public GET /api/v1/blog/posts — 200
- public GET /api/v1/gallery — 200
- public GET /api/v1/reviews/featured — 200
- public GET /api/v1/offers — 200
- admin login — 200 as owner@yourbusiness.com (seeded by application.properties)
- admin GET /api/v1/admin/reservations — 200
- admin GET /api/v1/admin/orders — 200
- admin GET /api/v1/admin/inquiries/catering — 200
- admin GET /api/v1/admin/blog/posts — 200
- admin GET /api/v1/admin/reviews — 200
- admin GET /api/v1/admin/offers — 200
- unauth GET /api/v1/admin/blog/posts — 403 (rejected — good)
- unauth GET /api/v1/admin/blog/posts/{id} — 403 (rejected — good)
- unauth POST /api/v1/admin/blog/posts — 403 (rejected — good)
- unauth PUT /api/v1/admin/blog/posts/{id} — 403 (rejected — good)
- unauth DELETE /api/v1/admin/blog/posts/{id} — 403 (rejected — good)
- unauth GET /api/v1/admin/orders — 403 (rejected — good)
- unauth GET /api/v1/admin/orders/{orderId} — 403 (rejected — good)
- unauth PUT /api/v1/admin/orders/{orderId}/status — 403 (rejected — good)
- unauth GET /api/v1/admin/catering-inquiries — 403 (rejected — good)
- unauth GET /api/v1/admin/catering-inquiries/{id} — 403 (rejected — good)
- unauth PUT /api/v1/admin/catering-inquiries/{id}/status — 403 (rejected — good)
- unauth GET /api/v1/admin/reservations — 403 (rejected — good)
- unauth GET /api/v1/admin/reservations/{id} — 403 (rejected — good)
- unauth GET /api/v1/admin/reservations/by-date — 403 (rejected — good)
- unauth PATCH /api/v1/admin/reservations/{id}/status — 403 (rejected — good)
- unauth DELETE /api/v1/admin/reservations/{id} — 403 (rejected — good)
- unauth POST /api/v1/admin/gallery — 403 (rejected — good)
- unauth DELETE /api/v1/admin/gallery/{id} — 403 (rejected — good)
