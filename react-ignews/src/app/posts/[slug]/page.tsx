import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { createClient } from "@/prismicio"
import * as prismicH from "@prismicio/helpers"
import dayjs from "dayjs"
import ptBR from "dayjs/locale/pt-br"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import styles from "./styles.module.scss"

export default async function Post({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions)
  const { slug } = params
  const client = createClient()

  if (!session?.activeSubscription) {
    redirect(`/posts/preview/${slug}`)
  }

  const response = await client.getByUID("post", slug, {})

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content: prismicH.asHTML(response.data.content),
    publishedAt: dayjs(response.first_publication_date).locale(ptBR).format(`[Publicado: ] DD/MM/YYYY`),
    updatedAt: dayjs(response.last_publication_date)
      .locale(ptBR)
      .format(`[Atualizado em:] DD [de] MMMM [de] YYYY [às] HH:mm[h]`),
  }

  return (
    <main className={styles.container}>
      <article>
        <h1>{post.title}</h1>
        <div className={styles.date}>
          <time>{post.publishedAt}</time>
          <time>{post.updatedAt}</time>
        </div>
        <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  )
}
