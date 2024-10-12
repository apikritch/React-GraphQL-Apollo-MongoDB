import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Product from "./pages/Product";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Query */}
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/:categoryId/products" element={<Products />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route
            path="/category/:categoryId/product/:productId"
            element={<Product />}
          />
        </Route>
        {/* Mutation */}
        {/* <Route path="/category/add" element={<AddCategory />} /> */}
        {/* <Route path="/search" element={<Search />} />
        <Route path="/:id" element={<Character />} /> */}
      </Routes>
    </div>
  );
}

export default App;
