'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Youtube, Download, ExternalLink, Edit3 } from 'lucide-react';
import ArticleBody from '@/components/regulatory/ArticleBody';

const PROFILE_PHOTO = 'https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg';

function YouTubeEmbed({ url }) {
  const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  const id = match?.[1];
  if (!id) return null;
  return (
    <div className="rounded-2xl overflow-hidden border border-border/15 my-8">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/15">
        <Youtube size={15} className="text-destructive" />
        <span className="text-foreground text-sm font-semibold">Watch on YouTube</span>
      </div>
      <div className="aspect-video">
        <iframe src={`https://www.youtube.com/embed/${id}`} title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
      </div>
    </div>
  );
}

export default function ArticleDetailClient({ article, relatedArticles = [] }) {
  const date = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-32 text-center">
          <p className="text-muted-foreground text-lg mb-4">Article not found</p>
          <Link href="/regulatory-insights" className="text-primary hover:underline text-sm">
            ← Back to Regulatory Insights
          </Link>
        </div>
      </div>
    );
  }

  const hasVideo = Boolean(article.videoEmbed);
  const hasPdf = Boolean(article.pdfUrl);
  const readingTime = '8 min read';

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_35%)]" />
      <div className="pointer-events-none absolute right-0 top-28 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-10">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start"
        >
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Link href="/regulatory-insights" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <ArrowLeft size={16} /> Back to Insights
              </Link>
              <span className="h-4 w-px bg-border" />
              <span>{date}</span>
              <span className="h-4 w-px bg-border" />
              <span>{readingTime}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                {article.category}
              </span>
              {hasVideo && (
                <span className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Video Available
                </span>
              )}
              {hasPdf && (
                <span className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  PDF Available
                </span>
              )}
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.98] text-foreground">
                {article.title}
              </h1>
              <p className="text-2xl leading-10 text-muted-foreground max-w-2xl">{article.excerpt}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {article.tags?.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/regulatory-insights" className="btn-exec rounded-3xl px-6 py-3 text-sm font-semibold">
                View all insights
              </Link>
              {hasPdf && (
                <Link href={article.pdfUrl} target="_blank" className="btn-outline-exec rounded-3xl px-6 py-3 text-sm font-semibold" rel="noreferrer">
                  Download PDF
                </Link>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute right-0 top-20 h-44 w-44 rounded-full bg-muted/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg shadow-primary/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              {article.image_url ? (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="h-[520px] w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-[520px] items-center justify-center bg-background text-muted-foreground">
                  No featured image
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 mx-6 mb-6 rounded-[2rem] border border-border bg-background/90 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Featured insight</p>
                <p className="mt-3 text-xl font-semibold text-foreground">Regulatory research and strategic analysis for leadership teams.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.75 }}
          className="mt-16 rounded-[2rem] border border-border bg-card p-8 shadow-lg shadow-primary/5"
        >
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Category', value: article.category },
              { label: 'Published', value: date },
              { label: 'Reading time', value: readingTime },
              { label: 'Tags', value: article.tags?.join(' • ') || 'None' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-border bg-background/80 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{item.label}</p>
                <p className="mt-3 text-sm font-semibold text-foreground leading-tight">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] items-start">
          <main className="space-y-10">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.75 }}
              className="rounded-[2rem] border border-border bg-card p-8 shadow-lg shadow-primary/5"
            >
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-primary">Author</p>
                  <h2 className="text-3xl font-semibold text-foreground">Executive research lead</h2>
                  <p className="text-base leading-8 text-muted-foreground">Deep expertise in regulatory strategy, medical device innovation, and NIH-backed product development.</p>
                </div>
                <div className="grid gap-4 rounded-[2rem] border border-border bg-background/80 p-6 shadow-sm">
                  <img src={PROFILE_PHOTO} alt="Vamsi Reddy" className="h-32 w-32 rounded-3xl object-cover border border-border" />
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-foreground">Vamsi Reddy</p>
                    <p className="text-sm uppercase tracking-[0.28em] text-primary">Global Head of Product Development</p>
                    <p className="text-sm text-muted-foreground">MSE Johns Hopkins · Inventor · FDA Product Development · Medical Device Innovation</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <span className="rounded-3xl border border-border bg-card p-4 text-sm text-muted-foreground">LinkedIn ready</span>
                    <span className="rounded-3xl border border-border bg-card p-4 text-sm text-muted-foreground">Regulatory insight</span>
                  </div>
                </div>
              </div>
            </motion.section>

            <section id="article" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.75 }}
                className="rounded-[2rem] border border-border bg-background p-8 shadow-lg shadow-primary/5"
              >
                <ArticleBody body={article.body} content={article.content} />
              </motion.div>
            </section>

            {hasVideo && (
              <motion.section
                id="video"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.75 }}
                className="rounded-[2rem] border border-border bg-card p-8 shadow-lg shadow-primary/5"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-primary">Media</p>
                    <h2 className="mt-3 text-3xl font-semibold text-foreground">Watch the research briefing</h2>
                  </div>
                  <span className="rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    Video
                  </span>
                </div>
                <div className="mt-8 rounded-[2rem] border border-border bg-background p-5 shadow-sm">
                  <YouTubeEmbed url={article.videoEmbed} />
                </div>
              </motion.section>
            )}

            <motion.section
              id="resources"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.75 }}
              className="rounded-[2rem] border border-border bg-card p-8 shadow-lg shadow-primary/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-primary">Resources</p>
                  <h2 className="mt-3 text-3xl font-semibold text-foreground">Supporting documents</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {hasPdf && (
                    <a href={article.pdfUrl} target="_blank" rel="noreferrer" className="btn-outline-exec rounded-3xl px-5 py-3 text-sm font-semibold inline-flex items-center gap-2">
                      <Download size={16} /> Download PDF
                    </a>
                  )}
                  <a href="https://www.sanity.io/manage/personal/project/es4fl0a9" target="_blank" rel="noreferrer" className="btn-exec rounded-3xl px-5 py-3 text-sm font-semibold inline-flex items-center gap-2">
                    <Edit3 size={16} /> Edit in Sanity
                  </a>
                </div>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {hasPdf && (
                  <div className="rounded-[2rem] border border-border bg-background p-6 shadow-sm">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                      <Download size={18} />
                    </div>
                    <p className="mt-4 text-base font-semibold text-foreground">Article PDF</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Download supporting material for offline review and compliance documents.</p>
                  </div>
                )}
                <div className="rounded-[2rem] border border-border bg-background p-6 shadow-sm">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <ExternalLink size={18} />
                  </div>
                  <p className="mt-4 text-base font-semibold text-foreground">Edit in CMS</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Open the article in Sanity to make updates, add assets, or refine the story.</p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.75 }}
              className="rounded-[2rem] border border-primary/20 bg-card p-10 shadow-lg shadow-primary/10"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Pull quote</p>
              <blockquote className="mt-6 text-3xl font-semibold leading-tight text-foreground">“{article.excerpt}”</blockquote>
            </motion.section>
          </main>

          <aside className="sticky top-28 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.75 }}
              className="rounded-[2rem] border border-border bg-card p-6 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Reading progress</p>
              <div className="mt-6 space-y-3">
                {['Hero', 'Author', 'Article', hasVideo ? 'Video' : null, 'Resources', 'Related']
                  .filter(Boolean)
                  .map((item) => (
                    <div key={item} className="rounded-3xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground">
                      {item}
                    </div>
                  ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.75 }}
              className="rounded-[2rem] border border-border bg-card p-6 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Quick navigation</p>
              <div className="mt-6 space-y-3 text-sm text-foreground">
                <Link href="#article" className="block rounded-3xl border border-border bg-background/80 px-4 py-3 transition hover:border-primary/20">
                  Article body
                </Link>
                {hasVideo && (
                  <Link href="#video" className="block rounded-3xl border border-border bg-background/80 px-4 py-3 transition hover:border-primary/20">
                    Video section
                  </Link>
                )}
                <Link href="#resources" className="block rounded-3xl border border-border bg-background/80 px-4 py-3 transition hover:border-primary/20">
                  Resources
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.75 }}
              className="rounded-[2rem] border border-border bg-card p-6 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Share</p>
              <div className="mt-6 grid gap-3">
                <button type="button" className="rounded-3xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground">
                  Copy link
                </button>
                <button type="button" className="rounded-3xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground">
                  Bookmark
                </button>
              </div>
            </motion.div>
          </aside>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.75 }}
          className="mt-20"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Related articles</p>
              <h2 className="mt-3 text-4xl font-semibold text-foreground">Continue your regulatory reading.</h2>
            </div>
            <span className="text-sm text-muted-foreground">Premium insights</span>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {relatedArticles.slice(0, 3).map((rel) => (
              <Link
                key={rel.slug}
                href={`/regulatory-insights/${rel.slug}`}
                className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/20 to-transparent" />
                <div className="relative z-10 space-y-5">
                  <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                    {rel.category}
                  </span>
                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">{rel.readingTime || '8 min read'}</p>
                    <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">{rel.title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">{rel.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    Read article
                    <ArrowLeft size={14} className="rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
