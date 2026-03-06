import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { register } from "@/services/register"

export function RegisterForm({
    className,
    onLoginClick,
    ...props
}: React.ComponentProps<"div"> & { onLoginClick: () => void }) {
    const [userName, setUserName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")

    const isValidPassword = (pass: string) => {
        if (pass.length < 6) return false;
        if (!/[a-zA-Z]/.test(pass)) return false;
        if (!/[0-9]/.test(pass)) return false;
        if (!/[^a-zA-Z0-9]/.test(pass)) return false; // symbol
        return true;
    }

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!userName.trim()) {
            setError("O nome é obrigatório.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("E-mail inválido.");
            return;
        }

        if (!isValidPassword(password)) {
            setError("A senha deve ter no mínimo 6 caracteres, contendo letras, números e símbolos.");
            return;
        }

        const success = await register(userName, email, password)
        if (success) {
            onLoginClick();
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Registre-se</CardTitle>
                    <CardDescription>
                        Crie uma nova conta informando seus dados
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Nome</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Senha</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {error && (
                                    <span className="text-sm text-red-500 font-medium">{error}</span>
                                )}
                            </Field>
                            <Field>
                                <Button type="submit">Cadastrar</Button>
                                <FieldDescription className="text-center">
                                    Já possui uma conta? <button type="button" onClick={onLoginClick} className="underline-offset-4 hover:underline text-primary cursor-pointer">Faça login</button>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
