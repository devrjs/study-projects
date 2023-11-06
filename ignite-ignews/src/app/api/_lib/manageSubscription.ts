import { db } from "@/services/firebase"
import { stripe } from "@/services/stripe"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"

export async function saveSubscription(subcriptionId: string, customerId: string, createAction = false) {
  try {
    const userSnap = await getDocs(query(collection(db, "users"), where("stripe_customer_id", "==", customerId))).then(
      querySnapshot => {
        const [data] = querySnapshot.docs.map(doc => {
          return {
            userId: doc.id,
            ...doc.data(),
          }
        })

        return data
      }
    )

    if (!userSnap) {
      throw new Error("Document not found!")
    }

    const subscription = await stripe.subscriptions.retrieve(subcriptionId)

    await setDoc(doc(db, "subscriptions", subscription.id), {
      userId: userSnap.userId,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
    })
  } catch (error) {
    console.log("Error: ", error)
  }
}
