import React, { MouseEventHandler } from "react";
import styles from "./ImageDetailPage.module.css";

const ImageModal = (props: properties) => {
  return (
    <div className={styles["image-modal"]} onClick={props.onClick}>
      <img src={props.imgURL} alt="" />
    </div>
  );
};

interface properties {
  imgURL: string;
  onClick: MouseEventHandler;
}

export default ImageModal;
