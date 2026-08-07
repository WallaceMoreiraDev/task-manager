import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { loginRoutes } from "./features/login/routes";
import { taskRoutes } from "./features/tasks/routes";
import Login from "./features/login/pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = createBrowserRouter([
  ...loginRoutes,
  {
    path: 'dashboard',
    element: 
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>,
    children: [
      ...taskRoutes,
    ]
  }
]);

export default routes;
