import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { createClient } from "@/prismicio"
import * as prismicH from "@prismicio/helpers"
import dayjs from "dayjs"
import ptBR from "dayjs/locale/pt-br"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import styles from "./styles.module.scss"

export default async function PostPreview({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions)
  const { slug } = params
  const client = createClient()

  if (session?.activeSubscription) {
    redirect(`/posts/${slug}`)
  }

  const response = await client.getByUID("post", slug, {})

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content: prismicH.asHTML(response.data.content).slice(0, 600).concat("..."),
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
        <div
          className={`${styles.postContent} ${styles.previewContent}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className={styles.continueReading}>
          Wanna continue reading?
          <Link href="/">Subscribe now 🤗</Link>
        </div>
      </article>
    </main>
  )
}
