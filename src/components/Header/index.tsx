import styles from "./Header.module.scss";
import {
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
  FaTiktok,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { CiLogin } from "react-icons/ci";

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  onSelect?: (selectSec: string) => void;
}

function Header({ onSearch, onSelect }: SearchBarProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const queryParam = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "all";

  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const [inputValue, setInputValue] = useState(queryParam);
  const [selectValue, setSelectValue] = useState(categoryParam);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;
    setSelectValue(newValue);
    if (onSelect) onSelect(newValue);

    navigate(`/?search=${encodeURIComponent(inputValue)}&category=${newValue}`);
  }

  function searchName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (onSearch) onSearch(inputValue);

    navigate(
      `/?search=${encodeURIComponent(inputValue)}&category=${selectValue}`,
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.row_one}>
          <div className={styles.social_media}>
            <p className={styles.seguir}>Siga-nos no</p>
            <a
              href="https://www.instagram.com/mizum.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className={styles.social_icon} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61590699144392"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className={styles.social_icon} />
            </a>
            <a
              href="https://www.tiktok.com/@mizum.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className={styles.social_icon} />
            </a>
          </div>

          <div className={styles.container_login}>
            {user ? (
              <div className={styles.login}>
                <p className={styles.name}>{user.name}</p>
                <button
                  type="button"
                  className={styles.btn_logout}
                  onClick={logout}
                >
                  <CiLogin />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className={styles.btn_login}
                onClick={() => navigate("/login")}
              >
                Cadastre-se / Entre
              </button>
            )}
          </div>
        </div>
        <div className={styles.row_two}>
          <h1 className={styles.logo} onClick={() => navigate("/")}>
            E-commerce
          </h1>
          <form className={styles.form} onSubmit={searchName}>
            <input
              className={styles.search}
              value={inputValue}
              onChange={handleChange}
              name="inputSearch"
              type="text"
              placeholder="O que você está procurando?"
            />
            <select
              name="category"
              id="category"
              onChange={handleOption}
              className={styles.select}
              value={selectValue}
            >
              <option value="all">Todos</option>
              <option value="men's clothing">men's clothing</option>
              <option value="jewelery">jewelery</option>
              <option value="electronics">electronics</option>
              <option value="women's clothing">women's clothing</option>
            </select>
            <button type="submit" className={styles.btn_search}>
              <IoSearch />
            </button>
          </form>
          <div className={styles.cart} onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            {totalItems > 0 && (
              <div className={styles.cart_count}>{totalItems}</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
