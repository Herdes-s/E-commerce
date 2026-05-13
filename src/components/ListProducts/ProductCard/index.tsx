import styles from './ProductCard.module.scss';

interface ProductProps {
  title: string;
  price: number;
  image: string;
  link: string;
}

export const ProductCard = ({ title, price, image, link }: ProductProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>R$ {price.toFixed(2)}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.button}>
        Ver na Shopee
      </a>
    </div>
  );
};

export default ProductCard;