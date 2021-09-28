import mongoose from "mongoose";
import Facts from "../models/facts.js";

//because it getting all data, we need to have await, and call should be async.
export const getAllFact = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Facts.countDocuments({});
    const allFacts = await Facts.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.json({ data: allFacts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getFact = async (req, res) => {
  const { id } = req.params;

  try {
    const fact = await Facts.findById(id);

    res.status(200).json(fact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getFactBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const message = new RegExp(searchQuery, "i");    // i means ignore case
    const factsBySearch = await Facts.find({ $or: [{ message }, { tags: { $in: tags.split(',') } }] });
    res.json({ data: factsBySearch })
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



