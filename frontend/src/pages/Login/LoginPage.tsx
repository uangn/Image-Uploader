import React, {
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./Login.module.css";
import { Form, Link, useNavigate } from "react-router-dom";
import AuthContext from "../../stores/authContext";

const LoginPage = () => {
  const ctx = useContext(AuthContext);
  const [error, setError] = useState("");
  const [over, setOver] = useState(false);
  const [stopMoving, setStopmoving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken)
      fetch("http://localhost:8080/auth/login", {
        headers: {
          Authorization: "Bearer " + localToken,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json() as unknown as { username: string };
          } else {
            throw new Error("Please login to continue");
          }
        })
        .then((user) => {
          ctx.setUser({ name: user?.username! });
          navigate("/" + user?.username);
        })
        .catch((err: Error) => {
          localStorage.removeItem("token"); // token expired
          setError(err.message);
        });
  }, []);

  const login: FormEventHandler = async (e) => {
    e.preventDefault();
    setStopmoving(true);
    const fd = new FormData(e.target as HTMLFormElement);
    const loginData = Object.fromEntries(fd.entries());

    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (!response.ok) {
      const message = await response.json();
      setStopmoving(false);
      setError(message.message);
      return;
    }

    const user = await response.json();
    console.log(user.token);
    localStorage.setItem("token", user.token);
    setStopmoving(false);
    ctx.setUser({ name: user.username });
    navigate("/" + user.username);
  };

  return (
    <div className={styles.login}>
      <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>Login</h1>
      <Form onSubmit={login} action="/" method="post" className={styles.form}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <p style={{ color: "red" }}>{error}</p>

        <div className={styles.btn}>
          <button
            type="submit"
            className={styles.button}
            style={stopMoving ? { background: "gray", color: "black" } : {}}
            disabled={stopMoving}
          >
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
