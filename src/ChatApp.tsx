import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";

export const ChatApp = () => {
  return (
    // En este div se aplican los estilos a todas las páginas
    <div className="font-roboto">
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
};
