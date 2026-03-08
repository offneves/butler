import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProfile, getUserPlan, type UserProfileData, type PlanData } from "@/services/user";
import { CalendarDays } from "lucide-react";

export function UserProfile() {
    const [userData, setUserData] = useState<UserProfileData | null>(null);
    const [userPlan, setUserPlan] = useState<PlanData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [user, plan] = await Promise.all([
                    getUserProfile(),
                    getUserPlan()
                ]);

                if (user) setUserData(user);
                if (plan) setUserPlan(plan);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    // Por enquanto, não temos dado real de agents ativos do backend
    const agentsCount = 0;

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto space-y-8 p-4">
                <Skeleton className="h-10 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-64 md:col-span-1" />
                    <Skeleton className="h-64 md:col-span-2" />
                </div>
            </div>
        );
    }

    const maxAgents = userPlan?.maxAgents || 1;
    const planName = userPlan?.name || "Desconhecido";
    const planDescription = userPlan?.description || "Plano atual do usuário";
    const planActive = userPlan?.active ?? false;
    
    const agentsPercentage = (agentsCount / maxAgents) * 100;

    // Use fetched data or fallbacks
    const username = userData?.username || "Usuário Butler";
    const email = userData?.email || "usuario@butler.com";
    const avatarFallback = username.substring(0, 2).toUpperCase();

    // Format date if available
    let memberSince = "Não informado";
    if (userData?.createdAt) {
        try {
            memberSince = new Date(userData.createdAt).toLocaleDateString('pt-BR');
        } catch (e) { /* ignore */ }
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
                <p className="text-muted-foreground mt-2">
                    Gerencie suas informações pessoais e visualize os detalhes do seu plano atual.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 shadow-sm border-border">
                    <CardHeader className="text-center">
                        <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary/20 shadow-sm">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${username}`} alt={username} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                {avatarFallback}
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl">{username}</CardTitle>
                        <CardDescription>{email}</CardDescription>
                        {memberSince !== "Não informado" && (
                            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                                <CalendarDays className="w-3.5 h-3.5" />
                                <span>Membro desde {memberSince}</span>
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="flex justify-center pt-4">
                        <Badge variant="outline" className="px-4 py-1 text-sm rounded-full text-green-500 border-green-500/30 bg-green-500/10">
                            Ativo
                        </Badge>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 shadow-sm border-border flex flex-col justify-between">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    Plano {planName}
                                    {planActive && (
                                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none ml-2">Ativo</Badge>
                                    )}
                                </CardTitle>
                                <CardDescription className="text-base mt-2">
                                    {planDescription}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Separator />
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-medium text-foreground">Utilização de Agentes</span>
                                <span className="text-muted-foreground">
                                    <strong className="text-foreground">{agentsCount}</strong> de {userPlan?.maxAgents || 0} agentes
                                </span>
                            </div>
                            <Progress value={agentsPercentage} className="h-3 rounded-full" />
                            <p className="text-xs text-muted-foreground">
                                Você utilizou {Math.round(agentsPercentage)}% do seu limite de agentes do plano {planName}.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
