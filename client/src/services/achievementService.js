import api from "./api";

export const getAchievements = async () => {
  const res = await api.get("/achievements");
  return res.data.data;
};

export const createAchievement = async (data) => {
  const res = await api.post("/achievements", data);
  return res.data.data;
};

export const updateAchievement = async (id, data) => {
  const res = await api.put(`/achievements/${id}`, data);
  return res.data.data;
};

export const deleteAchievement = async (id) => {
  await api.delete(`/achievements/${id}`);
};