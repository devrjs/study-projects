"use client"

import { api } from "@/services/api"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import styles from "./styles.module.scss"

export function SubscribeButton() {
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn("github")
      return
    }

    if (session.activeSubscription) {
      router.push("/posts")
      return
    }

    try {
      const response = await api.post("/subscribe")
      window.location.href = response.data.url
    } catch (error) {
      console.log(error)
      alert("Subscribe error!")
    }
  }

  return (
    <button className={styles.subscribeButton} onClick={handleSubscribe}>
      Subscribe now
    </button>
  )
}
