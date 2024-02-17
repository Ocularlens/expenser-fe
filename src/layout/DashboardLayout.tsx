import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddTransactionButton from "../components/transactions/AddTranscationButton";

export default function DashboardLayout() {
  const location = useLocation();

  const isNewTransactionPage = location.pathname === "/new-transaction";

  return (
    <div>
      <Navbar />
      <div className="p-3">
        <Outlet />
        {!isNewTransactionPage && <AddTransactionButton />}
      </div>
    </div>
  );
}
