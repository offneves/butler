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
    FileText, 
    Search,
    Eye,
    FileEdit,
    Type
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

const mockPRDs = [
    {
        id: "1",
        name: "Assistente de E-commerce",
        description: "PRD detalhado contendo a arquitetura, limites e persona do agente principal de vendas que guiará os clientes nos funis de conversão.",
        updatedAt: "Agora mesmo",
        size: "4.5 KB"
    },
    {
        id: "2",
        name: "Bot de Reembolso",
        description: "Documento de especificações de como o bot financeiro deve realizar integrações transacionais e fluxos de estorno na plataforma de pagamentos.",
        updatedAt: "Há 2 horas",
        size: "2.1 KB"
    },
    {
        id: "3",
        name: "Troubleshooting de Redes Genérico",
        description: "Requisitos de Produto focado nas premissas de SLA e árvore de decisão para agentes de Nível 1 do Suporte Técnico.",
        updatedAt: "Há 1 dia",
        size: "8.2 KB"
    }
];

export interface PRDListProps {
    onCreateClick: () => void;
}

export function PRDList({ onCreateClick }: PRDListProps) {
    return (
        <div className="flex flex-col h-full w-full gap-6 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <FileText className="w-8 h-8 text-primary" />
                        PRDs / Documentações
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Product Requirements Documents (PRDs) que moldam de forma profunda o objetivo e a essência das IAs.
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar PRD..."
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
                        <h3 className="font-medium text-lg">Nova Documentação</h3>
                        <p className="text-sm text-muted-foreground text-center px-4 mt-2">
                            Redija um novo PRD definindo claramente o MVP do agente.
                        </p>
                    </Card>

                    {/* PRD Cards */}
                    {mockPRDs.map((prd) => (
                        <Card key={prd.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/30 group">
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
                                            <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Visualizar</DropdownMenuItem>
                                            <DropdownMenuItem><FileEdit className="mr-2 h-4 w-4" /> Editar Documento</DropdownMenuItem>
                                            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Propriedades</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive focus:bg-destructive/15">
                                                <Trash2 className="mr-2 h-4 w-4" /> Excluir PRD
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                
                                <div className="flex items-center gap-3 pt-1">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 pr-8 min-w-0">
                                        <CardTitle className="text-lg line-clamp-1" title={prd.name}>{prd.name}</CardTitle>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900 text-[10px] px-1.5 py-0 h-4">
                                                <Type className="h-2.5 w-2.5 mr-1" />
                                                TEXT
                                            </Badge>
                                            <span className="text-xs text-muted-foreground border-l pl-1.5 border-border font-mono">
                                                {prd.size}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="flex-1 pb-4 pt-2">
                                <div className="bg-muted/30 rounded-md p-3 border border-border/50 text-sm h-full overflow-hidden">
                                    <div className="text-xs font-semibold text-foreground/80 mb-1.5 flex items-center gap-1.5 border-b border-border/50 pb-1.5">
                                        Objetivo e Descrição
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                                        {prd.description}
                                    </p>
                                </div>
                            </CardContent>
                            
                            <CardFooter className="pt-0 pb-4 mt-auto">
                                <div className="w-full flex items-center justify-between">
                                    <span className="text-[10px] text-muted-foreground">Atualizado {prd.updatedAt}</span>
                                    <Button variant="secondary" size="sm" className="h-7 text-xs px-3 font-medium hover:bg-primary hover:text-primary-foreground transition-colors group">
                                        Abrir Docs
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

export default PRDList;
