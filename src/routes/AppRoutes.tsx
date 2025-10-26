import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MovieDetail from "../pages/MovieDetails";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    const isAuthenticated = true;

    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    <AppLayout>
                        <Login />
                    </AppLayout>
                } />
                <Route path="/signup" element={
                    <AppLayout>
                        <Signup />
                    </AppLayout>
                } />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <AppLayout>
                                <Home />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/movie/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <AppLayout>
                                <MovieDetail />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}
