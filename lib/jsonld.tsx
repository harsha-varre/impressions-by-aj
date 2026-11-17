import { site } from "./site";
import { categories, type Category } from "./categories";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    sameAs: [site.instagramUrl],
    areaServed: {
      "@type": "State",
      name: site.serviceArea,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    makesOffer: categories.map((c) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${c.title} photography`,
        areaServed: site.serviceArea,
      },
    })),
  };
}

export function categoryServiceJsonLd(category: Category) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${category.title} photography`,
    description: category.description,
    serviceType: category.title,
    areaServed: {
      "@type": "State",
      name: site.serviceArea,
    },
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
    },
    url: `${site.url}/categories/${category.slug}`,
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
