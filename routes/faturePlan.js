const express = require("express");
const {
  createFaturePlan,
  getFaturePlans,
  getFaturePlan,
  deleteFaturePlan,
  updateFaturePlan,
} = require("../controllers/faturePlanController");

const reqireAuth = require("../middleware/requireAuth");

const router = express.Router();
//! require auth for all todoList route
router.use(reqireAuth);

// GET all todoLists
router.get("/", getFaturePlans);

//GET a single todoList
router.get("/:id", getFaturePlan);

// POST a new todoList
router.post("/", createFaturePlan);

// DELETE a todoList
router.delete("/:id", deleteFaturePlan);

// UPDATE a todoList
router.patch("/:id", updateFaturePlan);

module.exports = router;
