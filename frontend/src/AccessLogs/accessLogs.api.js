import axios from "../lib/axios";

export const getAccessLogs = async () => {
  const res = await axios.get("/users/access-log");
  return res.data;
};

export const deleteAccessLog = async (id) => {
  const res = await axios.delete(`/users/access-log/${id}`);
  return res.data;
};
