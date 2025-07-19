import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import MainLayout from "./components/layouts/MainLayout";
import NotFoundPage from "./pages/NotFound";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Loading authentication" fullscreen={false} />;
  }

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<DashboardPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
