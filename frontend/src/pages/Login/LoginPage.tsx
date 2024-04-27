import React, { FormEventHandler, useContext, useState } from "react";
import styles from "./Login.module.css";
import { Form, Link, useNavigate } from "react-router-dom";
import AuthContext from "../../stores/authContext";

const LoginPage = () => {
  const ctx = useContext(AuthContext);
  const [over, setOver] = useState(false);
  const navigate = useNavigate();
  const login: FormEventHandler = (e) => {
    e.preventDefault();
    ctx.setUser({ name: "Olaf" });
    navigate("/");
  };

  return (
    <div className={styles.login}>
      <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>Login</h1>
      <Form onSubmit={login} action="/" method="post" className={styles.form}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>

        <div className={styles.btn}>
          <button type="submit" className={styles.button}>
            Login
          </button>
          <Link
            onMouseOver={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            to={"/auth/signup"}
            style={{
              background: !over ? "white" : "orange",
              color: !over ? "orange" : "white",
              border: "1px solid black",
              textDecoration: "none",
            }}
            className={styles.button}
          >
            Register
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
