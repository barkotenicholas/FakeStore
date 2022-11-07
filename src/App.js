import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./components/home/Home";
import Header from "./components/Header/Header";
import AllProducts from "./components/AllProducts/AllProducts";
import SideBarHook from "./components/sidebar/SideBarHook";
import GetAllProducts from "./GetAllProducts";
import Single from "./components/singleproduct/Single";
import './App.css';

function App() {
  const [toggle,toggleSide]= useState(true);
  const [categories] = SideBarHook(
    "https://fakestoreapi.com/products/categories"
  );
  const [all,updateAll] = GetAllProducts("https://fakestoreapi.com/products");
  const addNewProduct = (product) => {
    console.info(product);
    updateAll([...all,product])
  };
  const deleteProduct = (index) => {
    updateAll(all.filter(item => item.id !== index))
  };

  const hideSideBar =()=>{
    console.info("lkjsk");
    toggleSide((prev)=>!prev)
  }
  return (
    <div className="App">
      <Header addNewProduct={addNewProduct} toggleSide={hideSideBar} />
      <div className="AppBody">
        <Sidebar toggle={toggle} categories={categories} />
        <Routes>
          <Route
            path="/"
            element={<AllProducts all={all} updateAll={updateAll} deleteProduct={deleteProduct} />}
          />
          <Route
            path="/:category"
            element={<Home all={all} deleteProduct={deleteProduct} />}
          />
          <Route
            path="/single/:id"
            element={<Single all={all}  deleteProduct={deleteProduct} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
