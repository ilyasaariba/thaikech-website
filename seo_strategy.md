# Thai Kech — Stratégie SEO & Référencement Naturel
*Dominer les recherches de Spa & Bien-être en français à Marrakech*

Ce document détaille la stratégie d'acquisition de trafic organique pour la plateforme **Thai Kech**, ciblée spécifiquement sur les touristes francophones.

---

## 1. Mots-Clés Principaux en Français

Puisque le site s'adresse uniquement aux touristes de langue française, nous ciblons des mots-clés à fort taux d'intention d'achat, liés à la commodité des soins à domicile/riad :

| Mot-Clé | Intention de Recherche | Cible sur la Page | Niveau de Compétence |
| :--- | :--- | :--- | :--- |
| `massage a domicile marrakech` | Urgent / Réservation prête | Page d'accueil / Hero | Moyen |
| `massage riad marrakech` | Touristique / Confort | Section Présentation / Riad | Faible |
| `spa mobile marrakech` | Bien-être à la demande | Page d'accueil | Faible |
| `massage couple marrakech` | Réservation haute valeur (Duo) | Section Cartes Services | Moyen |
| `meilleur massage marrakech` | Recherche de qualité de service | Témoignages & Avis | Élevé |

---

## 2. Optimisation du Profil Local (Google Business Profile)

Puisque nous offrons un service mobile sans vitrine physique ouverte au public, nous optimisons notre fiche pour la zone de service :
*   **Définition de la Zone :** Déclarer Marrakech, la Palmeraie, la zone de l'Agdal, la Route de l'Ourika et les communes limitrophes (Targa, Chrifia).
*   **Horaires d'Ouverture :** Afficher clairement **24h/7** pour capter les réservations tardives ou matinales.
*   **Mots-clés dans les avis :** Inciter les clients à mentionner *"massage à domicile à Marrakech"* ou *"massage dans notre riad"* dans leurs avis Google 5 étoiles.

---

## 3. Données Structurées JSON-LD (Schema Markup)

Nous injectons le code suivant dans le fichier HTML de Next.js pour aider les moteurs de recherche à comprendre notre activité locale :

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Thai Kech Mobile Spa Marrakech",
  "image": "https://thaikech.com/assets/hero-riad.webp",
  "priceRange": "$$",
  "telephone": "+212771610656",
  "email": "iliassaariba01@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Marrakech",
    "addressCountry": "MA"
  },
  "geo": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "31.6295",
      "longitude": "-7.9811"
    },
    "geoRadius": "40000"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "areaServed": [
    "Marrakech Medina",
    "Gueliz",
    "Palmeraie",
    "Hivernage",
    "Sidi Abdallah Ghiat",
    "Route de l'Ourika"
  ]
}
```

---

## 4. Optimisation de la Vitesse sur Mobile (Core Web Vitals)

Puisque la majorité des réservations se font sur smartphone (souvent sur des connexions 4G locales ou le Wi-Fi des riads) :
*   **Format d'image moderne :** Toutes les images de services et de hero seront encodées en format `.webp` compressé avec des attributs de largeur/hauteur fixes pour éviter les décalages de mise en page (CLS).
*   **Next.js SSR/SSG :** La page d'accueil sera pré-rendue statiquement pour charger en moins de 1,5 seconde.
