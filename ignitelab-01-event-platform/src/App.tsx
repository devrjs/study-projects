import { ApolloProvider } from "@apollo/client"
import { RouterProvider } from "react-router-dom"
import { Router } from "./Router"
import { client } from "./lib/apollo"

export function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={Router} />
    </ApolloProvider>
  )
}
