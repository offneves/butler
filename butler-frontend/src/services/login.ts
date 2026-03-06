import { toast } from "sonner";

export async function login(email: string, password: string): Promise<boolean> {

    const apiUrl = import.meta.env.APP_API_ENDPOINT;

    try {
        const response = await fetch(`${apiUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Erro ao realizar login");
        }

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
        }

        return true;

    } catch (error) {
        console.error("Erro no login:", error);
        toast.error("Falha no login. Verifique suas credenciais.");
        return false;
    }
}
