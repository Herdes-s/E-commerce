import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import type { Product } from "../../../@types/Product";

export const ProductCard = (product: Product) => {
  const { image, title, price, category, rating } = product;
  const navigate = useNavigate();

  function lowPass() {
    navigate("/product", { state: { product } });
  }

  return (
    <div className={styles.card} onClick={lowPass}>
      <span className={styles.category}>{category}</span>
      <img className={styles.image} src={image} alt="item" />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>R$ {price.toFixed(2)}</p>
      <button className={styles.button}>Comprar</button>
      <div className={styles.rating}>
        <span>Quantia:{rating.count}</span>
        <span>Avaliação: {rating.rate}</span>
      </div>
    </div>
  );
};

export default ProductCard;
