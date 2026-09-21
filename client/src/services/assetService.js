import api from "./api";

// ----------------------------------------
// Get any asset/content
// ----------------------------------------

export const getAsset = async (key) => {
  const response = await api.get(`/assets/${key}`);

  return response.data.data;
};

// ----------------------------------------
// Update any asset/content
// ----------------------------------------

export const updateAsset = async (key, data) => {
  const response = await api.put(`/assets/${key}`, data);

  return response.data.data;
};

// ----------------------------------------
// Convenience functions
// ----------------------------------------

export const getResume = async () => {
  return getAsset("resume");
};

export const getAbout = async () => {
  return getAsset("about");
};

export const getHero = async () => {
  return getAsset("hero");
};

export const getCodingProfiles = async () => {
  return getAsset("coding-profiles");
};

export const getContact = async () => {
  return getAsset("contact");
};

export const getFooter = async () => {
  return getAsset("footer");
};