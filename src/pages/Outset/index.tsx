import { useState } from "react";
import Header from "../../components/Header";
import ListProducts from "../../components/ListProducts";
import SearchProduct from "../../components/SearchProduct";

function Outset() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  return (
    <>
      <Header />
      <SearchProduct onSearch={handleSearch}/>
      <ListProducts query={searchQuery}/>
    </>
  );
}

export default Outset;
