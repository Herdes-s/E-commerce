import { useState } from "react";
import type { Product } from "../../@types/Product";
import styles from "./AboutProduct.module.scss";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import {
  FaRegStar,
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { useCart } from "../../hooks/CartContext";

interface AboutProductProps {
  product: Product;
}

function AboutProduct({ product }: AboutProductProps) {
  const navigate = useNavigate();
  const [expandido, setExpandido] = useState(false);

  const {
    addToCart,
  } = useCart();

  const limite = 100;

  if (product.description.length <= limite) {
    <p className={styles.description}>{product.description}</p>;
  }

  const textoExibido = expandido
    ? product.description
    : `${product.description.substring(0, limite)}...`;

  return (
    <section className={styles.section_aboutproduct}>
      <div className={styles.back}>
        <button onClick={() => navigate("/")}>
          <IoChevronBack /> Voltar
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.aboutproduct}>
          <div className={styles.container_img}>
            <img
              className={styles.image}
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className={styles.container_information}>
            <h2 className={styles.title}>{product.title}</h2>
            <span className={styles.star}>
              {product.rating.rate}
              {Array.from({ length: 5 }, (_, index) => {
                const numberStars = index + 1;
                if (product.rating.rate >= numberStars) {
                  return <FaStar key={index} />;
                }
                if (
                  product.rating.rate > numberStars - 1 &&
                  product.rating.rate < numberStars
                ) {
                  return <FaStarHalfAlt key={index} />;
                }
                return <FaRegStar key={index} />;
              })}
            </span>
            <span className={styles.price}>R$ {product.price}</span>
            <p className={styles.description}>{textoExibido}</p>
            <button
              className={styles.ver}
              onClick={() => setExpandido(!expandido)}
            >
              {expandido ? "Ler Menos" : "Ler Mais"}
            </button>
            <div className={styles.ticket}>
              <p>Adicionar Cupom</p>
              <p>20% OFF</p>
            </div>
          </div>
          <div className={styles.bottomBar}>
            <button className={styles.btn_buy}>Comprar Agora</button>
            <button className={styles.btn_cart} onClick={() => addToCart(product)}>
              <FaShoppingCart /> Adicionar ao Carrinho
            </button>
          </div>
        </div>
        <div className={styles.related_products}>
          <h3>Produtos Relacionados</h3>
          <div className={styles.related_products_grid}>
            {/* Aqui você pode mapear os produtos relacionados */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProduct;
