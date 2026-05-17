import { Route, Routes } from "react-router-dom";
import "./App.css";
import Outset from "./pages/Outset";
import { ProductScreen } from "./pages/ProductScreen";

function App() {
  return (
    <Routes >
      <Route path="/" element={<Outset />} />
      <Route path="/product" element={<ProductScreen />} />
    </Routes>
  );
}

export default App;
