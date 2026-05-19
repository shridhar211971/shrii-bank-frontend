import { useState } from "react";
import Input from "../comman/Input";
import Button from "../comman/Button";

const RegisterForm = () => {

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
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

            <span className="text-cyan-400 ml-2 cursor-pointer">
              Login
            </span>

          </p>

        </div>

      </div>

    </form>
  );
};

export default RegisterForm;