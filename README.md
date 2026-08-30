# Finance Tracker

A personal finance tracker built with Angular + Spring Boot.

## Project structure

```
finance-tracker/
  frontend/          ← Angular app (copy files into your ng new project)
  backend/           ← Spring Boot app (copy files into your Spring Initializr project)
  README.md
```

## Setup

### 1. Start PostgreSQL
```bash
docker run --name finance-db \
  -e POSTGRES_DB=finance_tracker \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -p 5432:5432 \
  -d postgres:16
```

### 2. Backend
```bash
cd backend
./mvnw spring-boot:run
```
Visit http://localhost:8080/api/transactions — you should see 5 seeded transactions.

### 3. Frontend

Create the Angular app first if you haven't:
```bash
ng new finance-tracker-ui --routing --style=scss --standalone
cd finance-tracker-ui
```

Then copy the files from `frontend/src/` into your project's `src/` folder.

```bash
ng serve
```
Visit http://localhost:4200

## File copy guide

Copy each file to the matching path in your Angular project:

| File | Destination |
|------|-------------|
| frontend/src/app/models/transaction.model.ts | src/app/models/transaction.model.ts |
| frontend/src/app/services/transaction.service.ts | src/app/services/transaction.service.ts |
| frontend/src/app/features/transactions/transaction-list.component.ts | src/app/features/transactions/transaction-list.component.ts |
| frontend/src/app/features/transactions/transaction-list.component.html | src/app/features/transactions/transaction-list.component.html |
| frontend/src/app/features/transactions/transaction-list.component.scss | src/app/features/transactions/transaction-list.component.scss |
| frontend/src/app/app.config.ts | src/app/app.config.ts (replace existing) |
| frontend/src/app/app.routes.ts | src/app/app.routes.ts (replace existing) |
| frontend/src/app/app.component.ts | src/app/app.component.ts (replace existing) |

Copy each Java file to the matching path in your Spring Boot project:

| File | Destination |
|------|-------------|
| backend/src/main/java/.../model/Transaction.java | src/main/java/com/financetracker/model/Transaction.java |
| backend/src/main/java/.../repository/TransactionRepository.java | src/main/java/com/financetracker/repository/TransactionRepository.java |
| backend/src/main/java/.../controller/TransactionController.java | src/main/java/com/financetracker/controller/TransactionController.java |
| backend/src/main/java/.../config/DataLoader.java | src/main/java/com/financetracker/config/DataLoader.java |
| backend/src/main/resources/application.properties | src/main/resources/application.properties (replace existing) |

## What you get

- View all transactions sorted by date
- Add new income or expense transactions
- Edit existing transactions
- Delete transactions
- Live income / expense / net summary at the top
- 5 sample transactions seeded on first startup

## Next steps

1. Add category filter dropdown
2. Add a spending chart (ng2-charts)
3. Add JWT authentication (Spring Security)
4. Add budget tracking feature
5. Introduce NgRx for state management
