import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import styles from "./ProductCarousel.module.scss";
import { getProducts } from "../../../services/api";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../@types/Product";

interface ProductCarouselProps {
  product: Product;
  currentIndex: number;
  onIndexChange: (index: number | ((prev: number) => number)) => void;
}

function ProductCarousel({ product, currentIndex, onIndexChange }: ProductCarouselProps) {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      if (Array.isArray(data) && data.length > 0) {
        setProductsList(data);
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    if (productsList.length === 0) return;

    const nextImage = setTimeout(() => {
      onIndexChange((prevIndex) => 
        prevIndex >= productsList.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearTimeout(nextImage);
  }, [currentIndex, productsList.length, onIndexChange]);

  const handleNavigateToProduct = () => {
    navigate("/product", { state: { product } });
  };

  const handlePrev = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if (productsList.length === 0) return;

    onIndexChange((prevIndex) => 
      prevIndex <= 0 ? productsList.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if (productsList.length === 0) return;

    onIndexChange((prevIndex) => 
      prevIndex >= productsList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentProductImage = productsList[currentIndex]?.image || "";

  return (
    <aside className={styles.carrosel} onClick={handleNavigateToProduct}>
      {currentProductImage && (
        <img 
          className={styles.carrosel_image} 
          src={currentProductImage} 
          alt="Imagem do Carrossel de Produtos" 
        />
      )}
      <div className={styles.arrows}>
        <button className={styles.arrow_left} onClick={handlePrev}>
          <FaArrowLeft />
        </button>
        <button className={styles.arrow_right} onClick={handleNext}>
          <FaArrowRight />
        </button>
      </div>
    </aside>
  );
}

export default ProductCarousel;