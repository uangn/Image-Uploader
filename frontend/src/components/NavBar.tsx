import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import styles from "./css/NavBar.module.css";

import useAuthCheck from "../hooks/use-auth-check";

const currentStyle: React.CSSProperties = {
  color: "black",
  textDecoration: "underline",
};

const NavBar = () => {
  const location = useLocation();
  const ctx = useAuthCheck();

  const appLoaderData = useLoaderData() as { username: string; userID: string };

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
                  location.pathname === "/" + appLoaderData.username
                    ? {
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "50%",
                      }
                    : undefined
                }
                to={"/" + appLoaderData.username}
                onClick={() => handleClick("Home")}
              >
                👤
              </Link>
            </li>
            <li>
              <Link
                style={location.pathname === "/" ? currentStyle : undefined}
                to="/"
                onClick={() => handleClick("Home")}
              >
                Search
              </Link>
            </li>

            <li>
              {" "}
              <Link
                style={
                  location.pathname === "/image-upload"
                    ? currentStyle
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
                <Link
                  to={"/auth/login"}
                  onClick={() => {
                    localStorage.removeItem("token");
                    ctx.setUser(null);
                  }}
                >
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
