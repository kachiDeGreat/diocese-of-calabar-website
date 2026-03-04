import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  image?: string; // <-- This is the new prop that accepts your pictures!
  url?: string;
}

export default function SEO({ title, description, image, url }: SEOProps) {
  const siteName = "Diocese of Calabar";
  const fullTitle = `${title} | ${siteName}`;

  const defaultImage = "https://dropimg.onyekachi.dev/hpfnhz8bd605x50szxot";

  const finalImage = image || defaultImage;

  // Build the full URL
  const siteUrl = "https://www.anglicandioceseofcalabar.org";
  const finalUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Standard HTML Tags */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      {/* Facebook / WhatsApp / LinkedIn (Open Graph) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={finalImage} />

      {/* X / Twitter Tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      {description && (
        <meta property="twitter:description" content={description} />
      )}
      <meta property="twitter:image" content={finalImage} />
    </Helmet>
  );
}
