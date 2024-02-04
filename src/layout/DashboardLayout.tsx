import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <div className="p-3">
        <Outlet />
      </div>
    </div>
  );
}
