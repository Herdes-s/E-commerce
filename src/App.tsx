import { Route, Routes } from "react-router-dom";
import "./App.css";
import Outset from "./pages/Outset";
import { ProductScreen } from "./pages/ProductScreen";
import CartItens from "./pages/CartItens";
import { CartProvider } from "./hooks/CartContext";
import Login from "./pages/Login/Login";

function App() {
  return (
    <CartProvider>
      <Routes >
        <Route path="/" element={<Outset />} />
        <Route path="/product" element={<ProductScreen />} />
        <Route path="/cart" element={<CartItens />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
