'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Tag, Youtube, Download, ExternalLink, Edit3 } from 'lucide-react';
import ArticleBody from '@/components/regulatory/ArticleBody';

const PROFILE_PHOTO = 'https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg';
const CAT_COLORS = {
  'Emerging BME Innovations': '#0bc5ea',
  'MedTech World Sensations': '#7c3aed',
  'The Reality of Failure': '#f59e0b',
  'Project Spotlight': '#10b981',
};

function YouTubeEmbed({ url }) {
  const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  const id = match?.[1];
  if (!id) return null;
  return (
    <div className="rounded-2xl overflow-hidden border border-[#ff0000]/20 my-8">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#ff0000]/10 border-b border-[#ff0000]/15">
        <Youtube size={15} className="text-[#ff0000]" />
        <span className="text-white text-sm font-semibold">Watch on YouTube</span>
      </div>
      <div className="aspect-video">
        <iframe src={`https://www.youtube.com/embed/${id}`} title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
      </div>
    </div>
  );
}

export default function ArticleDetailClient({ article, relatedArticles = [] }) {
  const color = CAT_COLORS[article?.category] || '#0bc5ea';
  const date = article?.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  if (!article) {
    return (
      <div className="bg-[#080d12] min-h-screen" data-testid="article-not-found">
        <div className="max-w-3xl mx-auto px-6 pt-32 text-center">
          <p className="text-[#94a3b8] text-lg mb-4">Article not found</p>
          <Link href="/regulatory-insights" className="text-[#0bc5ea] hover:underline text-sm">← Back to Regulatory Insights</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#080d12] min-h-screen" data-testid="article-detail-page">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/regulatory-insights" className="inline-flex items-center gap-2 text-[#64748b] hover:text-white transition-colors text-sm">
            <ArrowLeft size={15} /> Back to Regulatory Insights
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ color, background: `${color}15` }}>{article.category}</span>
            {article.videoEmbed && <span className="flex items-center gap-1 text-xs text-[#f87171] bg-[#f87171]/10 px-2 py-1 rounded-full"><Youtube size={10} />Video</span>}
            {article.pdfUrl && <span className="flex items-center gap-1 text-xs text-[#94a3b8] bg-white/6 px-2 py-1 rounded-full"><Download size={10} />PDF</span>}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5" data-testid="article-title">
            {article.title}
          </h1>

          <p className="text-[#94a3b8] text-lg leading-relaxed mb-6 border-l-2 pl-5" style={{ borderColor: color }}>
            {article.excerpt}
          </p>

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {article.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-xs text-[#64748b] px-2.5 py-1 rounded-full bg-white/4 hover:bg-white/8 transition-colors">
                  <Tag size={9} />{tag}
                </span>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/8">
            <span className="text-[#64748b] text-sm">{date}</span>
            <a
              href="https://www.sanity.io/manage/personal/project/es4fl0a9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#0bc5ea] transition-colors"
            >
              <Edit3 size={12} /> Edit in Sanity
            </a>
          </div>
        </motion.div>

        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-2xl border border-white/8 p-5 mb-8 flex items-center gap-4"
          data-testid="author-card"
        >
          <img src={PROFILE_PHOTO} alt="Vamsi Reddy" className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-[#0bc5ea]/25 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-heading font-bold text-white text-base">Vamsi Reddy</p>
            <p className="text-[#0bc5ea] text-sm">Global Head of Product Development · Evon Medics LLC</p>
            <p className="text-[#64748b] text-xs mt-0.5">MSE Johns Hopkins · EB-1A Approved Scientist · 5+ US Patents</p>
          </div>
          {article.authors?.filter(a => a.name !== 'Vamsi Reddy').map((coAuthor, i) => (
            <div key={i} className="flex items-center gap-3 pl-4 border-l border-white/8">
              {coAuthor.photo
                ? <img src={coAuthor.photo} alt={coAuthor.name} className="w-10 h-10 rounded-xl object-cover" />
                : <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0bc5ea] to-[#7c3aed] flex items-center justify-center text-white font-bold text-sm">{(coAuthor.name && coAuthor.name[0]) || '?'}</div>
              }
              <div>
                <p className="text-white text-sm font-semibold">{coAuthor.name}</p>
                <p className="text-[#64748b] text-xs">{coAuthor.role}</p>
              </div>
            </div>
          ))}
          <a href="https://www.linkedin.com/in/reddy-vamsi" target="_blank" rel="noopener noreferrer" className="glass-card rounded-xl p-2 border border-white/8 hover:border-[#0bc5ea]/30 transition-colors ml-auto flex-shrink-0">
            <ExternalLink size={14} className="text-[#64748b]" />
          </a>
        </motion.div>

        {/* Hero Image */}
        {article.image_url && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="rounded-3xl overflow-hidden mb-10 aspect-[16/7]">
            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

        {/* YouTube Embed */}
        {article.videoEmbed && <YouTubeEmbed url={article.videoEmbed} />}

        {/* Content — Portable Text (Sanity) or legacy Markdown */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-10"
          data-testid="article-content"
        >
          <ArticleBody body={article.body} content={article.content} />
        </motion.article>

        {/* PDF Download */}
        {article.pdfUrl && (
          <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-outline-exec px-5 py-3 rounded-xl text-sm font-semibold mb-8">
            <Download size={14} /> Download PDF Report
          </a>
        )}

        {/* Sanity CTA */}
        <div className="glass-card rounded-2xl border border-[#0bc5ea]/15 p-6 text-center mb-10">
          <p className="text-[#0bc5ea] text-xs font-semibold uppercase tracking-widest mb-2">Sanity CMS</p>
          <p className="text-white font-heading font-semibold mb-1">Want to update this article?</p>
          <p className="text-[#64748b] text-sm mb-4">
            Editable in Sanity Studio. After Publish, updates appear within about a minute (or right away if a revalidation webhook is configured).
          </p>
          <a href="https://www.sanity.io/manage/personal/project/es4fl0a9" target="_blank" rel="noopener noreferrer" className="btn-exec px-5 py-2.5 rounded-xl font-semibold inline-flex items-center gap-2 text-sm">
            Edit in Sanity <ExternalLink size={12} />
          </a>
        </div>

        {/* Related Articles */}
        <div data-testid="related-articles">
          <h3 className="font-heading text-xl font-bold text-white mb-5">More Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(relatedArticles?.length ? relatedArticles : []).slice(0, 3).map((rel) => {
              const c = CAT_COLORS[rel.category] || '#0bc5ea';
              return (
                <Link key={rel.slug} href={`/regulatory-insights/${rel.slug}`} className="glass-card rounded-xl p-4 border border-white/8 hover:border-white/18 hover:-translate-y-0.5 transition-all group">
                  <span className="text-xs font-semibold" style={{ color: c }}>{rel.category}</span>
                  <p className="text-white text-sm font-medium mt-1 leading-snug group-hover:text-[#0bc5ea] transition-colors line-clamp-2">{rel.title}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
