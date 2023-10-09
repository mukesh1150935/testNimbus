import { confessionModel } from "../models/confession.js";

export const getConfession = async (request, response) => {
  try {
    const allConfessions = await confessionModel.find().populate("creator").sort({createdAt: -1});
    response.status(200).json(allConfessions);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};

export const createConfession = async (request, response) => {
  const confession = request.body;

  const newConfession = new confessionModel(confession);
  try {
    await newConfession.save();
    response.status(201).json(newConfession);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};


export const deleteConfession = async (request, response) => {
    try{
        const confessionToDelete=request.params.id;
        await confessionModel.findByIdAndDelete(confessionToDelete); 
        response.status(200).json({message: "Confession deleted",confessionToDelete});

    }catch (error){
        response.status(500).json({message:error.message});
    }
}