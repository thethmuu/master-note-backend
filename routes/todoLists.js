const express = require("express");
const {
  createtodoList,
  gettodoLists,
  gettodoList,
  deletetodoList,
  updatetodoList,
} = require("../controllers/todoListController");

const reqireAuth = require("../middleware/requireAuth");

const router = express.Router();
//! require auth for all todoList route
router.use(reqireAuth);

// GET all todoLists
router.get("/", gettodoLists);

//GET a single todoList
router.get("/:id", gettodoList);

// POST a new todoList
router.post("/", createtodoList);

// DELETE a todoList
router.delete("/:id", deletetodoList);

// UPDATE a todoList
router.patch("/:id", updatetodoList);

module.exports = router;
