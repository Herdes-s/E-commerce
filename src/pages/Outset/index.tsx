import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ListProducts from "../../components/ListProducts";
import { useSearchParams } from "react-router-dom";

function Outset() {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const selectQuery = searchParams.get("category") || "all";

  return (
    <>
      <Header  />
      <ListProducts query={searchQuery} selectQuery={selectQuery} />
      <Footer />
    </>
  );
}

export default Outset;
