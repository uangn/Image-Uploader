import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../../models/Image";
import styles from "./ImageDetailPage.module.css";

const ImageDetailPage = () => {
  const { username, title } = useParams();
  const [error, setError] = useState("");
  const [image, setImage] = useState<Image>();
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch(`http://localhost:8080/${username}/${title}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(await err.message);
        }
        return res.json();
      })
      .then((data) => {
        const imageDetail = data.imageDetail[0];
        console.log(imageDetail);
        setImage(imageDetail);
        setContent(imageDetail.content);
      })
      .catch(async (err) => {
        setError(err);
      });
  }, []);
  return (
    <div className={styles.page}>
      <h1>{image?.title}</h1>
      <div className={styles["content-area"]}>
        <img src={image?.imageURL} alt="No cap" />
        <div className={styles.content}>
          {content.split("\n").map((p) => (
            <p>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageDetailPage;
