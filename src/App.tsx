import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import AuthGuard from "./components/auth/AuthGuard";
import LoginForm from "./components/auth/LoginForm";

// Lazy load components
const WorkOrders = lazy(() => import("./components/dashboard/WorkOrders"));
const Facilities = lazy(() => import("./components/dashboard/Facilities"));
const Assets = lazy(() => import("./components/dashboard/Assets"));
const Inventory = lazy(() => import("./components/dashboard/Inventory"));
const Reports = lazy(() => import("./components/dashboard/Reports"));
const Settings = lazy(() => import("./components/dashboard/Settings"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-[#f5f5f5]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#1976d2] border-t-transparent"></div>
            <p className="mt-4 text-[#616161]">Loading...</p>
          </div>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/logout"
            element={
              <AuthGuard>
                <div>Logging out...</div>
              </AuthGuard>
            }
          />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          {/* Redirect any unknown routes to dashboard if authenticated */}
          <Route
            path="*"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route
            path="/work-orders"
            element={
              <AuthGuard>
                <WorkOrders />
              </AuthGuard>
            }
          />
          <Route
            path="/facilities"
            element={
              <AuthGuard>
                <Facilities />
              </AuthGuard>
            }
          />
          <Route
            path="/assets"
            element={
              <AuthGuard>
                <Assets />
              </AuthGuard>
            }
          />
          <Route
            path="/inventory"
            element={
              <AuthGuard>
                <Inventory />
              </AuthGuard>
            }
          />
          <Route
            path="/reports"
            element={
              <AuthGuard>
                <Reports />
              </AuthGuard>
            }
          />
          <Route
            path="/settings"
            element={
              <AuthGuard>
                <Settings />
              </AuthGuard>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
