import React, { useContext, useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import { useParams } from "react-router-dom";
import AuthContext from "../../stores/authContext";
import Image from "../../models/Image";

const UserPage = () => {
  const { username } = useParams();
  const ctx = useContext(AuthContext);
  const [images, setImages] = useState<Image[]>();

  useEffect(() => {
    fetch("http://localhost:8080/" + username, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImages(data.images);
      });
  }, []);

  console.log("Reach " + username);

  return (
    <div className={styles.page}>
      {images?.map((image) => (
        <img src={image.imageURL} alt="user" />
      ))}
    </div>
  );
};

export default UserPage;
