import { useState } from "react";
import Header from "../../components/Header";
import ListProducts from "../../components/ListProducts";

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
      <Header onSearch={handleSearch} onSelect={handleSelect} />
      <ListProducts query={searchQuery} selectQuery={selectQuery} />
    </>
  );
}

export default Outset;
