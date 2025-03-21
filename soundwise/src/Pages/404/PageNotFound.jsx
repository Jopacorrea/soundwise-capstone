//npm libraries
import {Link} from "react-router-dom";

//components
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

//style
import "./PageNotFound.scss";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <Header />
      <div className="page-not-found__main">
        <h1 className="page-not-found__title">404</h1>
        <Link to="/" className="page-not-found__return">
          <div >start transfering now</div>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default PageNotFound;
