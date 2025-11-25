export default [
  {
    name: "room_wise_view",
    description:
      "Overview of room assignments including patients, doctors, nurses, and managing departments.",
    column_count: 7,
    columns: [
      "patientFirstName",
      "patientLastName",
      "roomNumber",
      "departmentName",
      "doctorFirstName",
      "doctorLastName",
      "nurseName"
    ]
  },
  {
    name: "symptoms_overview_view",
    description:
      "Shows appointments with grouped symptoms for each patient.",
    column_count: 5,
    columns: [
      "ssn",
      "fullName",
      "apptDate",
      "apptTime",
      "symptoms"
    ]
  },
  {
    name: "medical_staff_view",
    description:
      "Displays doctors and nurses with license info, job info, departments worked in, and assignment counts.",
    column_count: 6,
    columns: [
      "ssn",
      "staffType",
      "licenseInfo",
      "jobInfo",
      "departments",
      "numAssignments"
    ]
  },
  {
    name: "department_view",
    description:
      "Displays each department with total staff, doctor count, and nurse count.",
    column_count: 4,
    columns: [
      "longName",
      "numStaff",
      "numDoctors",
      "numNurses"
    ]
  },
  {
    name: "outstanding_charges_view",
    description:
      "Displays outstanding charges, patient info, and counts of appointments and orders.",
    column_count: 7,
    columns: [
      "ssn",
      "firstName",
      "lastName",
      "funds",
      "appointmentCount",
      "orderCount",
      "outstandingCharges"
    ]
  }
];
