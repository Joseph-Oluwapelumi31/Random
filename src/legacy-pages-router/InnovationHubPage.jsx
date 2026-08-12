import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Search, FlaskConical, ArrowRight, Tag, X, Sparkles, Loader2 } from "lucide-react";
import axios from "axios";
import Navbar from "@/components/Navbar";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CATEGORIES = [
  "All",
  "Emerging BME Innovations",
  "MedTech World Sensations",
  "The Reality of Failure",
  "Project Spotlight",
];

const categoryColors = {
  "Emerging BME Innovations": "#00E5FF",
  "MedTech World Sensations": "#8A2BE2",
  "The Reality of Failure": "#F59E0B",
  "Project Spotlight": "#10B981",
};

function ArticleCard({ article, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const color = categoryColors[article.category] || "#00E5FF";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      data-testid={`hub-article-${article.id}`}
    >
      <Link
        to={`/innovation-hub/${article.id}`}
        className="flex flex-col glass rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group h-full"
      >
        {article.image_url && (
          <div className="h-48 overflow-hidden relative">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] to-transparent" />
            {article.is_featured && (
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-semibold">
                Featured
              </div>
            )}
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ color, background: `${color}15` }}
            >
              {article.category}
            </span>
          </div>
          <h3 className="font-heading text-lg font-600 text-white mb-2 leading-snug group-hover:text-[#00E5FF] transition-colors duration-200 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-[#718096] text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-wrap gap-1">
              {article.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs text-[#718096] px-2 py-0.5 rounded-full bg-white/5 flex items-center gap-1">
                  <Tag size={9} />{tag}
                </span>
              ))}
            </div>
            <ArrowRight size={15} className="text-[#718096] group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function InnovationHubPage() {
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSearching, setAiSearching] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  );
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  useEffect(() => {
    loadArticles();
  }, [activeCategory]);

  const loadArticles = async () => {
    setLoading(true);
    setAiResults(null);
    try {
      const params = {};
      if (activeCategory !== "All") params.category = activeCategory;
      const res = await axios.get(`${API}/articles`, { params });
      setArticles(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleAiSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setAiSearching(true);
    setAiResults(null);
    try {
      const res = await axios.post(`${API}/articles/ai-search`, { query: searchQuery });
      setAiResults(res.data);
    } catch (e) {
      console.error(e);
    }
    setAiSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setAiResults(null);
  };

  const displayArticles = aiResults !== null ? aiResults : articles;

  return (
    <div className="bg-[#05050A] min-h-screen" data-testid="innovation-hub-page">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/3 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00E5FF]/4 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <FlaskConical size={14} className="text-[#00E5FF]" />
              <span className="text-[#A0AEC0] text-sm font-medium">Innovation Hub · Powered by Gemini AI Search</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-none mb-4">
              The Frontier of{" "}
              <span className="text-gradient">Biomedical Innovation</span>
            </h1>
            <p className="text-[#A0AEC0] text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Articles, research, and field reports from the intersection of engineering, clinical science, and MedTech strategy.
            </p>

            {/* AI Search */}
            <form onSubmit={handleAiSearch} className="max-w-2xl mx-auto" data-testid="ai-search-form">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#718096]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, keyword, or tag... (AI-powered)"
                  data-testid="search-input"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-24 py-4 text-sm text-white placeholder-[#718096] focus:outline-none focus:border-[#00E5FF]/50 focus:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-20 top-1/2 -translate-y-1/2 text-[#718096] hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={aiSearching}
                  data-testid="ai-search-btn"
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn-gradient px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1 disabled:opacity-60"
                >
                  {aiSearching ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  {aiSearching ? "..." : "AI"}
                </button>
              </div>
              {aiResults !== null && (
                <p className="text-[#00E5FF] text-xs mt-2 flex items-center justify-center gap-1">
                  <Sparkles size={11} />
                  Gemini found {aiResults.length} article{aiResults.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
                  <button onClick={clearSearch} className="ml-1 underline text-[#718096] hover:text-white">Clear</button>
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" data-testid="category-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                data-testid={`category-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => { setActiveCategory(cat); setAiResults(null); setSearchQuery(""); }}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#00E5FF]/20 to-[#8A2BE2]/20 text-white border border-[#00E5FF]/30"
                    : "glass border border-white/8 text-[#A0AEC0] hover:text-white hover:border-white/15"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {loading || aiSearching ? (
            <div className="flex items-center justify-center py-20" data-testid="articles-loading">
              <Loader2 size={32} className="animate-spin text-[#00E5FF]" />
            </div>
          ) : displayArticles.length === 0 ? (
            <div className="text-center py-20" data-testid="no-articles">
              <Search size={48} className="text-[#718096] mx-auto mb-4" />
              <p className="text-[#A0AEC0] text-lg font-semibold">No articles found</p>
              <p className="text-[#718096] text-sm mt-1">Try a different search query or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
