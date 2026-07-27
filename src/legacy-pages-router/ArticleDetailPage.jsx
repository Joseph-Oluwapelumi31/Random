import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Tag, Eye, Youtube, ExternalLink } from "lucide-react";
import axios from "axios";
import Navbar from "@/components/Navbar";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const categoryColors = {
  "Emerging BME Innovations": "#00E5FF",
  "MedTech World Sensations": "#8A2BE2",
  "The Reality of Failure": "#F59E0B",
  "Project Spotlight": "#10B981",
};

function getYouTubeEmbedId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [artRes, allRes] = await Promise.all([
          axios.get(`${API}/articles/${id}`),
          axios.get(`${API}/articles?limit=4`),
        ]);
        setArticle(artRes.data);
        setRelated(allRes.data.filter((a) => a.id !== id).slice(0, 3));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#05050A] min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="animate-pulse text-[#00E5FF] font-heading text-xl">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-[#05050A] min-h-screen" data-testid="article-not-found">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 pt-32 text-center">
          <h2 className="font-heading text-2xl text-white mb-4">Article not found</h2>
          <Link to="/innovation-hub" className="text-[#00E5FF] hover:underline">Back to Innovation Hub</Link>
        </div>
      </div>
    );
  }

  const color = categoryColors[article.category] || "#00E5FF";
  const ytId = getYouTubeEmbedId(article.youtube_url);

  return (
    <div className="bg-[#05050A] min-h-screen" data-testid="article-detail-page">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/innovation-hub"
            data-testid="back-to-hub-btn"
            className="inline-flex items-center gap-2 text-[#718096] hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Innovation Hub
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ color, background: `${color}15` }}
              data-testid="article-category"
            >
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#718096]">
              <Eye size={11} /> {article.views} views
            </span>
          </div>

          <h1
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-800 text-white leading-tight mb-6"
            data-testid="article-title"
          >
            {article.title}
          </h1>

          <p className="text-[#A0AEC0] text-lg leading-relaxed mb-6 border-l-2 pl-4" style={{ borderColor: color }}>
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-white/10">
            <span className="text-[#718096] text-sm">
              By <span className="text-white font-medium">{article.author}</span>
            </span>
            <span className="text-[#718096] text-sm">
              {new Date(article.created_at).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric"
              })}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {article.tags?.map((tag) => (
                <Link
                  key={tag}
                  to={`/innovation-hub?tag=${encodeURIComponent(tag)}`}
                  data-testid={`article-tag-${tag}`}
                  className="flex items-center gap-1 text-xs text-[#718096] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Tag size={9} />{tag}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        {article.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl overflow-hidden mb-12 aspect-[16/7]"
            data-testid="article-image"
          >
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose-dark"
          data-testid="article-content"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </motion.article>

        {/* YouTube Embed */}
        {ytId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 rounded-2xl overflow-hidden border border-[#FF0000]/20"
            data-testid="youtube-embed"
          >
            <div className="flex items-center gap-2 p-4 bg-[#FF0000]/10 border-b border-[#FF0000]/20">
              <Youtube size={18} className="text-[#FF0000]" />
              <span className="text-white text-sm font-semibold">Watch on YouTube</span>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-12 glass rounded-2xl p-6 border border-white/8 flex items-center gap-5"
          data-testid="author-card"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#8A2BE2] flex items-center justify-center font-heading font-700 text-white text-xl flex-shrink-0">
            VR
          </div>
          <div>
            <p className="font-heading font-700 text-white mb-0.5">Vamsi Reddy</p>
            <p className="text-[#A0AEC0] text-sm">Global Head of Product Development · Evon Medics</p>
            <p className="text-[#718096] text-xs mt-1">MSE Johns Hopkins · EB-1A Approved Scientist · 5+ US Patents</p>
          </div>
          <a
            href="https://www.linkedin.com/in/reddy-vamsi"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="author-linkedin"
            className="ml-auto glass rounded-xl p-2 border border-white/10 hover:border-[#00E5FF]/30 transition-colors"
          >
            <ExternalLink size={16} className="text-[#718096]" />
          </a>
        </motion.div>

        {/* Related Articles */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
            data-testid="related-articles"
          >
            <h3 className="font-heading text-2xl font-700 text-white mb-6">More from the Innovation Hub</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((rel) => {
                const c = categoryColors[rel.category] || "#00E5FF";
                return (
                  <Link
                    key={rel.id}
                    to={`/innovation-hub/${rel.id}`}
                    data-testid={`related-article-${rel.id}`}
                    className="glass rounded-xl p-4 border border-white/8 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <span className="text-xs font-semibold" style={{ color: c }}>{rel.category}</span>
                    <p className="text-white text-sm font-medium mt-1 leading-snug group-hover:text-[#00E5FF] transition-colors line-clamp-2">{rel.title}</p>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
