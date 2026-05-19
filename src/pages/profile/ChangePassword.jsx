import { useState } from "react";
import { useDispatch } from "react-redux";
import DashboardLayout from "../../layouts/DashboardLayout";
import Input from "../../components/comman/Input";
import Button from "../../components/comman/Button";
import toast from "react-hot-toast";
import { updatePassword } from "../../features/profile/profileThunk";

const ChangePassword = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
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
      const result = await dispatch(updatePassword(formData)).unwrap();
      console.log("Update password result:", result);

      // Handle both direct response and nested data structure
      const message = result?.message || result?.data?.message || "Password updated successfully!";
      toast.success(message);

      setFormData({ oldPassword: "", newPassword: "" });
    } catch (error) {
      console.log("Update password error:", error);
      toast.error(error || "Failed to update password");
    }
  };

  return (
    <DashboardLayout>

      <div className="space-y-10">

        <div>

          <h1
            className="
              text-5xl
              font-black
              text-white
              mb-3
            "
          >
            Change Password
          </h1>

          <p className="text-slate-400">
            Update your account password
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
            max-w-2xl
          "
        >

          <div className="space-y-6">

            <Input
              label="Current Password"
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
            />

            <Input
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <Button type="submit">
              Update Password
            </Button>

          </div>

        </form>

      </div>

    </DashboardLayout>
  );
};

export default ChangePassword;