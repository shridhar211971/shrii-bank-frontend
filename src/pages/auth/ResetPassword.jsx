import { useState } from "react";

import AuthLayout from "../../layouts/AuthLayout";

import Input from "../../components/comman/Input";
import Button from "../../components/comman/Button";

const ResetPassword = () => {

  const [formData, setFormData] = useState({
    code: "",
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
    <AuthLayout>

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-10
        "
      >

        <h2
          className="
            text-4xl
            font-black
            text-white
            mb-3
          "
        >
          Reset Password
        </h2>

        <p className="text-slate-400 mb-8">
          Enter code and new password
        </p>

        <div className="space-y-6">

          <Input
            label="Reset Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />

          <Input
            label="New Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit">
            Reset Password
          </Button>

        </div>

      </form>

    </AuthLayout>
  );
};

export default ResetPassword;