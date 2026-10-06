import axios from "../../lib/axios";

export const getSales = async () => {
  const res = await axios.get("/sales");
  return res.data;
};

export const createSale = async (data) => {
  const res = await axios.post("/sales", data);
  return res.data;
};
