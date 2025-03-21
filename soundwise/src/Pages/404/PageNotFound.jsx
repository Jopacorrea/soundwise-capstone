//npm libraries
import {Link} from "react-router-dom";

//components
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

//style
import "./PageNotFound.scss";

function PageNotFound() {
  return (
    <div >
      <Header />
      <h1>404</h1>
      <Link to="/">
        <button>Return Home</button>
      </Link>

      <Footer />
    </div>
  );
}

export default PageNotFound;
