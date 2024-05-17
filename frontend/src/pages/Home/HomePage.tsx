import React, { ChangeEventHandler, useEffect, useState } from "react";
import styles from "./Home.module.css";
import QueriedUser from "../../models/QueriedUser";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<QueriedUser[]>();

  const inputChangeHandler: ChangeEventHandler = (e) => {
    setUsername((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      setSearchTerm(username);
    }, 700);

    return () => clearTimeout(delayFetch);
  }, [username]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `http://localhost:8080/find-user?q=${searchTerm}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setUsers(data.users);
    };

    if (searchTerm) {
      fetchUser();
    }
  }, [searchTerm]);

  const gotoUserPage = (username: string) => {
    navigate(`/${username}`);
  };

  return (
    <div className={styles["search-page"]}>
      <div>
        <input type="text" onChange={inputChangeHandler} value={username} />
        <button>search</button>
      </div>
      {users?.length! > 0 &&
        username.length > 0 &&
        users?.map((user) => (
          <div
            key={user._id}
            onClick={() => gotoUserPage(user.username)}
            className={styles.result}
          >
            {user.profileImage !== "None" ? (
              <img src="" alt="" />
            ) : (
              <span>😊</span>
            )}
            <span>{user.username}</span>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
