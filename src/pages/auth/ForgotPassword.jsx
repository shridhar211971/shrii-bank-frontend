import { useState } from "react";

import AuthLayout from "../../layouts/AuthLayout";

import Input from "../../components/comman/Input";
import Button from "../../components/comman/Button";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(email);
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
          Forgot Password
        </h2>

        <p className="text-slate-400 mb-8">
          Receive reset code on email
        </p>

        <div className="space-y-6">

          <Input
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />

          <Button type="submit">
            Send Reset Code
          </Button>

        </div>

      </form>

    </AuthLayout>
  );
};

export default ForgotPassword;