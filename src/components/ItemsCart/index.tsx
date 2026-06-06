import styles from "./itemsCart.module.scss";

import { useCart } from "../../hooks/CartContext";
import { ItemCart } from "./ItemCart";

function ItemsCart() {
  const { cartItems } = useCart();

  return (
    <section className={styles.section_cart}>
      <div className={styles.container_cart}>
        <h1 className={styles.title}>Itens no Carrinho {cartItems.length}</h1>
        <div className={styles.all_cart_items}>
          {cartItems.map((item) => (
            <ItemCart key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ItemsCart;
