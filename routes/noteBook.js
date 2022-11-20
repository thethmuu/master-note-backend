const express = require("express");
const {
  getnoteBook,
  getnoteBooks,
  createnoteBook,
  deletenoteBook,
  updatenoteBook,
} = require("../controllers/noteBookController");

const reqireAuth = require("../middleware/requireAuth");

const router = express.Router();
//! require auth for all todoList route
router.use(reqireAuth);

// GET all todoLists
router.get("/", getnoteBooks);

//GET a single todoList
router.get("/:id", getnoteBook);

// POST a new todoList
router.post("/", createnoteBook);

// DELETE a todoList
router.delete("/:id", deletenoteBook);

// UPDATE a todoList
router.patch("/:id", updatenoteBook);

module.exports = router;
