import "./App.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import appRoutes from "./routes/appRoutes";

const router = createBrowserRouter([appRoutes] as RouteObject[]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
