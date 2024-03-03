import { db } from "@/services/firebase"
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      const activeSubscription = await getDocs(
        query(collection(db, "subscriptions"), where("userId", "==", token.sub), where("status", "==", "active"))
      ).then(querySnapshot => {
        const [subscription] = querySnapshot.docs.map(doc => {
          return {
            subscriptionId: doc.id,
            ...doc.data(),
          }
        })

        return subscription
      })

      return { ...session, id: token.sub, activeSubscription }
    },

    async signIn({ user }) {
      try {
        const userSnap = await getDoc(doc(db, "users", user.id))

        if (!userSnap.data()) {
          await setDoc(doc(db, "users", user.id), {
            email: user.email,
          })
        }

        return true
      } catch {
        return false
      }
    },
  },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
