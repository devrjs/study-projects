import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { saveSubscription } from "../_lib/manageSubscription"

export async function POST(request: NextRequest) {
  const event = await request.json()
  const subscription = event.data.object as Stripe.Subscription

  try {
    switch (event.type) {
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await saveSubscription(subscription.id, subscription.customer.toString())
        break

      case "customer.subscription.created":
        await saveSubscription(subscription.id, subscription.customer.toString(), true)
        break
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: "Webhook handler falied." })
  }
}
