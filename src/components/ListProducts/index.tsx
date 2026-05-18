import { useEffect, useState } from "react";
import styles from "./ListProducts.module.scss";
import ProductCard from "./ProductCard";
import type { Product } from "../../@types/Product";
import { getProducts } from "../../services/api";

function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className={styles.load}>Carregando produtos...</p>;

  return (
    <section className={styles.section_listProducts}>
      <div className={styles.container}>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            category={item.category}
            description={item.description}
            rating={item.rating}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
}

export default ListProducts;
