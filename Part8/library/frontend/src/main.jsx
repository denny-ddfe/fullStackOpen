import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from '@apollo/client/react'
import {BrowserRouter} from 'react-router-dom'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000' 
  }),
  cache: new InMemoryCache(),
})
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>
  </React.StrictMode>
);
