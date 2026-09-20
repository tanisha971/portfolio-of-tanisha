import api from "./api";

export const getCertificates = async (filters = {}) => {
  const res = await api.get("/certificates", {
    params: filters,
  });

  return res.data.data;
};

export const createCertificate = async (data) => {
  const res = await api.post("/certificates", data);
  return res.data.data;
};

export const updateCertificate = async (id, data) => {
  const res = await api.put(`/certificates/${id}`, data);
  return res.data.data;
};

export const deleteCertificate = async (id) => {
  await api.delete(`/certificates/${id}`);
};