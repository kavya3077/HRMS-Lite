const API_BASE = "http://localhost:8000";

export async function getEmployees() {
  const res = await fetch(`${API_BASE}/api/employees`);
  return res.json();
}

export async function addEmployee(data) {
  const res = await fetch(`${API_BASE}/api/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }
}

export async function deleteEmployee(id) {
  await fetch(`${API_BASE}/api/employees/${id}`, { method: "DELETE" });
}

export async function markAttendance(data) {
  await fetch(`${API_BASE}/api/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getAttendance(id) {
  const res = await fetch(`${API_BASE}/api/attendance/${id}`);
  return res.json();
}
