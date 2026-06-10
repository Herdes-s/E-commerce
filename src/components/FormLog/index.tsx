import { useNavigate } from "react-router-dom";
import styles from "./FormLog.module.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

function FormLog() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_container}>
          <h1 onClick={() => navigate("/")}>E-commerce</h1>
        </div>
      </header>
      <section className={styles.form_log}>
        <div className={styles.form_log_container}>
          <h2>Log-In</h2>
          <form>
            <input
              className={styles.email_input}
              type="email"
              placeholder="Email"
              required
            />
            <div className={styles.password_container}>
              <input
                className={styles.password_input}
                type="password"
                placeholder="Password"
                required
              />
              <div className={styles.eye_container} onClick={() => setVisible(!visible)}>
                {visible ? (
                  <FaRegEye className={styles.eye} />
                ) : (
                  <FaRegEyeSlash className={styles.eye} />
                )}
              </div>
            </div>
            <button type="submit">Entrar</button>
          </form>
          <div className={styles.register_link}>
            <a href="/register">Não tem uma conta? Cadastre-se</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default FormLog;
