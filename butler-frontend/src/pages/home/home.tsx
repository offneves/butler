import Board from "@/components/board.tsx";
import ThemeToggle from "@/components/theme-toggle.tsx";
import { motion } from "framer-motion";

function Home() {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative min-h-svh w-full bg-background text-foreground transition-colors duration-300">
            <div className="absolute top-4 left-4 text-xl font-bold z-50">
                Butler
            </div>
            <ThemeToggle />
            <Board />
        </motion.div>
    );
}

export default Home;