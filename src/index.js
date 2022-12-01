import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"
import { PageProvider } from "store/context"


import store from "./store"

const app = (
  <PageProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </PageProvider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
