import { useEffect, useState } from "react";
import styles from "./ProductCarousel.module.scss";
import { getProducts } from "../../../services/api";

interface imageEstructure {
  image: string;
}

function ProductCarousel() {
  const [imageProduct, setImageProduct] = useState<imageEstructure>({
    image: "",
  });
  const [numberImage, setNumberImage] = useState<number>(0);

  useEffect(() => {
    const nextImage = setTimeout(() => {
      setNumberImage((n) => (n <= 20 ? n + 1 : 0));
    }, 5000);

    return () => clearTimeout(nextImage);
  }, [numberImage]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      if (Array.isArray(data) && data.length > 0) {
        setImageProduct({ image: data[numberImage].image });
      }
    };

    fetchData();
  }, [numberImage]);

  return (
    <aside className={styles.carrosel}>
      <img className={styles.carrosel_image} src={imageProduct.image} alt="Product" />
    </aside>
  );
}

export default ProductCarousel;
