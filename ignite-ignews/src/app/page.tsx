import { SubscribeButton } from "@/components/SubscribeButton"
import { stripe } from "@/services/stripe"
import Image from "next/image"
import illustration from "../assets/illustration.svg"
import styles from "./styles.module.scss"

export default async function Home() {
  const price = await stripe.prices.retrieve("price_1Lw5d2B54PgALyWwdroKwnFQ")

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(price.unit_amount) / 100),
  }

  return (
    <main className={styles.contentContainer}>
      <section>
        <span>👏 Hey, welcome</span>
        <h1>
          News about <br /> the <span>React</span> world.
        </h1>
        <p>
          Get access to all the publications <br />
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton />
      </section>

      <Image alt="Imagem de ilustração" src={illustration} width="0" height="0" className="w-80 h-auto" priority />
    </main>
  )
}

