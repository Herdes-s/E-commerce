import styles from "./Header.module.scss";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../hooks/CartContext";

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  onSelect?: (selectSec: string) => void;
}

function Header({ onSearch, onSelect }: SearchBarProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryParam = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "all";

  const { totalItems } = useCart();

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
