import { ChangeEvent, FormEvent, useState } from "react";
import { PublicLayout } from "../Layouts/PublicLayout";
import { Link } from "react-router-dom";
import api from "../Api/AxiosConfig";
import { useAuthStore } from "../Stores/Auth.store";
import { toast } from "sonner";
// types
export interface FormData {
  user: string;
  password: string;
}

export interface FormErrors {
  user?: string;
  password?: string;
}

export const LoginPage = () => {
  const formInit = {
    user: "",
    password: "",
  };
  const [formData, setFormData] = useState<FormData>(formInit);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const setToken = useAuthStore((state) => state.setToken);
  // Function to control change on input
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Function to validate the form on submit
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.user) errors.user = "Email or user is required.";
    if (!formData.password) errors.password = "Password is required.";

    return errors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast("Please fill the fields", {
        unstyled: true,
        closeButton: true,
        description: "Check the required form fields.",
        duration: 5000,
        classNames: {
          toast: "bg-red-200 rounded-xl flex p-4",
          title: "text-red-500 text-xl",
          description: "text-red-400",
          closeButton: "bg-red-500 hover:bg-red-600",
          icon: "text-red-500",
        },
      });
    } else {
      // Handle form submission, e.g., send data to an API
      console.log("Form data submitted:", formData);
      try {
        const response = await api.post("/login", { ...formData });
        if (response.status == 200) {
          const { access_token } = response.data;
          setToken(access_token);
          setFormErrors({});
          setFormData({ user: "", password: "" });
        }
      } catch (error) {
        setFormErrors(errors);
        toast.error("Not valid credentials", {
          unstyled: true,
          closeButton: true,
          description: "Your password or email is incorrect",
          duration: 5000,
          classNames: {
            toast: "bg-red-200 rounded-xl flex p-4",
            title: "text-red-500 text-xl",
            description: "text-red-400",
            closeButton: "bg-red-500 hover:bg-red-600",
            icon: "text-red-500",
          },
        });
      }
    }
  };
  const baseName = import.meta.env.VITE_BASENAME;

  return (
    <PublicLayout>
      <div className="m-auto flex flex-col gap-4">
        <img
          src={`${baseName}/Images/chat.png`}
          alt="logo"
          className="w-12 bg-gray-50 rounded-lg m-auto"
        />
        <div className="p-4 rounded-lg bg-gray-800 text-white w-80">
          <p className="text-2xl text-center mb-4">Login Form</p>
          {/* User or email */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* User */}
            <div className="flex flex-col gap-1">
              <label htmlFor="user" className="text-sm select-none">
                User
              </label>
              <input
                type="text"
                className="bg-gray-600 rounded-md p-1"
                placeholder="User or email"
                name="user"
                id="user"
                value={formData.user}
                onChange={handleChange}
              />
            </div>
            {/* Contraseña */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm select-none">
                Password
              </label>
              <input
                type="password"
                className="bg-gray-600 rounded-md p-1"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Link
              to={"/register"}
              className="text-sm text-gray-200 hover:text-white"
            >
              Not Registered?
            </Link>
            {/* Errores */}
            {(formErrors.user || formErrors.password) && (
              <div className="flex flex-col rounded-md p-1 bg-red-200 border border-red-300 text-red-500">
                <p>{formErrors.user}</p>
                <p>{formErrors.password}</p>
              </div>
            )}
            <button className="bg-gray-700 rounded-sm w-fit py-1.5 px-2 m-auto hover:bg-gray-600">
              Login
            </button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
};
