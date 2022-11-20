const todoList = require("../models/todoListModel");
const mongoose = require("mongoose");

// get all todoLists
const gettodoLists = async (req, res) => {
  const user_id = req.user._id;
  const todoLists = await todoList.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(todoLists);
};

// get a single todoList
const gettodoList = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todoList" });
  }

  const todolist = await todoList.findById(id);

  if (!todolist) {
    return res.status(404).json({ error: "No such todoList" });
  }

  res.status(200).json(todolist);
};

// create new todoList
const createtodoList = async (req, res) => {
  const { title, date } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!date) {
    emptyFields.push("date");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in the field", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const todolist = await todoList.create({
      title,

      date,
      user_id,
    });
    res.status(200).json(todolist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a todoList
const deletetodoList = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todoList" });
  }

  const todolist = await todoList.findOneAndDelete({ _id: id });

  if (!todoList) {
    return res.status(400).json({ error: "No such todoList" });
  }

  res.status(200).json(todolist);
};

// update a todoList
const updatetodoList = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todoList" });
  }

  const todolist = await todoList.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!todolist) {
    return res.status(400).json({ error: "No such todoList" });
  }

  res.status(200).json(req.body);
};

module.exports = {
  gettodoLists,
  gettodoList,
  createtodoList,
  deletetodoList,
  updatetodoList,
};
