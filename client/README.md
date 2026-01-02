# 🏥 Global Hospital Management Dashboard (Frontend)

## Overview

The **Global Hospital Management Dashboard** is a React-based administrative frontend designed to interact with a hospital backend via **stored procedures and database views**. The application provides a **single unified interface** for executing complex hospital operations (procedures) and querying real-time system state (views) without exposing raw SQL or backend logic to the user.

This frontend acts as a **controlled execution layer** between hospital administrators and the underlying database-driven backend.

---

## Core Design Philosophy

- **Procedure-driven UI** — Every mutation maps directly to a backend procedure
- **View-driven UI** — Every read-only query maps to a backend database view
- **Schema-aware rendering** — Forms and tables are generated dynamically from metadata
- **Stateless backend interaction** — Frontend only sends structured JSON payloads
- **Separation of concerns** — UI logic is decoupled from business rules

---

## Application Architecture

```
src/
├── App.jsx                  # Root layout (Sidebar + MainContent)
├── components/
│   ├── Sidebar.jsx          # Action selector (procedures / views)
│   ├── MainContent.jsx      # Dynamic content router
│   ├── ProcedureContent.jsx # Dynamic form renderer
│   ├── ViewContent.jsx      # Dynamic table renderer
│   └── Navbar.jsx
├── data/
│   ├── procedures.js        # Procedure metadata
│   ├── views.js             # View metadata
│   └── serverAPI.js         # Backend base URL
├── css/
│   └── main.css             # Tailwind entry
└── main.jsx                 # React entry point
```

---

## Procedures (Write Operations)

Procedures represent **state-changing hospital operations**. Each procedure is defined declaratively and rendered automatically as a form.

### Supported Procedures

- `add_patient`
- `record_symptom`
- `book_appointment`
- `place_order`
- `add_staff_to_dept`
- `add_funds`
- `assign_nurse_to_room`
- `assign_room_to_patient`
- `assign_doctor_to_appointment`
- `manage_dept`
- `release_room`
- `remove_room`
- `remove_staff_dept`
- `complete_staff_dept`
- `complete_orders`

### How Procedures Work

1. User selects a procedure from the sidebar
2. UI reads required parameters from `procedures.js`
3. Input fields are generated dynamically
4. Data is submitted as JSON to:

```
POST /procedures/{procedure_name}
```

5. Backend enforces:
   - Referential integrity
   - Business constraints
   - Null-grouping rules
   - Financial validation
   - Uniqueness constraints

The frontend **never validates business logic**, ensuring a single source of truth.

---

## Views (Read-Only Queries)

Views expose **aggregated and derived hospital state** for monitoring and analysis.

### Supported Views

- `room_wise_view`
- `symptoms_overview_view`
- `medical_staff_view`
- `department_view`
- `outstanding_charges_view`

### How Views Work

1. User selects a view from the sidebar
2. Frontend fetches data from:

```
GET /views/{view_name}
```

3. Returned JSON objects are converted into a table:
   - Headers derived from object keys
   - Rows rendered dynamically
   - Nulls normalized for display

This allows the frontend to support **new views without UI changes**.

---

## Dynamic Rendering System

### Procedure Rendering

- Input fields generated from metadata
- Form state auto-initialized per procedure
- Fully reusable form component

### View Rendering

- Column headers inferred automatically
- No hardcoded schemas
- Supports variable column counts

This design allows the backend schema to evolve independently.

---

## State Management

- Local state via `useState`
- Cross-component coordination via prop drilling
- Action selection centralized in `App.jsx`

```javascript
const [props, setProps] = useState({
  selectedAction: ''
});
```

This keeps the application simple, predictable, and debuggable.

---

## Styling & UI

- **Tailwind CSS** for utility-first styling
- Responsive flex-based layout
- Sticky sidebar navigation
- Clear visual separation between procedures and views

---

## Backend Integration

The frontend assumes a backend exposing:

- `/procedures/:name` (POST)
- `/views/:name` (GET)

Configured via:

```javascript
export default function () {
  return 'http://localhost:3000'
}
```

This allows easy switching between local, staging, and production environments.

---

## Why This Architecture Matters

This frontend demonstrates:

- **Enterprise-style separation of UI and business logic**
- **Metadata-driven interfaces**
- **Database-first system design**
- **Scalability without UI rewrites**
- **Strong alignment with real-world hospital systems**

It mirrors how real internal dashboards are built in healthcare, finance, and logistics organizations.

---

## Ideal Use Cases

- Hospital administration systems
- Academic database projects
- Stored-procedure–centric architectures
- Internal enterprise dashboards
- Backend-heavy system demonstrations

---

## Summary

This project is not a CRUD app.

It is a **procedure-execution console** and **system observability dashboard** built to interface cleanly with a constraint-heavy backend.

That distinction is the core strength of the design.

---

## Next Steps

If you want:

- **Backend README (to match this tone)**
- **Resume bullet points from this project**
- **System design diagram (frontend ↔ backend)**
- **Rename/refactor suggestions to make it "FAANG-grade"**

Just say the word.
