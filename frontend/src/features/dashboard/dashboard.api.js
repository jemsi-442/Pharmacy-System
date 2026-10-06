import axios from "../../lib/axios";

export const getDashboardStats = async () => {
  const [medicinesRes, salesRes, usersRes] = await Promise.all([
    axios.get("/medicines"),
    axios.get("/sales"),
    axios.get("/users"),
  ]);

  const lowStock = medicinesRes.data.filter((m) => m.quantity < 10);
  const totalSales = salesRes.data.reduce((acc, s) => acc + s.total, 0);
  const totalUsers = usersRes.data.length;

  return { lowStock, totalSales, totalUsers, medicines: medicinesRes.data, sales: salesRes.data };
};
