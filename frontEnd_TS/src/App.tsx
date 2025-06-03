import { createBrowserRouter, RouterProvider } from "react-router-dom";
import userRoutes from "./routes/userRoutes/userRoutes";
import adminRoutes from "./routes/adminRoutes/adminRoutes";

function App() {
  const router = createBrowserRouter([
    ...userRoutes,
    ...adminRoutes
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
