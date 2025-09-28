import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun } from "lucide-react";

type HeaderProps = {
  title?: string;
};

export default function AppHeader({ title = "Dashboard" }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between border-b px-4 py-2 w-[100%]">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Middle: Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Input type="text" placeholder="Search in here" className="pl-8" />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            🔍
          </span>
        </div>
      </div>

      {/* Right: Theme Toggle + Notification */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
