import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddButton from "../components/transactions/AddButton";

export default function DashboardLayout() {
  const location = useLocation();

  const hideAddTransactionButton = (path: string) => {
    if (path === "/new-transaction") return true;

    if (path.includes("/update-transaction")) return true;
  };

  const showAddTransactionPage = hideAddTransactionButton(location.pathname);

  return (
    <>
      <Navbar />
      <div className="p-3">
        <Outlet />
        {!showAddTransactionPage && <AddButton />}
      </div>
    </>
  );
}
