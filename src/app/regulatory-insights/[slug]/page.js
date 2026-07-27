import {
  getFDAReport,
  getFDAReports,
  getFDAReportSlugsFromSanity,
} from '@/lib/sanity';
import STATIC_ARTICLES from '@/lib/staticArticles';
import ArticleDetailClient from '@/components/regulatory/ArticleDetailClient';

export const revalidate = 60;

export async function generateStaticParams() {
  const fromSanity = await getFDAReportSlugsFromSanity();
  const slugs = new Set([
    ...STATIC_ARTICLES.map((a) => a.slug),
    ...fromSanity,
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

async function getArticle(slug) {
  try {
    const sanityArticle = await getFDAReport(slug);
    if (sanityArticle?.title) return sanityArticle;
  } catch {}

  const staticArticle = STATIC_ARTICLES.find((a) => a.slug === slug || a._id === slug);
  if (staticArticle) return staticArticle;

  const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '').trim();
  if (backendUrl && /^https?:\/\//i.test(backendUrl)) {
    try {
      const base = backendUrl.replace(/\/$/, '');
      const res = await fetch(`${base}/api/articles/${slug}`, { next: { revalidate: 60 } });
      if (res.ok) {
        const article = await res.json();
        return { ...article, _id: article.id, slug: article.id };
      }
    } catch {}
  }

  return null;
}

async function getRelatedForSlug(slug) {
  try {
    const all = await getFDAReports();
    const fromSanity = all
      .filter((a) => a.slug && a.slug !== slug)
      .slice(0, 3)
      .map((a) => ({ slug: a.slug, title: a.title, category: a.category }));
    if (fromSanity.length) return fromSanity;
  } catch {}
  return STATIC_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3).map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | Vamsi Reddy`,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: 'article' },
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const [article, relatedArticles] = await Promise.all([
    getArticle(slug),
    getRelatedForSlug(slug),
  ]);
  return <ArticleDetailClient article={article} relatedArticles={relatedArticles} />;
}
