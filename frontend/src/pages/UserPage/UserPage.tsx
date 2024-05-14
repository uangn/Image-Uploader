import React, { useContext, useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../stores/authContext";
import Image from "../../models/Image";
import ImageContainer from "./ImageContainer";

const UserPage = () => {
  const { username } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [images, setImages] = useState<Image[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/" + username, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const resData = await res.json();
          throw new Error(resData.message);
        }
        return res.json();
      })
      .then((data) => {
        setImages(data.images);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
  }, []);

  return (
    <div className={styles.page}>
      <h1>#{username?.replace(" ", "_")}</h1>
      {error.length <= 0 ? (
        <ImageContainer images={images} />
      ) : (
        <h1>{error}</h1>
      )}
    </div>
  );
};

export default UserPage;
