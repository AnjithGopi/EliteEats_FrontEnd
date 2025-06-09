import { createBrowserRouter, RouterProvider } from "react-router-dom";
import userRoutes from "./routes/userRoutes/userRoutes";
import adminRoutes from "./routes/adminRoutes/adminRoutes";
import RestaurentRoutes from "./routes/restaurentRoutes/restaurentRoutes";

function App() {
  const router = createBrowserRouter([
    ...userRoutes,
    ...adminRoutes,
    ...RestaurentRoutes
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
