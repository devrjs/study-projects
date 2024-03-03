import { createClient } from "@/prismicio"
import * as prismicH from "@prismicio/helpers"
import dayjs from "dayjs"
import ptBR from "dayjs/locale/pt-br"
import Link from "next/link"

import styles from "./styles.module.scss"

type Content =
  | {
      type: string
      text: string
    }
  | undefined

export default async function Posts() {
  const client = createClient()

  const response = await client.getByType("post", { fetch: ["post.title", "post.content"], page: 1, pageSize: 10 })

  const posts = response.results.map(post => {
    const content = post.data.content.find(content => content.type == "paragraph") as Content

    return {
      slug: post.uid,
      title: prismicH.asText(post.data.title),
      excerpt: content && content.text.length >= 400 ? content.text.slice(0, 400).concat("...") : content?.text,
      updatedAt: dayjs(post.last_publication_date).locale(ptBR).format(`DD [de] MMMM [de] YYYY`),
    }
  })

  return (
    <main className={styles.container}>
      <div>
        {posts.map(posts => (
          <Link key={posts.slug} href={`/posts/${posts.slug}`}>
            <time>{posts.updatedAt}</time>
            <strong>{posts.title}</strong>
            <p>{posts.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
