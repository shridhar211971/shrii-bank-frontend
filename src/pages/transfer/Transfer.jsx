import DashboardLayout from "../../layouts/DashboardLayout";

import TransferForm from "../../components/forms/TransferForm";

const Transfer = () => {

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
            Transfer Funds
          </h1>

          <p className="text-slate-400">
            Send money securely
          </p>

        </div>

        <TransferForm />

      </div>

    </DashboardLayout>
  );
};

export default Transfer;