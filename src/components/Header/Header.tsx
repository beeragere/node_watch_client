import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../ui/theme-provider";
import Logo from "@/assets/images/logo.svg";

type HeaderProps = {
  onLogout?: () => void;
  onProfile?: () => void;
  onMenuToggle?: () => void;
};

export default function GithubHeader({
  onLogout,
  onProfile,
  onMenuToggle,
}: HeaderProps) {
  const [search, setSearch] = useState("");
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Card className="w-full flex flex-row items-center justify-between p-4">
      {/* Left: Hamburger + App Name */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button variant="ghost" onClick={onMenuToggle}>
          <Menu />
        </Button>
        <img src={Logo} alt="Node Watch" className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Node Watch</h1>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 mx-4">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Right: Profile + Logout */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <Button variant="ghost" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>
        <Avatar className="w-10 h-10">
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          onClick={onLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>
    </Card>
  );
}
