import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const ChangePassword = () => {

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

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);
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