# 🏥 PharmaCare — Full-Stack Online Pharmacy

A complete, production-ready pharmacy e-commerce platform built with:

- **Frontend:** Nuxt 3 + Vue 3 + TailwindCSS → deployed on **Vercel**
- **Backend:** ASP.NET Core 8 Web API → deployed on **IIS / Docker / Azure**
- **Database:** SQL Server with Entity Framework Core
- **Auth:** JWT + Role-Based Authorization

---

## 📁 Project Structure

```
pharma-app/
├── backend/
│   └── PharmacyAPI/
│       ├── Controllers/        # API endpoints
│       ├── Models/             # EF Core entities
│       ├── DTOs/               # Request/Response objects
│       ├── Services/           # Business logic
│       │   └── Interfaces/
│       ├── Repositories/       # Data access layer
│       │   └── Interfaces/
│       ├── Data/               # DbContext + migrations
│       ├── Mappings/           # AutoMapper profiles
│       ├── Middleware/         # Global exception handler
│       ├── Helpers/            # Slug generator, etc.
│       ├── Extensions/         # DI service registration
│       ├── Program.cs
│       ├── appsettings.json
│       └── Dockerfile
│
├── frontend/
│   └── pharmacy-nuxt/
│       ├── assets/css/         # Global styles
│       ├── components/
│       │   ├── admin/          # Dashboard components
│       │   ├── cart/           # Cart drawer + items
│       │   ├── common/         # Navbar, Footer, Toast, etc.
│       │   └── product/        # Product cards, skeletons
│       ├── composables/        # useApi, useCart, useToast, etc.
│       ├── layouts/            # default.vue, admin.vue
│       ├── middleware/         # auth.ts, admin.ts
│       ├── pages/
│       │   ├── index.vue       # Home page
│       │   ├── products/       # Product list + detail
│       │   ├── checkout.vue
│       │   ├── auth/           # Login + Register
│       │   ├── account/        # Profile, Orders, Addresses
│       │   └── admin/          # Full dashboard
│       ├── stores/             # Pinia: auth, cart
│       ├── types/              # TypeScript interfaces
│       ├── nuxt.config.ts
│       ├── tailwind.config.ts
│       └── Dockerfile
│
├── docs/
│   └── database_schema.sql     # Full SQL Server schema
└── docker-compose.yml
```

---

## 🗄️ Database Schema

### Tables
| Table                  | Description                         |
|------------------------|-------------------------------------|
| `Users`                | Customer & admin accounts           |
| `Roles`                | Admin, Customer, Pharmacist         |
| `UserRoles`            | Many-to-many user-role junction     |
| `Categories`           | Hierarchical (parent/child)         |
| `Products`             | Full product catalog                |
| `ProductImages`        | Multiple images per product         |
| `ProductVariants`      | Size/strength variants              |
| `CartItems`            | Persistent shopping cart            |
| `Orders`               | Order headers                       |
| `OrderItems`           | Line items per order                |
| `OrderStatusHistories` | Full status audit trail             |
| `Addresses`            | Customer delivery addresses         |
| `Coupons`              | Discount codes (% or fixed)         |
| `InventoryLogs`        | Stock movement audit                |
| `Reviews`              | Product ratings & comments          |
| `Settings`             | Key-value store for pharmacy config |

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile          [Authorize]
PUT    /api/auth/profile          [Authorize]
POST   /api/auth/change-password  [Authorize]
```

### Products
```
GET    /api/products              ?search=&categoryId=&brand=&minPrice=&maxPrice=&inStock=&isFeatured=&sortBy=&page=&pageSize=
GET    /api/products/featured
GET    /api/products/best-sellers
GET    /api/products/offers
GET    /api/products/{id}
GET    /api/products/slug/{slug}
GET    /api/products/{id}/similar
POST   /api/products              [Admin/Pharmacist]
PUT    /api/products/{id}         [Admin/Pharmacist]
DELETE /api/products/{id}         [Admin]
PUT    /api/products/{id}/stock   [Admin/Pharmacist]
POST   /api/products/{id}/images  [Admin/Pharmacist]
DELETE /api/products/images/{id}  [Admin/Pharmacist]
```

### Categories
```
GET    /api/categories
GET    /api/categories/{id}
GET    /api/categories/slug/{slug}
POST   /api/categories            [Admin]
PUT    /api/categories/{id}       [Admin]
DELETE /api/categories/{id}       [Admin]
```

### Cart
```
GET    /api/cart                  [Authorize]
POST   /api/cart                  [Authorize]
PUT    /api/cart/{id}             [Authorize]
DELETE /api/cart/{id}             [Authorize]
DELETE /api/cart                  [Authorize]
POST   /api/cart/validate-coupon  [Authorize]
```

### Orders
```
POST   /api/orders                [Authorize]
GET    /api/orders                [Authorize] ?status=&page=&pageSize=
GET    /api/orders/{id}           [Authorize]
PUT    /api/orders/{id}/status    [Admin/Pharmacist]
POST   /api/orders/{id}/cancel    [Authorize]
```

### Addresses
```
GET    /api/addresses             [Authorize]
POST   /api/addresses             [Authorize]
PUT    /api/addresses/{id}        [Authorize]
DELETE /api/addresses/{id}        [Authorize]
```

### Coupons (Admin)
```
GET    /api/coupons               [Admin]
POST   /api/coupons               [Admin]
PUT    /api/coupons/{id}          [Admin]
DELETE /api/coupons/{id}          [Admin]
```

### Dashboard (Admin)
```
GET    /api/dashboard/stats       [Admin]
GET    /api/dashboard/revenue     [Admin] ?months=12
```

### Settings
```
GET    /api/settings
GET    /api/settings/group/{group}
PUT    /api/settings              [Admin]
```

### Users (Admin)
```
GET    /api/users                 [Admin] ?search=&page=&pageSize=
```

---

## 🚀 Local Development Setup

### Prerequisites
- .NET 8 SDK
- SQL Server (or Docker)
- Node.js 20+
- npm or pnpm

### 1. Clone & Setup Backend

```bash
cd backend/PharmacyAPI

# Copy environment config
cp .env.example appsettings.Development.json

# Restore packages
dotnet restore

# Apply EF Core migrations
dotnet ef migrations add InitialCreate
dotnet ef database update

# Run the API
dotnet run
# API available at: http://localhost:5000
# Swagger UI at:   http://localhost:5000/swagger
```

### 2. Setup Frontend

```bash
cd frontend/pharmacy-nuxt

# Copy env
cp .env.example .env

# Edit .env — set NUXT_PUBLIC_API_BASE=http://localhost:5000/api

# Install dependencies
npm install

# Start dev server
npm run dev
# Frontend at: http://localhost:3000
```

### Default Admin Credentials
```
Email:    admin@pharmacare.com
Password: Admin@123
```

---

## 🐳 Docker Deployment

```bash
# Build and start all services
docker-compose up -d --build

# Services:
#   Frontend  → http://localhost:3000
#   API       → http://localhost:5000
#   SQL Server → localhost:1433
```

---

## ☁️ Production Deployment

### Frontend → Vercel

1. Push frontend to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set environment variables:
   ```
   NUXT_PUBLIC_API_BASE=https://your-api.domain.com/api
   NUXT_PUBLIC_WHATSAPP=+201000000000
   NUXT_PUBLIC_SITE_NAME=PharmaCare
   ```
4. Deploy. Vercel auto-detects Nuxt.

### Backend → IIS (Windows)

```bash
# Publish
dotnet publish -c Release -o ./publish

# Copy publish/ to IIS wwwroot
# In IIS:
# - Create new site pointing to publish folder
# - Application Pool: No Managed Code
# - Set environment variables in web.config or Windows Environment Variables
```

### Backend → Azure App Service

```bash
dotnet publish -c Release -o ./publish
cd ./publish
zip -r publish.zip .

az webapp deployment source config-zip \
  --resource-group myRG \
  --name pharma-api \
  --src publish.zip
```

---

## 🔐 Roles & Permissions

| Feature            | Customer | Pharmacist | Admin |
|--------------------|----------|------------|-------|
| Browse products    | ✅       | ✅         | ✅    |
| Place orders       | ✅       | ✅         | ✅    |
| Manage products    | ❌       | ✅         | ✅    |
| Update order status| ❌       | ✅         | ✅    |
| Manage categories  | ❌       | ❌         | ✅    |
| View dashboard     | ❌       | ✅         | ✅    |
| Manage coupons     | ❌       | ❌         | ✅    |
| Manage users       | ❌       | ❌         | ✅    |
| Update settings    | ❌       | ❌         | ✅    |

---

## 🎨 Frontend Pages

| Route                       | Description                    |
|-----------------------------|--------------------------------|
| `/`                         | Home (hero, featured, offers)  |
| `/products`                 | Product listing with filters   |
| `/products/[slug]`          | Product detail page            |
| `/auth/login`               | Sign in                        |
| `/auth/register`            | Create account                 |
| `/checkout`                 | Checkout flow                  |
| `/account/profile`          | User profile + password        |
| `/account/orders`           | Order history                  |
| `/account/addresses`        | Address book                   |
| `/admin`                    | Dashboard stats & charts       |
| `/admin/products`           | Products CRUD table            |
| `/admin/products/new`       | Create new product             |
| `/admin/products/[id]/edit` | Edit existing product          |
| `/admin/orders`             | Orders management              |
| `/admin/orders/[id]`        | Order detail + status update   |
| `/admin/categories`         | Category management            |
| `/admin/customers`          | Customer list                  |
| `/admin/coupons`            | Coupon management              |
| `/admin/settings`           | Pharmacy settings              |

---

## ✨ Key Features

- 🔒 **JWT Auth** with role-based guards (Admin, Pharmacist, Customer)
- 🛒 **Persistent Cart** with real-time stock validation
- 💊 **Prescription Products** — Rx badge, WhatsApp order fallback
- 📦 **Inventory Logging** — every stock movement is audited
- 🏷️ **Coupons** — percentage or fixed, usage-limited, date-bound
- 🔍 **Advanced Filters** — search, category, price range, stock, discounts
- 📱 **Mobile-first** responsive design with dark mode
- 💬 **WhatsApp Integration** — FAB button + order via WhatsApp
- 📊 **Admin Dashboard** — revenue charts, low stock alerts, recent orders
- 🏗️ **Clean Architecture** — Repository + Service pattern, DTOs, AutoMapper
- 📝 **Swagger UI** at `/swagger`
- 🐳 **Docker-ready** with compose for full-stack local dev

---

## 📦 Tech Stack Summary

| Layer        | Technology                              |
|--------------|-----------------------------------------|
| Frontend     | Nuxt 3, Vue 3, TailwindCSS, Pinia       |
| Backend      | ASP.NET Core 8, C#                      |
| Database     | SQL Server, EF Core 8                   |
| ORM          | Entity Framework Core (Code First)      |
| Auth         | JWT Bearer + BCrypt                     |
| Mapping      | AutoMapper                              |
| Logging      | Serilog (Console + File)                |
| API Docs     | Swagger / OpenAPI                       |
| Validation   | DataAnnotations + FluentValidation      |
| Container    | Docker + Docker Compose                 |
| Deployment   | Vercel (frontend) + IIS/Azure (backend) |
