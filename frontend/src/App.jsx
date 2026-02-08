import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "16px", background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <strong>HRMS Lite</strong> &nbsp; | &nbsp;
        <Link to="/">Home</Link> &nbsp; | &nbsp;
        <Link to="/employees">Employees</Link> &nbsp; | &nbsp;
        <Link to="/attendance">Attendance</Link>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
      </Routes>
    </BrowserRouter>
  );
}
