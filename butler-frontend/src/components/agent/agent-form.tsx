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
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
    Bot, 
    Save, 
    X, 
    BrainCircuit, 
    Database, 
    FileText, 
    PocketKnife,
    Sparkles,
    Brain
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AgentFormProps {
    onBack: () => void;
}

export function AgentForm({ onBack }: AgentFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onBack();
        }, 800);
    };

    return (
        <div className="flex flex-col h-full w-full gap-6 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <Bot className="w-8 h-8 text-primary" />
                        Novo Agente
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Configure o perfil, comportamento e as conexões do seu novo assistente autônomo.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={onBack} disabled={isLoading} className="shadow-sm">
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading} className="shadow-sm transition-all hover:shadow-md">
                        {isLoading ? (
                            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        Salvar Agente
                    </Button>
                </div>
            </div>

            {/* Form Content */}
            <ScrollArea className="flex-1 -mx-2 px-2">
                <form id="agent-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
                    
                    {/* Left Column (Main Info) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        
                        {/* Basic Info Card */}
                        <Card className="shadow-sm border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Bot className="w-5 h-5 text-primary/80" />
                                    Perfil do Agente
                                </CardTitle>
                                <CardDescription>Identificação e propósito geral do agente.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome do Agente <span className="text-destructive">*</span></Label>
                                    <Input id="name" placeholder="Ex: Analista de Suporte N1" required className="bg-background" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Descrição</Label>
                                    <Textarea 
                                        id="description" 
                                        placeholder="Descreva o que este agente faz e qual seu escopo de atuação..." 
                                        className="resize-none min-h-[80px] bg-background"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Behavior Card */}
                        <Card className="shadow-sm border-primary/10 flex-1 flex flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    Comportamento (System Prompt)
                                </CardTitle>
                                <CardDescription>Defina as instruções núcleo que ditarão a personalidade e regras do agente.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-1 flex flex-col">
                                <div className="space-y-2 flex-1 flex flex-col min-h-0">
                                    <div className="flex justify-between items-center pb-1">
                                        <Label htmlFor="systemPrompt">Prompt de Sistema <span className="text-destructive">*</span></Label>
                                        <Button type="button" variant="ghost" size="sm" className="hidden sm:flex h-6 text-xs text-primary">
                                            <Sparkles className="w-3 h-3 mr-1" /> Gerar com IA
                                        </Button>
                                    </div>
                                    <div className="relative flex-1 min-h-[220px]">
                                        <Textarea 
                                            id="systemPrompt" 
                                            placeholder="Você é um assistente útil focado em... Sempre responda em formato Markdown..." 
                                            required 
                                            className="absolute inset-0 resize-none font-mono text-sm bg-muted/30"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column (Settings & Connections) */}
                    <div className="flex flex-col gap-6">
                        
                        {/* Status Card */}
                        <Card className="shadow-sm border-primary/10">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold text-primary">Agente Ativo</Label>
                                    <p className="text-xs text-muted-foreground">Disponível para uso imediato</p>
                                </div>
                                <Switch defaultChecked />
                            </CardContent>
                        </Card>

                        {/* Connections Card */}
                        <Card className="shadow-sm border-primary/10">
                            <CardHeader>
                                <CardTitle className="text-lg">Conexões Principais</CardTitle>
                                <CardDescription>Vincule as tecnologias base.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-primary/80">
                                        <BrainCircuit className="w-4 h-4" /> Modelo de LLM <span className="text-destructive">*</span>
                                    </Label>
                                    <Select required>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Selecione um modelo..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gpt4o">GPT-4o (OpenAI)</SelectItem>
                                            <SelectItem value="claude35">Claude 3.5 Sonnet (Anthropic)</SelectItem>
                                            <SelectItem value="llama3">LLaMA 3 (Meta)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-amber-600 dark:text-amber-500/80 mt-2">
                                        <Database className="w-4 h-4" /> Banco de Dados <span className="text-destructive">*</span>
                                    </Label>
                                    <Select required>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Vincular banco principal..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="prod">Prod DB Read-only (PostgreSQL)</SelectItem>
                                            <SelectItem value="dw">Analytics DW (Snowflake)</SelectItem>
                                            <SelectItem value="meta">GitLab Meta DB (MySQL)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Context & Tools Card */}
                        <Card className="shadow-sm border-primary/10">
                            <CardHeader>
                                <CardTitle className="text-lg">Conhecimento & Habilidades</CardTitle>
                                <CardDescription>Expanda as capacidades do agente.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-blue-600 dark:text-blue-500 mt-2">
                                        <FileText className="w-4 h-4" /> PRD (Documentação)
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Sem PRD vinculado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Nenhum (Comportamento Ad-hoc)</SelectItem>
                                            <SelectItem value="s1">Support Flow v2</SelectItem>
                                            <SelectItem value="e1">Engineering Guidelines</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-[10px] text-muted-foreground mt-1">Guia o comportamento esperado de ponta a ponta.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 mt-2">
                                        <Brain className="w-4 h-4" /> Contextos
                                    </Label>
                                    <Button type="button" variant="outline" className="w-full justify-between font-normal text-muted-foreground bg-background">
                                        <span>Selecionar contextos...</span>
                                        <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium">0</span>
                                    </Button>
                                    <p className="text-[10px] text-muted-foreground mt-1">Regras de negócio e FAQs.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-rose-600 dark:text-rose-500 mt-2">
                                        <PocketKnife className="w-4 h-4" /> Ferramentas (Tools)
                                    </Label>
                                    <Button type="button" variant="outline" className="w-full justify-between font-normal text-muted-foreground bg-background">
                                        <span>Selecionar ferramentas...</span>
                                        <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium">0</span>
                                    </Button>
                                    <p className="text-[10px] text-muted-foreground mt-1">Integrações de ações externas.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </ScrollArea>
        </div>
    );
}

export default AgentForm;
