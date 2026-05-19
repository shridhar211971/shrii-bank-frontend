import { useState } from "react";

import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../features/auth/authThunk";

import Input from "../comman/Input";

import Button from "../comman/Button";
import toast from "react-hot-toast";

const LoginForm = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const result = await dispatch(
        loginUser(formData)
      ).unwrap();

      console.log("Login result:", result);

      // Handle both direct response and nested data structure
      const message = result?.message || result?.data?.message || "Login successful!";
      toast.success(message);

      // Small delay to ensure token is saved before navigation
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);

    } catch (error) {

      console.log("Login error:", error);
      toast.error(error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        bg-white/5
        backdrop-blur-2xl
        border
        border-white/10
        rounded-3xl
        p-8
        md:p-10
        shadow-[0_0_40px_rgba(0,255,255,0.08)]
      "
    >

      <h2 className="text-5xl font-black text-white mb-3">
        Welcome Back
      </h2>

      <p className="text-slate-400 mb-8 text-lg">
        Login to continue your banking journey
      </p>

      <div className="space-y-6">

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="
              text-cyan-400
              text-sm
              hover:text-cyan-300
            "
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit">
          Login
        </Button>

        <div className="text-center pt-2">
          <p className="text-slate-400">
            Don&apos;t have an account?

            <Link
              to="/register"
              className="
                text-cyan-400
                ml-2
                hover:text-cyan-300
              "
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </form>
  );
};

export default LoginForm;