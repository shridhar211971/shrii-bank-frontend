import { useState } from "react";
import { useDispatch } from "react-redux";
import { transferMoney } from "../../features/transaction/transactionThunk";
import Input from "../comman/Input";
import Button from "../comman/Button";
import toast from "react-hot-toast";

const TransferForm = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
    description: "",
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
      const result = await dispatch(transferMoney(formData)).unwrap();
      console.log("Transfer result:", result);

      // Handle both direct response and nested data structure
      const message = result?.message || result?.data?.message || "Transfer successful!";
      toast.success(message);

      setFormData({ accountNumber: "", amount: "", description: "" });
    } catch (error) {
      console.log("Transfer error:", error);
      toast.error(error || "Transfer failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-8
        max-w-2xl
      "
    >

      <h2
        className="
          text-3xl
          font-black
          text-white
          mb-8
        "
      >
        Transfer Money
      </h2>

      <div className="space-y-6">

        <Input
          label="Receiver Account Number"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          placeholder="Enter account number"
        />

        <Input
          label="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Payment note"
        />

        <Button type="submit">
          Send Transfer
        </Button>

      </div>

    </form>
  );
};

export default TransferForm;