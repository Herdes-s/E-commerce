import { useState } from "react";
import styles from "./SearchProduct.module.scss";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onSelect: (selectSec: string) => void;
}

function SearchProduct({ onSearch, onSelect }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("all");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;
    setSelectValue(newValue);
    onSelect(newValue);
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
          <IoSearch />
        </button>
      </form>
      <div className={styles.select}>
        <select
          name="category"
          id="category"
          onChange={handleOption}
          value={selectValue}
        >
          <option value="all">Todos</option>
          <option value="men's clothing">men's clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="women's clothing">women's clothing</option>
        </select>
      </div>
    </section>
  );
}

export default SearchProduct;
