import React from "react";
import styles from "./UserPage.module.css";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { username } = useParams();
  console.log("Reach " + username);
  return (
    <div className={styles.page}>
      <h1>{username}</h1>
    </div>
  );
};

export default UserPage;
