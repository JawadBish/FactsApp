import FactSchema from "../models/factSchema.js";

export const getAllFact =  async (req,res) => {
  try {
//because it getting all data, we need to have await, and call should be async.
    const allFacts =  await FactSchema.find();
    console.log(allFacts);
    res.status(200).json(allFacts);
  } catch (error) {
   res.status(404).json({ message: error.message })   
  }
}


export const createFact = async (req,res) => {
  const fact = req.body;
  const newFact = new FactSchema(fact);
    try {
       await newFact.save();
       res.status(201).json(newFact);
   } catch (error) {
       res.status(400).json({message: error.message});
   }
}

