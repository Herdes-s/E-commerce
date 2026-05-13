import styles from "./Header.module.scss";
import log from "../../assets/icons/log.svg";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <h1 className={styles.logo}>E-commerce</h1>
        <div className={styles.log}>
          <img
            src={log}
            alt="Icone de um conequinho referente a suas informações de login"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
