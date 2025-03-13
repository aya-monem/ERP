import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");

    // If on login page but already authenticated, redirect to dashboard
    if (authStatus === "true" && location.pathname === "/login") {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  // Handle logout
  useEffect(() => {
    if (location.pathname === "/logout") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f5f5f5]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#1976d2] border-t-transparent"></div>
          <p className="mt-4 text-[#616161]">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // If authenticated, show the protected content
  return <>{children}</>;
}
