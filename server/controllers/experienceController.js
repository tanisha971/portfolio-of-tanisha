import Experience from "../models/Experience.js";


// GET ALL EXPERIENCES

export const getExperiences = async (req, res) => {
  try {

    const experiences = await Experience.find().sort({ order: 1 });

    res.json({
      success: true,
      count: experiences.length,
      data: experiences,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ADD EXPERIENCE

export const createExperience = async (req, res) => {
  try {

    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      data: experience,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};


// UPDATE EXPERIENCE

export const updateExperience = async (req, res) => {
  try {

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      data: experience,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};


// DELETE EXPERIENCE

export const deleteExperience = async (req, res) => {

  try {

    await Experience.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Experience deleted",
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};