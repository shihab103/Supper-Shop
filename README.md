# 🛍️ Supper Shop

A modern full‑stack e‑commerce web application for browsing products, managing cart & wishlist, placing orders, and handling admin operations — with clean UI, secure auth, and role‑based dashboards.

---

## 🚀 Live Demo

🌐 [Live Site](https://fastidious-sable-de7b93.netlify.app/)

---

## 🖼️ Screenshots

### 🔹 Home Page

<img width="950" height="439" alt="Screenshot 2025-08-23 142526" src="https://github.com/user-attachments/assets/c725fa7b-6d91-4e57-8c44-3195298e4240" />

---

## 🔧 Technologies Used

* **Frontend:** React, Tailwind CSS, DaisyUI, react‑hook‑form, Axios
* **Routing:** `react-router` (no `react-router-dom`)
* **State/Utils:** Context API (Auth/Cart), localStorage, custom hooks
* **Auth:** Firebase Authentication
* **Backend:** Node.js, Express.js, MongoDB (Mongoose)
* **Security:** JWT (access/refresh), CORS, Helmet, rate limiting
* **Payments (optional):** Stripe / SSLCommerz (pluggable)
* **Deployment:** Netlify (frontend), Render/Heroku/VPS (backend)

---

## 🌟 Core Features

* 🛒 Browse products with **search, filter, sort, and pagination**
* ❤️ **Wishlist** with duplicate prevention
* 🧺 **Cart** with quantity update, remove, and persistent storage
* 💳 **Checkout** (COD / Online Payment – pluggable)
* 🧾 **Order Management** (create, track, cancel)
* 🔐 **Authentication** (login/register, protected routes)
* 👤 **Role‑based Dashboards** (Customer, Admin)
* 🧑‍💼 **Admin Panel**: manage products, categories, coupons, users, orders
* ⭐ **Reviews & Ratings** (optional)
* 🧾 **Invoice/PDF download** for orders (optional)
* 🌐 **Responsive, accessible UI** with Tailwind + DaisyUI

---

## 🗂️ Folder Structure

```bash
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
    ├── _redirects
    └── vite.svg
├── src
    ├── App.css
    ├── App.jsx
    ├── Component
    │   └── Dashboard
    │       └── Admin
    │           ├── AddCategory
    │           │   └── AddCategory.jsx
    │           ├── AddProduct
    │           │   └── AddProduct.jsx
    │           ├── AllProducts
    │           │   └── AllProducts.jsx
    │           └── AllReview
    │               └── AllReview.jsx
    ├── Context
    │   ├── AuthContext.jsx
    │   └── AuthProvider.jsx
    ├── Hooks
    │   └── useAuth.jsx
    ├── Layout
    │   ├── DashboardLayout
    │   │   └── DashboardLayout.jsx
    │   ├── Footer
    │   │   └── Footer.jsx
    │   ├── Navbar
    │   │   ├── Navbar.jsx
    │   │   └── TopSection.jsx
    │   ├── RootLayout
    │   │   └── RootLayout.jsx
    │   └── Shared
    │       ├── Loading
    │       │   └── Loading.jsx
    │       └── ShopLogo
    │           └── ShopLogo.jsx
    ├── Pages
    │   ├── About
    │   │   ├── About.jsx
    │   │   └── OurTeam.jsx
    │   ├── Account
    │   │   ├── Account.jsx
    │   │   └── MyProfile.jsx
    │   ├── Cart
    │   │   └── Cart.jsx
    │   ├── HomePage
    │   │   ├── Banner
    │   │   │   └── Banner.jsx
    │   │   ├── CategoryProducts
    │   │   │   └── CategoryProducts.jsx
    │   │   ├── FeaturedCategories
    │   │   │   └── FeaturedCategories.jsx
    │   │   ├── Home
    │   │   │   └── Home.jsx
    │   │   └── ProductDetails
    │   │       └── ProductDetails.jsx
    │   ├── Login
    │   │   └── Login.jsx
    │   ├── Register
    │   │   └── Register.jsx
    │   └── WishList
    │       └── WishList.jsx
    ├── Routers
    │   ├── MainRoute.jsx
    │   └── PrivateRoute.jsx
    ├── assets
    │   ├── Lotties
    │   │   ├── Login.json
    │   │   ├── ShoppingCartLoader.json
    │   │   ├── register.json
    │   │   └── supper-shop-logo.json
    │   ├── Photos
    │   │   ├── BannerAndBgImage
    │   │   │   └── banner.jpg
    │   │   └── about
    │   │       ├── about1.jpg
    │   │       ├── about2.jpg
    │   │       └── member1.jpg
    │   └── react.svg
    ├── firebase
    │   └── firebase.init.js
    ├── index.css
    ├── main.jsx
    └── utils
        ├── axiosPublic.js
        ├── axiosSecure.js
        └── useRole.jsx
└── vite.config.js
```

---

## ▶️ Getting Started

### Prerequisites

* Node.js >= 18
* MongoDB Atlas or local MongoDB

### Frontend

```bash
# install deps
npm install

# start dev server
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

### Backend (if in /server)

```bash
cd server
npm install
npm run dev          # nodemon
# or
npm start
```

---

## 🔐 Authentication & Authorization

* **Auth Options:** Firebase Auth (email/password)
* **Protected Routes:** `PrivateRoute.jsx` guards dashboard & checkout pages
* **Roles:** `customer`, `admin`
* **Access Control:**

  * Customer: browse/shop, wishlist, cart, checkout, my orders
  * Admin: CRUD products, manage orders, manage users, coupons

---

## 🛍️ Shopping Flow

1. Browse → search/filter/sort products
2. Add to wishlist/cart (prevent duplicates)
3. Update quantities or remove items in cart
4. Checkout (address, shipping, payment method)
5. Order placed → success page → redirect to **My Orders**
6. Admin can update order status: `pending → processing → shipped → delivered → cancelled`

---

## 🧩 API Endpoints (Sample)

```http
# Auth
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

# Products
GET    /api/products?search=&category=&minPrice=&maxPrice=&sort=&page=
GET    /api/products/:id
POST   /api/products               # admin
PATCH  /api/products/:id           # admin
DELETE /api/products/:id           # admin

# Orders
POST   /api/orders                 # customer
GET    /api/orders/my              # customer
GET    /api/orders                 # admin
PATCH  /api/orders/:id/status      # admin

# Users
GET    /api/users                  # admin
PATCH  /api/users/:id/role         # admin
```

---

## ✅ Quality & Security

* Form validation with **react‑hook‑form**
* Async calls via **Axios** with interceptors (access token refresh)
* Secure HTTP Only cookies (recommended) or Authorization header
* Input sanitization, Helmet, rate limit, CORS allowlist

---

## 🧪 Testing (optional)

* Component tests: React Testing Library
* API tests: Jest + Supertest

---

## 📦 Deployment Notes

* **Frontend**: Netlify — add `public/_redirects` for SPA fallback
* **Backend**: Render/Heroku/VPS — set environment variables
* **CORS**: allow your frontend origin only

**`public/_redirects`**

```
/*  /index.html  200
```

---

## 🗺️ Roadmap

* Multi‑vendor marketplace mode
* Advanced analytics dashboard
* Inventory & stock alerts
* Wishlist → price‑drop notifications
* Internationalization (i18n)

---

## 🤝 Contributing

PRs are welcome! Please open an issue to discuss major changes.

---

## 📄 License

This project is licensed under the MIT License — feel free to use and modify.

---

## 📬 Contact

* **Author:** SR Shihab Uddin
* **Email:** [shihabuddin2469@gmail.com](shihabuddin2469@gmail.com)
* **LinkedIn:** your‑profile
* **Portfolio:** your‑site

> Replace placeholders with your actual links and credentials.
