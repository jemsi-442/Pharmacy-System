import { useState, useEffect } from "react";
import SalesForm from "./SalesForm";
import SalesTable from "./SalesTable";
import { getSales, createSale } from "./sales.api";

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    const data = await getSales();
    setSales(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleSubmitSale = async () => {
    if (!cart.length) return;
    await createSale({ medicines: cart, cashier: localStorage.getItem("userId") });
    setCart([]);
    fetchData();
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <SalesForm onSubmit={handleAddToCart} />
        {cart.length > 0 && (
          <button
            onClick={handleSubmitSale}
            className="mt-4 w-full bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Complete Sale
          </button>
        )}
      </div>
      <div className="col-span-2">
        <SalesTable sales={sales} />
      </div>
    </div>
  );
}
