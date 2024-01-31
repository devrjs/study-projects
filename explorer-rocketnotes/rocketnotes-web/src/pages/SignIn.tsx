import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { EnvelopeSimple, LockSimple } from "@phosphor-icons/react"
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn } = useAuth()

  function handleSignIn(event: FormEvent) {
    event.preventDefault()

    signIn({ email, password })
  }

  return (
    <div className="w-full h-screen flex items-stretch">
      <form className="flex flex-col items-center justify-center gap-2 px-32">
        <h1 className="text-5xl text-primary font-bold">Rocket Notes</h1>
        <p className="text-sm text-muted-foreground">Aplicação para salvar e gerenciar seus link úteis.</p>

        <h2 className="text-2xl font-bold mt-14 mb-4">Faça seu login</h2>

        <Input
          placeholder="E-mail"
          type="email"
          leftIcon={<EnvelopeSimple />}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          leftIcon={<LockSimple />}
          onChange={e => setPassword(e.target.value)}
        />

        <Button className="w-full mt-4 mb-6" size="lg" onClick={handleSignIn}>
          Entrar
        </Button>

        <Link to="/signup" className="text-primary">
          Criar conta
        </Link>
      </form>

      <div className="flex-1 bg-[url(/src/assets/background.png)] bg-no-repeat bg-center bg-cover brightness-75" />
    </div>
  )
}
