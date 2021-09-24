import mongoose from "mongoose";
import Facts from "../models/facts.js";

export const getAllFact = async (req, res) => {
  try {
    //because it getting all data, we need to have await, and call should be async.
    const allFacts = await Facts.find();
    console.log(allFacts);
    res.status(200).json(allFacts);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}


export const createFact = async (req, res) => {
  const fact = req.body;
  const newFact = new Facts({ ...fact, creator: req.userId, createdAt: new Date().toISOString() });
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

  const updatedFact = await Facts.findByIdAndUpdate(_id, { ...factToUpdate, _id }, { new: true });

  res.json(updatedFact);

}



export const deleteFact = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Fact with this id');

  await Facts.findByIdAndRemove(id);

  res.json({ message: 'Fact deleted successfully!' });

}


export const likeFact = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }


  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Fact with this id: ${id}`);

  const fact = await Facts.findById(id);

  const index = fact.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    fact.likes.push(req.userId);
  } else {
    fact.likes = fact.likes.filter((id) => id !== String(req.userId));
  }

  const updatedFact = await Facts.findByIdAndUpdate(id, fact, { new: true })
  res.status(200).json(updatedFact);
}



