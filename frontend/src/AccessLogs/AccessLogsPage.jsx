import { useState, useEffect } from "react";
import AccessLogsTable from "./AccessLogsTable";
import { getAccessLogs, deleteAccessLog } from "./accessLogs.api";

export default function AccessLogsPage() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const data = await getAccessLogs();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete this log?")) {
      await deleteAccessLog(id);
      fetchLogs();
    }
  };

  return (
    <div className="p-6">
      <AccessLogsTable logs={logs} onDelete={handleDelete} />
    </div>
  );
}
