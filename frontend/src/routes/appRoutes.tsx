import { RouteObject } from "react-router-dom";
import NavBar from "../components/NavBar";
import React from "react";
import HomePage from "../pages/Home/HomePage";
import ImageUploadPage from "../pages/ImageUpload/ImageUploadPage";

const appRoutes: RouteObject = {
  path: "/",
  element: <NavBar />,
  loader: undefined,
  children: [
    { index: true, element: <HomePage /> },
    { path: "image-upload", element: <ImageUploadPage /> },
  ],
};
export default appRoutes;
