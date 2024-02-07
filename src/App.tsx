import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateOutlet from "./components/PrivateOutlet";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="" element={<DashboardLayout />}>
              <Route path="" element={<DashboardPage />} />
              <Route path="transactions"  element={<TransactionsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
