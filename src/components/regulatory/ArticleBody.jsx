'use client';

import React from 'react';
import { PortableText } from '@portabletext/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { urlForImagePublic } from '@/lib/sanityImagePublic';

function ptImageUrl(value) {
  if (!value?.asset) return null;
  try {
    return urlForImagePublic(value).width(1200).fit('max').auto('format').url();
  } catch {
    return null;
  }
}

/** Keep only Portable Text blocks we know how to render (bad edits shouldn’t crash the page). */
function normalizePortableBody(body) {
  if (!Array.isArray(body) || body.length === 0) return null;
  const allowed = new Set(['block', 'image']);
  const cleaned = body.filter((b) => b && typeof b === 'object' && allowed.has(b._type));
  return cleaned.length > 0 ? cleaned : null;
}

const portableComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3 scroll-mt-24">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-[3px] border-primary pl-4 my-6 text-muted-foreground italic leading-relaxed">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-muted-foreground space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
    em: ({ children }) => <em className="text-muted-foreground">{children}</em>,
    underline: ({ children }) => <span className="underline decoration-primary/60">{children}</span>,
    code: ({ children }) => (
      <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-[0.88em]">{children}</code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          className="text-primary hover:underline font-medium"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = ptImageUrl(value);
      if (!src) return null;
      return (
        <figure className="my-8 rounded-2xl overflow-hidden border border-border/10 bg-card/50">
          <img src={src} alt={value?.alt || ''} className="w-full h-auto object-cover max-h-[28rem]" loading="lazy" />
          {value?.caption ? (
            <figcaption className="text-center text-muted-foreground text-sm px-4 py-3">{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

class PortableTextBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      const md = typeof this.props.markdown === 'string' ? this.props.markdown : '';
      return (
        <div className="prose-exec">
          <p className="text-muted-foreground text-sm mb-4">
            Rich text could not be rendered safely; showing Markdown / plain fallback below.
          </p>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Renders Sanity Portable Text when `body` has valid blocks; otherwise legacy Markdown from `content`.
 */
export default function ArticleBody({ body, content }) {
  const normalized = normalizePortableBody(body);
  const md = typeof content === 'string' ? content : '';

  if (normalized) {
    return (
      <div className="prose-exec article-pt">
        <PortableTextBoundary key={normalized.map((b) => b._key || b._type).join('|')} markdown={md}>
          <PortableText
            value={normalized}
            components={portableComponents}
            onMissingComponent={false}
          />
        </PortableTextBoundary>
      </div>
    );
  }

  return (
    <div className="prose-exec">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </div>
  );
}
