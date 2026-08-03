import api from "./api";

export const getSkills = async () => {
  const res = await api.get("/skills");
  return res.data.data;
};

export const createSkill = async (skill) => {
  const res = await api.post("/skills", skill);
  return res.data.data;
};

export const updateSkill = async (id, skill) => {
  const res = await api.put(`/skills/${id}`, skill);
  return res.data.data;
};

export const deleteSkill = async (id) => {
  await api.delete(`/skills/${id}`);
};