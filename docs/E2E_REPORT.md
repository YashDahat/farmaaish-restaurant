# E2E Flow Report

Browser journeys (Playwright/Chromium) against the live stack — 2026-08-09T03:54:14.560421924.
These are runtime UI journeys: everything here already compiled and booted.

**0 of 28 journeys passed.**

## Failure clusters (fix the cause once → many flows recover)

### Error: page.goto: net::ERR_CONNECTION_REFUSED at http://eNe-…  (23)
- **should allow an owner to complete onboarding after login** (adminportal.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to log in and view the memberships page** (authui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to create a new membership** (authui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to edit an existing membership** (authui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to delete an existing membership** (authui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to log in and view the memberships page** (blogui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to create a new membership** (blogui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to edit an existing membership** (blogui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to delete an existing membership** (blogui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to log in and view the memberships page** (coreui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to edit a membership** (coreui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to delete a membership** (coreui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to log in and view the memberships page** (galleryui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to edit a membership** (galleryui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to create a new membership** (galleryui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to delete a membership** (galleryui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **owner can create a new membership plan** (inquiryui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **owner can edit an existing membership plan** (inquiryui.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to log in and view the memberships page** (menudisplay.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to edit a membership** (menudisplay.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to log in and view the memberships page** (orderflow.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to edit a membership** (orderflow.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login
- **should allow an admin to log in and view the memberships page** (reservationflow.spec.ts) — Error: page.goto: net::ERR_CONNECTION_REFUSED at http://e2e-7fc94b76:8080/login

### timeout  (5)
- **should allow an admin to delete a membership** (menudisplay.spec.ts) — Test timeout of 30000ms exceeded.
- **should allow an admin to delete a membership** (orderflow.spec.ts) — Test timeout of 30000ms exceeded.
- **should allow an admin to edit a membership** (reservationflow.spec.ts) — Test timeout of 30000ms exceeded.
- **should allow an admin to create a new membership** (reservationflow.spec.ts) — Test timeout of 30000ms exceeded.
- **should allow an admin to delete a membership** (reservationflow.spec.ts) — Test timeout of 30000ms exceeded.

## Passing (0)

