import Skill from "../models/Skill.js";

/*
GET ALL
*/

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({
      category: 1,
      order: 1,
    });

    res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
CREATE
*/

export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
UPDATE
*/

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
DELETE
*/

export const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Skill Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};