import { useNavigate } from "react-router-dom";
import styles from "./FormLog.module.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { IoChevronBack } from "react-icons/io5";
import { useAuthStore } from "../../stores/useAuthStore";

type FormLogProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
};

function FormLog({ setIsLogin, isLogin }: FormLogProps) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuthStore()

  function handleAccount(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    login({ email, password })
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_container}>
          <h1 onClick={() => navigate("/")}>E-commerce</h1>
        </div>
      </header>
      <div className={styles.back}>
          <button onClick={() => navigate(-1)}>
            <IoChevronBack /> Voltar
          </button>
        </div>
      <section className={styles.form_log}>
        <div className={styles.form_log_container}>
          <h2>Entrar</h2>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.email_input}
              type="email"
              name="email"
              onChange={handleAccount}
              value={email}
              placeholder="Email"
              required
            />
            <div className={styles.password_container}>
              <input
                className={styles.password_input}
                type={!visible ? "password" : "text"}
                name="password"
                onChange={handleAccount}
                value={password}
                placeholder="Senha"
                required
              />
              <button
                type="button"
                className={styles.eye_container}
                onClick={() => setVisible(!visible)}
              >
                {visible ? (
                  <FaRegEye className={styles.eye} />
                ) : (
                  <FaRegEyeSlash className={styles.eye} />
                )}
              </button>
            </div>
            <button className={styles.btn_enter} onClick={() => navigate("/")} type="submit">
              Entrar
            </button>
          </form>
          <div className={styles.register_link}>
            <button
              className={styles.btn_change_form}
              onClick={() => setIsLogin(!isLogin)}
            >
              Não tem uma conta? Cadastre-se
            </button>
          </div>
        </div>
        <div></div>
      </section>
    </>
  );
}

export default FormLog;
