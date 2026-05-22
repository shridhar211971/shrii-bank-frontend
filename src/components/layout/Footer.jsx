const Footer = () => {
  return (
    <footer
      className="
        border-t
        border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--body-text)]
        px-6
        md:px-12
        py-10
        mt-10
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-3
          gap-10
          items-start
        "
      >
        {/* Brand Section */}
        <div>
          {/* <h2 className="text-2xl font-bold tracking-wide text-[var(--body-text)]">
            Shrii Bank
          </h2> */}

          {/* <p className="text-sm text-[var(--muted)] mt-4 leading-6">
            Trusted by 20,000+ customers for secure digital banking,
            instant money transfers, smart analytics, and seamless
            financial management experiences.
          </p> */}

          <div className="mt-5">
            {/* <p className="text-sm font-medium text-[var(--body-text)]">
              Contact
            </p> */}

            <a
              href="mailto:shriibank2002@gmail.com"
              className="
                text-sm
                text-blue-500
                hover:text-blue-400
                transition-colors
                duration-200
              "
            >
              shriibank2002@gmail.com
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          {/* <h3 className="text-lg font-semibold mb-4 text-[var(--body-text)]">
            Quick Links
          </h3> */}

          <ul className="space-y-3 text-sm text-[var(--muted)]">
            <li>
              <a
                href="#"
                className="hover:text-[var(--body-text)] transition"
              >
                Home/Accounts/Transfers/Analytics
              </a>
            </li>

            {/* <li>
              <a
                href="#"
                className="hover:text-[var(--body-text)] transition"
              >
                Accounts
              </a>
            </li>

            <li>
              <a
                href="#"
                className="hover:text-[var(--body-text)] transition"
              >
                Transfers
              </a>
            </li>

            <li>
              <a
                href="#"
                className="hover:text-[var(--body-text)] transition"
              >
                Analytics
              </a>
            </li> */}
          </ul>
        </div>

        {/* Security / Info */}
        <div className="md:text-right">
          {/* <h3 className="text-lg font-semibold mb-4 text-[var(--body-text)]">
            Why Choose Us
          </h3> */}

          <div className="space-y-3 text-sm text-[var(--muted)]">
            <p>✔ Secure Banking Infrastructure</p>
            {/* <p>✔ Fast & Reliable Transactions</p>
            <p>✔ 24/7 Customer Support</p>
            <p>✔ Smart Financial Insights</p> */}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className="
          border-t
          border-[var(--border)]
          mt-10
          pt-5
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-3
          text-sm
          text-[var(--muted)]
        "
      >
        <p>© 2026 Shrii Bank. All rights reserved.</p>

        <p>
          Built with modern UI for secure and intelligent banking experiences.
        </p>
      </div>
    </footer>
  );
};

export default Footer;