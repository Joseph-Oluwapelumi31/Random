import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import { getSiteSettings } from '@/lib/sanity';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});
export const metadata = {
  title: 'Vamsi Reddy | VP Engineering · MedTech Executive · EB-1A Scientist',
  description: 'Global Head of Product Development at Evon Medics. EB-1A Extraordinary Ability. $12.5M+ NIH portfolio. 5+ US Patents. Johns Hopkins MSE.',
  keywords: 'VP Engineering Medical Device, CTO HealthTech Strategy, Translational Neurotechnology Leader, Biomedical Engineer, MedTech Executive',
  openGraph: {
    title: 'Vamsi Reddy | Global MedTech Innovation Hub',
    description: '$12.5M+ NIH-funded product portfolio. EB-1A Approved Scientist. Global Head of Product Development.',
    type: 'website',
    url: 'https://vamsi-biotech.preview.emergentagent.com',
    images: [{ url: 'https://customer-assets.emergentagent.com/job_vamsi-biotech/artifacts/01zj1rc6_IMG_0162.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Vamsi Reddy | MedTech Executive', description: 'EB-1A Approved · $12.5M+ NIH Portfolio · Global MedTech Leader' },
};

export default async function RootLayout({ children }) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const site = await getSiteSettings();
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Vamsi Reddy',
            jobTitle: 'Global Head of Product Development',
            worksFor: { '@type': 'Organization', name: 'Evon Medics LLC' },
            alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Johns Hopkins University' }],
            url: 'https://vamsi-biotech.preview.emergentagent.com',
            sameAs: ['https://www.linkedin.com/in/reddy-vamsi', 'https://orcid.org/0009-0006-6427-5005'],
            knowsAbout: ['Biomedical Engineering', 'Medical Devices', 'NIH Research', 'MedTech Strategy', 'Neurotechnology'],
          })}}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <ThemeProvider>
          {ga4Id && ga4Id !== 'G-PLACEHOLDER' && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
                strategy="afterInteractive"
              />
              <Script id="ga4" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${ga4Id}');
                `}
              </Script>
            </>
          )}

          <Navbar />
        
          <main>{children}</main>
          <Footer siteSettings={site} />
        </ThemeProvider>
      </body>
    </html>
  );
}
