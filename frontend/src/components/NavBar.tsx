import { useContext, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./css/NavBar.module.css";
import AuthContext from "../stores/authContext";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    document.title = "Image Uploader";
    if (!ctx.user) {
      navigate("/auth/login");
    }
  }, []);

  const handleClick = (title: string) => {
    document.title = title;
  };

  return (
    <>
      <nav className={styles.navigation}>
        <ul>
          <div className={styles.app}>
            <li>
              <Link
                style={
                  location.pathname === "/" ? { color: "black" } : undefined
                }
                to="/"
                onClick={() => handleClick("Home")}
              >
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link
                style={
                  location.pathname === "/image-upload"
                    ? { color: "black" }
                    : undefined
                }
                to="/image-upload"
                onClick={() => handleClick("Upload")}
              >
                Upload
              </Link>
            </li>
          </div>

          {!ctx.user ? (
            <div className={styles.authentication}>
              <li>
                <Link to={"/auth/login"} onClick={() => handleClick("Login")}>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to={"/auth/signup"}
                  onClick={() => handleClick("Sign up")}
                >
                  Sign up
                </Link>
              </li>
            </div>
          ) : (
            <div className={styles.authentication}>
              <li>
                <Link to={"/auth/login"} onClick={() => ctx.setUser(null)}>
                  Log out
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
