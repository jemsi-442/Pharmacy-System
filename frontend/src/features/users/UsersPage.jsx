import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import { getUsers, createUser, updateUser, deleteUser } from "./users.api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchData = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (form) => {
    if (editItem) {
      await updateUser(editItem._id, form);
      setEditItem(null);
    } else {
      await createUser(form);
    }
    fetchData();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete this user?")) {
      await deleteUser(id);
      fetchData();
    }
  };

  const handleEdit = (user) => {
    setEditItem(user);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <UserForm onSubmit={handleSubmit} defaultValues={editItem} />
      <div className="col-span-2">
        <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
