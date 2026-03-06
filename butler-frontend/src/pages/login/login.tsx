import { useState } from "react";
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import ThemeToggle from "@/components/theme-toggle.tsx";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background text-foreground transition-colors duration-300">
            <div className="absolute top-4 left-4 text-xl font-bold">
                Butler
            </div>
            <ThemeToggle />
            <div className="w-full max-w-sm relative">
                <AnimatePresence mode="wait">
                    {isRegistering ? (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <RegisterForm onLoginClick={() => setIsRegistering(false)} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <LoginForm onRegisterClick={() => setIsRegistering(true)} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default Login;
