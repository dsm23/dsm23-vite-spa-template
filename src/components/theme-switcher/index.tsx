import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "~/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/dropdown-menu";
import { useTheme } from "~/components/theme-provider";
import type { Theme } from "~/components/theme-provider";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <span className="sr-only">Theme switcher</span>
          {theme === "light" ? (
            <Sun key="light" className="text-muted-foreground size-4" />
          ) : theme === "dark" ? (
            <Moon key="dark" className="text-muted-foreground size-4" />
          ) : (
            <Laptop key="system" className="text-muted-foreground size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="start">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e as Theme)}
        >
          <DropdownMenuRadioItem className="flex gap-2" value="light">
            <Sun className="text-muted-foreground size-4" /> <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="dark">
            <Moon className="text-muted-foreground size-4" /> <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="system">
            <Laptop className="text-muted-foreground size-4" />{" "}
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
