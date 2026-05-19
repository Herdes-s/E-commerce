import { useState } from "react";
import styles from "./SearchProduct.module.scss";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function SearchProduct({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function searchName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSearch(inputValue);
  }
  return (
    <section className={styles.bar}>
      <form className={styles.form} onSubmit={searchName}>
        <input
          className={styles.search}
          value={inputValue}
          onChange={handleChange}
          name="inputSearch"
          type="text"
          placeholder="O que você está procurando?"
        />
        <button type="submit" className={styles.btn_search}>
          P
        </button>
      </form>
    </section>
  );
}

export default SearchProduct;
