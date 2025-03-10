import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api";
import Button from "./ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../validationSchema";

const FormError = ({ message }) =>
  message ? <p className="text-red-500 text-xs italic">{message}</p> : null;

const Login = () => {
  const [serverError, setServerError] = useState(""); // Handles server errors
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError(""); // Reset previous errors
    try {
      await api.post("/user/loginUser", data);
      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="max-w-md mx-auto p-6 bg-white rounded shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {serverError && <FormError message={serverError} />}{" "}
        {/* Show server error */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border mb-4 rounded"
            placeholder="Email"
            required
          />
          <FormError message={errors.name?.message} />
          <input
            {...register("password")}
            type="password"
            className="w-full p-2 border mb-4 rounded"
            placeholder="Password"
            required
          />

          <FormError message={errors.password?.message} />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Login
          </Button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
