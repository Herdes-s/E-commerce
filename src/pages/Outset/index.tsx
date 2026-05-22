import { useState } from "react";
import Header from "../../components/Header";
import ListProducts from "../../components/ListProducts";
import SearchProduct from "../../components/SearchProduct";

function Outset() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectQuery, setSelectQuery] = useState("all");

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleSelect = (sec: string) => {
    setSelectQuery(sec);
  };

  return (
    <>
      <Header />
      <SearchProduct onSearch={handleSearch} onSelect={handleSelect} />
      <ListProducts query={searchQuery} selectQuery={selectQuery} />
    </>
  );
}

export default Outset;
