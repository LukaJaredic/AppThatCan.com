import "./App.css";

import Router from "./pages/router/Router";
import ModalContextProvider from "./contexts/ModalContext";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserContextProvider>
          <ModalContextProvider>
            <Router />
          </ModalContextProvider>
        </UserContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
