import {useTheme} from "@/components/theme-provider.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Moon, Sun} from "lucide-react";

function ThemeToggle() {
    const {theme, setTheme} = useTheme()

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light"
        setTheme(nextTheme)
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="absolute top-4 right-4"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <Moon
                className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

export default ThemeToggle;
