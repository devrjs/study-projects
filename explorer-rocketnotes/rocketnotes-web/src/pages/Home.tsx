import { Header } from "@/components/Header"
import { Note, TagProps } from "@/components/Note"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/services/api"
import { Plus } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

interface NoteProps {
  id: number
  title: string
  description: string
  tags: Array<TagProps>
}

export function Home() {
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [notes, setNotes] = useState([])
  const navigate = useNavigate()

  function handleTagSelected(tagName: string) {
    if (tagName === "all") {
      return setTagsSelected([])
    }

    const alreadySelected = tagsSelected.includes(tagName)

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected(prevState => [...prevState, tagName])
    }
  }

  function handleDeatils(id: number) {
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags")
      setTags(response.data)
    }

    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data)
    }

    fetchNotes()
  }, [tagsSelected, search])

  return (
    <div className="w-full h-screen flex">
      <div className="w-full max-w-[250px] flex flex-col">
        <div className="w-full min-h-[105px] flex items-center justify-center bg-secondary border-b border-b-popover">
          <h1 className="text-2xl text-primary">Rocketnotes</h1>
        </div>

        <ul className="h-full flex flex-col items-center gap-2 pt-16 bg-secondary">
          <li>
            <Button
              className={`text-muted-foreground ${tagsSelected.length === 0 && "text-primary"} hover:no-underline`}
              variant="link"
              onClick={() => handleTagSelected("all")}
            >
              Todos
            </Button>
          </li>
          {tags.map((tag: TagProps) => (
            <li key={tag.id}>
              <Button
                className={`text-muted-foreground ${
                  tagsSelected.includes(tag.name) && "text-primary"
                } hover:no-underline`}
                variant="link"
                onClick={() => handleTagSelected(tag.name)}
              >
                {tag.name}
              </Button>
            </li>
          ))}
        </ul>

        <Button asChild className="h-16 text-lg rounded-none">
          <Link to="/new" className="flex gap-2">
            <Plus size={24} /> Criar nota
          </Link>
        </Button>
      </div>

      <div className="w-full flex flex-col">
        <Header />

        <div className="h-[128px] px-16 pt-16">
          <Input placeholder="Pesquisar pelo título" onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="h-full overflow-y-auto px-16">
          <Section title="Minhas notas">
            {notes.map((note: NoteProps) => (
              <Note key={note.id} title={note.title} tags={note.tags} onClick={() => handleDeatils(note.id)} />
            ))}
          </Section>
        </div>
      </div>
    </div>
  )
}
