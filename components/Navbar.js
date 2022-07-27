import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { parseCookies } from "nookies";
import cookie from "js-cookie";

const Navbar = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      setUser(true)
    } else {
      setUser(false)
    }
  }, []);
  
  
  // const user =  cookieuser.user ? JSON.parse(cookieuser.user) : ""
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          {/* <img
              className="mx-md-3 mx-sm-2"
              src="/logo512.png"
              alt="App Logo"
              width="45"
            /> */}
          <a className="navbar-brand mx-5" href="#">
            SHOPIE-MART
          </a>
          <form
            className="d-flex justify-content-center mx-5 w-25 search-bar"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              className="w-100 rounded-start px-1 p-2 border-0"
              //   value={text}
              //   onChange={(e) => setText(e.target.value)}
              placeholder="Search for Products, Brands and More..."
              aria-label="Search"
            />
            {/* <FontAwesomeIcon className="py-3 text-dark bg-white px-3 rounded-end" icon={faSearch} /> */}
          </form>
          <div>
            <ul className="navbar-nav  d-flex justify-content-end mx-5 ">
              <li className="nav-item px-4 py-2  fs-5 fw-normal text-white">
                <Link href={"/"}>
                  <a aria-current="page" href="#">
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item px-4 py-2  fs-5 fw-normal text-white">
                <Link href={"/cart"}>
                  <a href="#">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    Cart
                  </a>
                </Link>
              </li>
              {/* {(user.role == "admin" || user.role == "root") && (
                <li className="nav-item px-4 py-2  fs-5 fw-normal text-white">
                  <Link href={"/addproduct"}>
                    <a href="#">Add Product</a>
                  </Link>
                </li>
              )} */}
              {user ? (
                <>
                  <li className="nav-item px-4 py-2  fs-5 fw-normal text-white">
                    <Link href={"/profile"}>
                      <a href="#">Profile</a>
                    </Link>
                  </li>
                  <li className="nav-item px-4 py-2  fs-5 fw-normal text-white">
                    <Link href={"/login"}>
                      <a href="#"   onClick={() => {
                          cookie.remove("token");
                          cookie.remove("user");
                        }}>Logout</a>
                    </Link>
                  </li>
  
                </>
              ) : (
                <>
                  <li className="nav-item px-4 py-2  fs-5 fw-normal text-white">
                    <Link href={"/signup"}>
                      <a href="#">Sign Up</a>
                    </Link>
                  </li>
                  <li className="nav-item px-4 py-2  fs-5 fw-normal text-white ">
                    <Link href={"/login"}>
                      <a href="#">Login</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
