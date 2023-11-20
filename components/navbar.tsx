import ThemeSwitcher from "@/components/theme-switcher";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between border-b border-slate-200 p-4">
      <h1 className="text-accent text-2xl font-bold">FLAGS GAME</h1>
      <div className="flex justify-center gap-4">
        <Link
          href="https://github.com/kevinanielsen/flags-game"
          target="_blank"
        >
          <Button size="icon" variant="outline">
            <Github />
          </Button>
        </Link>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
