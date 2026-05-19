import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../features/auth/authThunk";
import Input from "../comman/Input";
import Button from "../comman/Button";
import toast from "react-hot-toast";

const RegisterForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
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
      const result = await dispatch(registerUser(formData)).unwrap();
      console.log("Register result:", result);

      // Handle both direct response and nested data structure
      const message = result?.message || result?.data?.message || "Registration successful! Please login.";
      toast.success(message);

      navigate("/login");
    } catch (error) {
      console.log("Register error:", error);
      toast.error(error || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        glass-card
        rounded-[32px]
        p-8
        md:p-12
        shadow-2xl
      "
    >

      {/* TITLE */}
      <div className="mb-10">

        <h2 className="text-5xl font-black text-white mb-4">
          Create Account
        </h2>

        <p className="text-slate-400 text-lg">
          Start your digital banking journey
        </p>

      </div>

      <div className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input
            label="First Name"
            placeholder="John"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          <Input
            label="Last Name"
            placeholder="Doe"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Phone Number"
          placeholder="Enter phone number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit">
          Create Account
        </Button>

        <div className="text-center pt-2">

          <p className="text-slate-400">

            Already have an account?

            <Link
              to="/login"
              className="text-cyan-400 ml-2 hover:text-cyan-300"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </form>
  );
};

export default RegisterForm;