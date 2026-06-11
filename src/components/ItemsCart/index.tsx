import styles from "./itemsCart.module.scss";

import { ItemCart } from "./ItemCart";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";

function ItemsCart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const navigate = useNavigate();

  return (
    <section className={styles.section_cart}>
      <div className={styles.container_cart}>
        <div className={styles.back}>
          <button onClick={() => navigate(-1)}>
            <IoChevronBack /> Voltar
          </button>
        </div>
        <h1 className={styles.title}>Carrinho de Compras</h1>
        <div className={styles.header_cart}>
          <p className={styles.total}>
            Total: R${" "}
            {cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
          <p className={styles.quantity}>
            Quantidade:{" "}
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </p>
        </div>
        <div className={styles.all_cart_items}>
          {cartItems.map((item) => (
            <ItemCart key={item.id} product={item} />
          ))}
        </div>
        <div className={styles.checkout}>
          <button disabled={cartItems.length === 0}>Finalizar Compra</button>
        </div>
      </div>
    </section>
  );
}

export default ItemsCart;
