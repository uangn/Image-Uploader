import { RouteObject } from "react-router-dom";
import NavBar from "../components/NavBar";
import React from "react";
import HomePage from "../pages/Home/HomePage";
import ImageUploadPage from "../pages/ImageUpload/ImageUploadPage";
import UserPage from "../pages/UserPage/UserPage";

const appRoutes: RouteObject = {
  path: "/",
  element: <NavBar />,
  loader: undefined,
  children: [
    { index: true, element: <HomePage /> },
    { path: ":username", element: <UserPage /> },
    { path: "image-upload", element: <ImageUploadPage /> },
    { path: "*", element: <h1>Nopage</h1> },
  ],
};
export default appRoutes;
