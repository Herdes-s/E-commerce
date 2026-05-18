import { useState } from "react";
import type { Product } from "../../@types/Product";
import styles from "./AboutProduct.module.scss";
import { useNavigate } from "react-router-dom";

interface AboutProductProps {
  product: Product;
}

function AboutProduct({ product }: AboutProductProps) {
  const navigate = useNavigate();
  const [expandido, setExpandido] = useState(false);

  const limite = 150;

  if (product.description.length <= limite) {
    <p className={styles.description}>{product.description}</p>;
  }

  const textoExibido = expandido
    ? product.description
    : `${product.description.substring(0, limite)}...`;

  return (
    <section className={styles.section_aboutproduct}>
      <div className={styles.back}>
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>
      <div className={styles.container}>
        <div className={styles.container_img}>
          <img
            className={styles.image}
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className={styles.container_information}>
          <h2 className={styles.title}>{product.title}</h2>
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
          <button>Comprar</button>
          <button>Carrinho</button>
        </div>
      </div>
    </section>
  );
}

export default AboutProduct;
