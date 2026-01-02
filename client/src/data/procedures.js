export default [
  {
    "name": "add_patient",
    "description": "Creates a new patient. Adds person entry if not already present. Ensures no nulls, SSN uniqueness, and non-negative funds.",
    "input_params": [
      "ip_ssn",
      "ip_first_name",
      "ip_last_name",
      "ip_birthdate",
      "ip_address",
      "ip_funds",
      "ip_contact"
    ]
  },
  {
    "name": "record_symptom",
    "description": "Records a new symptom for an appointment. Ensures appointment exists, no duplicates, and no null inputs.",
    "input_params": [
      "ip_patientId",
      "ip_numDays",
      "ip_apptDate",
      "ip_apptTime",
      "ip_symptomType"
    ]
  },
  {
    "name": "book_appointment",
    "description": "Books a future appointment. Ensures no conflicts, patient exists, cost is valid, and patient has enough funds to cover outstanding charges.",
    "input_params": [
      "ip_patientId",
      "ip_apptDate",
      "ip_apptTime",
      "ip_apptCost"
    ]
  },
  {
    "name": "place_order",
    "description": "Places a new medical order (lab work OR prescription). Ensures funds, valid doctor/patient, unique order number, valid priority, and correct null-grouping between lab/prescription.",
    "input_params": [
      "ip_orderNumber",
      "ip_priority",
      "ip_patientId",
      "ip_doctorId",
      "ip_cost",
      "ip_labType",
      "ip_drug",
      "ip_dosage"
    ]
  },
  {
    "name": "add_staff_to_dept",
    "description": "Adds a staff member to a department. Creates missing person/staff records. Ensures department exists, salary >= 0, and staff isn't manager of another dept.",
    "input_params": [
      "ip_deptId",
      "ip_ssn",
      "ip_firstName",
      "ip_lastName",
      "ip_birthdate",
      "ip_startdate",
      "ip_address",
      "ip_staffId",
      "ip_salary"
    ]
  },
  {
    "name": "add_funds",
    "description": "Adds positive funds to an existing patient.",
    "input_params": [
      "ip_ssn",
      "ip_funds"
    ]
  },
  {
    "name": "assign_nurse_to_room",
    "description": "Assigns a nurse to a room. Ensures nurse exists, room exists, not already assigned, and nurse has < 4 rooms.",
    "input_params": [
      "ip_nurseId",
      "ip_roomNumber"
    ]
  },
  {
    "name": "assign_room_to_patient",
    "description": "Assigns a room to a patient. Must be unoccupied. Removes them from previous room. Room type must match.",
    "input_params": [
      "ip_patientId",
      "ip_roomNumber",
      "ip_roomType"
    ]
  },
  {
    "name": "assign_doctor_to_appointment",
    "description": "Assigns a room to a patient. Must be unoccupied. Removes them from previous room. Room type must match.",
    "input_params": [
      "ip_patientId",
      "ip_apptDate",
      "ip_apptTime",
      "ip_doctorId"
    ]
  },
  {
    "name": "manage_dept",
    "description": "Assigns a room to a patient. Must be unoccupied. Removes them from previous room. Room type must match.",
    "input_params": [
      "ip_ssn",
      "ip_deptId",
    ]
  },
  {
    "name": "release room",
    "description": "Assigns a room to a patient. Must be unoccupied. Removes them from previous room. Room type must match.",
    "input_params": [
      "ip_roomNumber",
    ]
  },
  {
    "name": "remove room",
    "description": "Assigns a room to a patient. Must be unoccupied. Removes them from previous room. Room type must match.",
    "input_params": [
      "ip_ssn",
    ]
  },
  {
    "name": "remove  staff dept",
    "description": "Assigns a room to a patient. Must be unoccupied. Removes them from previous room. Room type must match.",
    "input_params": [
      "ip_ssn",
      "ip_deptId"
    ]
  },
  {
    "name": "ckmple  staff dept",
    "description": "Assigns a room to a patient. Must be unoccupied. Removes them from previous room. Room type must match.",
    "input_params": [
      "ip_patientId",
      "ip_apptDate",
      "ip_apptTime"
    ]
  },
  {
    "name": "complete_orders",
    "description": "Assigns a room to a patient. Must be unoccupied. Removes them from previous room. Room type must match.",
    "input_params": [
      "ip_num_orders",
    ]
  }
]
