import { toast } from "sonner";

export async function register(username: string, email: string, password: string): Promise<boolean> {
    const apiUrl = import.meta.env.VITE_APP_API_ENDPOINT || import.meta.env.APP_API_ENDPOINT || "http://localhost:8080";

    try {
        const response = await fetch(`${apiUrl}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error("Erro ao realizar registro");
        }

        toast.success("Conta criada com sucesso.");
        return true;
    } catch (error) {
        console.error("Erro no registro:", error);
        toast.error("Falha ao registrar conta. Tente novamente.");
        return false;
    }
}
