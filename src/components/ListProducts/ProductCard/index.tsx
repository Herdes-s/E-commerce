import { useState } from "react";
import styles from "./ProductCard.module.scss";

interface ProductProps {
  image: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const ProductCard = ({
  image,
  title,
  price,
  description,
  category,
  rating,
}: ProductProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.card}>
      <span className={styles.category}>{category}</span>
      <img className={styles.image} src={image} alt="item" />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>R$ {price.toFixed(2)}</p>
      {!show && (
        <button onClick={() => setShow(!show)} className={styles.verMais}>
          Ver mais...
        </button>
      )}
      {show && (
        <div>
          <p className={styles.description}>{description}</p>
          <button onClick={() => setShow(!show)} className={styles.verMenos}>
            Ver menos...
          </button>
        </div>
      )}
      <button className={styles.button}>Comprar</button>
      <div className={styles.rating}>
        <span>Quantia:{rating.count}</span>
        <span>Avaliação: {rating.rate}</span>
      </div>
    </div>
  );
};

export default ProductCard;
