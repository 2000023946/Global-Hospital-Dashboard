const { pool } = require("../config/db");

// Repository class
class ViewsRepository {
  // Returns all rows from room_wise_view
  async room_wise_view() {
    const [rows] = await pool.query("SELECT * FROM room_wise_view");
    return rows;
  }

  async symptoms_overview_view() {
    const [rows] = await pool.query("SELECT * FROM symptoms_overview_view");
    return rows;
  }

  async medical_staff_view() {
    const [rows] = await pool.query("SELECT * FROM medical_staff_view");
    return rows;
  }

  async department_view() {
    const [rows] = await pool.query("SELECT * FROM department_view");
    return rows;
  }

  async outstanding_charges_view() {
    const [rows] = await pool.query("SELECT * FROM outstanding_charges_view");
    return rows;
  }
}

module.exports = {
  ViewsRepository
}