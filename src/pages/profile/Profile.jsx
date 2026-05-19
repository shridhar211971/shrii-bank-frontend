import DashboardLayout from "../../layouts/DashboardLayout";

const Profile = () => {

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
            My Profile
          </h1>

          <p className="text-slate-400">
            Manage your account information
          </p>

        </div>

        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
            max-w-4xl
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-10
            "
          >

            <div
              className="
                w-32
                h-32
                rounded-full
                bg-cyan-500
              "
            />

            <div className="space-y-6 flex-1">

              <div>

                <p className="text-slate-400 mb-2">
                  Full Name
                </p>

                <h2
                  className="
                    text-3xl
                    font-bold
                    text-white
                  "
                >
                  Shridhar
                </h2>

              </div>

              <div>

                <p className="text-slate-400 mb-2">
                  Email Address
                </p>

                <h2 className="text-white">
                  shrii@gmail.com
                </h2>

              </div>

              <div>

                <p className="text-slate-400 mb-2">
                  Account Status
                </p>

                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-green-500/20
                    text-green-400
                  "
                >
                  Active
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Profile;