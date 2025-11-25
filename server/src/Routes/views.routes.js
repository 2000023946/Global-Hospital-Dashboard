const express = require("express");
const router = express.Router();
const { ViewsRepository } = require("../Repository/views"); // adjust path

const viewsRepo = new ViewsRepository();

const handleView = async (req, res, getter, name) => {
  try {
    const data = await getter();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to fetch ${name}` });
  }
};

// Routes
router.get("/room_wise_view", async (req, res) => {
  await handleView(req, res, viewsRepo.room_wise_view.bind(viewsRepo), 'room_wise_view');
});

router.get("/symptoms_overview_view", async (req, res) => {
  await handleView(req, res, viewsRepo.symptoms_overview_view.bind(viewsRepo), 'symptoms_overview_view');
});

router.get("/medical_staff_view", async (req, res) => {
  await handleView(req, res, viewsRepo.medical_staff_view.bind(viewsRepo), 'medical_staff_view');
});

router.get("/department_view", async (req, res) => {
  await handleView(req, res, viewsRepo.department_view.bind(viewsRepo), 'department_view');
});

router.get("/outstanding_charges_view", async (req, res) => {
  await handleView(req, res, viewsRepo.outstanding_charges_view.bind(viewsRepo), 'outstanding_charges_view');
});

module.exports = router;
