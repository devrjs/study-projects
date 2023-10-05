import { ApolloProvider } from "@apollo/client"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Router } from "./Router"
import { client } from "./lib/apollo"
import "./styles/global.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={Router} />
    </ApolloProvider>
  </React.StrictMode>
)

