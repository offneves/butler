import { useState } from "react";
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
    Save, 
    X, 
    Database, 
    Activity,
    Server,
    User,
    Lock,
    Globe,
    Network
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DatabaseFormProps {
    onBack: () => void;
}

export function DatabaseForm({ onBack }: DatabaseFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isTesting, setIsTesting] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onBack();
        }, 800);
    };

    const handleTest = () => {
        setIsTesting(true);
        setTimeout(() => setIsTesting(false), 1500);
    };

    return (
        <div className="flex flex-col h-full w-full gap-6 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Database className="w-8 h-8 text-primary" />
                        Nova Conexão DB
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Estabeleça uma conexão segura de banco de dados para consulta do modelo LLM.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={onBack} disabled={isLoading || isTesting} className="shadow-sm">
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading || isTesting} className="shadow-sm transition-all hover:shadow-md">
                        {isLoading ? (
                            <Activity className="w-4 h-4 mr-2 animate-pulse" />
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        Salvar Conexão
                    </Button>
                </div>
            </div>

            {/* Form Content */}
            <ScrollArea className="flex-1 -mx-2 px-2">
                <form id="db-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
                    
                    {/* Main Info */}
                    <div className="xl:col-span-2 flex flex-col gap-6">
                        
                        {/* Identify Card */}
                        <Card className="shadow-sm border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Globe className="w-5 h-5 text-primary/80" />
                                    Identificação Geral
                                </CardTitle>
                                <CardDescription>Como essa conexão deve ser vista e chamada pelo agente.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nome Amigável <span className="text-destructive">*</span></Label>
                                        <Input id="name" placeholder="Ex: Finance Warehouse" required className="bg-background" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tipo de Banco de Dados <span className="text-destructive">*</span></Label>
                                        <Select required defaultValue="POSTGRESQL">
                                            <SelectTrigger className="bg-background">
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="POSTGRESQL">PostgreSQL</SelectItem>
                                                <SelectItem value="MYSQL">MySQL / MariaDB</SelectItem>
                                                <SelectItem value="SQLSERVER">SQL Server</SelectItem>
                                                <SelectItem value="ORACLE">Oracle DB</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Connection String Info */}
                        <Card className="shadow-sm border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Network className="w-5 h-5 text-emerald-500" />
                                    Dados de Conexão Roteados
                                </CardTitle>
                                <CardDescription>Onde o banco está hospedado e qual porta responde.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-[1fr_100px] gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="host">Host / IP / Endpoint URL <span className="text-destructive">*</span></Label>
                                        <div className="relative">
                                            <Server className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input id="host" placeholder="db.intranet.acme.com" required className="pl-9 bg-background font-mono text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="port">Porta <span className="text-destructive">*</span></Label>
                                        <Input id="port" type="number" placeholder="5432" defaultValue="5432" required className="bg-background font-mono text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dbName">Nome do Banco de Dados / Database Name <span className="text-destructive">*</span></Label>
                                    <Input id="dbName" placeholder="producao_app" required className="bg-background font-mono text-sm" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Auth & Security Column */}
                    <div className="flex flex-col gap-6">
                        
                        {/* Autentication Card */}
                        <Card className="shadow-sm border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Lock className="w-5 h-5 text-amber-500" />
                                    Autenticação Segura
                                </CardTitle>
                                <CardDescription>Credenciais de acesso para leitura.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Usuário (Username) <span className="text-destructive">*</span></Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="username" placeholder="readonly_agent" required className="pl-9 bg-background font-mono text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha <span className="text-destructive">*</span></Label>
                                    <Input id="password" type="password" placeholder="••••••••••••" required className="bg-background font-mono text-xs tracking-widest" />
                                    <p className="text-[10px] text-muted-foreground mt-1 tracking-tight leading-tight">A senha será encriptada no banco. Por segurança, prefira conceder permissões exclusivamente <code>SELECT</code> (Read-Only) ao banco.</p>
                                </div>

                                <div className="pt-4 border-t border-border/50">
                                    <Button 
                                        type="button" 
                                        variant="secondary" 
                                        className="w-full text-sm h-10 shadow-sm"
                                        onClick={handleTest}
                                        disabled={isTesting}
                                    >
                                        {isTesting ? (
                                            <><Activity className="w-4 h-4 mr-2 animate-spin text-primary" /> Validando Socket...</>
                                        ) : (
                                            <><Activity className="w-4 h-4 mr-2" /> Testar Conectividade</>
                                        )}
                                    </Button>
                                    {/* Success Feedback mock -> usually comes from state after test */}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </ScrollArea>
        </div>
    );
}

export default DatabaseForm;
