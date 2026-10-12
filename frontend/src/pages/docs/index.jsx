import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Footer from "../homepage/components/Footer";
import apiClient from "../../services/api";
import {
  Code,
  Terminal,
  Play,
  Shield,
  CheckCircle,
  Copy,
  Layers,
  Server,
  Zap,
} from "lucide-react";

const DocsPage = () => {
  const [activeCategory, setActiveCategory] = useState("jokes");
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [testResponse, setTestResponse] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const endpoints = {
    jokes: [
      {
        method: "GET",
        path: "/api/v1/j/joke",
        title: "Get Random Joke",
        auth: "Public / User",
        desc: "Returns a random joke. If `?tags=dad` is specified, samples from that tag; if omitted, returns a random joke from the whole vault.",
        params: [{ name: "tags", type: "string / array", required: false, desc: "Filter by tag (e.g. sfw, dad, knock-knock)" }],
        exampleRes: {
          success: true,
          code: 200,
          message: "Random joke fetched successfully",
          payload: {
            joke: {
              _id: "670aa5a...",
              joke: "Why do programmers prefer dark mode? Because light attracts bugs.",
              tags: ["programming", "sfw"],
              rating: 5,
            },
          },
        },
      },
      {
        method: "GET",
        path: "/api/v1/j/jokes",
        title: "Get Multiple Jokes (Sampling)",
        auth: "Public / User",
        desc: "Fetch multiple jokes with random sampling. Support `?count=5` and optional `?tags=dad`.",
        params: [
          { name: "count", type: "number", required: false, desc: "Number of jokes to sample (default 5)" },
          { name: "tags", type: "string", required: false, desc: "Filter jokes by specific tag" },
        ],
        exampleRes: {
          success: true,
          code: 200,
          payload: { jokes: ["..."], count: 5 },
        },
      },
      {
        method: "GET",
        path: "/api/v1/j/tags",
        title: "List All Tags",
        auth: "Public / User",
        desc: "Returns all unique joke tags in the vault. Cached in Redis for maximum performance.",
        params: [],
        exampleRes: {
          success: true,
          code: 200,
          payload: { tags: ["dad", "knock-knock", "sfw", "nsfw"] },
        },
      },
      {
        method: "GET",
        path: "/api/v1/j/page",
        title: "Paginated Jokes",
        auth: "Public / User",
        desc: "Cursor and limit pagination for jokes.",
        params: [
          { name: "page", type: "number", required: false, desc: "Page number (default 1)" },
          { name: "limit", type: "number", required: false, desc: "Items per page (default 10, max 100)" },
        ],
        exampleRes: {
          success: true,
          code: 200,
          payload: { jokes: ["..."], totalJokes: 120, totalPages: 12, hasMore: true },
        },
      },
      {
        method: "GET",
        path: "/api/v1/j/:id",
        title: "Get Joke By ID",
        auth: "Public / User",
        desc: "Fetch a single joke by its 24-char MongoDB ObjectId.",
        params: [{ name: "id", type: "string", required: true, desc: "MongoDB ObjectId" }],
        exampleRes: {
          success: true,
          code: 200,
          payload: { joke: "...", rating: 5, tags: ["sfw"] },
        },
      },
      {
        method: "POST",
        path: "/api/v1/j",
        title: "Create New Joke",
        auth: "Admin Only (RBAC)",
        desc: "Submit a new joke into JokeVault. Requires Admin token.",
        params: [
          { name: "joke", type: "string", required: true, desc: "Unique joke text" },
          { name: "tags", type: "array", required: true, desc: "List of valid tags" },
          { name: "rating", type: "number", required: false, desc: "Integer rating (0-10)" },
        ],
        exampleRes: {
          success: true,
          code: 201,
          message: "Joke created successfully",
        },
      },
      {
        method: "PUT",
        path: "/api/v1/j/:id",
        title: "Update Joke (Full)",
        auth: "Admin Only (RBAC)",
        desc: "Fully update joke content, tags, and rating by ID. Requires Admin token.",
        params: [{ name: "id", type: "string", required: true, desc: "MongoDB ObjectId" }],
        exampleRes: { success: true, code: 200, message: "Joke successfully updated" },
      },
      {
        method: "PATCH",
        path: "/api/v1/j/:id",
        title: "Update Joke (Partial)",
        auth: "Admin Only (RBAC)",
        desc: "Partially update joke fields by ID. Requires Admin token.",
        params: [{ name: "id", type: "string", required: true, desc: "MongoDB ObjectId" }],
        exampleRes: { success: true, code: 200, message: "Joke successfully updated" },
      },
      {
        method: "DELETE",
        path: "/api/v1/j/:id",
        title: "Delete Joke",
        auth: "Admin Only (RBAC)",
        desc: "Permanently delete joke from JokeVault. Requires Admin token.",
        params: [{ name: "id", type: "string", required: true, desc: "MongoDB ObjectId" }],
        exampleRes: { success: true, code: 200, message: "Joke successfully deleted" },
      },
    ],
    auth: [
      {
        method: "POST",
        path: "/api/v1/u/register",
        title: "Register Account",
        auth: "Public",
        desc: "Create a new user account. Role defaults strictly to 'user'.",
        params: [
          { name: "userName", type: "string", required: true, desc: "Unique username" },
          { name: "email", type: "string", required: true, desc: "Valid email address" },
          { name: "password", type: "string", required: true, desc: "Min 8 chars, 1 digit, 1 lower, 1 upper, 1 symbol" },
          { name: "adminSecretKey", type: "string", required: false, desc: "Optional secret key for Admin role" },
        ],
        exampleRes: { success: true, code: 201, message: "Account registered successfully" },
      },
      {
        method: "POST",
        path: "/api/v1/u/login",
        title: "Login",
        auth: "Public",
        desc: "Authenticate with email/username and password. Sets secure HttpOnly cookies & returns Bearer token.",
        params: [
          { name: "emailUser", type: "string", required: true, desc: "Email or username" },
          { name: "password", type: "string", required: true, desc: "Account password" },
        ],
        exampleRes: { success: true, code: 200, payload: { user: { role: ["user"] }, accessToken: "..." } },
      },
      {
        method: "POST",
        path: "/api/v1/u/logout",
        title: "Logout",
        auth: "Authenticated",
        desc: "Clears session cookies and invalidates Redis cache.",
        params: [],
        exampleRes: { success: true, code: 200, message: "Successfully logged out" },
      },
      {
        method: "PATCH",
        path: "/api/v1/u/role/:id",
        title: "Update User Role (RBAC)",
        auth: "Admin Only (RBAC)",
        desc: "Promote or demote user role between 'user' and 'admin'.",
        params: [{ name: "role", type: "string", required: true, desc: "'user' or 'admin'" }],
        exampleRes: { success: true, code: 200, message: "User role updated successfully" },
      },
    ],
    system: [
      {
        method: "GET",
        path: "/api/v1/health",
        title: "Health & Performance Metrics",
        auth: "Public",
        desc: "Real-time health report, node version, memory metrics (RSS & Heap), and Fastify uptime.",
        params: [],
        exampleRes: {
          success: true,
          code: 200,
          payload: { status: "healthy", framework: "Fastify", uptimeSeconds: 120, memory: { rssMB: 95 } },
        },
      },
    ],
  };

  useEffect(() => {
    setSelectedEndpoint(endpoints[activeCategory][0]);
    setTestResponse(null);
  }, [activeCategory]);

  const handleTestEndpoint = async (ep) => {
    setIsTesting(true);
    setTestResponse(null);
    try {
      let path = ep.path;
      if (path.includes(":id")) {
        path = path.replace(":id", "sample_id");
      }
      // Trim prefix /api/v1 since apiClient baseURL includes it
      const cleanPath = path.replace("/api/v1", "");
      let res;
      if (ep.method === "GET") {
        res = await apiClient.get(cleanPath);
      } else {
        res = await apiClient.request({ method: ep.method, url: cleanPath });
      }
      setTestResponse({ status: 200, data: res });
    } catch (err) {
      setTestResponse({ status: err.code || 400, data: err });
    } finally {
      setIsTesting(false);
    }
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getMethodBadge = (method) => {
    switch (method) {
      case "GET":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "POST":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "PUT":
      case "PATCH":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "DELETE":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c16] text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glassmorphic border border-violet-500/30 text-xs font-semibold text-violet-300 mb-4">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span>Fastify 5 REST API Documentation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-poppins text-white mb-4">
            Interactive <span className="text-gradient-primary">JokeVault API</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Blazing fast, schema-accelerated comedy API built on Fastify, MongoDB Atlas, and Redis caching.
            Explore unified RESTful endpoints, RBAC permissions, and real-time response testers.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          {[
            { id: "jokes", label: "Joke Operations", icon: Layers },
            { id: "auth", label: "Auth & RBAC", icon: Shield },
            { id: "system", label: "Health & System", icon: Server },
          ].map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 border border-violet-500/50"
                    : "glassmorphic text-slate-300 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Endpoint List Sidebar */}
          <div className="lg:col-span-5 space-y-2.5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 mb-1">
              {activeCategory.toUpperCase()} ENDPOINTS ({endpoints[activeCategory].length})
            </h2>
            {endpoints[activeCategory].map((ep, idx) => {
              const isSelected = selectedEndpoint?.path === ep.path && selectedEndpoint?.method === ep.method;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedEndpoint(ep);
                    setTestResponse(null);
                  }}
                  className={`p-3.5 rounded-2xl cursor-pointer transition border ${
                    isSelected
                      ? "glassmorphic-card border-violet-500/60 bg-violet-600/10 shadow-lg shadow-violet-500/10"
                      : "glassmorphic border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold border ${getMethodBadge(ep.method)}`}>
                      {ep.method}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{ep.auth}</span>
                  </div>
                  <div className="font-mono text-xs text-white truncate font-medium">{ep.path}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1">{ep.title}</div>
                </div>
              );
            })}
          </div>

          {/* Endpoint Detail & Interactive Tester */}
          <div className="lg:col-span-7">
            {selectedEndpoint ? (
              <div className="glassmorphic-card p-6 sm:p-8 rounded-3xl space-y-6 border border-white/10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center space-x-2.5 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border ${getMethodBadge(selectedEndpoint.method)}`}>
                        {selectedEndpoint.method}
                      </span>
                      <h3 className="text-xl font-bold font-poppins text-white">{selectedEndpoint.title}</h3>
                    </div>
                    <code className="text-sm font-mono text-cyan-300 bg-black/40 px-3 py-1 rounded-lg inline-block">
                      {selectedEndpoint.path}
                    </code>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-3 py-1 rounded-full glassmorphic border-white/10 text-slate-300">
                      {selectedEndpoint.auth}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Description</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedEndpoint.desc}</p>
                </div>

                {/* Parameters Table */}
                {selectedEndpoint.params?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Parameters</h4>
                    <div className="overflow-x-auto rounded-xl border border-white/5">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-white/[0.04] text-slate-300">
                          <tr>
                            <th className="p-2.5">Param</th>
                            <th className="p-2.5">Type</th>
                            <th className="p-2.5">Required</th>
                            <th className="p-2.5">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                          {selectedEndpoint.params.map((p, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.02]">
                              <td className="p-2.5 text-violet-300 font-semibold">{p.name}</td>
                              <td className="p-2.5 text-slate-400">{p.type}</td>
                              <td className="p-2.5">
                                {p.required ? (
                                  <span className="text-red-400">Yes</span>
                                ) : (
                                  <span className="text-slate-500">Optional</span>
                                )}
                              </td>
                              <td className="p-2.5 font-sans text-slate-300">{p.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* cURL Example */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">cURL Example</h4>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `curl -X ${selectedEndpoint.method} "http://localhost:4000${selectedEndpoint.path}"`,
                          "curl"
                        )
                      }
                      className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                    >
                      {copiedIndex === "curl" ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === "curl" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-xs font-mono text-cyan-300 overflow-x-auto">
                    curl -X {selectedEndpoint.method} "http://localhost:4000{selectedEndpoint.path}"
                  </pre>
                </div>

                {/* Live Try-It Button */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Live API Tester</h4>
                    <button
                      onClick={() => handleTestEndpoint(selectedEndpoint)}
                      disabled={isTesting}
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/30 transition disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isTesting ? "Executing..." : "Send Request Now"}</span>
                    </button>
                  </div>

                  {testResponse ? (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center space-x-2 text-xs font-mono">
                        <span className="text-slate-400">Status:</span>
                        <span className={`px-2 py-0.5 rounded ${testResponse.status === 200 || testResponse.status === 201 ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                          {testResponse.status}
                        </span>
                      </div>
                      <pre className="p-4 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-emerald-300 overflow-x-auto max-h-60 overflow-y-auto">
                        {JSON.stringify(testResponse.data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-center text-xs text-slate-500 font-mono">
                      Click "Send Request Now" to test this endpoint directly against the live Fastify backend server.
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DocsPage;
