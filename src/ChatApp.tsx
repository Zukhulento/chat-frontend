import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "./Pages";

export const ChatApp = () => {
  return (
    // En este div se aplican los estilos a todas las páginas
    <div className="font-roboto">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<Navigate to={"/login"} replace />} />
      </Routes>
    </div>
  );
};
