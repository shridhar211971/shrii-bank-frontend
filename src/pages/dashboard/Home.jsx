import DashboardLayout from "../../layouts/DashboardLayout";

import StatsCard from "../../components/cards/StatsCard";

const Home = () => {

  return (
    <DashboardLayout>

      <div className="space-y-10">

        {/* TOP */}

        <div>

          <h1
            className="
              text-5xl
              font-black
              text-white
              mb-3
            "
          >
            Banking Dashboard
          </h1>

          <p className="text-slate-400 text-lg">
            Track all your financial activities
          </p>

        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          <StatsCard
            title="Total Balance"
            value="$25,000"
            subtitle="+2.5% this month"
          />

          <StatsCard
            title="Transactions"
            value="1,245"
            subtitle="Active transfers"
          />

          <StatsCard
            title="Savings"
            value="$12,500"
            subtitle="Growing steadily"
          />

          <StatsCard
            title="Investments"
            value="$8,400"
            subtitle="Long term plan"
          />

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Home;