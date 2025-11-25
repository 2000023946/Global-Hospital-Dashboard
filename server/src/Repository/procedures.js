const { pool } = require("../config/db");

class ProceduresRepository {
  async add_patient({ ip_ssn, ip_first_name, ip_last_name, ip_birthdate, ip_address, ip_funds, ip_contact }) {
    return pool.query(
      "CALL add_patient(?, ?, ?, ?, ?, ?, ?)", 
      [ip_ssn, ip_first_name, ip_last_name, ip_birthdate, ip_address, ip_funds, ip_contact]
    );
  }

  async record_symptom({ ip_patientId, ip_numDays, ip_apptDate, ip_apptTime, ip_symptomType }) {
    return pool.query(
      "CALL record_symptom(?, ?, ?, ?, ?)",
      [ip_patientId, ip_numDays, ip_apptDate, ip_apptTime, ip_symptomType]
    );
  }

  async book_appointment({ ip_patientId, ip_apptDate, ip_apptTime, ip_apptCost }) {
    return pool.query(
      "CALL book_appointment(?, ?, ?, ?)",
      [ip_patientId, ip_apptDate, ip_apptTime, ip_apptCost]
    );
  }

  async place_order({ ip_orderNumber, ip_priority, ip_patientId, ip_doctorId, ip_cost, ip_labType, ip_drug, ip_dosage }) {
    return pool.query(
      "CALL place_order(?, ?, ?, ?, ?, ?, ?, ?)",
      [ip_orderNumber, ip_priority, ip_patientId, ip_doctorId, ip_cost, ip_labType, ip_drug, ip_dosage]
    );
  }

  async add_staff_to_dept({ ip_deptId, ip_ssn, ip_firstName, ip_lastName, ip_birthdate, ip_startdate, ip_address, ip_staffId, ip_salary }) {
    return pool.query(
      "CALL add_staff_to_dept(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [ip_deptId, ip_ssn, ip_firstName, ip_lastName, ip_birthdate, ip_startdate, ip_address, ip_staffId, ip_salary]
    );
  }

  async add_funds({ ip_ssn, ip_funds }) {
    return pool.query(
      "CALL add_funds(?, ?)",
      [ip_ssn, ip_funds]
    );
  }

  async assign_nurse_to_room({ ip_nurseId, ip_roomNumber }) {
    return pool.query(
      "CALL assign_nurse_to_room(?, ?)",
      [ip_nurseId, ip_roomNumber]
    );
  }

  async assign_room_to_patient({ ip_ssn, ip_roomNumber, ip_roomType }) {
    return pool.query(
      "CALL assign_room_to_patient(?, ?, ?)",
      [ip_ssn, ip_roomNumber, ip_roomType]
    );
  }

  async assign_doctor_to_appointment({ ip_patientId, ip_apptDate, ip_apptTime, ip_doctorId }) {
    return pool.query(
      "CALL assign_doctor_to_appointment(?, ?, ?, ?)",
      [ip_patientId, ip_apptDate, ip_apptTime, ip_doctorId]
    );
  }

  async manage_department({ ip_ssn, ip_deptId }) {
    return pool.query(
      "CALL manage_department(?, ?)",
      [ip_ssn, ip_deptId]
    );
  }

  async release_room({ ip_roomNumber }) {
    return pool.query(
      "CALL release_room(?)",
      [ip_roomNumber]
    );
  }

  async remove_patient({ ip_ssn }) {
    return pool.query(
      "CALL remove_patient(?)",
      [ip_ssn]
    );
  }

  async remove_staff({ ip_ssn }) {
    return pool.query(
      "CALL remove_staff(?)",
      [ip_ssn]
    );
  }

  async remove_staff_from_dept({ ip_ssn, ip_deptId }) {
    return pool.query(
      "CALL remove_staff_from_dept(?, ?)",
      [ip_ssn, ip_deptId]
    );
  }

  async complete_appointment({ ip_patientId, ip_apptDate, ip_apptTime }) {
    return pool.query(
      "CALL complete_appointment(?, ?, ?)",
      [ip_patientId, ip_apptDate, ip_apptTime]
    );
  }

  async complete_orders({ ip_num_orders }) {
    return pool.query(
      "CALL complete_orders(?)",
      [ip_num_orders]
    );
  }
}


module.exports = {
  ProceduresRepository
}