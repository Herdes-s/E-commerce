import styles from "./AboutProduct.module.scss";

function AboutProduct() {
    
  return (
    <section className={styles.section_aboutproduct}>
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="Produto" />
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.price}>{price}</span>
        <p className={styles.description}>{description}</p>
        <div className={styles.ticket}>
          <p>Adicionar Cupom</p>
          <p>20% OFF</p>
        </div>
        <div className={styles.bottomBar}>
          <button>Comprar</button>
          <button></button>
        </div>
      </div>
    </section>
  );
}

export default AboutProduct;
