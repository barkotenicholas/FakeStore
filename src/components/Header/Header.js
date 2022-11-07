import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";

import "./Header.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AddProductModal from "../AddModal/AddProductModal";

function Header({ addNewProduct ,toggleSide}) {
  const [isOpened, setIsOpened] = useState(false);
  const style = { color: "#80489C", fontSize: "1.5em" };

  const Button = styled.button`
    color: #80489c;
    border: 2px solid #fce2db;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
    &:hover {
      opacity: 0.9;
    }
  `;

  return (
    <>
      <div className="header">
        <div>
          <FiAlignJustify style={style} onClick={()=>toggleSide()}/>
          <Link to="/">
            <FaHome style={style} />
          </Link>
        </div>

        <Button onClick={() => setIsOpened(true)}>Add Item</Button>
        {isOpened && (
          <AddProductModal
            setIsOpened={setIsOpened}
            addNewProduct={addNewProduct}
          />
        )}
      </div>
    </>
  );
}

export default Header;
