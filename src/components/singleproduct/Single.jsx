import React from "react";
import { useParams } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";

function Single({ all, deleteProduct }) {
  const { id } = useParams();

  const i = parseInt(id);
  const single = {
    justifySelf:"flex-start",
    width:600,
    height:600

  };
  const product = all.find((item) => {
    if (item.id === i) {
      return true;
    }
  });
  return (
    <div className="card" style={single}>
      {product ? (
        <>
          <img src={product.image} alt="Product" className="cardImage" />
          <p>{product.title}</p>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <RiDeleteBin2Line onClick={() => deleteProduct(product.id)} />
        </>
      ):
        <>
          <p>404 not found {id}</p>
        </>
      }
    </div>
  );
}

export default Single;
