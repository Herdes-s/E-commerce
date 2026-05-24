import { useLocation } from "react-router-dom";
import AboutProduct from "../../components/AboutProduct";
import type { Product } from "../../@types/Product";
import Header from "../../components/Header";

interface LocationState {
  product: Product;
}

export const ProductScreen = () => {
  const location = useLocation();

  const state = location.state as LocationState | null;

  const product = state?.product;

  if (!product) {
    return (
      <div>
        <p>Produto não encontrado ou página atualizada.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <AboutProduct product={product} />
    </>
  );
};
