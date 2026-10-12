import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Sparkles,
  Compass,
  Search,
  User,
  ShieldCheck,
  FileCode,
  LogOut,
  LogIn,
  ChevronDown,
  Smile,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { name: "Home", path: "/", icon: Sparkles },
    { name: "Explore", path: "/category-explorer", icon: Compass },
    { name: "Search", path: "/search-discovery", icon: Search },
    { name: "Dashboard", path: "/user-dashboard", icon: User },
    { name: "API Docs", path: "/docs", icon: FileCode },
  ];

  const isActivePath = (path) => {
    if (path === "/" && (location.pathname === "/" || location.pathname === "/homepage")) {
      return true;
    }
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphic-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition duration-300">
                <div className="w-full h-full bg-[#0b0c16] rounded-xl flex items-center justify-center">
                  <Smile className="w-6 h-6 text-violet-400 group-hover:scale-110 transition duration-300" />
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-400 rounded-xl blur-sm opacity-20 group-hover:opacity-60 transition duration-300 -z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-poppins tracking-tight text-white group-hover:text-cyan-300 transition">
                Joke<span className="text-violet-400">Vault</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-violet-300/60 -mt-1">
                Fastify Edition
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-violet-500/15 text-violet-300 border border-violet-500/30 shadow-sm shadow-violet-500/20"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${active ? "text-violet-400" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Admin Badge link (if admin) */}
            {isAdmin && (
              <Link
                to="/user-dashboard"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 hover:brightness-110 transition"
                title="Admin Privileges Active"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Console</span>
              </Link>
            )}
          </nav>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full glassmorphic hover:border-violet-500/40 transition group"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white shadow">
                    {user?.userName?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-200 leading-tight">
                      {user?.userName}
                    </span>
                    <span className="text-[10px] text-violet-400 capitalize">
                      {isAdmin ? "Admin" : "Member"}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl glassmorphic-modal p-2 shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                      <p className="text-xs font-medium text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user?.email || user?.userName}</p>
                    </div>
                    <Link
                      to="/user-dashboard"
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-violet-600/20 hover:text-white transition"
                    >
                      <User className="w-4 h-4 text-violet-400" />
                      <span>Profile & Saved Vault</span>
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/user-dashboard"
                        className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-amber-300 hover:bg-amber-500/20 transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Admin Joke Manager</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/15 transition mt-1"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/authentication-portal">
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/authentication-portal">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/30"
                  >
                    Join Vault
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            {isAuthenticated && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
                {user?.userName?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl glassmorphic text-slate-300 hover:text-white focus:outline-none transition"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-violet-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Animated Glassmorphic Drawer */}
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-6 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-1 pt-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const active = isActivePath(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                      active
                        ? "bg-violet-600/20 text-violet-300 border border-violet-500/30 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${active ? "text-violet-400" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  to="/user-dashboard"
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30"
                >
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Admin Console (Manage Jokes & RBAC)</span>
                </Link>
              )}
            </nav>

            {/* Mobile Auth Actions */}
            <div className="pt-4 mt-3 border-t border-white/10 px-2">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03]">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400">Logged in as</span>
                      <span className="text-sm font-semibold text-white">{user?.userName}</span>
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase">
                      {isAdmin ? "Admin" : "User"}
                    </span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    fullWidth
                    className="text-red-400 hover:bg-red-500/15 flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/authentication-portal">
                    <Button variant="ghost" fullWidth className="text-slate-200">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/authentication-portal">
                    <Button
                      variant="default"
                      fullWidth
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30"
                    >
                      Join Vault
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
