import { ShieldCheck } from "lucide-react";
export {COLORS} from "../constants/colors";

const AuthLayout = ({ children }) => {

  return (

    <div className="relative min-h-screen overflow-hidden bg-background text-white">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-grid opacity-[0.08]" />

      {/* TOP LEFT GLOW */}
      <div className="
        absolute
        top-[-250px]
        left-[-250px]
        w-[650px]
        h-[650px]
        bg-cyan-500/20
        rounded-full
        blur-3xl
      " />

      {/* BOTTOM RIGHT GLOW */}
      <div className="
        absolute
        bottom-[-300px]
        right-[-300px]
        w-[700px]
        h-[700px]
        bg-purple-600/20
        rounded-full
        blur-3xl
      " />

      {/* MAIN CONTENT */}
      <div className="
        relative
        z-10
        min-h-screen
        grid
        lg:grid-cols-2
      ">

        {/* LEFT SIDE */}
        <div className="
          flex
          items-center
          justify-center
          px-8
          md:px-16
          lg:px-24
          py-20
        ">

          <div className="max-w-2xl">

            {/* LOGO */}
            <div className="
              flex
              items-center
              gap-5
              mb-12
            ">

              <div className="
                flex
                items-center
                justify-center
                w-20
                h-20
                rounded-3xl
                bg-cyan-500/10
                border
                border-cyan-400/20
                shadow-[0_0_40px_rgba(0,255,255,0.15)]
              ">

                <ShieldCheck
                  size={42}
                  className="text-cyan-400"
                />

              </div>

              <h1 className="
                text-5xl
                xl:text-6xl
                font-black
                tracking-wide
              ">
                SHRII BANK
              </h1>

            </div>

            {/* HEADING */}
            <h2 className="
              text-6xl
              md:text-7xl
              xl:text-8xl
              font-black
              leading-[1]
              mb-8
            ">

              Smart Banking

              <br />

              <span className="
                bg-gradient-to-r
                from-cyan-400
                via-sky-400
                to-purple-500
                bg-clip-text
                text-transparent
              ">
                For The Future
              </span>

            </h2>

            {/* DESCRIPTION */}
            <p className="
              text-slate-300
              text-xl
              leading-[1.8]
              max-w-2xl
            ">

              Secure transactions, instant transfers,
              financial insights, and seamless digital
              banking designed for modern users.

            </p>

            {/* STATS */}
            <div className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-7
              mt-16
            ">

              <div>

                <h3 className="
                  text-4xl
                  font-black
                  text-cyan-400
                ">
                  24/7
                </h3>

                <p className="
                  mt-2
                  text-slate-400
                ">
                  Banking Support
                </p>

              </div>

              <div >

                <h3 className="
                  text-4xl
                  font-black
                  text-cyan-400
                ">
                  99%
                </h3>

                <p className="
                  mt-2
                  text-slate-400
                ">
                  Secure Transactions
                </p>

              </div>

              <div className="">

                <h3 className="
                  text-4xl
                  font-black
                  text-cyan-400
                ">
                  Fast
                </h3>

                <p className="
                  mt-2
                  text-slate-400
                ">
                  Money Transfers
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="
          flex
          items-center
          justify-center
          px-6
          md:px-10
          lg:px-20
          py-20
        ">

          <div className="
            w-full
            max-w-xl
          ">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;