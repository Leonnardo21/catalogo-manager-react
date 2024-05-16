import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsList from "./pages/Products/ProductsList";
import ProductsEdit from "./pages/Products/ProductsEdit";
import ProductsForm from "./pages/Products/ProductsForm";
import Category from "./pages/Category/CategoryList";
import CategoryForm from "./pages/Category/CategoryForm";
import CategoryEdit from "./pages/Category/CategoryEdit";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/new-product" element={<ProductsForm />}/>
        <Route path="/edit-product/:productId" element={<ProductsEdit />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/new-category" element={<CategoryForm />} />
        <Route path="/categories/edit-category/:categoryId" element={<CategoryEdit />} />
      </Routes>
    </Router>
  );
}
