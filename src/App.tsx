import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateOutlet from "./components/PrivateOutlet";
import DashboardLayout from "./layout/DashboardLayout";
import AddCategoryPage from "./pages/AddCategoryPage";
import LoginPage from "./pages/LoginPage";
import NewTransactionPage from "./pages/NewTransactionPage";
import RegisterPage from "./pages/RegisterPage";
import TransactionsPage from "./pages/TransactionsPage";
import UpdateCategoryPage from "./pages/UpdateCategoryPage";
import UpdateTransactionPage from "./pages/UpdateTransactionPage";
import UserCategoriesPage from "./pages/UserCategoriesPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="" element={<DashboardLayout />}>
              <Route path="" element={<TransactionsPage />} />
              <Route path="new-transaction" element={<NewTransactionPage />} />
              <Route path="my-categories" element={<UserCategoriesPage />} />
              <Route path="new-category" element={<AddCategoryPage />} />
              <Route
                path="update-transaction/:id"
                element={<UpdateTransactionPage />}
              />
              <Route
                path="update-category/:id"
                element={<UpdateCategoryPage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
