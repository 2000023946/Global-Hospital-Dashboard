# 🏥 Global Hospital Management System

A **full-stack hospital management system** built around a **database-first, stored-procedure architecture**. Business logic lives in MySQL, not application code—mirroring how enterprise healthcare and financial systems operate in production.

---

## 🎯 What This Is

A three-layer system modeling real Emergency Room operations:

- **MySQL Database** — enforces business rules via stored procedures and constraints
- **Node.js/Express API** — thin orchestration layer (no business logic)
- **React Dashboard** — metadata-driven UI for executing procedures and viewing system state

**Core principle:** Push complexity into the database. The API routes requests, the UI adapts dynamically, and the database enforces correctness.

---

## 🏗️ Architecture Overview

```
┌─────────────┐      HTTP       ┌──────────────────┐      SQL      ┌────────────────────┐
│  React UI   │ ─────────────▶ │  Express Backend  │ ───────────▶ │   MySQL Database   │
│ (Dashboard) │                │ (Thin API Layer)  │              │ (Logic + Rules)   │
└─────────────┘                └──────────────────┘              └────────────────────┘
```

**Frontend** — No business logic. Forms and tables generated from metadata.  
**Backend** — No validation. Routes HTTP to SQL stored procedures and views.  
**Database** — All constraints, rules, and state changes enforced here.

---

## 🗄️ Database Layer

### Core Entities

- **Person** (SSN, name, birthdate) — parent for patients and staff
- **Patient** — contact info, available funds, appointments
- **Staff** — doctors (license, experience) and nurses (shifts, certifications)
- **Department** — staffing, management hierarchy
- **Room** — capacity, assignments, department ownership
- **Appointment** — patient scheduling with up to 3 doctors
- **Orders** — lab tests or prescriptions (mutually exclusive)

### Key Features

- **Stored procedures** for all mutations (add patient, book appointment, assign room, etc.)
- **Database views** for reporting (room status, outstanding charges, staff roster)
- **Constraint enforcement** via foreign keys, CHECK constraints, triggers
- **Transaction isolation** for concurrent operations

Patients are charged **only when work completes**. All business rules validated at the database level.

[→ See detailed database documentation](./DATABASE.md)

---

## 🔌 Backend Layer

Thin Node.js/Express API that:

- Maps HTTP endpoints to stored procedures (`POST /procedures/{name}`)
- Exposes database views as JSON (`GET /views/{name}`)
- Handles connection pooling and error propagation
- **Never reimplements database logic**

### API Pattern

```javascript
// Procedures
POST /procedures/add_patient
{ "ip_ssn": "123-45-6789", "ip_first_name": "John", ... }

// Views
GET /views/room_wise_view
→ [{roomNumber: 101, patientName: "John Doe", ...}, ...]
```

All validation happens in stored procedures. Backend only routes requests.

[→ See backend README](./backend/README.md)

---

## 🖥️ Frontend Layer

React dashboard with **metadata-driven UI**:

- Procedures → dynamically generated forms
- Views → dynamically generated tables
- No hardcoded schemas—adapts to backend changes automatically

### Key Features

- **Single-page dashboard** with sidebar navigation
- **Dynamic form generation** from procedure metadata
- **Dynamic table rendering** from view responses
- **Tailwind CSS** responsive design
- **Zero business logic**—only presentation and HTTP calls

When procedures or views change in the database, the UI adapts without code changes.

[→ See frontend README](./frontend/README.md)

---

## 🚀 Quick Start

### 1. Database Setup
```bash
mysql -u root -p < schema.sql
mysql -u root -p < procedures.sql
```

### 2. Backend
```bash
cd backend
npm install
node app.js  # Runs on http://localhost:3000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

---

## 💡 Why This Architecture?

This project demonstrates **enterprise patterns** rarely seen in typical full-stack apps:

✅ **Database-first design** — constraints enforced at source of truth  
✅ **Stored-procedure orchestration** — consistent, auditable state changes  
✅ **Metadata-driven UI** — scales without rewrites  
✅ **Thin API layer** — minimal maintenance surface  
✅ **Real-world workflows** — reflects production healthcare/financial systems

This is how **banks, hospitals, and ERP platforms** actually architect their systems.

---

## 📊 Sample Operations

**Add a patient:**
```json
POST /procedures/add_patient
{
  "ip_ssn": "123-45-6789",
  "ip_first_name": "Jane",
  "ip_last_name": "Doe",
  "ip_birthdate": "1990-05-15",
  "ip_address": "123 Main St",
  "ip_funds": 5000,
  "ip_contact": "555-1234"
}
```

**View room status:**
```json
GET /views/room_wise_view
→ [
  {
    "roomNumber": 101,
    "roomType": "ICU",
    "patientName": "Jane Doe",
    "nurseAssigned": "John Smith",
    "doctorAssigned": "Dr. Williams"
  }
]
```

---

## 🎓 Technical Highlights

- **16 stored procedures** covering patient lifecycle, appointments, orders, staff management
- **5 database views** for system observability
- **Repository pattern** in backend for clean SQL abstraction
- **Dynamic component architecture** in React
- **Constraint-driven development** — database validates everything

---

## 📁 Project Structure

```
hospital-management-system/
├── database/
│   ├── schema.sql           # Tables, constraints, views
│   └── procedures.sql       # All stored procedures
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection
│   │   ├── Repository/      # Procedure/view abstraction
│   │   └── Routes/          # Express endpoints
│   ├── app.js
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   └── data/            # Metadata definitions
│   ├── package.json
│   └── README.md
└── README.md (this file)
```

---

## 🔍 What Makes This Different

**Not a CRUD app.**  
This is a **procedure execution platform** with a **database-enforced business model**.

Most full-stack projects put logic in Express routes or React components. This system intentionally **inverts that pattern**, treating the database as the authoritative logic layer and the application as a thin interface.

That's the architectural core of enterprise systems.

---

## 🛠️ Tech Stack

**Database:** MySQL (stored procedures, views, constraints)  
**Backend:** Node.js, Express, mysql2  
**Frontend:** React, Tailwind CSS, Vite  
**Validation:** Zod (optional, database is primary validator)

---

## 📌 Future Enhancements

- Docker Compose deployment
- Authentication & role-based access control
- Audit logging for all procedure calls
- Automated stored procedure testing
- Real-time updates via WebSockets

---

**Built as an academic project. Architected like an enterprise system.**