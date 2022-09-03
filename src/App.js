import "./App.scss";

import Router from "./pages/router/Router";
import ModalContextProvider from "./contexts/ModalContext";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <QueryClientProvider client={client}>
          <UserContextProvider>
            <ModalContextProvider>
              <Router />
            </ModalContextProvider>
          </UserContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
