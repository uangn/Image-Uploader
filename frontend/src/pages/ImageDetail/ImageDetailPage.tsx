import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import Image from "../../models/Image";
import styles from "./ImageDetailPage.module.css";
import ImageModal from "./ImageModal";
import CommentPost from "../../models/CommentPost";
import CurrentComment from "../../models/CurrentComment";
import Reaction from "../../models/Reaction";

const ImageDetailPage = () => {
  const { username, imageId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [image, setImage] = useState<Image>();
  const [content, setContent] = useState("");
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState<CurrentComment[]>([]);
  const [preloadedComments, setPreComments] = useState<CommentPost[]>([]);
  const [reactTion, setReacTion] = useState<Reaction>();
  const [showImage, setShowImage] = useState<boolean>(false);
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
      .then(async (data) => {
        const imageDetail = data.imageDetail[0];
        document.title = imageDetail.title;
        setImage(imageDetail);
        setContent(imageDetail.content);
        const response = await fetch(
          `http://localhost:8080/comment/${imageId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          // throw new Error();
        }
        const datas = await response.json();
        setPreComments(datas);
      })
      .catch(async (err) => {
        setError(err);
      });
  }, []);
  let response = <></>;
  const addReaction = async (r: "like" | "cool" | "hot" | "cute") => {
    if (!image) {
      throw new Error("No image");
    }
    const updatedImage: Image = {
      ...image,
      reaction: { ...image!.reaction, [r]: image!.reaction[r] + 1 },
    };

    const res = await fetch(`http://localhost:8080/reaction/${imageId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loader.userID, reactionType: r }),
    });

    if (res.ok) {
      setImage(updatedImage);
      const data = await res.json();
      response = <p>{data.message}</p>;
    }
  };

  const addComment = () => {
    console.log(commentRef.current?.value);
    const newComment = commentRef.current?.value.trim() as string;
    const createdComment: CurrentComment = {
      comment: newComment,
      username: loader.username,
    };
    if (newComment.length >= 1) {
      setComment((prevComment) => [createdComment, ...prevComment]);
      fetch(`http://localhost:8080/comment/${loader.userID}/${imageId}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loader.username,
          userId: loader.userID,
          imageId: imageId,
          commentDetail: commentRef.current?.value || "",
        }),
      });
    }
  };

  const edit: MouseEventHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/${username}/${imageId}/file-edit`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );

    if (response.ok) {
      navigate(`/${username}/${imageId}/image-edit`);
    } else {
      const eer = await response.json();
      setError(eer.message);
    }
  };

  const deleteImage: MouseEventHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/file-delete`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        imageId: imageId!,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      setError(error.message);
    } else {
      navigate(`/${username}`);
    }
  };

  const allowEditting = username === loader.username;
  return (
    <div className={styles.page}>
      {showImage && (
        <ImageModal
          imgURL={image?.imageURL!}
          onClick={() => setShowImage(false)}
        />
      )}

      <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
      {response}
      <h1>{image?.title}</h1>
      <div className={styles["content-area"]}>
        <img
          src={image?.imageURL}
          alt="No cap"
          onClick={() => setShowImage(true)}
        />
        <div className={styles.content}>
          {content.split("\n").map((p) => (
            <p>{p}</p>
          ))}
        </div>
      </div>
      {allowEditting && (
        <div>
          <button onClick={edit}>Edit</button>
          <button onClick={deleteImage}>Delete</button>
        </div>
      )}

      <section className={styles.comments}>
        <div className={styles.reaction}>
          {Object.entries(image?.reaction! || {}).map((react) => (
            <button
              onClick={(e) =>
                addReaction(react[0] as "like" | "cute" | "hot" | "cool")
              }
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
          <div className={styles.comment}>
            <h3>{c.username}</h3> <p>{c.comment}</p>
          </div>
        ))}
        {preloadedComments.map((c) => (
          <div className={styles.comment}>
            <h3>
              {(c.commentByUser || { username: "account deleted" }).username}
            </h3>{" "}
            <p>{c.comment}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ImageDetailPage;
