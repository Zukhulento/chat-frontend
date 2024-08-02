import { ReactNode, useEffect } from "react";
import { Navbar } from "../Components/Navbar";
import api from "../Api/AxiosConfig";
import { useUserStore } from "../Stores/User.store";

type LayoutProps = {
  children: ReactNode;
};
export const PrivateLayout = ({ children }: LayoutProps) => {

const setUserData = useUserStore((state)=>state.setUserData)
  const obtainCurrentUserData = async () => {
    try {
      const response = await api.get("/me");
      const { data } = response;
      setUserData(data)
    } catch (error) {
      console.log("Some error happened obtaining ther current user data.");
    }
  };

  useEffect(() => {
    obtainCurrentUserData();
  }, []);

  return (
    <div className="bg-gray-950 h-screen text-white" id="private-container">
      <Navbar />
      {children}
    </div>
  );
};
