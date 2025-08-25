import { createRoot } from "react-dom/client";
import App from "./containers/App";
import { BrowserRouter } from "react-router-dom";
import { PedidosProvider } from "./context/pedidosProvider";

//chamando a pagina principal App
createRoot(document.getElementById("root")).render(
  <PedidosProvider>
    <App />
  </PedidosProvider>
);
