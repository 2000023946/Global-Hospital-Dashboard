const express = require("express");
const router = express.Router();
const { ProceduresRepository } = require("../Repository/procedures"); // adjust path

const proceduresRepo = new ProceduresRepository();

const handleProcedure = async (req, res, procFunc, name) => {
  try {
    const data = await procFunc(req.body); // use req.body for POST input
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to execute ${name}` });
  }
};

// Routes for all procedures
router.post("/add_patient", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.add_patient, "add_patient");
});

router.post("/record_symptom", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.record_symptom, "record_symptom");
});

router.post("/book_appointment", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.book_appointment, "book_appointment");
});

router.post("/place_order", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.place_order, "place_order");
});

router.post("/add_staff_to_dept", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.add_staff_to_dept, "add_staff_to_dept");
});

router.post("/add_funds", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.add_funds, "add_funds");
});

router.post("/assign_nurse_to_room", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.assign_nurse_to_room, "assign_nurse_to_room");
});

router.post("/assign_room_to_patient", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.assign_room_to_patient, "assign_room_to_patient");
});

router.post("/assign_doctor_to_appointment", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.assign_doctor_to_appointment, "assign_doctor_to_appointment");
});

router.post("/manage_department", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.manage_department, "manage_department");
});

router.post("/release_room", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.release_room, "release_room");
});

router.post("/remove_patient", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.remove_patient, "remove_patient");
});

router.post("/remove_staff", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.remove_staff, "remove_staff");
});

router.post("/remove_staff_from_dept", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.remove_staff_from_dept, "remove_staff_from_dept");
});

router.post("/complete_appointment", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.complete_appointment, "complete_appointment");
});

router.post("/complete_orders", async (req, res) => {
  await handleProcedure(req, res, proceduresRepo.complete_orders, "complete_orders");
});

module.exports = router;
