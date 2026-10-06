import { useEffect, useState } from "react";
import MedicineForm from "./MedicineForm";
import MedicineTable from "./MedicineTable";
import { getMedicines, createMedicine, updateMedicine, deleteMedicine } from "./medicine.api";

export default function MedicinePage() {
  const [medicines, setMedicines] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchData = async () => {
    const data = await getMedicines();
    setMedicines(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (form) => {
    if (editItem) {
      await updateMedicine(editItem._id, form);
      setEditItem(null);
    } else {
      await createMedicine(form);
    }
    fetchData();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete?")) {
      await deleteMedicine(id);
      fetchData();
    }
  };

  const handleEdit = (med) => {
    setEditItem(med);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <MedicineForm onSubmit={handleSubmit} defaultValues={editItem} />
      <div className="col-span-2">
        <MedicineTable medicines={medicines} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
