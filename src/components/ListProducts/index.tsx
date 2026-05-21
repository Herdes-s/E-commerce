import { useEffect, useState } from "react";
import styles from "./ListProducts.module.scss";
import ProductCard from "./ProductCard";
import type { Product } from "../../@types/Product";
import { getProducts } from "../../services/api";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ProductListProps {
  query: string;
}

function ListProducts({ query }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 5;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );
  
    const totalPages = Math.max(1, filteredProducts.length / limit);
  
    const currentPage = Math.min(page, totalPages);

  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const currentProduct = filteredProducts.slice(start, end);

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
        <div className={styles.grid}>
          {currentProduct.length === 0 ? (
            <p>Produto não encontrado</p>
          ) : (
            currentProduct.map((item) => (
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
        {filteredProducts.length === 0 ? null : (
          <div className={styles.flip_pages}>
            <button
              type="button"
              className={styles.arrow_button}
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              <FaArrowLeft className={styles.arrow_left} />
            </button>
            <button
              type="button"
              className={styles.arrow_button}
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
            >
              <FaArrowRight className={styles.arrow_right} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ListProducts;
