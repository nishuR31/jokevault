import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Plus, Trash2, Edit3, Check, X, RefreshCw, 
  Users, Sparkles, Terminal, AlertTriangle, Key, Search
} from 'lucide-react';
import Button from '../../../components/ui/Button';
import { jokeApi, userApi } from '../../../services/api';

const AdminJokeConsole = ({ currentUser, isAdmin }) => {
  // Jokes State
  const [jokes, setJokes] = useState([]);
  const [isLoadingJokes, setIsLoadingJokes] = useState(false);
  const [newJokeContent, setNewJokeContent] = useState('');
  const [newJokeTags, setNewJokeTags] = useState('programming, tech');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Edit Joke State
  const [editingJokeId, setEditingJokeId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');

  // Users State (RBAC Management)
  const [usersList, setUsersList] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('jokes'); // 'jokes' | 'users'

  // Fetch Jokes
  const loadJokes = async () => {
    setIsLoadingJokes(true);
    try {
      // Fetch 15 recent jokes
      const res = await jokeApi.getJokes(null, 15);
      if (Array.isArray(res)) {
        setJokes(res);
      } else if (res?.payload && Array.isArray(res.payload)) {
        setJokes(res.payload);
      } else if (res?.data && Array.isArray(res.data)) {
        setJokes(res.data);
      } else {
        // Fallback to pagination
        const pageRes = await jokeApi.getPaginatedJokes(1, 15);
        const list = pageRes?.payload?.jokes || pageRes?.jokes || [];
        setJokes(list);
      }
    } catch (err) {
      console.error('Failed to load jokes in admin console:', err);
    } finally {
      setIsLoadingJokes(false);
    }
  };

  // Fetch Users
  const loadUsers = async () => {
    if (!isAdmin) return;
    setIsLoadingUsers(true);
    try {
      const res = await userApi.getAllUsers();
      const list = res?.payload || res?.data || [];
      if (Array.isArray(list)) {
        setUsersList(list);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadJokes();
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  // Create Joke Handler (POST /api/v1/j)
  const handleCreateJoke = async (e) => {
    e.preventDefault();
    if (!newJokeContent.trim()) return;

    setIsSubmitting(true);
    setStatusMessage(null);
    try {
      const tagsArray = newJokeTags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);

      const res = await jokeApi.createJoke({
        joke: newJokeContent.trim(),
        tags: tagsArray.length > 0 ? tagsArray : ['general'],
      });

      setStatusMessage({
        type: 'success',
        text: 'Joke successfully created and stored in MongoDB vault!',
      });
      setNewJokeContent('');
      loadJokes();
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Forbidden: Administrator privileges required to post jokes.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Joke Handler (DELETE /api/v1/j/:id)
  const handleDeleteJoke = async (id) => {
    if (!window.confirm('Are you sure you want to delete this joke from the vault?')) return;

    try {
      await jokeApi.deleteJoke(id);
      setJokes((prev) => prev.filter((j) => (j._id || j.id) !== id));
      setStatusMessage({
        type: 'success',
        text: `Joke ${id} deleted successfully (HTTP DELETE /j/${id})`,
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to delete joke. Admin privileges required.',
      });
    }
  };

  // Start Edit Joke
  const handleStartEdit = (joke) => {
    setEditingJokeId(joke._id || joke.id);
    setEditContent(joke.joke || joke.content || '');
    setEditTags(Array.isArray(joke.tags) ? joke.tags.join(', ') : '');
  };

  // Submit Edit Joke (PUT / PATCH /api/v1/j/:id)
  const handleSaveEdit = async (id) => {
    try {
      const tagsArray = editTags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);

      await jokeApi.patchJoke(id, {
        joke: editContent.trim(),
        tags: tagsArray,
      });

      setJokes((prev) =>
        prev.map((j) =>
          (j._id || j.id) === id ? { ...j, joke: editContent.trim(), tags: tagsArray } : j
        )
      );
      setEditingJokeId(null);
      setStatusMessage({
        type: 'success',
        text: `Joke updated successfully (HTTP PATCH /j/${id})`,
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to update joke.',
      });
    }
  };

  // Update User Role (PATCH /api/v1/u/role/:id)
  const handleToggleUserRole = async (targetUser) => {
    const currentRoles = Array.isArray(targetUser.role) ? targetUser.role : [targetUser.role];
    const newRole = currentRoles.includes('admin') ? 'user' : 'admin';

    try {
      await userApi.updateUserRole(targetUser._id, newRole);
      setUsersList((prev) =>
        prev.map((u) =>
          u._id === targetUser._id
            ? { ...u, role: newRole === 'admin' ? ['admin', 'user'] : ['user'] }
            : u
        )
      );
      setStatusMessage({
        type: 'success',
        text: `Updated ${targetUser.userName}'s role to ${newRole.toUpperCase()}`,
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to update user role.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & RBAC Status */}
      <div className="glassmorphic-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl glassmorphic border ${isAdmin ? 'border-amber-400/40 text-amber-400' : 'border-primary/30 text-primary'}`}>
              <Shield size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-poppins text-white">
                  {isAdmin ? 'Admin Operations Console' : 'Access & RBAC Information'}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${isAdmin ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' : 'bg-primary/20 text-primary border border-primary/30'}`}>
                  {isAdmin ? 'Role: Administrator' : 'Role: Standard User'}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {isAdmin
                  ? 'Full read & write privileges. You can publish, modify (PUT/PATCH), and delete jokes via RESTful /j/:id endpoints.'
                  : 'Standard accounts have read-only privileges. Creation and mutations require an Administrator role.'}
              </p>
            </div>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSubTab('jokes')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeSubTab === 'jokes'
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'glassmorphic text-slate-300 hover:text-white'
                }`}
              >
                Joke Management
              </button>
              <button
                onClick={() => setActiveSubTab('users')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeSubTab === 'users'
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'glassmorphic text-slate-300 hover:text-white'
                }`}
              >
                User Roles
              </button>
            </div>
          )}
        </div>

        {/* Status Message Notification */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-4 p-3.5 rounded-xl text-xs font-mono flex items-center justify-between border ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
              }`}
            >
              <span>{statusMessage.text}</span>
              <button
                onClick={() => setStatusMessage(null)}
                className="opacity-70 hover:opacity-100"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* If Not Admin: Informative Card */}
      {!isAdmin && (
        <div className="glassmorphic-card rounded-2xl p-8 border border-white/10 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl glassmorphic flex items-center justify-center text-primary">
            <Key size={32} />
          </div>
          <h3 className="text-lg font-bold font-poppins text-white">
            Looking for Admin Privileges?
          </h3>
          <p className="max-w-md mx-auto text-sm text-slate-400">
            In development mode, you can sign up with the admin secret key <code className="text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded">&quot;developer&quot;</code> to test joke creation, updates, and deletion endpoints!
          </p>
        </div>
      )}

      {/* Admin Content: Joke Creation & Management */}
      {isAdmin && activeSubTab === 'jokes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Joke Form */}
          <div className="glassmorphic-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <Plus size={18} className="text-primary" />
              <h3 className="font-poppins font-bold text-white text-base">
                Create New Joke
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Submit directly to <code className="text-primary font-mono">POST /api/v1/j</code>.
            </p>

            <form onSubmit={handleCreateJoke} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Joke Content
                </label>
                <textarea
                  rows={4}
                  value={newJokeContent}
                  onChange={(e) => setNewJokeContent(e.target.value)}
                  placeholder="Why do programmers prefer dark mode? Because light attracts bugs!"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl glassmorphic-input text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newJokeTags}
                  onChange={(e) => setNewJokeTags(e.target.value)}
                  placeholder="programming, tech, pun"
                  className="w-full px-3.5 py-2.5 rounded-xl glassmorphic-input text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="md"
                fullWidth
                loading={isSubmitting}
                className="font-mono text-xs shadow-lg shadow-primary/20"
              >
                Publish to Vault
              </Button>
            </form>
          </div>

          {/* Jokes Vault List / Table */}
          <div className="lg:col-span-2 glassmorphic-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-primary" />
                <h3 className="font-poppins font-bold text-white text-base">
                  Joke Vault Repository
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                  {jokes.length} jokes
                </span>
              </div>
              <button
                onClick={loadJokes}
                disabled={isLoadingJokes}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono glassmorphic hover:text-white text-slate-400"
              >
                <RefreshCw size={12} className={isLoadingJokes ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>

            {isLoadingJokes ? (
              <div className="py-12 text-center text-slate-400 text-sm animate-pulse">
                Loading jokes from MongoDB vault...
              </div>
            ) : jokes.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No jokes found in the vault. Create your first joke above!
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {jokes.map((j) => {
                  const jokeId = j._id || j.id;
                  const isEditing = editingJokeId === jokeId;

                  return (
                    <div
                      key={jokeId}
                      className="p-4 rounded-xl glassmorphic border border-white/5 hover:border-white/15 transition-all duration-200 space-y-2.5"
                    >
                      {isEditing ? (
                        <div className="space-y-3">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg glassmorphic-input text-xs text-white resize-none"
                          />
                          <input
                            type="text"
                            value={editTags}
                            onChange={(e) => setEditTags(e.target.value)}
                            placeholder="Tags (comma separated)"
                            className="w-full px-3 py-1.5 rounded-lg glassmorphic-input text-xs text-white"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => setEditingJokeId(null)}
                              className="px-3 py-1 rounded-lg text-xs font-mono glassmorphic text-slate-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(jokeId)}
                              className="px-3 py-1 rounded-lg text-xs font-mono bg-emerald-600 text-white hover:bg-emerald-500"
                            >
                              Save Patch
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm text-slate-200 font-inter whitespace-pre-wrap leading-relaxed">
                              {j.joke || j.content}
                            </p>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => handleStartEdit(j)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                                title="Edit Joke (PATCH /j/:id)"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteJoke(jokeId)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                title="Delete Joke (DELETE /j/:id)"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-white/5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {Array.isArray(j.tags) &&
                                j.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-md glassmorphic-badge text-[10px] text-primary"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                            </div>
                            <span className="text-slate-500 text-[10px]">
                              ID: {jokeId ? jokeId.slice(-6) : 'N/A'}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Content: User Roles Management */}
      {isAdmin && activeSubTab === 'users' && (
        <div className="glassmorphic-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-primary" />
              <h3 className="font-poppins font-bold text-white text-base">
                User RBAC Management
              </h3>
            </div>
            <button
              onClick={loadUsers}
              disabled={isLoadingUsers}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono glassmorphic hover:text-white text-slate-400"
            >
              <RefreshCw size={12} className={isLoadingUsers ? 'animate-spin' : ''} />
              Refresh Users
            </button>
          </div>

          {isLoadingUsers ? (
            <div className="py-12 text-center text-slate-400 text-sm animate-pulse">
              Loading users...
            </div>
          ) : usersList.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              No other users loaded.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Current Roles</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {usersList.map((u) => {
                    const uRoles = Array.isArray(u.role) ? u.role : [u.role];
                    const isUserAdmin = uRoles.includes('admin');

                    return (
                      <tr key={u._id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-semibold text-white">
                          {u.userName || u.firstName}
                        </td>
                        <td className="py-3 px-4 text-slate-400">{u.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              isUserAdmin
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {isUserAdmin ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleToggleUserRole(u)}
                            className="px-2.5 py-1 rounded-lg text-[11px] glassmorphic hover:border-primary/40 text-primary transition-all"
                          >
                            {isUserAdmin ? 'Demote to User' : 'Promote to Admin'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminJokeConsole;
