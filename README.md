# Velvora Ecommerce Multivendor Platform

Velvora is a full-stack multivendor ecommerce platform built with Spring Boot on the backend and React + TypeScript on the frontend. It supports customer shopping, seller product management, admin home-page configuration, orders, payments, wishlist, and chat support.

## 1. Project Overview

### Goals
- Let customers browse products, add them to cart, place orders, and review products.
- Let sellers register, manage products, and track sales.
- Let admins manage sellers, coupons, deals, and home-page sections.

### Main Modules
- Customer storefront
- Seller dashboard
- Admin dashboard
- Authentication and authorization
- Product catalog and search
- Cart, wishlist, and checkout
- Payments and orders

## 2. Architecture Diagram

```mermaid
flowchart LR
    User[Customer / Seller / Admin] --> Frontend[React Frontend]
    Frontend --> Backend[Spring Boot API]
    Backend --> DB[(MySQL Database)]
    Backend --> Mail[SMTP Mail Service]
    Backend --> Payments[Payment Providers]
```

## 3. Component Diagram

```mermaid
flowchart TD
    A[Frontend Routes] --> B[Auth Module]
    A --> C[Customer Pages]
    A --> D[Seller Pages]
    A --> E[Admin Pages]
    C --> F[Products / Cart / Orders]
    D --> G[Product Management]
    E --> H[Home Page / Seller / Coupons]
    F --> I[Spring Boot Controllers]
    G --> I
    H --> I
    I --> J[Services / Repositories]
    J --> K[(MySQL)]
```

## 4. Tech Stack

### Backend
- Java 22
- Spring Boot 4.0.6
- Spring Security
- Spring Data JPA
- MySQL
- Lombok
- JWT
- Mail support

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- Material UI
- Tailwind CSS
- React Router

## 5. Project Structure

```text
Backend/
  src/main/java/com/Velvora
  src/main/resources/application.properties
Frontend/
  src/
```

## 6. Setup Locally

### Prerequisites
- Java 22+
- Node.js 18+
- MySQL 8+
- Maven

### Backend
1. Create a MySQL database named ecommerce_db.
2. Update the database credentials in Backend/src/main/resources/application.properties.
3. From the Backend folder run:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend
1. From the Frontend folder run:
   ```bash
   npm install
   npm start
   ```
2. Open http://localhost:3000.

## 7. Important Notes About Dynamic Home Page

The home page now reads from the backend home-page configuration and refreshes when admin changes are saved. This means:
- Admin edits to home sections are reflected on the customer home page.
- Seller-created products are now sent with the required category fields and quantity so they can appear in the product catalog.

## 8. Deployment Guide

### Backend on Render
1. Create a new Web Service on Render.
2. Connect this repository.
3. Use the backend folder as the root.
4. Set the build command:
   ```bash
   ./mvnw clean package
   ```
5. Set the start command:
   ```bash
   java -jar target/*.jar
   ```
6. Add environment variables:
   - DB_URL=jdbc:mysql://<host>:3306/<database>
   - DB_USERNAME=<username>
   - DB_PASSWORD=<password>
   - PORT=10000
   - MAIL_USERNAME=<smtp-user>
   - MAIL_PASSWORD=<smtp-password>
   - RAZORPAY_API_KEY=<key>
   - RAZORPAY_API_SECRET=<secret>
   - STRIPE_API_KEY=<key>

### Frontend on Vercel
1. Create a Vercel project.
2. Connect the frontend folder.
3. Set the build command:
   ```bash
   npm run build
   ```
4. Set the output directory:
   ```bash
   build
   ```
5. Add environment variable:
   - REACT_APP_API_URL=https://<your-render-backend-url>

### Backend CORS Note
The backend now accepts CORS origins from the app.cors.allowed-origins property. For Vercel deployment, set it to your frontend domain, for example:
```text
app.cors.allowed-origins=https://your-app.vercel.app,http://localhost:3000
```

## 9. Environment Variables Reference

```text
DB_URL
DB_USERNAME
DB_PASSWORD
PORT
MAIL_HOST
MAIL_PORT
MAIL_USERNAME
MAIL_PASSWORD
RAZORPAY_API_KEY
RAZORPAY_API_SECRET
STRIPE_API_KEY
REACT_APP_API_URL
app.cors.allowed-origins
ENABLE_TEST_OTP
```

## 10. Common Issues and Fixes

- Home page not updating: ensure the admin changes are saved and the frontend has re-fetched home page data.
- Seller product not appearing: ensure the seller is authenticated and the product fields include category, category2, category3, and quantity.
- CORS errors: make sure the frontend URL is allowed in the backend CORS configuration.

- Provider-style DB URL (Aiven / other): you can paste either the provider URL or a JDBC URL.
   - JDBC (preferred): `jdbc:mysql://host:port/database?sslMode=REQUIRED&serverTimezone=UTC`
   - Provider form (accepted by the app): `mysql://user:pass@host:port/database?ssl-mode=REQUIRED`
   - If your password contains special characters, prefer separate `DB_USERNAME` and `DB_PASSWORD` environment variables.

- If your managed DB enforces `sql_require_primary_key` and the app fails to start due to schema differences, there are two options:
   1. Manual SQL: run the diagnostic SQLs (requires ALTER privileges) to add a primary key and AUTO_INCREMENT to `user.id` and fix referencing foreign keys.
   2. Add a Flyway migration: create SQL migration files under `Backend/src/main/resources/db/migration` so schema fixes run at startup in a controlled, versioned way.

- Local build/run notes (Windows PowerShell):
   ```powershell
   Set-Location 'd:\Full Stack\Project\Java-Springboot\Ecommerce Project\Backend'
   .\mvnw.cmd --% -DskipTests -Dmaven.test.skip=true clean package
   java -jar target/*.jar
   ```

   ### Test OTP mode

   For debugging when email delivery isn't available, set `ENABLE_TEST_OTP=true` in your backend environment. In this mode:
   - The `/auth/sent/login-signup-otp` response will include `debugOtp` with the generated OTP.
   - The `/sellers` create endpoint will return the OTP in the `X-Debug-Otp` response header.

   Do NOT enable `ENABLE_TEST_OTP=true` on public production services. Use only in staging or controlled environments.

## 11. Future Improvements
- Add product image upload to a dedicated cloud storage service.
- Improve admin analytics and sales charts.
- Add webhook-based order updates.
- Add pagination and filtering enhancements.
