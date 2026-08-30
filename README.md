# Finance Tracker

A full-stack personal finance tracking application built with Angular and Spring Boot. Users can register, log in, and manage their income and expenses with real-time spending charts and category filtering.

**Live demo:** _coming soon_  
**Backend repo:** _this repo_

---

## Screenshots

> Add screenshots here once deployed — a picture of the dashboard with the spending chart goes a long way.

---

## Features

- **User authentication** — JWT-based register and login, per-user data isolation
- **Transaction management** — add, edit, and delete income and expense transactions
- **Spending chart** — bar chart showing spending broken down by category
- **Category filter** — filter the transaction list by category
- **Summary dashboard** — live income, expenses, and net balance totals
- **Responsive UI** — clean, minimal design built with Angular and SCSS

---

## Tech stack

**Frontend**
- Angular 19 (standalone components, signals)
- TypeScript
- Chart.js + ng2-charts
- SCSS

**Backend**
- Java 21
- Spring Boot 4
- Spring Security + JWT (jjwt)
- Spring Data JPA + Hibernate
- PostgreSQL

---

## Getting started

### Prerequisites

- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)
- Java 21+
- PostgreSQL 16+
- Maven

### 1. Clone the repo

```bash
git clone https://github.com/hmailahn/finance-tracker.git
cd finance-tracker
```

### 2. Set up the database

Create a PostgreSQL database:

```sql
CREATE DATABASE finance_tracker;
```

### 3. Configure the backend

Open `backend/src/main/resources/application.properties` and update the database password:

```properties
spring.datasource.password=YOUR_POSTGRES_PASSWORD
```

### 4. Run the backend

```bash
cd backend
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 5. Run the frontend

```bash
cd finance-tracker-ui
npm install
ng serve
```

Open `http://localhost:4200` in your browser.

### 6. Create an account

Go to `http://localhost:4200/register` and create your first account. You'll be redirected to the dashboard automatically.

---

## API endpoints

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create a new account | No |
| POST | `/api/auth/login` | Log in and receive a JWT | No |
| GET | `/api/transactions` | Get all transactions for the logged-in user | Yes |
| POST | `/api/transactions` | Create a new transaction | Yes |
| PUT | `/api/transactions/{id}` | Update a transaction | Yes |
| DELETE | `/api/transactions/{id}` | Delete a transaction | Yes |

---

## Project structure

```
finance-tracker/
  finance-tracker-ui/          # Angular frontend
    src/app/
      core/                    # Auth interceptor and route guard
      features/
        auth/                  # Login and register components
        dashboard/             # Spending chart component
        transactions/          # Transaction list component
      models/                  # TypeScript interfaces
      services/                # Auth and transaction HTTP services
  backend/                     # Spring Boot backend
    src/main/java/com/financetracker/
      config/                  # Security, JWT, CORS config
      controller/              # REST controllers
      model/                   # JPA entities
      repository/              # Spring Data repositories
```

---

## Roadmap

- [ ] Budget tracking — set monthly limits per category with progress bars
- [ ] Recurring transactions — auto-populate monthly bills
- [ ] CSV import — paste in bank exports and auto-categorize
- [ ] Spending trends — line chart showing expenses over the past 6 months
- [ ] Deploy to Railway + Netlify

---

## Author

Heidi Mailahn — [github.com/hmailahn](https://github.com/hmailahn)