import ThemeSwitcher from "@/components/theme-switcher";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between border-b border-slate-200 p-4">
      <h1 className="text-accent text-2xl font-bold">FLAGS GAME</h1>
      <div className="flex justify-center gap-4">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
