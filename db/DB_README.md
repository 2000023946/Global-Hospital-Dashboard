# 🏥 ER Hospital Management System

**Course:** CS4400 – Introduction to Database Systems (Fall 2025)
**Phase:** II–IV (Schema, Data, Views, Stored Procedures)
**Team 89:** Preya Thakkar, Akshita Karuman, Mohamed Aweys Abucar

---

## 📌 Project Overview

This project implements a **relational database system** for managing an **Emergency Room (ER) hospital**. The system models real‑world hospital operations such as:

* Managing patients, staff, doctors, and nurses
* Scheduling appointments
* Assigning rooms and medical staff
* Tracking symptoms, prescriptions, and lab work
* Enforcing hospital rules using **constraints, views, and stored procedures**

The entire system is implemented **purely in SQL** using **MySQL**, with strong emphasis on **data integrity**, **business rules**, and **transaction safety**.

---

## 🗄️ Database Setup

The database is created and reset automatically when the script is executed.

```sql
CREATE DATABASE er_management;
USE er_management;
```

Global settings enforce strict and predictable behavior:

* Serializable transaction isolation
* ANSI + TRADITIONAL SQL mode
* UTF‑8 encoding

---

## 🧩 Core Entities (Tables)

### 👤 Person

Stores basic demographic information for **all individuals** in the system.

* `ssn` (Primary Key)
* Name, birthdate, address

All patients and staff reference this table.

---

### 🧑‍⚕️ Patient

Represents ER patients.

* Linked 1‑to‑1 with `Person`
* Tracks contact info and available funds

Patients are charged **only when appointments or orders are completed**.

---

### 🏥 Staff

General table for hospital employees.

* Linked to `Person`
* Stores salary, hire date, department

Specialized into:

* **Doctor** (license number, experience)
* **Nurse** (shift type, registration expiration)

---

### 🏢 Department

Hospital departments such as Cardiology or Neurology.

* Each department may have a **manager**
* Staff may work in multiple departments

---

### 🚪 Room

Hospital rooms assigned to patients.

* Managed by a department
* Can be assigned nurses
* Can be occupied by **at most one patient**

---

### 📅 Appointment

Represents a scheduled visit between a patient and doctors.

* Composite primary key: `(ssn, date, time)`
* May have **up to 3 doctors** assigned
* Linked to symptoms

---

### 🤒 Symptoms

Tracks symptoms reported during an appointment.

* Linked directly to appointment
* Prevents duplicate symptom entries

---

### 🧾 Orders

Medical orders placed by doctors.

* Can be either:

  * **Prescription** (drug + dosage)
  * **Lab Work** (test type)
* Enforced so an order is **never both**

---

## 📊 Views

Views provide **read‑only summaries** for reporting and validation.

### `room_wise_view`

Shows:

* Patient name
* Room number
* Department
* Assigned doctors
* Assigned nurses

---

### `symptoms_overview_view`

Aggregates symptoms per appointment using `GROUP_CONCAT`.

---

### `medical_staff_view`

Unified view of doctors and nurses showing:

* Staff type
* License or registration info
* Departments worked in
* Number of assignments

---

### `department_view`

Summarizes each department:

* Total staff
* Number of doctors
* Number of nurses

Ensures **zero instead of NULL** when empty.

---

### `outstanding_charges_view`

Calculates a patient’s outstanding balance:

* Appointment costs + order costs
* Number of appointments
* Number of orders

Used heavily by stored procedures to enforce fund constraints.

---

## ⚙️ Stored Procedures

Stored procedures enforce **hospital business rules** and prevent invalid operations.

### Key Procedures

* `add_patient` – Adds a new patient safely
* `book_appointment` – Books future appointments only if funds allow
* `record_symptom` – Records symptoms without duplication
* `place_order` – Places lab or prescription orders with validation
* `assign_room_to_patient` – Assigns rooms safely
* `assign_nurse_to_room` – Prevents nurse over‑assignment (>4 rooms)
* `assign_doctor_to_appointment` – Limits doctors per appointment (≤3)

---

### Completion & Removal Procedures

* `complete_appointment` – Charges patient and removes appointment
* `complete_orders` – Completes highest‑priority orders first
* `remove_patient` – Prevents removal if pending activity exists
* `remove_staff` – Safely removes staff with dependency checks

All procedures **fail silently** if constraints are violated (as required by the spec).

---

## 🔒 Integrity & Constraints

The system enforces:

* Referential integrity with foreign keys
* Business rules using stored procedures
* Valid ranges using `CHECK` constraints
* No orphaned records

This ensures the database always reflects a **valid hospital state**.

---

## 🧠 Design Highlights

* Heavy use of **composite primary keys**
* Advanced SQL features (`GROUP_CONCAT`, `COALESCE`, subqueries)
* Strong separation of **data storage** and **business logic**
* Fully automated setup script

---

## ✅ How to Run

1. Open MySQL
2. Run the script top‑to‑bottom
3. Ensure no errors occur
4. Query views or call procedures to test behavior

---

## 📌 Summary

This project demonstrates a **realistic hospital database system** with:

* Strong normalization
* Robust constraint enforcement
* Complex stored procedure logic

It closely mirrors **enterprise‑grade relational database design**.

---

If you want, I can:

* Add example procedure calls
* Write test queries
* Add an ER diagram explanation
* Help convert this into resume bullets
