import { ShieldCheck } from "lucide-react";

const AuthLayout = ({ children }) => {
  return (
  <div className="min-h-screen bg-[#050816] flex flex-col lg:flex-row overflow-hidden relative bg-grid">

    {/* GLOW EFFECTS */}
    <div className="absolute top-[-250px] left-[-250px] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl" />

    <div className="absolute bottom-[-250px] right-[-250px] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl" />

    {/* LEFT SIDE */}
    <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16 lg:px-20 relative">

      <div className="relative z-10 max-w-2xl">

        <div className="flex items-center gap-5 mb-10">

          <div className="p-5 rounded-3xl bg-cyan-500/10 border border-cyan-400/20 glow-cyan">

            <ShieldCheck
              size={50}
              className="text-cyan-400"
            />

          </div>

          <h1 className="text-5xl xl:text-6xl font-black tracking-wide">
            SHRII BANK
          </h1>

        </div>

        <h2 className="text-5xl md:text-6xl xl:text-7xl font-black leading-tight mb-8">

          Smart Banking
          <br />

          <span className="gradient-text">
            For The Future
          </span>

        </h2>

        <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl">

          Secure transactions, instant transfers,
          financial insights, and seamless digital banking
          designed for modern users.

        </p>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14">

          <div className="glass-card rounded-3xl p-6">

            <h3 className="text-3xl font-bold text-cyan-400">
              24/7
            </h3>

            <p className="text-slate-400 mt-2">
              Banking Support
            </p>

          </div>

          <div className="glass-card rounded-3xl p-6">

            <h3 className="text-3xl font-bold text-cyan-400">
              99%
            </h3>

            <p className="text-slate-400 mt-2">
              Secure Transactions
            </p>

          </div>

          <div className="glass-card rounded-3xl p-6">

            <h3 className="text-3xl font-bold text-cyan-400">
              Fast
            </h3>

            <p className="text-slate-400 mt-2">
              Money Transfers
            </p>

          </div>

        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 lg:p-20 relative z-10">

      <div className="w-full max-w-xl">
        {children}
      </div>

    </div>

  </div>
);
};

export default AuthLayout;