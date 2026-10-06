import axios from "../../lib/axios";

export const getMedicines = async () => {
  const res = await axios.get("/medicines");
  return res.data;
};

export const createMedicine = async (data) => {
  const res = await axios.post("/medicines", data);
  return res.data;
};

export const updateMedicine = async (id, data) => {
  const res = await axios.put(`/medicines/${id}`, data);
  return res.data;
};

export const deleteMedicine = async (id) => {
  const res = await axios.delete(`/medicines/${id}`);
  return res.data;
};
