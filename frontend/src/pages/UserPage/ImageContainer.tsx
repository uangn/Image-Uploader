import React from "react";
import Image from "../../models/Image";
import styles from "./UserPage.module.css";
import ImageCard from "./ImageCard";

const ImageContainer = (props: properties) => {
  return (
    <div className={styles["image-container"]}>
      {props.images && props.images.length > 0 ? (
        props.images?.map((image) => (
          <ImageCard
            key={image._id.toString()}
            id={image._id.toString()}
            image={image}
          />
        ))
      ) : (
        <>no image</>
      )}
    </div>
  );
};

interface properties {
  images?: Image[];
}

export default ImageContainer;
