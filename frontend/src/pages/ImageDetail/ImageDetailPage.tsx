import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import Image from "../../models/Image";
import styles from "./ImageDetailPage.module.css";

const ImageDetailPage = () => {
  const { username, imageId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [image, setImage] = useState<Image>();
  const [content, setContent] = useState("");
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState<string[]>([]);
  const [reactTion, setReacTion] = useState<string>();
  const loader = useRouteLoaderData("app-root") as {
    username: string;
    userID: string;
  };

  useEffect(() => {
    fetch(`http://localhost:8080/${username}/${imageId}`, {
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
        document.title = imageDetail.title;
        setImage(imageDetail);
        setContent(imageDetail.content);
      })
      .catch(async (err) => {
        setError(err);
      });
  }, []);

  const addReaction = (r: string) => {
    setReacTion(r);
  };

  const addComment = () => {
    console.log(commentRef.current?.value);
    const newComment = commentRef.current?.value.trim() as string;
    if (newComment.length >= 1) {
      setComment((prevComment) => [...prevComment, newComment]);
    }
  };

  const edit: MouseEventHandler = async (e) => {
    e.preventDefault();

    navigate(`/${username}/${imageId}/image-edit`);
  };

  const allowEditting = username === loader.username;
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
      {allowEditting && <button onClick={edit}>Edit</button>}

      <section className={styles.comments}>
        <div className={styles.reaction}>
          {Object.entries(image?.reaction! || {}).map((react) => (
            <button
              onClick={(e) => addReaction(react[0])}
              className={styles[react[0]]}
            >
              {react[0] + " : " + react[1]}
            </button>
          ))}
        </div>
        <div className={styles["comment-area"]}>
          <textarea name="" id="" ref={commentRef}></textarea>
          <button onClick={addComment}>Add comment</button>
        </div>
        {comment.map((c) => (
          <p>{c}</p>
        ))}
      </section>
    </div>
  );
};

export default ImageDetailPage;
