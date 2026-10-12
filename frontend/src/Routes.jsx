import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/user-dashboard";
import CategoryExplorer from "./pages/category-explorer";
import JokeDetailPage from "./pages/joke-detail-page";
import SearchDiscovery from "./pages/search-discovery";
import Homepage from "./pages/homepage";
import AuthenticationPortal from "./pages/authentication-portal";
import DocsPage from "./pages/docs";

const Routes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Canonical Clean Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/categories" element={<CategoryExplorer />} />
            <Route path="/jokes" element={<JokeDetailPage />} />
            <Route path="/search" element={<SearchDiscovery />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/login" element={<AuthenticationPortal />} />

            {/* Legacy Aliases & Redirects (No Code/SEO Duplication) */}
            <Route path="/homepage" element={<Navigate to="/" replace />} />
            <Route path="/user-dashboard" element={<Navigate to="/dashboard" replace />} />
            <Route path="/category-explorer" element={<Navigate to="/categories" replace />} />
            <Route path="/joke-detail-page" element={<Navigate to="/jokes" replace />} />
            <Route path="/search-discovery" element={<Navigate to="/search" replace />} />
            <Route path="/discovery" element={<Navigate to="/search" replace />} />
            <Route path="/api-docs" element={<Navigate to="/docs" replace />} />
            <Route path="/authentication-portal" element={<Navigate to="/login" replace />} />
            <Route path="/signup" element={<Navigate to="/login" replace />} />
            <Route path="/register" element={<Navigate to="/login" replace />} />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routes;
