import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Bot,
    MoreVertical,
    Play,
    Settings,
    Trash2,
    Plus,
    Database,
    BrainCircuit,
    FileText,
    Search,
    Brain,
    PocketKnife,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AGENTS_PAGE } from "./agent-constants";

// Mock data based on the AgentModel entity
const mockAgents = [
    {
        id: "1",
        name: "Customer Support Bot",
        description: "Handles Tier 1 support queries and routes complex issues.",
        systemPrompt: "You are a helpful customer support agent...",
        active: true,
        lmmCredential: { name: "GPT-4o" },
        prd: { name: "Support Flow v2" },
        context: [{ id: 1 }, { id: 2 }],
        tool: [{ id: 1 }],
        databaseConnection: { name: "Prod DB Read-only" },
        updatedAt: "2h ago"
    },
    {
        id: "2",
        name: "Data Analyst",
        description: "Translates natural language to SQL and generates insights.",
        systemPrompt: "You are an expert data analyst. You will receive schemas...",
        active: false,
        lmmCredential: { name: "Claude 3.5 Sonnet" },
        prd: null,
        context: [],
        tool: [{ id: 1 }, { id: 2 }, { id: 3 }],
        databaseConnection: { name: "Analytics DW" },
        updatedAt: "1d ago"
    },
    {
        id: "3",
        name: "Code Reviewer",
        description: "Reviews pull requests for security and performance issues.",
        systemPrompt: "Act as a senior software engineer reviewing code.",
        active: true,
        lmmCredential: { name: "GPT-4o Min" },
        prd: { name: "Engineering Standard Guidelines" },
        context: [{ id: 1 }],
        tool: [],
        databaseConnection: { name: "GitLab Meta DB" },
        updatedAt: "5m ago"
    }
];

interface AgentListProps {
    onCreateClick: () => void;
}

export function AgentList({ onCreateClick }: AgentListProps) {

    return (
        <div className="flex flex-col h-full w-full gap-6 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Bot className="w-8 h-8 text-primary" />
                        {AGENTS_PAGE.title}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {AGENTS_PAGE.subtitle}
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar agente..."
                            className="pl-8 bg-background shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">

                    <Card
                        onClick={onCreateClick}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer min-h-[220px] shadow-sm hover:shadow-md group"
                    >
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                            <Plus className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-medium text-lg">Criar Novo Agente</h3>
                        <p className="text-sm text-muted-foreground text-center px-4 mt-2">
                            Comece do zero criando um agento para o necessidade do seu negócio.
                        </p>
                    </Card>

                    {mockAgents.map((agent) => (
                        <Card key={agent.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/30 group">
                            <CardHeader className="pb-3 relative space-y-0">
                                <div className="absolute top-4 right-4 flex items-center gap-3">
                                    <Switch checked={agent.active} />
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem><Play className="mr-2 h-4 w-4" /> Testar Agente</DropdownMenuItem>
                                            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Configurar</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive focus:bg-destructive/15">
                                                <Trash2 className="mr-2 h-4 w-4" /> Excluir
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="flex items-center gap-3 pt-1">
                                    <div className={`p-3 rounded-lg ${agent.active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'} shrink-0`}>
                                        <Bot className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 pr-20 min-w-0">
                                        <CardTitle className="text-lg line-clamp-1" title={agent.name}>{agent.name}</CardTitle>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                                                {agent.active ? (
                                                    <><CheckCircle2 className="w-3 h-3 text-green-500" /> Online</>
                                                ) : (
                                                    <><XCircle className="w-3 h-3 text-red-500" /> Offline</>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 pb-4 pt-1">
                                <CardDescription className="line-clamp-2 h-[2.5rem] mb-3 text-foreground/80 text-sm">
                                    {agent.description}
                                </CardDescription>
                                <div className="flex flex-wrap gap-2">
                                    {/* LLM Badge */}
                                    <Badge variant="secondary" className="flex items-center gap-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900">
                                        <BrainCircuit className="h-3 w-3" />
                                        {agent.lmmCredential.name}
                                    </Badge>

                                    {/* Database Badge */}
                                    <Badge variant="secondary" className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900">
                                        <Database className="h-3 w-3" />
                                        {agent.databaseConnection.name}
                                    </Badge>

                                    {/* PRD, Contexts & Tools Count */}
                                    {(agent.prd || agent.context.length > 0 || agent.tool.length > 0) && (
                                        <Badge variant="outline" className="flex items-center gap-1.5 text-muted-foreground">
                                            {agent.prd && <span title="PRD Configurado" className="flex items-center gap-1 text-foreground"><FileText className="h-3 w-3 text-primary" /> PRD</span>}
                                            {agent.prd && (agent.context.length > 0 || agent.tool.length > 0) && <span>•</span>}

                                            {agent.context.length > 0 && <span title={`${agent.context.length} Contextos`} className="flex items-center gap-1"><Brain className="h-3 w-3" /> {agent.context.length}</span>}
                                            {agent.context.length > 0 && agent.tool.length > 0 && <span>•</span>}

                                            {agent.tool.length > 0 && <span title={`${agent.tool.length} Ferramentas`} className="flex items-center gap-1"><PocketKnife className="h-3 w-3" /> {agent.tool.length}</span>}
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0 pb-4 mt-auto">
                                <div className="w-full flex items-center justify-between gap-4">
                                    <span className="text-[10px] text-muted-foreground text-nowrap">Atualizado {agent.updatedAt}</span>
                                    <div className="w-full flex gap-2 justify-end">
                                        <Button variant="outline" size="sm" className="w-[85px] text-xs h-7 hover:bg-primary/5 hover:text-primary border-primary/20 transition-colors">
                                            <Settings className="w-3 h-3 mr-1" /> Editar
                                        </Button>
                                        <Button variant="default" size="sm" className="w-[85px] text-xs h-7 shadow-sm transition-transform active:scale-95" disabled={!agent.active}>
                                            <Play className="w-3 h-3 mr-1" /> Testar
                                        </Button>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default AgentList;
