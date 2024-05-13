import React, { MouseEventHandler, useState } from "react";
import Image from "../../models/Image";
import styles from "./UserPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const ImageCard = (props: properties) => {
  const [information, setInformation] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const viewImage: MouseEventHandler = (e) => {
    console.log(props.image._id.toString());
    navigate(location.pathname + "/" + props.id);
  };

  return (
    <div
      className={styles["image-card"]}
      onClick={viewImage}
      onMouseEnter={() => setInformation(true)}
      onMouseLeave={() => setInformation(false)}
    >
      <img src={props.image.imageURL} alt="" />
      {information && <div className={styles.drop}></div>}
    </div>
  );
};
interface properties {
  id: string;
  image: Image;
}
export default ImageCard;
