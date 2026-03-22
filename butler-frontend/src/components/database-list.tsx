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
    Database, 
    Activity,
    Search,
    Server,
    User,
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

const mockDatabases = [
    {
        id: "1",
        name: "Prod DB Read-only",
        dbType: "POSTGRESQL",
        host: "prod-db.internal.aws.com",
        port: 5432,
        dbName: "butler_prod",
        username: "readonly_analyst",
        status: "connected",
        updatedAt: "Agora mesmo"
    },
    {
        id: "2",
        name: "Analytics DW",
        dbType: "SNOWFLAKE",
        host: "xy12345.snowflakecomputing.com",
        port: 443,
        dbName: "analytics_warehouse",
        username: "service_account",
        status: "disconnected",
        updatedAt: "Há 2 horas"
    },
    {
        id: "3",
        name: "GitLab Meta DB",
        dbType: "MYSQL",
        host: "10.0.1.45",
        port: 3306,
        dbName: "gitlabhq_production",
        username: "bot_reviewer",
        status: "connected",
        updatedAt: "Há 1 dia"
    }
];

export interface DatabaseListProps {
    onCreateClick: () => void;
}

export function DatabaseList({ onCreateClick }: DatabaseListProps) {
    const getBadgeColor = (type: string) => {
        switch (type) {
            case "POSTGRESQL": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900";
            case "MYSQL": return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900";
            case "SNOWFLAKE": return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900";
            default: return "bg-primary/10 text-primary border-primary/20";
        }
    };

    return (
        <div className="flex flex-col h-full w-full gap-6 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Database className="w-8 h-8 text-primary" />
                        Bancos de Dados
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Conecte e gerencie as fontes de dados que seus agentes de IA podem consultar.
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar conexão..."
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
                        <h3 className="font-medium text-lg">Nova Conexão DB</h3>
                        <p className="text-sm text-muted-foreground text-center px-4 mt-2">
                            Adicione uma nova fonte de dados segura para seus agentes.
                        </p>
                    </Card>

                    {/* DB Cards */}
                    {mockDatabases.map((db) => (
                        <Card key={db.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/30 group">
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
                                            <DropdownMenuItem><Activity className="mr-2 h-4 w-4" /> Testar Conexão</DropdownMenuItem>
                                            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Configurar Credenciais</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive focus:bg-destructive/15">
                                                <Trash2 className="mr-2 h-4 w-4" /> Desconectar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                
                                <div className="flex items-center gap-3 pt-1">
                                    <div className={`p-3 rounded-lg ${db.status === 'connected' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                        <Database className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 pr-8">
                                        <CardTitle className="text-lg line-clamp-1">{db.name}</CardTitle>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-4 ${getBadgeColor(db.dbType)}`}>
                                                {db.dbType}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1 border-l pl-1.5 border-border">
                                                {db.status === 'connected' ? (
                                                    <><CheckCircle2 className="w-3 h-3 text-green-500" /> Online</>
                                                ) : (
                                                    <><XCircle className="w-3 h-3 text-red-500" /> Offline</>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="flex-1 pb-4 pt-2">
                                <div className="bg-muted/40 rounded-md p-3 space-y-2 border border-border/50 text-sm">
                                    <div className="grid grid-cols-[20px_1fr] items-start gap-2">
                                        <Server className="w-4 h-4 text-muted-foreground mt-0.5" />
                                        <div className="break-all font-mono text-xs text-foreground/80">
                                            {db.host}:{db.port}
                                            <span className="block text-muted-foreground mt-0.5">DB: <span className="text-foreground/90 font-medium">{db.dbName}</span></span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-[20px_1fr] items-center gap-2 border-t border-border/50 pt-2">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                        <div className="text-xs text-muted-foreground tracking-wide font-mono">
                                            User: <span className="text-foreground/80">{db.username}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            
                            <CardFooter className="pt-0 pb-4 mt-auto">
                                <div className="w-full flex items-center justify-between">
                                    <span className="text-[10px] text-muted-foreground">Atualizado {db.updatedAt}</span>
                                    <Button variant="secondary" size="sm" className="h-7 text-xs px-3 font-medium hover:bg-primary hover:text-primary-foreground transition-colors group">
                                        Explorar
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

export default DatabaseList;
