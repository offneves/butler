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
import { 
    Save, 
    X, 
    FileText,
    AlignLeft,
    Type,
    Sparkles,
    TextSelect
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface PRDFormProps {
    onBack: () => void;
}

export function PRDForm({ onBack }: PRDFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState("");

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
                        <FileText className="w-8 h-8 text-primary" />
                        Nova Documentação (PRD)
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Defina o roteiro de Produto e Requisitos do Agente para que a IA consuma essa diretriz fundamental.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={onBack} disabled={isLoading} className="shadow-sm">
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading} className="shadow-sm transition-all hover:shadow-md">
                        {isLoading ? (
                            <FileText className="w-4 h-4 mr-2 animate-pulse" />
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        Salvar PRD
                    </Button>
                </div>
            </div>

            {/* Form Content */}
            <ScrollArea className="flex-1 -mx-2 px-2">
                <form id="prd-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
                    
                    {/* Content Editor Column */}
                    <div className="xl:col-span-2 flex flex-col gap-6">
                        <Card className="shadow-sm border-primary/10 flex-1 flex flex-col min-h-[400px]">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <TextSelect className="w-5 h-5 text-indigo-500" />
                                            Corpo Literário do PRD
                                        </CardTitle>
                                        <CardDescription className="pt-1">A redação que dá alma e delimitações à mente do Agente.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-1 flex flex-col">
                                <div className="space-y-2 flex-1 flex flex-col min-h-0">
                                    <div className="flex justify-between items-center pb-1">
                                        <Label htmlFor="content">Conteúdo (Documentação) <span className="text-destructive">*</span></Label>
                                        <Button type="button" variant="ghost" size="sm" className="hidden sm:flex h-6 text-xs text-primary">
                                            <Sparkles className="w-3 h-3 mr-1" /> Gerar com IA
                                        </Button>
                                    </div>
                                    <div className="relative flex-1 min-h-[280px]">
                                        <Textarea 
                                            id="content" 
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="Ex: # Visão Geral do Produto \n\n O agente X terá como missão primordial auxiliar na triagem de problemas de conexão dos clientes. Deve ser polido, consultar a API XPTO e jamais ceder descontos acima de 10%..." 
                                            required 
                                            className="absolute inset-0 resize-none font-mono text-sm bg-muted/30 p-4"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
                                        <span>Use Markdown básico para estruturar os topicos com clareza.</span>
                                        <span>{content.length} caracteres informados</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Settings & Identification Column */}
                    <div className="flex flex-col gap-6">
                        {/* Identify Card */}
                        <Card className="shadow-sm border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <AlignLeft className="w-5 h-5 text-primary/80" />
                                    Metadados e Resumo
                                </CardTitle>
                                <CardDescription>Defina os dados de cabeçalho do seu documento.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nome do PRD <span className="text-destructive">*</span></Label>
                                        <Input id="name" placeholder="Ex: PRD Assistente de Redes V1" required className="bg-background" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Descrição Concisa <span className="text-destructive">*</span></Label>
                                        <Textarea 
                                            id="description" 
                                            placeholder="Uma breve introdução sobre o que este documento abrange." 
                                            className="resize-none min-h-[80px] bg-background text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 mt-4 pt-4 border-t border-border/50">
                                    <Label className="block mb-2">Formato Suportado</Label>
                                    <div className="flex items-center justify-between p-3 rounded-md bg-muted/40 border border-border">
                                        <div className="flex items-center gap-2">
                                            <Type className="w-4 h-4 text-indigo-500" />
                                            <span className="text-sm font-medium">Documento Livre</span>
                                        </div>
                                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">Padrão</Badge>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-2 leading-tight">
                                        O PRD é a fundação da IA. A inteligência tratará o corpo do texto com prioridade máxima na tomada de decisões frente a conflitos casuais com outros sub-contextos.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </form>
            </ScrollArea>
        </div>
    );
}

export default PRDForm;
