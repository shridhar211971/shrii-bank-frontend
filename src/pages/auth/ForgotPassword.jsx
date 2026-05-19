import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../features/auth/authThunk";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/comman/Input";
import Button from "../../components/comman/Button";
import toast from "react-hot-toast";

const ForgotPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const result = await dispatch(forgotPassword({ email })).unwrap();
      console.log("Forgot password result:", result);

      // Handle both direct response and nested data structure
      const message = result?.message || result?.data?.message || "Reset code sent to your email!";
      toast.success(message);

      navigate("/reset-password");
    } catch (error) {
      console.log("Forgot password error:", error);
      toast.error(error || "Failed to send reset code");
    }
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