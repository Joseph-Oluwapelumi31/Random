import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const categoryColors = {
  "Emerging BME Innovations": { color: "#00E5FF", bg: "rgba(0,229,255,0.1)" },
  "MedTech World Sensations": { color: "#8A2BE2", bg: "rgba(138,43,226,0.1)" },
  "The Reality of Failure": { color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  "Project Spotlight": { color: "#10B981", bg: "rgba(16,185,129,0.1)" },
};

function ArticleCard({ article, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const cat = categoryColors[article.category] || { color: "#00E5FF", bg: "rgba(0,229,255,0.1)" };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      data-testid={`article-card-${article.id}`}
    >
      <Link
        to={`/innovation-hub/${article.id}`}
        className="block glass rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-white/20 border border-white/8 transition-all duration-300 group h-full"
      >
        {article.image_url && (
          <div className="relative h-44 overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent" />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ color: cat.color, background: cat.bg }}
            >
              {article.category}
            </span>
          </div>
          <h3 className="font-heading text-lg font-600 text-white mb-2 leading-snug group-hover:text-[#00E5FF] transition-colors duration-200 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-[#718096] text-sm line-clamp-3 mb-4 leading-relaxed">{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {article.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-xs text-[#718096] px-2 py-0.5 rounded-full bg-white/5">
                  <Tag size={9} />{tag}
                </span>
              ))}
            </div>
            <ArrowRight size={16} className="text-[#718096] group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function InnovationHubPreview() {
  const [articles, setArticles] = useState([]);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  useEffect(() => {
    axios.get(`${API}/articles?featured=true&limit=3`)
      .then((res) => setArticles(res.data))
      .catch(console.error);
  }, []);

  return (
    <section data-testid="innovation-hub-preview" className="py-20 px-6 bg-[#05050A]">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-[#00E5FF] text-sm font-semibold uppercase tracking-widest mb-3"
            >
              Innovation Hub
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl font-800 text-white leading-none"
            >
              Insights That{" "}
              <span className="text-gradient">Move the Field.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/innovation-hub"
              data-testid="view-all-articles-btn"
              className="flex items-center gap-2 text-sm font-semibold text-[#00E5FF] hover:gap-3 transition-all duration-200 whitespace-nowrap"
            >
              View All Articles <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>

        {/* Newsletter Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 glass rounded-3xl p-8 border border-white/8 text-center"
          data-testid="newsletter-teaser"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full glass border border-[#00E5FF]/20">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[#00E5FF] text-xs font-semibold uppercase tracking-widest">AI-Powered Search</span>
          </div>
          <h3 className="font-heading text-2xl font-700 text-white mb-2">
            Search by Keyword, Topic, or Tag
          </h3>
          <p className="text-[#A0AEC0] text-sm mb-6 max-w-lg mx-auto">
            Use Gemini AI to discover articles across BME innovation, MedTech breakthroughs, FDA insights, and clinical research.
          </p>
          <Link
            to="/innovation-hub"
            data-testid="explore-hub-btn"
            className="btn-gradient px-8 py-3 rounded-xl font-semibold text-white inline-flex items-center gap-2"
          >
            Explore the Innovation Hub <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
