import React, { FormEventHandler, useContext } from "react";
import AuthContext from "../../stores/authContext";
import { Form, useRouteLoaderData } from "react-router-dom";
import styles from "./ImageUpload.module.css";

const ImageUploadPage = () => {
  const ctx = useContext(AuthContext);
  const loader = useRouteLoaderData("app-root") as {
    username: string;
    userID: string;
  };

  const upload: FormEventHandler = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const entries = Object.fromEntries(fd.entries());

    const postImage = fetch("http://localhost:8080/file-upload", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: fd,
    });

    console.log(entries);
  };
  return (
    <div>
      <h1>
        Hello from Image Upload{" "}
        {ctx.user ? ctx.user.name : (loader?.username as string)}
      </h1>
      <Form
        onSubmit={upload}
        className={styles.form}
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" required name="title" />
        </div>
        <div>
          <label htmlFor="imageURL">Image</label>
          <input type="file" name="imageURL" />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea name="content"></textarea>
        </div>
        <input
          type="hidden"
          name="userID"
          value={loader.userID.toString() || "None"}
        />
        <button type="submit">Upload</button>
      </Form>
    </div>
  );
};

export default ImageUploadPage;
