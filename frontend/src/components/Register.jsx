import { useState } from "react";
import api from "../api";
import Button from "./ui/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.post("/api/v1/user/register", {
        name,
        email,
        password,
        passwordConfirm,
      });
      window.location.href = "/login"; // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border mb-4"
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-4"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4"
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="w-full p-2 border mb-4"
          placeholder="Confirm Password"
          required
        />
        <Button type="submit" className="w-full" loading={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
