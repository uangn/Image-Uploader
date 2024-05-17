import React, { FormEventHandler, useContext, useState } from "react";
import AuthContext from "../../stores/authContext";
import { Form, useNavigate, useRouteLoaderData } from "react-router-dom";
import styles from "./ImageUpload.module.css";

const ImageUploadPage = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const loader = useRouteLoaderData("app-root") as {
    username: string;
    userID: string;
  };

  const [error, setError] = useState("");

  if (!loader.userID) {
    navigate("/auth/login");
  }

  const upload: FormEventHandler = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const entries = Object.fromEntries(fd.entries());

    const postImage = await fetch("http://localhost:8080/file-upload", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: fd,
    });
    if (!postImage.ok) {
      const response = await postImage.json();
      setError(response.message);
    } else {
      navigate("/" + ctx.user.name);

      console.log(entries);
    }
  };
  return (
    <div className={styles.page}>
      <h1>Upload form</h1>
      <Form
        onSubmit={upload}
        className={styles.form}
        encType="multipart/form-data"
      >
        <div className={styles.inputfield}>
          <label htmlFor="title">Title</label>
          <input type="text" required name="title" />
        </div>
        <div className={styles.inputfield}>
          <label htmlFor="imageURL">Image</label>
          <input type="file" name="imageURL" accept="image/*" />
        </div>
        <div className={styles.contentfield}>
          <label htmlFor="content">Content</label>
          <textarea name="content" className={styles.content}></textarea>
        </div>
        <input
          type="hidden"
          name="userID"
          value={loader.userID.toString() || "None"}
        />
        <p style={{ color: "red" }}>{error}</p>
        <button type="submit">Upload</button>
      </Form>
    </div>
  );
};

export default ImageUploadPage;
