import styles from "./Footer.module.scss"

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© 2024 Mizum.dev. Todos os direitos reservados.</p>
      <div className={styles.links}>
        <a href="https://github.com/Herdes-s" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/ernand-soares" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  )
}

export default Footer