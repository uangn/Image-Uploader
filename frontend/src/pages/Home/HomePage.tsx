import React from "react";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const user = useParams();

  return (
    <div>
      <h1>Hello {user.username}</h1>
    </div>
  );
};

export default HomePage;
