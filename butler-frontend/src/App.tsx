import { Route, Routes, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import Login from "@/pages/login/login.tsx";
import Home from "@/pages/home/home.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

function App() {
    const location = useLocation();

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Login />} />
                    <Route path={"/home"} element={<Home />} />
                </Routes>
            </AnimatePresence>
            <Toaster />
        </ThemeProvider>
    )
}

export default App
