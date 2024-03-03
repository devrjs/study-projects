"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import logo from "../../assets/logo.svg"
import { SignInButton } from "../SignInButton"
import styles from "./styles.module.scss"

export function Header() {
  const asPath = usePathname()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image alt="Logo" src={logo} width="0" height="0" priority />
        </Link>
        <nav>
          <Link href="/" className={asPath === "/" ? styles.active : ""}>
            Home
          </Link>
          <Link href="/posts" className={asPath === "/posts" ? styles.active : ""}>
            Posts
          </Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}
