import { useEffect, useState } from "react";
import styles from "./ListProducts.module.scss";
import ProductCard from "./ProductCard";
import type { Product } from "../../@types/Product";
import { getProducts } from "../../services/api";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProductCarousel from "./ProductCarousel";

interface ProductListProps {
  query: string;
  selectQuery: string;
}

function ListProducts({ query, selectQuery }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [prevFilters, setPrevFilters] = useState({ query, selectQuery });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0);

  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <section className={styles.section_listProducts}>
        <div className={styles.container}>
          <div className={styles.grid}>
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
        </div>
      </section>
    );

  if (query !== prevFilters.query || selectQuery !== prevFilters.selectQuery) {
    setPrevFilters({ query, selectQuery });
    setPage(1);
    setCurrentCarouselIndex(0);
  }

  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );

  if (selectQuery !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectQuery,
    );
  }

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / limit));

  const currentPage = Math.min(page, totalPages);

  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const currentProduct = filteredProducts.slice(start, end);

  const activeCarouselProduct = filteredProducts[currentCarouselIndex] || filteredProducts[0];

  return (
    <section className={styles.section_listProducts}>
      
      {filteredProducts.length > 0 && activeCarouselProduct && (
        <div className={styles.carousel_wrapper}>
          <ProductCarousel 
            product={activeCarouselProduct} 
            currentIndex={currentCarouselIndex}
            onIndexChange={setCurrentCarouselIndex}
          />
        </div>
      )}

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
              disabled={currentPage === 1}
            >
              <FaArrowLeft className={styles.arrow_left} />
            </button>

            <span className={styles.page_indicator}>
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              className={styles.arrow_button}
              onClick={() => setPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
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
