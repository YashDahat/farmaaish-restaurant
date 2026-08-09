# Farmaaish Restaurant

Auto-generated website for Farmaaish Restaurant — Mughlai restaurant, Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069.

## Tech Stack

- **backend**: Headless CMS (e.g., Sanity.io or Strapi) for easy menu and content management. Use a third-party platform API (e.g., Jhattse, UrbanPiper) for order and reservation management to avoid building complex logic from scratch.
- **hosting**: Vercel for the frontend, with backend services hosted on their respective platforms.
- **database**: Managed by the Headless CMS and third-party services. PostgreSQL if a small custom backend is needed.
- **frontend**: Next.js with Tailwind CSS for a fast, SEO-friendly user experience.

## Features

- Integrated Online Reservation System (e.g., via Resy, OpenTable, or SevenRooms API)
- Integrated Online Ordering System with payment gateway
- High-quality, professional food photography
- Mobile-first, responsive design
- Schema markup for recipes, menus, and local business
- Click-to-call and interactive map integration
- Google Business Profile synchronization for hours and reviews

## Running Locally

```bash
docker-compose up --build
```

The app will be available at http://localhost:8080

## Development

**Backend:**
```bash
cd backend && mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend && npm install && npm run dev
```
