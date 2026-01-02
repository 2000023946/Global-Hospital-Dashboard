# 🏥 Global Hospital Management System (Backend)

## Overview

The **Global Hospital Management System Backend** is a Node.js/Express API that serves as a **thin orchestration layer** between the frontend and a MySQL database. Rather than implementing business logic in application code, this backend delegates all operations to **stored procedures** and exposes pre-computed state through **database views**.

This architecture enforces a **database-first design** where constraints, validations, and business rules live in the database layer, ensuring data integrity and consistency at the source of truth.

---

## Core Design Philosophy

- **Database-driven architecture** — Business logic lives in MySQL stored procedures, not application code
- **Thin API layer** — Backend merely routes requests to the appropriate database operations
- **Constraint enforcement at source** — All validation happens in stored procedures via triggers and constraints
- **View-based reporting** — Complex queries are pre-computed in database views for performance
- **Stateless operations** — Each request is independent, no session management required
- **Single source of truth** — Database schema defines system behavior, not application logic

---

## Application Architecture

```
src/
├── config/
│   └── db.js                # MySQL connection pool
├── Repository/
│   ├── procedures.js        # Procedures repository layer
│   └── views.js             # Views repository layer
├── Routes/
│   ├── procedures.routes.js # POST endpoints for procedures
│   └── views.routes.js      # GET endpoints for views
└── Schemas/
    └── validation.js        # Zod schemas (optional validation)

app.js                       # Express server entry point
```

---

## API Design

### Procedures Endpoint Pattern

```
POST /procedures/{procedure_name}
Content-Type: application/json

{
  "ip_param1": "value1",
  "ip_param2": "value2"
}
```

### Views Endpoint Pattern

```
GET /views/{view_name}

Response: [
  { column1: value1, column2: value2, ... },
  ...
]
```

---

## Repository Layer

### Procedures Repository

The `ProceduresRepository` class maps each stored procedure to a method that accepts parameters and executes a `CALL` statement.

**Example:**

```javascript
async add_patient({ ip_ssn, ip_first_name, ip_last_name, ip_birthdate, ip_address, ip_funds, ip_contact }) {
  return pool.query(
    "CALL add_patient(?, ?, ?, ?, ?, ?, ?)", 
    [ip_ssn, ip_first_name, ip_last_name, ip_birthdate, ip_address, ip_funds, ip_contact]
  );
}
```

**Key characteristics:**
- Direct parameter mapping to stored procedure arguments
- No business logic validation (handled by database)
- Parameterized queries prevent SQL injection
- Returns raw database response

### Views Repository

The `ViewsRepository` class executes `SELECT` statements against predefined database views.

**Example:**

```javascript
async room_wise_view() {
  const [rows] = await pool.query("SELECT * FROM room_wise_view");
  return rows;
}
```

**Key characteristics:**
- Read-only operations
- No query construction or filtering (handled by view definition)
- Returns pre-aggregated data
- Fast response times via database-level optimization

---

## Supported Procedures

### Patient Management
- `add_patient` — Register new patient with financial and contact info
- `add_funds` — Add funds to patient account
- `remove_patient` — Remove patient from system

### Appointment Operations
- `book_appointment` — Schedule patient appointment with cost
- `record_symptom` — Log patient symptom with appointment context
- `assign_doctor_to_appointment` — Assign doctor to scheduled appointment
- `complete_appointment` — Mark appointment as completed

### Order Management
- `place_order` — Create lab test or prescription order
- `complete_orders` — Process N oldest pending orders

### Staff Management
- `add_staff_to_dept` — Add new staff member to department
- `remove_staff` — Remove staff from system
- `remove_staff_from_dept` — Remove staff from specific department
- `manage_department` — Assign manager to department

### Room Management
- `assign_room_to_patient` — Allocate room to patient with type
- `assign_nurse_to_room` — Assign nurse to room for care
- `release_room` — Free room for reassignment

---

## Supported Views

### Operational Views
- `room_wise_view` — Current room occupancy and assignment status
- `symptoms_overview_view` — Aggregated symptom trends and statistics
- `medical_staff_view` — Staff roster with roles and assignments
- `department_view` — Department hierarchy and staffing levels
- `outstanding_charges_view` — Patient balances and unpaid charges

These views enable real-time monitoring without expensive joins or aggregations at query time.

---

## Error Handling Strategy

The backend uses a consistent error handling pattern:

```javascript
const handleProcedure = async (req, res, procFunc, name) => {
  try {
    const data = await procFunc(req.body);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to execute ${name}` });
  }
};
```

**Error sources:**
- Database constraint violations (foreign keys, unique constraints)
- Stored procedure business rule failures
- Connection pool exhaustion
- Malformed input data

All errors propagate from the database layer with meaningful messages.

---

## Database Connection Management

Uses MySQL connection pooling for efficient resource utilization:

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hospital_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

---

## Validation Layer (Optional)

While the database enforces all critical constraints, the backend includes **Zod schemas** for type safety and early validation:

- `AddPatientSchema` — Validates SSN, name, birthdate, address format
- `BookAppointmentSchema` — Ensures valid date, time, cost
- `PlaceOrderSchema` — Discriminated union for lab vs prescription orders
- `AssignRoomToPatientSchema` — Room number and type validation

**Note:** These schemas are **supplementary** — the database is the ultimate authority.

---

## CORS Configuration

Configured to accept requests from any origin during development:

```javascript
app.use(cors({
  origin: '*'  // Restrict in production
}));
```

---

## Why This Architecture Matters

This backend demonstrates:

- **Enterprise separation of concerns** — API layer vs database layer
- **Database-as-business-logic** design pattern
- **Constraint-driven development** — Rules enforced at schema level
- **Scalability through views** — Expensive queries pre-computed
- **Minimal application maintenance** — Schema changes don't require code rewrites

This mirrors how financial systems, ERP platforms, and healthcare backends operate in production environments.

---

## Ideal Use Cases

- Healthcare management systems
- Financial transaction systems
- Legacy database modernization
- Academic database course projects
- Systems requiring strict audit trails
- Applications with complex business rules

---

## Database Assumptions

The backend expects a MySQL database with:

- Stored procedures matching the repository method names
- Views matching the repository view names
- Proper parameter naming conventions (`ip_` prefix for inputs)
- Constraint enforcement via triggers, checks, foreign keys
- Transaction isolation for concurrent operations

---

## Running the Server

```bash
# Install dependencies
npm install

# Start server
node app.js

# Server runs on http://localhost:3000
```

**Dependencies:**
- `express` — Web framework
- `mysql2` — MySQL driver with promise support
- `cors` — Cross-origin resource sharing
- `zod` — Runtime type validation (optional)

---

## API Response Format

### Successful Procedure Execution
```json
{
  "affectedRows": 1,
  "insertId": 0,
  "info": "..."
}
```

### Successful View Query
```json
[
  { "column1": "value1", "column2": "value2" },
  { "column1": "value3", "column2": "value4" }
]
```

### Error Response
```json
{
  "error": "Failed to execute add_patient"
}
```

---

## Summary

This backend is not a traditional REST API with business logic in routes.

It is a **database procedure orchestration layer** and **view access gateway** designed to enforce constraints at the data layer while providing a clean HTTP interface.

That constraint-first, database-driven approach is the core strength of this architecture.

---

## Next Steps

If you want:

- **Database schema documentation (DDL + procedures)**
- **System architecture diagram (client → API → DB)**
- **Deployment guide (Docker + MySQL)**
- **Testing strategy for stored procedures**

Just say the word.
