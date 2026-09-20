# ZYRA — Fashion E-commerce Frontend

A full-featured, front-end-only fashion e-commerce website built with **React + Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**. Built as a portfolio/demo project — there is no backend; cart, wishlist, login, addresses and orders are all persisted locally in your browser via `localStorage`.

## ✨ What's inside

- **Huge, animated home page** — hero slider, category tiles, gender-split banners, new arrivals & bestseller carousels, sale countdown, stats counter, "why choose us", testimonials, trending tags, blog/lookbook, app promo, Instagram feed, newsletter (18+ sections).
- **Full navigation** — sticky navbar with mega-menu (Men / Women / Accessories / Footwear), live search, mobile drawer menu, cart & wishlist badges.
- **Category listing pages** — Men, Women, Accessories, Footwear, New Arrivals, Sale, and Search Results — each with sidebar filters (sub-category, price, size, color) + sort + a mobile filter drawer.
- **Product Details page** — image gallery, sizes/colors, size chart modal, ratings & reviews, add to cart / buy now / wishlist, stock status, related products.
- **Cart** — quantity control, coupon codes (`ZYRA10`, `ZYRA20`, `WELCOME50`), MRP/discount breakdown, free shipping threshold.
- **Checkout** — 3-step flow (Address → Payment → Review) with address management.
- **My Account / My Orders** — order history with a visual tracking stepper (Confirmed → Shipped → Out for Delivery → Delivered).
- **Login / Register**, **Contact Us** (with FAQ accordion), **About Us** (story, values, team).
- All product photography is sourced from real, freely-usable Unsplash photography, matched meaningfully to each category.

## 🗂️ Categories included

Men (T-Shirts, Shirts, Jeans, Trousers, Jackets, Hoodies, Shorts, Innerwear), Women (Tops, T-Shirts, Dresses, Jeans, Trousers, Skirts, Sarees, Kurtis, Jackets), Accessories (Watches, Bags, Wallets, Belts, Sunglasses, Caps, Jewelry), Footwear (Sneakers, Casual Shoes, Formal Shoes, Sandals, Heels, Slippers).

## 🚀 Running it locally

This project's dependencies were **not pre-installed** in the sandbox that generated it (no package registry access there), so run these on your own machine:

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

To create a production build:

```bash
npm run build
npm run start
```

## 🧱 Tech stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3
- Framer Motion (animations)
- react-icons (icon set — including social icons)
- Browser `localStorage` for cart / wishlist / auth / orders / addresses (via React Context)

## 📁 Project structure

```
app/                 → routes (pages) — one folder per page
components/          → shared UI (Navbar, Footer, ProductCard, etc.)
components/home/     → home-page-only sections
context/             → CartContext, WishlistContext, AuthContext
data/                → mock product catalog, categories, testimonials
```

## Notes

- This is intentionally a **frontend-only** project — there's no real payment gateway, backend database, or authentication; it's built to demonstrate UI/UX, animation and React/Next.js architecture skills.
- Swap the Unsplash image URLs in `data/products.js` / `data/categories.js` for your own product photography whenever you're ready to go live.
