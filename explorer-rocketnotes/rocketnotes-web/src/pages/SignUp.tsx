import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/services/api"
import { EnvelopeSimple, LockSimple, User } from "@phosphor-icons/react"
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function handleSingUp(event: FormEvent) {
    event.preventDefault()

    if (!name || !email || !password) {
      return alert("Preencha todos os campos!")
    }

    api
      .post("/users", { name, email, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso!")
        navigate(-1)
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message)
        } else {
          alert("Não foi possível cadastrar.")
        }
      })
  }

  return (
    <div className="w-full h-screen flex items-stretch">
      <div className="flex-1 bg-[url(/src/assets/background.png)] bg-no-repeat bg-center bg-cover brightness-75" />

      <form className="flex flex-col items-center justify-center gap-2 px-32">
        <h1 className="text-5xl text-primary font-bold">Rocket Notes</h1>
        <p className="text-sm text-muted-foreground">Aplicação para salvar e gerenciar seus link úteis.</p>

        <h2 className="text-2xl font-bold mt-14 mb-4">Crie sua conta</h2>

        <Input placeholder="Nome" type="text" leftIcon={<User />} onChange={e => setName(e.target.value)} />
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

        <Button className="w-full mt-4 mb-6" size="lg" onClick={handleSingUp}>
          Cadastrar
        </Button>

        <Link to="/" className="text-primary">
          Voltar para o login
        </Link>
      </form>
    </div>
  )
}
