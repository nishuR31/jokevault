import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserDashboard from './pages/user-dashboard';
import CategoryExplorer from './pages/category-explorer';
import JokeDetailPage from './pages/joke-detail-page';
import SearchDiscovery from './pages/search-discovery';
import Homepage from './pages/homepage';
import AuthenticationPortal from './pages/authentication-portal';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CategoryExplorer />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/category-explorer" element={<CategoryExplorer />} />
        <Route path="/joke-detail-page" element={<JokeDetailPage />} />
        <Route path="/search-discovery" element={<SearchDiscovery />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/authentication-portal" element={<AuthenticationPortal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;