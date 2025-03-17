import React from "react";
import {Link} from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>404</h1>
      <Link to="/">
        <button>Return Home</button>
      </Link>
    </div>
  );
}

export default PageNotFound;
