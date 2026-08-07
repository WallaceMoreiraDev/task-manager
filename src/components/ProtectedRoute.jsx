import { Navigate } from "react-router-dom";
import { useAuth } from "../features/login/context/AuthProvider";

export default function ProtectedRoute({ children }) {

    const { currentUser } = useAuth();

    console.log("Current user: ", currentUser);

    if (!currentUser) {
        return <Navigate to='/' replace />;
    }

    return children;

}
