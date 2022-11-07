import React, { useState } from "react";
import "./AllProducts.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import SortCustomHook from "./SortCustomHook";

function AllProducts({ all,updateAll, deleteProduct }) {
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [desc] = SortCustomHook('https://fakestoreapi.com/products?sort=desc');
  const [asc] = SortCustomHook('https://fakestoreapi.com/products?sort=asc');


  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    console.info(limit);
  };

  const handlePriceChange = (e) => {
    setSort(e.target.value);
  };

  const handleSortOrder = (e) => {
    setOrder(e.target.value)
    if(order === 'asc'){
      console.info(desc)
      updateAll(desc)
    }
    if(order === 'desc'){
      console.info(asc)
      updateAll(asc)
    }
  }

  return (
    <div>
      <div className="AllHeader">
        <div>
          <label>Sort by Asc or Desc:</label>
          <select className="limit" value={order} onChange={handleSortOrder}>
            <option>desc</option>
            <option>asc</option>
          </select>
        </div>
        <div>
          <label>Sort by Price:</label>
          <select className="limit" value={sort} onChange={handlePriceChange}>
            <option>min</option>
            <option>max</option>
          </select>
        </div>
        <div>
          <label>Limit by:</label>
          <select className="limit" value={limit} onChange={handleLimitChange}>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
      </div>
      <div className="container">
        {all &&
          all
            .sort((a, b) => {
              if (sort.length == 0) {
                return 0;
              }
              if (sort === "max") {
                return b.price - a.price;
              }
              if (sort === "min") {
                return a.price - b.price;
              }
            })
            .slice(0, limit)
            .map((item) => {
              return (
                <div className="card" key={item.id}>
                  <img src={item.image} alt="Product" className="cardImage" />
                  <p className="title">{item.title}</p>
                  <p className="price">${item.price}</p>
                  <Link to={"/single/" + item.id}>See more</Link>
                  <RiDeleteBin2Line onClick={() => deleteProduct(item.id)} />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default AllProducts;
