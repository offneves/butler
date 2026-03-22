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
    PocketKnife, 
    Search,
    Globe2,
    Lock,
    Zap,
    Link2
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

const mockTools = [
    {
        id: "1",
        name: "Consulta Consulta CEP",
        description: "Obtém dados completos de endereço, bairro e cidade a partir do viaCEP oficial.",
        apiEndpoint: "https://viacep.com.br/ws/{cep}/json/",
        isGlobal: true,
        updatedAt: "Agora mesmo"
    },
    {
        id: "2",
        name: "Gerador de Boleto",
        description: "Integração legada que processa o fechamento de um carrinho de compras na API de pagamentos.",
        apiEndpoint: "https://api.pagseguro.com/v1/boletos/generate",
        isGlobal: false,
        updatedAt: "Há 2 horas"
    },
    {
        id: "3",
        name: "Calculadora Avançada",
        description: "Sistema interno de microservices para calcular equações dinâmicas e fretes complexos baseados na malha logística.",
        apiEndpoint: "http://internal.svc.cluster.local:8080/math",
        isGlobal: true,
        updatedAt: "Há 1 dia"
    }
];

export interface ToolListProps {
    onCreateClick: () => void;
}

export function ToolList({ onCreateClick }: ToolListProps) {
    return (
        <div className="flex flex-col h-full w-full gap-6 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <PocketKnife className="w-8 h-8 text-primary" />
                        Tools (Ferramentas)
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Permita aos seus agentes interagirem com o mundo externo, APIs e conectar sistemas legados.
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar ferramenta..."
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
                        <h3 className="font-medium text-lg">Nova Ferramenta</h3>
                        <p className="text-sm text-muted-foreground text-center px-4 mt-2">
                            Mapeie um Endpoint (API) que os agentes poderão invocar ativamente.
                        </p>
                    </Card>

                    {/* Tool Cards */}
                    {mockTools.map((tool) => (
                        <Card key={tool.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/30 group">
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
                                            <DropdownMenuItem><Zap className="mr-2 h-4 w-4" /> Testar Chamada</DropdownMenuItem>
                                            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Editar Endpoint</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive focus:bg-destructive/15">
                                                <Trash2 className="mr-2 h-4 w-4" /> Excluir Tool
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                
                                <div className="flex items-center gap-3 pt-1">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                                        <PocketKnife className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 pr-8 min-w-0">
                                        <CardTitle className="text-lg line-clamp-1" title={tool.name}>{tool.name}</CardTitle>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            {tool.isGlobal ? (
                                                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900 text-[10px] px-1.5 py-0 h-4 uppercase shadow-none">
                                                    <Globe2 className="h-2.5 w-2.5 mr-1" />
                                                    Global
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 text-[10px] px-1.5 py-0 h-4 uppercase shadow-none">
                                                    <Lock className="h-2.5 w-2.5 mr-1" />
                                                    Restrita
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="flex-1 pb-4 pt-2">
                                <div className="space-y-3">
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                        {tool.description}
                                    </p>
                                    <div className="bg-muted/40 rounded-md p-2 border border-border/50 text-xs font-mono break-all flex items-start gap-2">
                                        <Link2 className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                                        <span className="text-foreground/80 line-clamp-2">{tool.apiEndpoint}</span>
                                    </div>
                                </div>
                            </CardContent>
                            
                            <CardFooter className="pt-0 pb-4 mt-auto">
                                <div className="w-full flex items-center justify-between">
                                    <span className="text-[10px] text-muted-foreground">Atualizado {tool.updatedAt}</span>
                                    <Button variant="secondary" size="sm" className="h-7 text-xs px-3 font-medium hover:bg-primary hover:text-primary-foreground transition-colors group">
                                        Ver Configuração
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

export default ToolList;
