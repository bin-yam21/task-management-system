import { useForm } from "react-hook-form";
import api from "../api";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./ui/Button";
import { signUpSchema } from "../validationSchema";
import { useState } from "react";
import { useNavigate } from "react-router";

// Component to display error messages
const FormError = ({ message }) =>
  message ? <p className="text-red-500 text-xs italic">{message}</p> : null;

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(""); // Handles server errors

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    setServerError(""); // Reset previous errors
    try {
      console.log(data);
      await api.post("/user/register", data);
      reset();
      navigate("/");
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {serverError && <FormError message={serverError} />}{" "}
      {/* Show server error */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            type="text"
            className="w-full p-2 border"
            placeholder="Full Name"
            aria-invalid={errors.name ? "true" : "false"}
          />
          <FormError message={errors.name?.message} />
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border"
            placeholder="Email"
            aria-invalid={errors.email ? "true" : "false"}
          />
          <FormError message={errors.email?.message} />
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            className="w-full p-2 border"
            placeholder="Password"
            aria-invalid={errors.password ? "true" : "false"}
          />
          <FormError message={errors.password?.message} />
        </div>

        <div>
          <input
            {...register("passwordConfirm")}
            type="password"
            className="w-full p-2 border"
            placeholder="Confirm Password"
            aria-invalid={errors.passwordConfirm ? "true" : "false"}
          />
          <FormError message={errors.passwordConfirm?.message} />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
