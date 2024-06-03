// import react from "react";
import "../scss/Home/index.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="homepage">
        <nav className="HomepageNav">
          <div className="HomepageNav-logo">
            <img
              src="/image/homepage/logo.svg"
              alt=""
              className="HomepageNav-logo-img"
            />
          </div>
          <div className="HomepageNav-item">
            <a href="https://k14developers.herokuapp.com/" className="navlink">
              <div className="HomepageNav-item-name">ABOUT</div>
            </a>
            <Link to="/login" className="navlink">
            <div className="HomepageNav-item-name">SIGN IN</div>
            </Link>

            <Link to="/signup" className="navlink">
            <div className="HomepageNav-item-name HomepageNav-item-name-btncss">
              SIGN UP
            </div>
            </Link>

          </div>
        </nav>

        <div className="Homediv container-fluid">
          <div className="Homediv-text">
            <p>
              “Your time is limited, so don’t waste it living someone else’s
              life.”
            </p>
          </div>
          <div className="Homediv-img">
            <img
              src="/image/homepage/homeimage.svg"
              alt=""
              className="Homediv-img-imglogo"
            />
          </div>
        </div>

        <div className="companylogo">
          <img src="/image/homepage/company.svg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
