import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export interface UserProfileData {
    username: string;
    email: string;
    createdAt: string;
    active?: boolean;
    plan?: any;
}

export async function getUserProfile(): Promise<UserProfileData | null> {
    const apiUrl = import.meta.env.VITE_APP_API_ENDPOINT || import.meta.env.APP_API_ENDPOINT || "http://localhost:8080";
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        const userId = decoded.userId

        if (!userId) {
            console.error("Não foi possível encontrar o ID do usuário no token.");
            return null;
        }

        const response = await fetch(`${apiUrl}/user/me/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados do usuário");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Falha ao carregar informações do perfil.");
        return null;
    }
}
