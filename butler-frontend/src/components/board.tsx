import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from "@/components/ui/sidebar.tsx";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button.tsx";
import {
    LayoutDashboard,
    Settings,
    HelpCircle,
    MoreVertical,
    CirclePlus,
    Folder,
    SquareArrowRightExit,
} from "lucide-react";
import { UserProfile } from "@/components/user-profile.tsx";
import { getUserProfile, type UserProfileData } from "@/services/user";

const homeItems = [
    { icon: LayoutDashboard, label: "Dashboard" }
];

const agentItems = [
    { icon: Folder, label: "Documentos" }
];

const profileItems = [
    { icon: Settings, label: "Configurações" },
    { icon: HelpCircle, label: "Ajuda" },
    { icon: SquareArrowRightExit, label: "Sair" }
]

function Board() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState("board");
    const [userData, setUserData] = useState<UserProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const data = await getUserProfile();
            if (data) {
                setUserData(data);
            }
            setIsLoading(false);
        }
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <SidebarProvider
            className="flex items-center justify-center min-h-svh w-full"
            style={{ "--sidebar-width": "14rem", "--sidebar-width-mobile": "14rem" } as React.CSSProperties}
            defaultOpen={true}
        >
            <div className="w-[90vw] h-[90vh] bg-background text-foreground rounded-xl border border-border overflow-hidden flex shadow-lg relative">

                <Sidebar
                    collapsible="icon"
                    className="absolute h-full border-r border-border bg-sidebar"
                >

                    <SidebarContent className="flex-1 overflow-y-auto py-2">
                        <SidebarGroup>
                            <SidebarGroupLabel className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Home
                            </SidebarGroupLabel>
                            <SidebarMenu>
                                {homeItems.map(({ icon: Icon, label }) => (
                                    <SidebarMenuItem key={label}>
                                        <SidebarMenuButton
                                            onClick={() => setActiveView("board")}
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md w-full transition-colors"
                                        >
                                            <Icon className="w-4 h-4 shrink-0" />
                                            {label}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>

                        <SidebarGroup className="mt-4">
                            <SidebarGroupLabel className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Agentes
                            </SidebarGroupLabel>
                            <SidebarMenu>
                                {agentItems.map(({ icon: Icon, label }) => (
                                    <SidebarMenuItem key={label}>
                                        <SidebarMenuButton
                                            onClick={() => setActiveView("board")}
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md w-full transition-colors"
                                        >
                                            <Icon className="w-4 h-4 shrink-0" />
                                            {label}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter className="border-t border-border py-2">
                        <SidebarMenu>
                            {profileItems.map(({ icon: Icon, label }) => (
                                <SidebarMenuItem key={label}>
                                    <SidebarMenuButton
                                        onClick={label === "Sair" ? handleLogout : undefined}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md w-full transition-colors"
                                    >
                                        <Icon className="w-4 h-4 shrink-0" />
                                        {label}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    size="lg"
                                    onClick={() => setActiveView("profile")}
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mt-1 cursor-pointer"
                                    title="Ver meu perfil"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-3 w-full">
                                            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                                            <div className="flex flex-col gap-1.5 flex-1 w-full">
                                                <Skeleton className="h-3 w-20" />
                                                <Skeleton className="h-2 w-24" />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <img
                                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData?.username || "Usuario"}`}
                                                alt="avatar"
                                                className="w-8 h-8 rounded-full shrink-0"
                                            />
                                            <div className="flex flex-col gap-1 leading-none flex-1 min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">{userData?.username || "Usuário Butler"}</p>
                                                <p className="text-xs text-muted-foreground truncate">{userData?.email || "usuario@butler.com"}</p>
                                            </div>
                                            <MoreVertical className="w-4 h-4 shrink-0 text-muted-foreground ml-auto" />
                                        </>
                                    )}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="flex-1 bg-background text-foreground relative flex flex-col overflow-hidden">
                    <header className="flex h-14 items-center justify-between align-middle border-b border-border bg-background px-4">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="-ml-1" />
                        </div>
                        <Button>
                            <CirclePlus data-icon="inline-start" />
                            Novo agente
                        </Button>
                    </header>
                    <div className="p-6 flex-1 overflow-auto bg-muted/20">
                        {activeView === "profile" ? (
                            <UserProfile />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                Conteúdo do board
                            </div>
                        )}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

export default Board;
