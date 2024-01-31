import { TagProps } from "@/components/Note"
import { Section } from "@/components/Section"
import { Tag } from "@/components/Tag"
import { api } from "@/services/api"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { Button } from "../components/ui/button"

interface NoteProps {
  title: string
  description: string
  tags: Array<TagProps>
  links: Array<{
    id: number
    url: string
  }>
}

export function Details() {
  const [data, setData] = useState<NoteProps | null>(null)
  const params = useParams()
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?")

    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNotes()
  }, [])

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      {data && (
        <main className="h-full flex justify-center overflow-y-auto py-10">
          <div className="w-full h-fit max-w-xl flex flex-col">
            <Button className="self-end" variant="link" onClick={handleRemove}>
              Excluir nota
            </Button>

            <h1 className="text-4xl font-bold pt-16">{data.title}</h1>

            <p className="text-base mt-4 text-justify">{data.description}</p>

            {data.links && (
              <Section title="Links úteis">
                <ul className="flex flex-col gap-3">
                  {data.links.map(link => (
                    <li key={link.id}>
                      <Link to={link.url} target="_blank">
                        {link.url}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {data.tags && (
              <Section title="Marcadores">
                <div className="flex gap-2">
                  {data.tags.map(tag => (
                    <Tag key={tag.id} title={tag.name} />
                  ))}
                </div>
              </Section>
            )}

            <Button className="w-full" size="lg" onClick={handleBack}>
              Voltar
            </Button>
          </div>
        </main>
      )}
    </div>
  )
}

