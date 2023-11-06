"use client"

import googleLogo from "@/assets/googleLogo.svg"
import { X } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import styles from "./styles.module.scss"

export function SignInButton() {
  const { data: session } = useSession()

  return session ? (
    <button className={styles.signInButton} onClick={() => signOut()}>
      <Image
        src={session.user.image}
        width={35}
        height={35}
        style={{ borderRadius: "999px" }}
        alt="Logo do google"
        quality={100}
      />
      {session.user?.name}
      <X size={20} />
    </button>
  ) : (
    <button className={styles.signInButton} onClick={() => signIn("google")}>
      <Image src={googleLogo} width={0} height={0} style={{ width: "25px", height: "auto" }} alt="Logo do google" />
      SignIn with Google
    </button>
  )
}
