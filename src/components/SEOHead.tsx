import React, { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  articleType?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Madagascar Ernest Travel Tours | Untamed Luxury Private Safaris & Expeditions",
  description = "Official certified Malagasy tour operator specializing in bespoke private 4x4 overland safaris, Tsiribihina river expeditions, Grand Tsingy limestone treks, and Sainte-Marie Island retreats. Based in Antsirabe.",
  canonicalUrl = "https://madagascar-ernest-tours.com/",
  ogImage = "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
}) => {
  useEffect(() => {
    // Update Document Title
    document.title = title;

    // Helper to update or create meta tags
    const updateMeta = (nameAttr: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    updateMeta('name', 'description', description);
    updateMeta('name', 'keywords', 'Madagascar luxury travel, private 4x4 safaris Madagascar, Grand Tsingy tour, Avenue of Baobabs sunset, Tsiribihina river cruise, Antsirabe tour operator, Ernest tours Madagascar, lemur safari Ranomafana, Sainte-Marie whale watching, bespoke Madagascar itinerary');
    updateMeta('name', 'author', 'Madagascar Ernest Travel Tours');
    updateMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Localized GEO targeting tags for Madagascar Tourism
    // Primary Antsirabe Headquarters & Key Tourist Hubs
    updateMeta('name', 'geo.region', 'MG-T'); // Madagascar - Antananarivo/Vakinankaratra province
    updateMeta('name', 'geo.placename', 'Antsirabe, Vakinankaratra, Madagascar');
    updateMeta('name', 'geo.position', '-19.8659;47.0333');
    updateMeta('name', 'ICBM', '-19.8659, 47.0333');

    // OpenGraph Tags
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:type', 'website');
    updateMeta('property', 'og:url', canonicalUrl);
    updateMeta('property', 'og:image', ogImage);
    updateMeta('property', 'og:site_name', siteConfig.companyName);
    updateMeta('property', 'og:locale', 'en_US');

    // Twitter Card Tags
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', title);
    updateMeta('name', 'twitter:description', description);
    updateMeta('name', 'twitter:image', ogImage);

    // Schema.org JSON-LD Structured Data for TravelAgency and TouristAttraction
    const jsonLdId = 'structured-data-travel-agency';
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TravelAgency",
          "@id": "https://madagascar-ernest-tours.com/#travelagency",
          "name": siteConfig.companyName,
          "alternateName": ["Ernest Tours Madagascar", "Madagascar Ernest Private Safaris"],
          "url": "https://madagascar-ernest-tours.com",
          "logo": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80",
          "image": ogImage,
          "description": description,
          "telephone": siteConfig.contacts.phonePrimary,
          "email": siteConfig.contacts.email,
          "priceRange": "€€€€",
          "founder": {
            "@type": "Person",
            "name": "Ernest Soa",
            "jobTitle": "Head Expedition Director & Certified Tour Specialist"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "lot 20 B 205 Miaramasoandro Vatofotsy",
            "addressLocality": "Antsirabe",
            "addressRegion": "Vakinankaratra",
            "addressCountry": "MG"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -19.8659,
            "longitude": 47.0333
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          },
          "sameAs": [
            siteConfig.socialLinks.facebook,
            siteConfig.socialLinks.instagram,
            siteConfig.socialLinks.tripadvisor
          ],
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Antananarivo" },
            { "@type": "AdministrativeArea", "name": "Antsirabe" },
            { "@type": "AdministrativeArea", "name": "Morondava" },
            { "@type": "AdministrativeArea", "name": "Bekopaka (Tsingy de Bemaraha)" },
            { "@type": "AdministrativeArea", "name": "Ranomafana National Park" },
            { "@type": "AdministrativeArea", "name": "Isalo National Park" },
            { "@type": "AdministrativeArea", "name": "Île Sainte-Marie" },
            { "@type": "AdministrativeArea", "name": "Andasibe-Mantadia" }
          ]
        },
        {
          "@type": "TouristAttraction",
          "@id": "https://madagascar-ernest-tours.com/#tsingy",
          "name": "Tsingy de Bemaraha Strict Nature Reserve",
          "description": "UNESCO World Heritage karst limestone pinnacles, suspension bridges, and subterranean caverns explored via private guided expedition with Ernest Tours.",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -18.6667,
            "longitude": 44.7500
          },
          "isAccessibleForFree": false,
          "publicAccess": true
        },
        {
          "@type": "TouristAttraction",
          "@id": "https://madagascar-ernest-tours.com/#baobabs",
          "name": "Allée des Baobabs (Avenue of the Baobabs)",
          "description": "Legendary avenue of 800-year-old Adansonia grandidieri trees in Menabe region, featured on private sunset toasts with Ernest Tours.",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -20.2508,
            "longitude": 44.4184
          },
          "publicAccess": true
        },
        {
          "@type": "TouristAttraction",
          "@id": "https://madagascar-ernest-tours.com/#isalo",
          "name": "Isalo National Park",
          "description": "Jurassic sandstone canyon formations, natural oasis swimming pools, and ring-tailed lemurs explored with private naturalist guides.",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -22.5833,
            "longitude": 45.3333
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://madagascar-ernest-tours.com/#faqs",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the best time of year to visit Madagascar?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "April to November offers dry, crisp weather ideal for Grand Tsingy karst, Avenue of the Baobabs, and RN7 canyons. July to September is peak season for humpback whale migrations around Sainte-Marie Island."
              }
            },
            {
              "@type": "Question",
              "name": "Are your tours 100% private and customizable?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, 100% of our expeditions are private. You will never share your vehicle or guides with strangers. You decide daily departure times, photo stop durations, and hotel preferences."
              }
            },
            {
              "@type": "Question",
              "name": "What vehicles and drivers do you provide?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We operate high-clearance Toyota Land Cruiser Prado and V8 4x4s equipped with air conditioning, all-terrain tires, dual spare wheels, and satellite communication. Our drivers have 10-15+ years of bush experience."
              }
            }
          ]
        }
      ]
    };

    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, canonicalUrl, ogImage]);

  return null;
};
