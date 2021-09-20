import mongoose from "mongoose";
import FactSchema from "../models/factSchema.js";

export const getAllFact = async (req, res) => {
  try {
    //because it getting all data, we need to have await, and call should be async.
    const allFacts = await FactSchema.find();
    console.log(allFacts);
    res.status(200).json(allFacts);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}


export const createFact = async (req, res) => {
  const fact = req.body;
  const newFact = new FactSchema(fact);
  try {
    await newFact.save();
    res.status(201).json(newFact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}



export const updateFact = async (req, res) => {
  const { id: _id } = req.params;
  const factToUpdate = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Fact with this id');

  const updatedFact = await FactSchema.findByIdAndUpdate(_id, { ...factToUpdate, _id }, { new: true });

  res.json(updatedFact);

}



export const deleteFact = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Fact with this id');

  await FactSchema.findByIdAndRemove(id);

  res.json({ message: 'Fact deleted successfully!' });

}





