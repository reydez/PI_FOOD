import "./App.css";
import { Route, Routes } from "react-router-dom";
import CreacionDeReceta from "./components/CreacionDeReceta";
import DetalleDeReceta from "./components/DetalleDeReceta";
import PaginaInicial from "./components/PaginaInicial";
import PaginaPrincipal from "./components/PaginaPrincipal";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<PaginaInicial />} />
        <Route path="/recipes" element={<PaginaPrincipal />} />
        <Route path="/recipes/:idReceta" element={<DetalleDeReceta />} />
        <Route path="/recipe" element={<CreacionDeReceta />} />
      </Routes>
    </div>
  );
}

export default App;
