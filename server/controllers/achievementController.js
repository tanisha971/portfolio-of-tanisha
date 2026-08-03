import Achievement from "../models/Achievement.js";

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ order: 1 });

    res.json({
      success: true,
      data: achievements,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);

    res.status(201).json({
      success: true,
      data: achievement,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: achievement,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Achievement deleted",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};