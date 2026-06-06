import styles from "./ItemCart.module.scss";

import { useNavigate } from "react-router-dom";
import type { ItemCart } from "../../../@types/Product";
import { useCart } from "../../../hooks/CartContext";

interface ItemCartProps {
  product: ItemCart;
}

export function ItemCart({ product }: ItemCartProps) {
  const { addToCartWithQuantity, reduceToCartWithQuantity } = useCart();
  const navigate = useNavigate();

  function handleNavigateToProduct() {
    navigate("/product", { state: { product } });
  }

  return (
    <div className={styles.cart_item} onClick={handleNavigateToProduct}>
      <div className={styles.cart_item_info}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.cart_image}
        />
        <div className={styles.cart_info}>
          <h2 className={styles.cart_title}>{product.title}</h2>
          <span className={styles.cart_price}>R$ {product.price}</span>
        </div>
      </div>
      <div className={styles.cart_buttons}>
        <button
          className={styles.cart_button}
          onClick={(e) => {
            e.stopPropagation();
            addToCartWithQuantity(product, 1);
          }}
        >
          +
        </button>
        <span className={styles.cart_quantity}>{product.quantity}</span>
        <button
          className={styles.cart_button}
          onClick={(e) => {
            e.stopPropagation();
            reduceToCartWithQuantity(product, 1);
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}
