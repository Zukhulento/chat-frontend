
import { Toaster } from "sonner";
import { AppRoutes } from "./Routes/AppRoutes";

export const ChatApp = () => {
  
  return (
    // En este div se aplican los estilos a todas las páginas
    <div className="font-roboto">
      <AppRoutes />
      <Toaster offset={"0px"}/>
    </div>
  );
};
