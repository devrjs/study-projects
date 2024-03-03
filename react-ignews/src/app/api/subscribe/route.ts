import { db } from "@/services/firebase"
import { stripe } from "@/services/stripe"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

type User =
  | {
      email?: string
      stripe_customer_id?: string
    }
  | undefined

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  try {
    if (!session) {
      throw new Error("Session not found!")
    }

    const userSnap: User = (await getDoc(doc(db, "users", session.id))).data()

    if (!userSnap) {
      throw new Error("User not found!")
    }

    if (!userSnap.stripe_customer_id) {
      const stripeCustomer = await stripe.customers.create({
        email: userSnap.email,
      })

      userSnap.stripe_customer_id = stripeCustomer.id

      await updateDoc(doc(db, "users", session.id), {
        stripe_customer_id: stripeCustomer.id,
      })
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      line_items: [{ price: "price_1Lw5d2B54PgALyWwdroKwnFQ", quantity: 1 }],
      mode: "subscription",
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      billing_address_collection: "required",
      customer: userSnap.stripe_customer_id,
    })

    return NextResponse.json({ url: stripeCheckoutSession.url }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
