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
    SquareArrowRightExit,
    PocketKnife,
    Bot,
    FileText,
    Brain,
    Database
} from "lucide-react";
import { UserProfile } from "@/components/user-profile.tsx";
import { getUserProfile, type UserProfileData } from "@/services/user";
import { AgentList } from "@/components/agent/agent-list";
import { AgentForm } from "@/components/agent/agent-form";
import { DatabaseList } from "@/components/database-list";
import { DatabaseForm } from "@/components/database-form";
import { ContextList } from "@/components/context-list";
import { ContextForm } from "@/components/context-form";
import { PRDList } from "@/components/prd-list";
import { PRDForm } from "@/components/prd-form";
import { ToolList } from "@/components/tool-list";
import { ToolForm } from "@/components/tool-form";

const homeItems = [
    { icon: LayoutDashboard, label: "Dashboard" }
];

const agentItems = [
    { icon: Bot, label: "Agentes" },
    { icon: Database, label: "Bancos de Dados" },
    { icon: Brain, label: "Contextos" },
    { icon: FileText, label: "PRD/Docs" },
    { icon: PocketKnife, label: "Tools" }
];

const profileItems = [
    { icon: Settings, label: "Configurações" },
    { icon: HelpCircle, label: "Ajuda" },
    { icon: SquareArrowRightExit, label: "Sair" }
]

function Board() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState("board");
    const [isCreating, setIsCreating] = useState(false);
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
                            <SidebarGroupLabel className="px-4 py-1 text-xs font-medium text-sm text-muted-foreground uppercase tracking-wider">
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
                            <SidebarGroupLabel className="px-4 py-1 text-xs font-medium text-sm text-muted-foreground uppercase tracking-wider">
                                AI Studio
                            </SidebarGroupLabel>
                            <SidebarMenu>
                                {agentItems.map(({ icon: Icon, label }) => (
                                    <SidebarMenuItem key={label}>
                                        <SidebarMenuButton
                                            onClick={() => {
                                                setActiveView(label);
                                                setIsCreating(false);
                                            }}
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
                        <Button
                            onClick={() => setIsCreating(true)}
                            className={isCreating ? "hidden" : ""}
                        >
                            <CirclePlus data-icon="inline-start" />
                            {activeView === "Bancos de Dados" ? "Nova conexão" :
                                activeView === "Contextos" ? "Novo contexto" :
                                    activeView === "PRD/Docs" ? "Novo PRD" :
                                        activeView === "Tools" ? "Nova ferramenta" :
                                            "Novo agente"}
                        </Button>
                    </header>
                    <div className="p-6 flex-1 overflow-auto bg-muted/20">
                        {isCreating ? (
                            activeView === "Agentes" ? (
                                <AgentForm onBack={() => setIsCreating(false)} />
                            ) : activeView === "Bancos de Dados" ? (
                                <DatabaseForm onBack={() => setIsCreating(false)} />
                            ) : activeView === "Contextos" ? (
                                <ContextForm onBack={() => setIsCreating(false)} />
                            ) : activeView === "PRD/Docs" ? (
                                <PRDForm onBack={() => setIsCreating(false)} />
                            ) : activeView === "Tools" ? (
                                <ToolForm onBack={() => setIsCreating(false)} />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                                    <p>Formulário de criação para {activeView} em construção.</p>
                                    <Button variant="outline" onClick={() => setIsCreating(false)}>Voltar</Button>
                                </div>
                            )
                        ) : activeView === "profile" ? (
                            <UserProfile />
                        ) : activeView === "Agentes" ? (
                            <AgentList onCreateClick={() => setIsCreating(true)} />
                        ) : activeView === "Bancos de Dados" ? (
                            <DatabaseList onCreateClick={() => setIsCreating(true)} />
                        ) : activeView === "Contextos" ? (
                            <ContextList onCreateClick={() => setIsCreating(true)} />
                        ) : activeView === "PRD/Docs" ? (
                            <PRDList onCreateClick={() => setIsCreating(true)} />
                        ) : activeView === "Tools" ? (
                            <ToolList onCreateClick={() => setIsCreating(true)} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                Conteúdo do board ({activeView})
                            </div>
                        )}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

export default Board;
