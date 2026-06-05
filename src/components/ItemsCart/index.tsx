import styles from "./itemsCart.module.scss";

import { useCart } from "../../hooks/CartContext";

function ItemsCart() {
  const { cartItems, addToCartWithQuantity, reduceToCartWithQuantity } = useCart();

  return (
    <section className={styles.section_cart}>
      <div className={styles.container_cart}>
        <h1 className={styles.title}>Itens no Carrinho {cartItems.length}</h1>
        <div className={styles.all_cart_items}>
          {cartItems.map((iten) => (
              <div key={iten.id} className={styles.cart_item}>
                  <div className={styles.cart_item_info}>
                    <img src={iten.image} alt={iten.title} className={styles.cart_image} />
                    <div className={styles.cart_info}>
                        <h2 className={styles.cart_title}>{iten.title}</h2>
                        <span className={styles.cart_price}>R$ {iten.price}</span>
                    </div>
                  </div>
                  <div className={styles.cart_buttons}>
                      <button className={styles.cart_button} onClick={() => addToCartWithQuantity(iten, 1)}>
                        +
                      </button>
                      <span className={styles.cart_quantity}>{iten.quantity}</span>
                      <button className={styles.cart_button} onClick={() => reduceToCartWithQuantity(iten, 1)}>
                        -
                      </button>
                  </div>
              </div>
          ))}
          </div>
      </div>
    </section>
  );
}

export default ItemsCart;
