import React, { useContext, useEffect, useState } from "react";
import styles from "./UserPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../stores/authContext";
import Image from "../../models/Image";

const UserPage = () => {
  const { username } = useParams();
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

  console.log("Reach " + username);

  return (
    <div className={styles.page}>
      <h1>{username}</h1>
      {error.length <= 0 ? (
        <div>
          {(images?.length as number) > 0 ? (
            images?.map((image) => <img src={image.imageURL} alt="user" />)
          ) : (
            <p>{username} hasn't posted anything</p>
          )}
        </div>
      ) : (
        <h1>{error}</h1>
      )}
    </div>
  );
};

export default UserPage;
