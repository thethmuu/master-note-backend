const noteBook = require("../models/noteBookModel");
const mongoose = require("mongoose");

// get all todoLists
const getnoteBooks = async (req, res) => {
  const user_id = req.user._id;
  const noteBooks = await noteBook.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(noteBooks);
};

// get a single todoList
const getnoteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such noteBook" });
  }

  const notebook = await noteBook.findById(id);

  if (!notebook) {
    return res.status(404).json({ error: "No such notebook" });
  }

  res.status(200).json(notebook);
};

// create new todoList
const createnoteBook = async (req, res) => {
  const { name } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in the field", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const notebook = await noteBook.create({
      name,
      user_id,
    });
    res.status(200).json(notebook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a todoList
const deletenoteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note Book" });
  }

  const notebook = await noteBook.findOneAndDelete({ _id: id });

  if (!notebook) {
    return res.status(400).json({ error: "No such notebook" });
  }

  res.status(200).json(notebook);
};

// update a todoList
const updatenoteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note book" });
  }

  const notebook = await noteBook.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!notebook) {
    return res.status(400).json({ error: "No such note book" });
  }

  res.status(200).json(req.body);
};

module.exports = {
  getnoteBook,
  getnoteBooks,
  createnoteBook,
  deletenoteBook,
  updatenoteBook,
};
