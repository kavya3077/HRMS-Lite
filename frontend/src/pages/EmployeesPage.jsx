import { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "../services/api";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const loadEmployees = async () => {
    setEmployees(await getEmployees());
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const submit = async () => {
    await addEmployee(form);
    setForm({ employeeId: "", fullName: "", email: "", department: "" });
    loadEmployees();
  };

  return (
    <div className="container">
      <h2>Employee Management</h2>

      <div className="card">
        <h3>Add Employee</h3>

        <div className="grid">
          <input
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          />
          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
        </div>

        <br />
        <button onClick={submit}>Add Employee</button>
      </div>

      <div className="card">
        <h3>Employee List</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.employeeId}>
                <td>{e.employeeId}</td>
                <td>{e.fullName}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>
                  <button
                    className="danger"
                    onClick={() => {
                      deleteEmployee(e.employeeId);
                      loadEmployees();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
