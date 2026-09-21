import Asset from "../models/Asset.js";

// ----------------------------------------
// GET ASSET
// Example:
// GET /api/assets/about
// GET /api/assets/resume
// GET /api/assets/hero
// ----------------------------------------

export const getAsset = async (req, res) => {
  try {
    const asset = await Asset.findOne({
      key: req.params.key,
      isActive: true,
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    return res.json({
      success: true,
      data: asset,
    });
  } catch (error) {
    console.error("Get asset error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------------------------
// CREATE / UPDATE ASSET
// Protected route
// ----------------------------------------

export const upsertAsset = async (req, res) => {
  try {
    const { key } = req.params;

    const {
      type,
      name,
      url,
      data,
      description,
      isActive,
      order,
    } = req.body;

    if (!type || !name) {
      return res.status(400).json({
        success: false,
        message: "Type and name are required",
      });
    }

    const asset = await Asset.findOneAndUpdate(
      { key },
      {
        $set: {
          type,
          name,
          url: url || "",
          data: data || {},
          description: description || "",
          isActive:
            typeof isActive === "boolean"
              ? isActive
              : true,
          order: order || 0,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.json({
      success: true,
      message: "Asset saved successfully",
      data: asset,
    });
  } catch (error) {
    console.error("Upsert asset error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};