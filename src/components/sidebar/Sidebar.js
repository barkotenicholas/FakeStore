import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
function Sidebar({toggle,categories}) {

  return (
    <>
      <div className={toggle?"sideitems":"sidebarHidden"} style={{ left: toggle ? '0' : '-265px'} }>
        {categories.map(function (item) {
          return (
            <Link to={"/" + item} className="sideitem">
              {item}
            </Link>
          );
        })}

        
      </div>
    </>
  );
}

export default Sidebar;
