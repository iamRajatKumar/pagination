import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
    // console.log(data);
  };
  //console.log(products);
  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 5 &&
      selectedPage !== page
    )
      if (selectedPage === 10) {
        console.log("bye");
        alert("No more products!");
        return;
      }
    setPage(selectedPage);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 12 - 12, page * 12).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {
        //Pagination code
        products.length > 0 && (
          <div className="pagination">
            <span
              onClick={() => selectPageHandler(page - 1)}
              className={page > 1 ? "" : "pagination__disable"}
            >
              👈
            </span>
            {
              // ... is used to spread things
              [...Array(products.length / 10)].map((_, i) => {
                return (
                  <span
                    className={page === i + 1 ? "pagination__selected" : ""}
                    onClick={() => selectPageHandler(i + 1)}
                    key={i}
                  >
                    {i + 1}
                  </span>
                );
              })
            }
            <span
              onClick={() => selectPageHandler(page + 1)}
              className={
                page < products.length / 5 ? "" : "pagination__disable"
              }
            >
              👉
            </span>
          </div>
        )
      }
    </div>
  );
}

export default App;
