import { Header } from "@/components/Header"
import { NoteItem } from "@/components/NoteItem"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/services/api"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export function New() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState<string[]>([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink])
    setNewLink("")
  }

  function handleRemoveLink(deleted: string) {
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted: string) {
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  async function handleNewNote(event: FormEvent) {
    event.preventDefault()

    if (!title) {
      return alert("Digite o título da nota")
    }

    if (newLink) {
      return alert("O link foi preenchido mas ainda não foi adicionado. Clique para adicionar ou deixe o campo vazio.")
    }

    if (newTag) {
      return alert("A tag foi preenchida mas ainda não foi adicionada. Clique para adicionar ou deixe o campo vazio.")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    })

    alert("Nota criada com sucesso!")
    navigate(-1)
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />

      <main className="h-full flex justify-center overflow-y-auto py-10">
        <form className="h-fit w-full max-w-[550px] flex flex-col gap-2">
          <header className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Criar nota</h1>
            <Button className="text-lg text-muted-foreground" variant="link" type="button" onClick={handleBack}>
              Voltar
            </Button>
          </header>

          <Input placeholder="Título" onChange={e => setTitle(e.target.value)} />
          <Textarea className="h-[150px]" placeholder="Obeservações" onChange={e => setDescription(e.target.value)} />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem key={String(index)} value={link} onClick={() => handleRemoveLink(link)} />
            ))}
            <NoteItem
              isNew
              placeholder="Novo link"
              onChange={e => setNewLink(e.target.value)}
              value={newLink}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="flex justify-between flex-wrap gap-3">
              {tags.map((tag, index) => (
                <NoteItem key={String(index)} value={tag} onClick={() => handleRemoveTag(tag)} />
              ))}
              <NoteItem
                isNew
                placeholder="Nova tag"
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button className="mt-2" size="lg" type="submit" onClick={handleNewNote}>
            Salvar
          </Button>
        </form>
      </main>
    </div>
  )
}
