import { useState } from "react";
import api from "../Api/AxiosConfig";
import { PrivateLayout } from "../Layouts/PrivateLayout";
import { toast } from "sonner";
import { useUserStore } from "../Stores/User.store";
import { useAuthStore } from "../Stores/Auth.store";

export const Home = () => {
  const [usersData, setUsersData] = useState("");
  const clearUserData = useUserStore((state) => state.clearUserData);
  const setToken = useAuthStore((state) => state.setToken);
  const getUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log(response);
      setUsersData(response.data);
    } catch (error) {
      toast("Something went wrong", {
        unstyled: true,
        closeButton: true,
        description: "Please login again.",
        duration: 5000,
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
      }, 5500);
    }
  };
  return (
    <PrivateLayout>
      <div className="w-full flex my-8">
        <div className="flex flex-col m-auto text-center">
          <p>Home</p>
          <button
            onClick={getUsers}
            className="bg-gray-700 hover:bg-gray-600 py-1.5 px-2 rounded-lg w-fit m-auto"
          >
            Get Users
          </button>
          <pre className="text-start">{JSON.stringify(usersData, null, 2)}</pre>
        </div>
      </div>
    </PrivateLayout>
  );
};
