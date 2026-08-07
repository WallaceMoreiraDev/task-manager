import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";

export const loginRoutes = [
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/create-account',
        element: <CreateAccount/>
    }
]