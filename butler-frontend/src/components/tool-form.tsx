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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
    Save, 
    X, 
    PocketKnife,
    AlignLeft,
    Network,
    Globe2,
    Lock
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ToolFormProps {
    onBack: () => void;
}

export function ToolForm({ onBack }: ToolFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isGlobal, setIsGlobal] = useState(false);

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
                        <PocketKnife className="w-8 h-8 text-primary" />
                        Nova Ferramenta
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Cadastre uma API ou Workflow (Tool) que o LLM poderá invocar de forma autônoma.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={onBack} disabled={isLoading} className="shadow-sm">
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading} className="shadow-sm transition-all hover:shadow-md">
                        {isLoading ? (
                            <PocketKnife className="w-4 h-4 mr-2 animate-pulse" />
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        Salvar Tool
                    </Button>
                </div>
            </div>

            {/* Form Content */}
            <ScrollArea className="flex-1 -mx-2 px-2">
                <form id="tool-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
                    
                    {/* Main Settings Column */}
                    <div className="xl:col-span-2 flex flex-col gap-6">
                        {/* API Detail Card */}
                        <Card className="shadow-sm border-primary/10 flex-1 flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Network className="w-5 h-5 text-amber-500" />
                                            Parâmetros e Conexão (Endpoint)
                                        </CardTitle>
                                        <CardDescription className="pt-1">Localização de onde os dados fluirão em formato de payload.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 flex-1 flex flex-col">
                                <div className="space-y-2">
                                    <Label htmlFor="apiEndpoint">API Endpoint <span className="text-destructive">*</span></Label>
                                    <Input 
                                        id="apiEndpoint" 
                                        placeholder="https://api.empresa.com.br/v2/finance/checar_limite" 
                                        required 
                                        className="bg-background font-mono text-sm"
                                    />
                                    <p className="text-[10px] text-muted-foreground mt-1">Este endpoint deverá estar preparado para receber e devolver JSON formatado segundo a especificação escolhida para as LLMs.</p>
                                </div>
                                <div className="space-y-2 flex-1 flex flex-col min-h-0">
                                    <Label htmlFor="description">Descrição em Linguagem Natural para a IA <span className="text-destructive">*</span></Label>
                                    <div className="relative flex-1 min-h-[160px]">
                                        <Textarea 
                                            id="description" 
                                            placeholder="Descrcreva minuciosamente AQUI sobre QUANDO e POR QUÊ o Agente deve usar esta Ferramenta. Ex: 'Use esta ferramenta sempre que o cliente perguntar o preço de um frete. Requer os parâmetros origin_cep e destination_cep....'" 
                                            required 
                                            className="absolute inset-0 resize-none font-mono text-sm bg-muted/30 p-4 leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Metadata & Identification Column */}
                    <div className="flex flex-col gap-6">
                        {/* Identify Card */}
                        <Card className="shadow-sm border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <AlignLeft className="w-5 h-5 text-primary/80" />
                                    Identificação Geral
                                </CardTitle>
                                <CardDescription>O nome lógico da ferramenta.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome da Tool <span className="text-destructive">*</span></Label>
                                    <Input id="name" placeholder="Ex: consultar_estoque_sap" required className="bg-background font-mono lowercase" />
                                    <p className="text-[10px] text-muted-foreground mt-1">É recomendado nomes sem os espaços (`snake_case` ou `camelCase`) já que este campo reflete na chamada natural das LLMs.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Scope / Visibility Card */}
                        <Card className={`shadow-sm border-primary/10 transition-colors ${isGlobal ? 'bg-amber-500/5 border-amber-500/20' : ''}`}>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    {isGlobal ? <Globe2 className="w-5 h-5 text-amber-500" /> : <Lock className="w-5 h-5 text-slate-500" />}
                                    Escopo de Visibilidade
                                </CardTitle>
                                <CardDescription>Permissão de uso geral no App</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">Equipar como Global</Label>
                                        <p className="text-[11px] text-muted-foreground mr-4">
                                            Se ativo, {<strong className="text-foreground">Qualquer</strong>} agente da base poderá selecionar e usar esta ferramenta. Se desativado, só será possível amarrá-la manualmente no menu do Agente.
                                        </p>
                                    </div>
                                    <Switch 
                                        checked={isGlobal} 
                                        onCheckedChange={setIsGlobal} 
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </form>
            </ScrollArea>
        </div>
    );
}

export default ToolForm;
