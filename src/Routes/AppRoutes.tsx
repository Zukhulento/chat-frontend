import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../Pages";
import { Home } from "../Pages/Home";
import { useAuthStore } from "../Stores/Auth.store";

export const AppRoutes = () => {
  const token = useAuthStore((state) => state.token);
  return (
    <Routes>
      {token ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Navigate to={"/home"} replace />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to={"/login"} replace />} />
        </>
      )}
    </Routes>
  );
};
