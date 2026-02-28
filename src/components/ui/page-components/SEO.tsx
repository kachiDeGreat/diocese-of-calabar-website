import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
}

export default function SEO({ title, description }: SEOProps) {
  const siteName = "Diocese of Calabar";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}

      <meta property="twitter:title" content={fullTitle} />
      {description && <meta property="twitter:description" content={description} />}
    </Helmet>
  );
}