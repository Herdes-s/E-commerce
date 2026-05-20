import { useEffect, useState } from "react";
import styles from "./ListProducts.module.scss";
import ProductCard from "./ProductCard";
import type { Product } from "../../@types/Product";
import { getProducts } from "../../services/api";

interface ProductListProps {
  query: string;
}

function ListProducts({ query }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <section className={styles.section_listProducts}>
        <div className={styles.container}>
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div className={styles.skeleton} key={idx}>
                <div className={styles.skeleton_img} />
                <div className={styles.skeleton_title} />
                <div className={styles.skeleton_price} />
              </div>
            ))}
        </div>
      </section>
    );

  return (
    <section className={styles.section_listProducts}>
      <div className={styles.container}>
        {filteredProducts.length === 0 ? (
          <p>Produto não encontrado</p>
        ) : (
          filteredProducts.map((item) => (
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
          ))
        )}
      </div>
    </section>
  );
}

export default ListProducts;
