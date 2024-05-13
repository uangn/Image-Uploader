import { LoaderFunction, RouteObject } from "react-router-dom";
import NavBar from "../components/NavBar";
import React from "react";
import HomePage from "../pages/Home/HomePage";
import ImageUploadPage from "../pages/ImageUpload/ImageUploadPage";
import UserPage from "../pages/UserPage/UserPage";
import ErrorPage from "../pages/Errors/ErrorPage";
import ImageDetailPage from "../pages/ImageDetail/ImageDetailPage";
import EditImage from "../pages/ImageUpload/EditImage";

const appLoader: LoaderFunction = async () => {
  const jwtToken = localStorage.getItem("token");
  if (!jwtToken) {
    throw new Error("Not logged in");
  }
  const response = await fetch("http://localhost:8080/auth/login", {
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  });
  if (!response.ok) {
    return { message: "Not logged in" };
  }

  const data = await response.json();

  return data;
};

const appRoutes: RouteObject = {
  path: "/",
  element: <NavBar />,
  loader: appLoader,
  id: "app-root",
  errorElement: <ErrorPage />,
  children: [
    { index: true, element: <HomePage /> },
    { path: ":username", element: <UserPage /> },
    { path: "image-upload", element: <ImageUploadPage /> },
    { path: ":username/:imageId", element: <ImageDetailPage /> },
    { path: ":username/:imageId/image-edit", element: <EditImage /> },
    { path: "*", element: <h1>Nopage</h1> },
  ],
};
export default appRoutes;
