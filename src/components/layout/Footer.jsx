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
          With modern UI for secure and intelligent banking experiences.
        </p>
      </div>
    </footer>
  );
};

export default Footer;