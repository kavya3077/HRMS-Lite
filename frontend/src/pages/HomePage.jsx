import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container">
      <h1>HRMS Lite</h1>
      <p>Lightweight Human Resource Management System</p>

      <div className="grid">
        <div className="card">
          <h2>Employee Management</h2>
          <p>Add, view and delete employee records.</p>
          <Link to="/employees">
            <button style={{ marginTop: "12px" }}>Go to Employees →</button>
          </Link>
        </div>

        <div className="card">
          <h2>Attendance Management</h2>
          <p>Mark and view daily attendance.</p>
          <Link to="/attendance">
            <button style={{ marginTop: "12px" }}>Go to Attendance →</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
