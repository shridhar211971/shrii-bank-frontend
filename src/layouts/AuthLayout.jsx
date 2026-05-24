import { ShieldCheck } from "lucide-react";
export { COLORS } from "../constants/colors";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--body-bg)] text-[var(--body-text)]">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-grid opacity-[0.08]" />

      {/* TOP LEFT GLOW */}
      <div
        className="
          absolute
          top-[-250px]
          left-[-250px]
          w-[500px]
          h-[500px]
          sm:w-[650px]
          sm:h-[650px]
          bg-cyan-500/20
          rounded-full
          blur-3xl
        "
      />

      {/* BOTTOM RIGHT GLOW */}
      <div
        className="
          absolute
          bottom-[-300px]
          right-[-300px]
          w-[500px]
          h-[500px]
          sm:w-[700px]
          sm:h-[700px]
          bg-purple-600/20
          rounded-full
          blur-3xl
        "
      />

      {/* MAIN CONTENT */}
      <div
        className="
          relative
          z-10
          min-h-screen
          grid
          grid-cols-1
          lg:grid-cols-2
        "
      >

        {/* LEFT SIDE */}
        <div
          className="
            flex
            items-center
            justify-center
            px-5
            sm:px-8
            md:px-12
            lg:px-20
            py-10
            md:py-14
            lg:py-20
          "
          style={{marginLeft:"20px"}}
        >

          <div className="w-full max-w-2xl">

            {/* LOGO */}
            <div
              className="
                flex
                items-center
                gap-3
                sm:gap-5
                mb-8
                sm:mb-10
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-14
                  h-14
                  sm:w-16
                  sm:h-16
                  md:w-20
                  md:h-20
                  rounded-2xl
                  sm:rounded-3xl
                  bg-cyan-500/10
                  border
                  border-cyan-400/20
                  shadow-[0_0_40px_rgba(0,255,255,0.15)]
                "
              >
                <ShieldCheck
                  size={28}
                  className="text-cyan-400 sm:w-9 sm:h-9 md:w-10 md:h-10"
                />
              </div>

              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  xl:text-6xl
                  font-black
                  tracking-wide
                  leading-none
                "
              >
                SHRII BANK
              </h1>

            </div>

            {/* HEADING */}
            <h2
              className="
                text-5xl
                sm:text-6xl
                md:text-7xl
                xl:text-8xl
                font-black
                leading-[0.95]
                mb-6
                sm:mb-8
              "
            >
              Smart Banking

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-cyan-400
                  via-sky-400
                  to-purple-500
                  bg-clip-text
                  text-transparent
                "
              >
                For The Future
              </span>

            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                text-[var(--muted)]
                text-base
                sm:text-lg
                md:text-xl
                leading-[1.8]
                max-w-2xl
              "
            >
              Secure transactions, instant transfers,
              financial insights, and seamless digital
              banking designed for modern users.
            </p>

            {/* STATS */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-6
                sm:gap-8
                mt-10
                sm:mt-14
              "
              style={{marginBottom:"20px"}}
            >

              {/* STAT 1 */}
              <div>

                <h3
                  className="
                    text-3xl
                    sm:text-4xl
                    font-black
                    text-[var(--accent)]
                  "
                >
                  24/7
                </h3>

                <p
                  className="
                    mt-1
                    sm:mt-2
                    text-sm
                    sm:text-base
                    text-[var(--muted)]
                  "
                >
                  Banking Support
                </p>

              </div>

              {/* STAT 2 */}
              <div>

                <h3
                  className="
                    text-3xl
                    sm:text-4xl
                    font-black
                    text-[var(--accent)]
                  "
                >
                  99%
                </h3>

                <p
                  className="
                    mt-1
                    sm:mt-2
                    text-sm
                    sm:text-base
                    text-[var(--muted)]
                  "
                >
                  Secure Transactions
                </p>

              </div>

              {/* STAT 3 */}
              <div>

                <h3
                  className="
                    text-3xl
                    sm:text-4xl
                    font-black
                    text-[var(--accent)]
                  "
                >
                  Fast
                </h3>

                <p
                  className="
                    mt-1
                    sm:mt-2
                    text-sm
                    sm:text-base
                    text-[var(--muted)]
                  "
                >
                  Money Transfers
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex
            items-center
            justify-center
            px-4
            sm:px-6
            md:px-10
            lg:px-16
            xl:px-20
            py-6
            sm:py-10
            lg:py-20
          "
        >

          <div
            className="
              w-full
              max-w-xl
            "
            
          >
            {children}
          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;