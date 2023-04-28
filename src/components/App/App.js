import { products } from "../../products";
import ProductList from "../ProductList/ProductList";

function App() {
  return (
    <div className="container w-800 m-auto">
      <div className="py-10">
        <h1 className="font-nothing text-7xl font-bold text-center">Uniquely You Fashion</h1>
      </div>
      <ProductList products={products}/>
    </div>
  );

}

export default App;
