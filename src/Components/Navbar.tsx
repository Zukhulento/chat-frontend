import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../Stores/User.store";
import api from "../Api/AxiosConfig";
import { toast } from "sonner";
import { useAuthStore } from "../Stores/Auth.store";

export const Navbar = () => {
  const baseName = import.meta.env.VITE_BASENAME;
  // Controlador de configuraciones de usuario, para mostrar o no las configuraciones
  const [mostrarUserSettings, setMostrar] = useState<boolean>(false);
  // Obteniendo funciones para desloguear
  const clearUserData = useUserStore((state) => state.clearUserData);
  const setToken = useAuthStore((state) => state.setToken);
  //   Obteniendo datos de usuario
  const userName = useUserStore((state) => state.user);
  const onLogOut = async () => {
    try {
      const response = await api.post("/logout");
      console.log(response);
      const { status } = response;
      if (status == 200) {
        toast("Loggout", {
          unstyled: true,
          closeButton: true,
          description: "Loggout successfull",
          duration: 5000,
          classNames: {
            toast: "bg-yellow-200 rounded-xl flex p-4",
            title: "text-black text-xl",
            description: "text-gray-600",
            closeButton: "bg-yellow-500 hover:bg-yellow-600",
          },
        });
        clearUserData();
        setToken(null);
      }
    } catch (error) {
      toast("Something went wrong", {
        unstyled: true,
        closeButton: true,
        description: "Please login again.",
        duration: 2000,
        classNames: {
          toast: "bg-red-200 rounded-xl flex p-4",
          title: "text-red-500 text-xl",
          description: "text-red-400",
          closeButton: "bg-red-500 hover:bg-red-600",
          icon: "text-red-500",
        },
      });
      setTimeout(() => {
        clearUserData();
        setToken(null);
      }, 1000);
    }
  };

  // TODO Funciones para mostrar o no los ajustes del usuario
  const changeStateUserSettings = () => {
    setMostrar(!mostrarUserSettings);
  };
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setMostrar(false);
    }
  };
  // ? Esta parte es del menu desplegable de la foto de usuario
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);
  return (
    <nav className="sticky top-0 left-0 w-full h-16 bg-gray-800 flex justify-between p-2">
      <div className="flex my-auto ">
        <Link to={"/home"}>
          <img
            src={`${baseName}/Images/chat.png`}
            alt="logo"
            className="w-12 bg-white rounded-lg hover:scale-105 transition-all"
          />
        </Link>
      </div>
      <div className="my-auto flex">
        <button className="w-12" onClick={() => changeStateUserSettings()}>
          <img
            src={`${baseName}/Images/menu.png`}
            alt="menu"
            className="w-full bg-white rounded-lg hover:scale-105 transition-all"
          />
        </button>
        {/* Aquí se valida si se puede o no mostrar los ajustes del usuario */}
        <div
          ref={ref}
          className={`z-50 ${
            mostrarUserSettings ? " " : " hidden "
          }text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute min-w-32 top-16 right-0 `}
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 ">
              Logged as: {userName}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="boton-menu-usuario">
            <li>
              <button
                onClick={onLogOut}
                className="w-full text-start  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
