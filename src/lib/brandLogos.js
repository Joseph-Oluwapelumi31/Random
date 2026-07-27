/**
 * Brand PNGs must live under `frontend/public/logos/` (URLs `/logos/*.png`).
 * Next.js does not serve `frontend/logos/` at the site root — only `public/` is static.
 */
export const BRAND_LOGO_URLS = {
  evon: '/logos/evon.png',
  johnsHopkins: '/logos/jhu.png',
  nitRourkela: '/logos/nitr.png',
};

/** Hero affiliation strip — fixed height so PNGs read as crisp icons */
export const HERO_BRAND_LOGOS = [
  {
    alt: 'Evon Medics',
    src: BRAND_LOGO_URLS.evon,
    className:
      'block h-8 w-auto max-h-8 max-w-[min(9.5rem,32vw)] object-contain object-left shrink-0 select-none bg-transparent',
  },
  {
    alt: 'Johns Hopkins University',
    src: BRAND_LOGO_URLS.johnsHopkins,
    className:
      'block h-8 w-auto max-h-8 max-w-[min(11rem,36vw)] object-contain object-center shrink-0 select-none bg-transparent',
  },
  {
    alt: 'NIT Rourkela',
    src: BRAND_LOGO_URLS.nitRourkela,
    className:
      'block h-8 w-auto max-h-8 max-w-[min(10rem,38vw)] object-contain object-center shrink-0 select-none bg-transparent',
  },
];
