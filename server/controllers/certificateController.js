import Certificate from "../models/Certificate.js";

export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1 });

    res.json({
      success: true,
      data: certificates,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);

    res.status(201).json({
      success: true,
      data: certificate,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      data: certificate,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Certificate deleted",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};