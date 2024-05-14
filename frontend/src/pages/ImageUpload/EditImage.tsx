import React, {
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import AuthContext from "../../stores/authContext";
import {
  Form,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import styles from "./ImageUpload.module.css";
import Image from "../../models/Image";

const EditImage = () => {
  const ctx = useContext(AuthContext);
  const { username, imageId } = useParams();
  const [image, setImage] = useState<Image>();
  const navigate = useNavigate();
  const loader = useRouteLoaderData("app-root") as {
    username: string;
    userID: string;
  };
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(
        `http://localhost:8080/${username}/${imageId}/file-edit`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (!response.ok) {
        navigate(`/${username}/${imageId}`);
      } else {
        console.log(response.status);
      }
    }
    fetchUser();

    fetch(`http://localhost:8080/${username}/${imageId || "oho"}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Uncaught Error");
        const image = await response.json();
        setImage(image.imageDetail[0]);
      })
      .catch((err) => {});
  }, []);

  const [error, setError] = useState("");

  if (!loader.userID) {
    navigate("/auth/login");
  }

  const edit: FormEventHandler = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const entries = Object.fromEntries(fd.entries());

    const postImage = await fetch("http://localhost:8080/file-edit", {
      method: "PUT",
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
      <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
      <h1>
        Hello from Image Upload{" "}
        {ctx.user
          ? ctx.user.name.replace(" ", "_")
          : (loader?.username.replace(" ", "_") as string)}
      </h1>
      <Form
        onSubmit={edit}
        className={styles.form}
        encType="multipart/form-data"
      >
        <div className={styles.inputfield}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            required
            name="title"
            defaultValue={image?.title}
          />
        </div>
        <div className={styles.inputfield}>
          <label htmlFor="imageURL">Image</label>
          <input
            type="file"
            name="imageURL"
            accept="image/*"
            defaultValue={image?.imageURL}
          />
        </div>
        <div className={styles.contentfield}>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            className={styles.content}
            defaultValue={image?.content}
          ></textarea>
        </div>
        <input
          type="hidden"
          name="userID"
          value={loader.userID.toString() || "None"}
        />
        <input
          type="hidden"
          name="imageId"
          value={image?._id.toString() || "None"}
        />
        <p style={{ color: "red" }}>{error}</p>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default EditImage;
