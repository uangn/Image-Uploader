import React, { FormEventHandler, useState } from "react";
import styles from "./SignUp.module.css";
import { Form, Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [over, setOver] = useState(false);
  const [errPw, setErrPw] = useState(false);
  const [errText, setText] = useState(
    "Password is not 12 long or repeat password is false"
  );

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries());

    console.log(data);

    if (
      data.password !== data.repeat ||
      (data.password as string).length < 12
    ) {
      setText("Password is not 12 long or repeat password is false");
      setErrPw(true);
    } else {
      const response = await fetch("http://localhost:8080/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        navigate("/auth/login");
      } else {
        const body = await response.json();
        console.log(body);
        setText(body.message);
        setErrPw(true);
      }
    }
  };

  return (
    <div className={styles["sign-up"]}>
      <h1
        style={{ textAlign: "center", marginBottom: "3rem", color: "orange" }}
      >
        Sign up
      </h1>
      <Form
        onSubmit={submitHandler}
        action="/"
        method="post"
        className={styles.form}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <div>
          <label htmlFor="repeat">Repeat Password</label>
          <input type="password" name="repeat" />
        </div>
        {errPw && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "-1rem",
              marginBottom: "3rem",
            }}
          >
            {errText}
          </p>
        )}
        <div className={styles.btn}>
          <button type="submit" className={styles.button}>
            Sign up
          </button>
          <Link
            onMouseOver={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            to={"/auth/login"}
            style={{
              background: !over ? "white" : "orange",
              color: !over ? "orange" : "white",
              border: "1px solid black",
              textDecoration: "none",
            }}
            className={styles.button}
          >
            Go to login
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
