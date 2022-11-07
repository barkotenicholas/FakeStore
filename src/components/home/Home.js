import React from "react";
import { useParams } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.css";
function Home({ all, deleteProduct }) {
  const { category } = useParams();

  return (
    <div className="container">
      {all &&
        all
          .filter((value) => {
            if (value.category === category) {
              return value;
            }
          })
          .map((item, index) => {
            return (
              <div className="card" key={item.id}>
                <img src={item.image} alt="Product" className="cardImage" />
                <p>{item.title}</p>
                <p className="price">${item.price}</p>
                <Link to={"/single/" + item.id}>See more</Link>
                <RiDeleteBin2Line onClick={() => deleteProduct(item.id)} />
              </div>
            );
          })}
    </div>
  );
}

export default Home;
