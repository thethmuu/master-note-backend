const FaturePlan = require("../models/faturePlanModel");
const mongoose = require("mongoose");

// get all todoLists
const getFaturePlans = async (req, res) => {
  const user_id = req.user._id;
  const faturePlans = await FaturePlan.find({ user_id }).sort({
    createdAt: -1,
  });

  res.status(200).json(faturePlans);
};

// get a single todoList
const getFaturePlan = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Fature Plan" });
  }

  const fautrePlan = await FaturePlan.findById(id);

  if (!fautrePlan) {
    return res.status(404).json({ error: "No such fature plan" });
  }

  res.status(200).json(fautrePlan);
};

// create new todoList
const createFaturePlan = async (req, res) => {
  const { title, description, time } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!description) {
    emptyFields.push("description");
  }
  if (!time) {
    emptyFields.push("time");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in the field", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const faturePlan = await FaturePlan.create({
      title,
      description,
      time,
      user_id,
    });
    res.status(200).json(faturePlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a todoList
const deleteFaturePlan = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such fature plan" });
  }

  const faturePlan = await FaturePlan.findOneAndDelete({ _id: id });

  if (!faturePlan) {
    return res.status(400).json({ error: "No such faturePlan" });
  }

  res.status(200).json(faturePlan);
};

// update a todoList
const updateFaturePlan = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such fature plan" });
  }

  const faturePlan = await FaturePlan.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!faturePlan) {
    return res.status(400).json({ error: "No such fature plan" });
  }

  res.status(200).json(req.body);
};

module.exports = {
  getFaturePlans,
  getFaturePlan,
  createFaturePlan,
  deleteFaturePlan,
  updateFaturePlan,
};
