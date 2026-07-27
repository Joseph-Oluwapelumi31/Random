import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Edit2, Trash2, X, Save, LogIn, Shield,
  Eye, Tag, CheckCircle, AlertCircle, Loader2
} from "lucide-react";
import axios from "axios";
import Navbar from "@/components/Navbar";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CATEGORIES = [
  "Emerging BME Innovations",
  "MedTech World Sensations",
  "The Reality of Failure",
  "Project Spotlight",
];

const emptyForm = {
  title: "", excerpt: "", content: "", category: CATEGORIES[0],
  tags: "", image_url: "", youtube_url: "", is_featured: false,
};

function Toast({ msg, type, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl glass border shadow-xl ${
        type === "success" ? "border-[#00E5FF]/30 text-[#00E5FF]" : "border-red-500/30 text-red-400"
      }`}
    >
      {type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      <span className="text-sm font-medium text-white">{msg}</span>
      <button onClick={onClose}><X size={14} /></button>
    </motion.div>
  );
}

function ArticleForm({ initial, onSave, onCancel, adminKey }) {
  const [form, setForm] = useState(initial || emptyForm);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
      if (initial?.id) {
        await axios.put(`${API}/articles/${initial.id}`, payload, { headers: { "X-Admin-Key": adminKey } });
      } else {
        await axios.post(`${API}/articles`, payload, { headers: { "X-Admin-Key": adminKey } });
      }
      onSave();
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      data-testid="article-form-modal"
    >
      <div className="glass rounded-3xl border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-heading text-xl font-700 text-white">
            {initial?.id ? "Edit Article" : "New Article"}
          </h2>
          <button onClick={onCancel} className="text-[#718096] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {[
            { label: "Title", key: "title", type: "input", placeholder: "Article title..." },
            { label: "Excerpt", key: "excerpt", type: "textarea", rows: 2, placeholder: "Short summary (2-3 sentences)..." },
            { label: "Image URL", key: "image_url", type: "input", placeholder: "https://..." },
            { label: "YouTube URL", key: "youtube_url", type: "input", placeholder: "https://youtube.com/watch?v=..." },
            { label: "Tags (comma-separated)", key: "tags", type: "input", placeholder: "AI, MedTech, NIH, ..." },
          ].map(({ label, key, type, rows, placeholder }) => (
            <div key={key}>
              <label className="block text-xs text-[#718096] uppercase tracking-widest mb-1.5">{label}</label>
              {type === "textarea" ? (
                <textarea
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  rows={rows}
                  placeholder={placeholder}
                  data-testid={`form-${key}`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#00E5FF]/50 transition-colors resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  data-testid={`form-${key}`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#00E5FF]/50 transition-colors"
                />
              )}
            </div>
          ))}

          <div>
            <label className="block text-xs text-[#718096] uppercase tracking-widest mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              data-testid="form-category"
              className="w-full bg-[#05050A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E5FF]/50 transition-colors"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs text-[#718096] uppercase tracking-widest mb-1.5">Content (Markdown)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              placeholder="## Overview&#10;&#10;Write your article in Markdown format..."
              data-testid="form-content"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#00E5FF]/50 transition-colors resize-none font-mono"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
              data-testid="form-featured-toggle"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                form.is_featured
                  ? "bg-[#00E5FF]/15 border-[#00E5FF]/40 text-[#00E5FF]"
                  : "glass border-white/10 text-[#718096]"
              }`}
            >
              <CheckCircle size={14} />
              {form.is_featured ? "Featured" : "Mark as Featured"}
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              data-testid="form-save-btn"
              className="btn-gradient flex-1 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving..." : "Save Article"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              data-testid="form-cancel-btn"
              className="px-6 py-3 rounded-xl font-semibold text-[#A0AEC0] glass border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("admin_key"));
  const [adminKey, setAdminKey] = useState(localStorage.getItem("admin_key") || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (authed) loadArticles();
  }, [authed]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/admin/verify`, { password });
      localStorage.setItem("admin_key", res.data.token);
      setAdminKey(res.data.token);
      setAuthed(true);
      setLoginError("");
    } catch {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_key");
    setAuthed(false);
    setAdminKey("");
    setArticles([]);
  };

  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/articles?limit=50`);
      setArticles(res.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    setDeleting(id);
    try {
      await axios.delete(`${API}/articles/${id}`, { headers: { "X-Admin-Key": adminKey } });
      showToast("Article deleted");
      loadArticles();
    } catch { showToast("Failed to delete", "error"); }
    setDeleting(null);
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditArticle(null);
    showToast(editArticle?.id ? "Article updated!" : "Article created!");
    loadArticles();
  };

  if (!authed) {
    return (
      <div className="bg-[#05050A] min-h-screen" data-testid="admin-login-page">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-10 border border-white/10 w-full max-w-sm"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#8A2BE2] flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-white" />
              </div>
              <h1 className="font-heading text-2xl font-700 text-white mb-1">Admin Access</h1>
              <p className="text-[#718096] text-sm">Innovation Hub CMS</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4" data-testid="admin-login-form">
              <div>
                <label className="block text-xs text-[#718096] uppercase tracking-widest mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  data-testid="admin-password-input"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#00E5FF]/50 transition-colors"
                />
              </div>
              {loginError && (
                <p className="text-red-400 text-xs flex items-center gap-1" data-testid="admin-login-error">
                  <AlertCircle size={12} />{loginError}
                </p>
              )}
              <button
                type="submit"
                data-testid="admin-login-btn"
                className="w-full btn-gradient py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
              >
                <LogIn size={16} />
                Access CMS
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#05050A] min-h-screen" data-testid="admin-dashboard">
      <Navbar />
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {(showForm || editArticle) && (
          <ArticleForm
            initial={editArticle ? { ...editArticle, tags: editArticle.tags?.join(", ") || "" } : null}
            onSave={handleSaved}
            onCancel={() => { setShowForm(false); setEditArticle(null); }}
            adminKey={adminKey}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-3xl font-700 text-white mb-1">Innovation Hub CMS</h1>
            <p className="text-[#718096] text-sm">{articles.length} articles · Manage your content</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setEditArticle(null); setShowForm(true); }}
              data-testid="new-article-btn"
              className="btn-gradient px-5 py-2.5 rounded-xl font-semibold text-white flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              New Article
            </button>
            <button
              onClick={handleLogout}
              data-testid="admin-logout-btn"
              className="glass border border-white/10 px-4 py-2.5 rounded-xl text-[#718096] hover:text-white text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Articles Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[#00E5FF]" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 glass rounded-3xl border border-white/8">
            <p className="text-[#A0AEC0] text-lg">No articles yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 btn-gradient px-6 py-3 rounded-xl font-semibold text-white inline-flex items-center gap-2"
            >
              <Plus size={16} />Create First Article
            </button>
          </div>
        ) : (
          <div className="space-y-3" data-testid="articles-list">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                data-testid={`admin-article-row-${article.id}`}
                className="glass rounded-2xl border border-white/8 p-5 flex items-center gap-5 hover:border-white/15 transition-all duration-200 group"
              >
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt=""
                    className="w-16 h-12 object-cover rounded-xl hidden sm:block flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[#718096] uppercase tracking-widest">{article.category}</span>
                    {article.is_featured && (
                      <span className="text-xs text-[#00E5FF] bg-[#00E5FF]/10 px-1.5 py-0.5 rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="font-heading font-600 text-white text-sm truncate">{article.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-[#718096]">
                      <Eye size={10} />{article.views}
                    </span>
                    <div className="flex gap-1">
                      {article.tags?.slice(0, 2).map((t) => (
                        <span key={t} className="flex items-center gap-1 text-xs text-[#718096] bg-white/5 px-1.5 py-0.5 rounded-full">
                          <Tag size={8} />{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditArticle(article)}
                    data-testid={`edit-article-${article.id}`}
                    className="p-2 rounded-xl glass border border-white/10 text-[#718096] hover:text-[#00E5FF] hover:border-[#00E5FF]/30 transition-all duration-200"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    disabled={deleting === article.id}
                    data-testid={`delete-article-${article.id}`}
                    className="p-2 rounded-xl glass border border-white/10 text-[#718096] hover:text-red-400 hover:border-red-500/30 transition-all duration-200 disabled:opacity-50"
                  >
                    {deleting === article.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
