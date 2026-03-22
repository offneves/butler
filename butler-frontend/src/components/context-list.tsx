import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent, 
    CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
    MoreVertical, 
    Settings, 
    Trash2, 
    Plus, 
    Brain, 
    Search,
    Type,
    Eye
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

const mockContexts = [
    {
        id: "1",
        title: "FAQs de Produtos",
        type: "TEXT",
        content: "Neste documento estão as principais dúvidas dos clientes sobre a nossa plataforma de e-commerce. Como cancelar pedidos, como solicitar reembolso de itens não entregues, e prazos médios de devolução.",
        updatedAt: "Agora mesmo",
        size: "1.2 KB"
    },
    {
        id: "2",
        title: "Regras de Negócio - Suporte",
        type: "TEXT",
        content: "O suporte técnico só deve ser escalado para o nível 2 após o atendente validar se o roteador do cliente foi reiniciado, se os cabos de rede estão conectados na porta correta, e se as luzes PON e LOS estão estabilizadas.",
        updatedAt: "Há 2 horas",
        size: "340 B"
    },
    {
        id: "3",
        title: "Diretrizes de Tom de Voz",
        type: "TEXT",
        content: "Você é um assistente prestativo porém formal. Evite uso excessivo de gírias e emojis. Sempre termine o contato perguntando ativamente se o cliente conseguiu resolver a sua solicitação. Mantenha as frases curtas.",
        updatedAt: "Há 1 dia",
        size: "2.1 KB"
    }
];

export interface ContextListProps {
    onCreateClick: () => void;
}

export function ContextList({ onCreateClick }: ContextListProps) {
    const getBadgeColor = (type: string) => {
        switch (type) {
            case "TEXT": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
            default: return "bg-primary/10 text-primary border-primary/20";
        }
    };

    return (
        <div className="flex flex-col h-full w-full gap-6 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Brain className="w-8 h-8 text-primary" />
                        Contextos
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Base de conhecimento, regras de negócio e fragmentos de texto para uso dos Agentes.
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar contexto..."
                            className="pl-8 bg-background shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
                    
                    {/* Create New Card */}
                    <Card 
                        onClick={onCreateClick}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer min-h-[220px] shadow-sm hover:shadow-md group"
                    >
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                            <Plus className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-medium text-lg">Adicionar Conhecimento</h3>
                        <p className="text-sm text-muted-foreground text-center px-4 mt-2">
                            Insira novas regras, FAQs ou contextos textuais.
                        </p>
                    </Card>

                    {/* Context Cards */}
                    {mockContexts.map((ctx) => (
                        <Card key={ctx.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/30 group">
                            <CardHeader className="pb-3 relative space-y-0">
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Visualizar Completo</DropdownMenuItem>
                                            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Editar Conteúdo</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive focus:bg-destructive/15">
                                                <Trash2 className="mr-2 h-4 w-4" /> Excluir
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                
                                <div className="flex items-center gap-3 pt-1">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                                        <Brain className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 pr-8 min-w-0">
                                        <CardTitle className="text-lg line-clamp-1" title={ctx.title}>{ctx.title}</CardTitle>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-4 ${getBadgeColor(ctx.type)}`}>
                                                <Type className="h-2.5 w-2.5 mr-1" />
                                                {ctx.type}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground border-l pl-1.5 border-border">
                                                {ctx.size}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="flex-1 pb-4 pt-2">
                                <div className="bg-muted/30 rounded-md p-3 border border-border/50 text-sm h-full max-h-[140px] overflow-hidden relative">
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-5">
                                        {ctx.content}
                                    </p>
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />
                                </div>
                            </CardContent>
                            
                            <CardFooter className="pt-0 pb-4 mt-auto">
                                <div className="w-full flex items-center justify-between">
                                    <span className="text-[10px] text-muted-foreground">Atualizado {ctx.updatedAt}</span>
                                    <Button variant="secondary" size="sm" className="h-7 text-xs px-3 font-medium hover:bg-primary hover:text-primary-foreground transition-colors group">
                                        Editar
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default ContextList;
