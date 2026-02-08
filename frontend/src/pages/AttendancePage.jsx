import { useEffect, useState } from "react";
import { getEmployees, markAttendance, getAttendance } from "../services/api";

export default function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  const submit = async (status) => {
    await markAttendance({
      employeeId: selected,
      date: new Date().toISOString().split("T")[0],
      status,
    });
    setRecords(await getAttendance(selected));
  };

  return (
    <div className="container">
      <h2>Attendance Management</h2>

      <div className="card">
        <h3>Mark Attendance</h3>

        <select onChange={(e) => setSelected(e.target.value)}>
          <option value="">Select employee</option>
          {employees.map((e) => (
            <option key={e.employeeId} value={e.employeeId}>
              {e.fullName}
            </option>
          ))}
        </select>

        <br /><br />

        <div className="grid">
          <button onClick={() => submit("Present")}>Present</button>
          <button className="secondary" onClick={() => submit("Absent")}>
            Absent
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Attendance Records</h3>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
