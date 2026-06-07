# Thai Kech — Architecture & Structure Technique
*Architecture Next.js (App Router), Tailwind CSS & Base de Données Supabase*

Ce document détaille la structure technique, le routage Next.js, le parcours du formulaire de réservation et le schéma de la base de données Supabase.

---

## 1. Routage Next.js (App Router)

L'application est construite avec le framework **Next.js (App Router)** pour assurer une vitesse de chargement optimale (Server Components) et un parcours fluide.

*   **Page d'Accueil (`/`) :** Landing page de présentation. Sections : Hero, Services (Menu), Concept, Zone de service, Avis & FAQs.
*   **Page de Réservation (`/book`) :** Formulaire de réservation interactif par étapes (Wizard), sans distraction (pas d'en-tête/pied de page complexes).
*   **Page de Succès (`/book/success`) :** Écran de confirmation indiquant que la demande a été enregistrée et que le client sera recontacté sous peu. Comprend un bouton d'ouverture directe de WhatsApp pour confirmation immédiate.
*   **API de Réservation (`/app/api/bookings/route.ts`) :** Endpoint pour insérer la réservation dans Supabase et envoyer une notification e-mail.

---

## 2. Éléments de Navigation & Bars

*   **En-tête de Navigation (Navbar) :**
    *   *Sur Desktop :* Logo Thai Kech (à gauche), liens d'ancrage (Services, Concept, Témoignages) au centre, bouton doré "Réserver" (à droite).
    *   *Sur Mobile :* Logo à gauche, bouton hamburger ouvrant un menu latéral minimaliste, et bouton de raccourci de réservation.
    *   *Comportement :* Fond transparent sur l'image Hero, transition vers un arrière-plan Vert Bambou Sombre semi-transparent flouté (`backdrop-filter: blur(12px)`) lors du défilement.
*   **Barre de Réservation Mobile Collante (Sticky Bottom Bar) :**
    *   S'affiche uniquement sur mobile lorsque l'utilisateur fait défiler l'écran au-delà de la section Hero.
    *   Affiche un bouton simple et visible : "Réserver mon massage (2 min)" qui redirige vers `/book`.
*   **Pied de page (Footer) :**
    *   Vert Bambou Sombre (`#2C4C3B`) avec logo, mentions de contact (téléphone, e-mail), zone de couverture et liens légaux.

---

## 3. Tunnel de Réservation Multi-Étapes (`/book`)

Le formulaire est conçu pour être simple et sans friction pour un utilisateur mobile :

*   **Étape 1 : Sélection du Service**
    *   Affichage sous forme de cartes claires.
    *   L'utilisateur choisit le service (ex: "Massage Thaï Traditionnel" à 450 MAD). Le service est pré-sélectionné si le client a cliqué depuis la page d'accueil.
*   **Étape 2 : Coordonnées Clients**
    *   Saisie du nom complet.
    *   Téléphone (WhatsApp de préférence, avec indicatif pays).
    *   E-mail de contact (pour la confirmation et le suivi).
    *   *Champ optionnel :* Nom du riad/hôtel et numéro de chambre.
*   **Étape 3 : Date & Heure**
    *   Calendrier interactif pour sélectionner le jour (les jours passés sont désactivés).
    *   Grille d'heures de disponibilité (le service étant disponible 24h/7, les créneaux couvrent toute la journée par intervalles de 30 minutes).
*   **Étape 4 : Soumission automatique vers Supabase**
    *   Lors du clic sur "Confirmer la réservation", les données sont envoyées à l'API Next.js qui les insère dans Supabase.
    *   En cas de succès, redirection instantanée vers `/book/success`.
*   **Étape 5 : Écran de Confirmation (`/book/success`)**
    *   Visuel de succès avec rappel du numéro de téléphone et de l'e-mail saisis.
    *   Message : *"Merci, votre demande de réservation a été enregistrée avec succès ! Nous vous contacterons sur [E-mail/Téléphone] très rapidement pour confirmer l'arrivée de votre thérapeute."*
    *   Bouton d'action principal : "Confirmer immédiatement via WhatsApp" (ouvre une discussion WhatsApp avec le message pré-rempli contenant les détails de la réservation).

---

## 4. Schéma de la Base de Données (Supabase SQL DDL)

Pour stocker les réservations et le catalogue de services de manière dynamique, nous utilisons le schéma SQL suivant :

```sql
-- 1. Table des Services (pour stocker le catalogue de massages)
CREATE TABLE public.services (
    id TEXT PRIMARY KEY, -- ex: 'massage-thai', 'massage-huiles'
    name TEXT NOT NULL,
    price NUMERIC NOT NULL, -- Prix en MAD
    description TEXT NOT NULL,
    image_path TEXT NOT NULL, -- Chemin de l'image
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insérer les 4 services de démonstration
INSERT INTO public.services (id, name, price, description, image_path) VALUES
('massage-thai', 'Massage Thaï Traditionnel (Nuad Boran)', 450, 'Massage thaïlandais ancestral effectué au sol sur futon. Étirements dynamiques et pressions ciblées pour libérer les tensions.', '/assets/massage-thai.webp'),
('massage-huiles', 'Massage Aromatique aux Huiles Précieuses', 500, 'Soin relaxant combinant les techniques de pétrissage thaïlandaises et les bienfaits de l''huile d''argan bio marocaine.', '/assets/massage-huiles.webp'),
('massage-signature', 'Rituel Signature du Riad', 600, 'Notre soin d''exception. Massage complet du corps aux huiles chaudes de fleur d''oranger, accompagné d''une réflexologie crânienne.', '/assets/massage-signature.webp'),
('massage-dos-tete', 'Massage Relaxant Dos & Tête (Express)', 350, 'Un massage concentré sur le haut du corps pour évacuer le stress accumulé. Soulage les tensions de la nuque, des épaules et du crâne.', '/assets/massage-dos-tete.webp')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description, image_path = EXCLUDED.image_path;

-- 2. Table des Réservations
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id TEXT REFERENCES public.services(id),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    riad_name TEXT,
    room_number TEXT,
    status TEXT DEFAULT 'pending'::text NOT NULL, -- 'pending', 'confirmed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activer les politiques de sécurité (RLS) sur Supabase
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Politique pour lire les services (publique)
CREATE POLICY "Allow public read services" ON public.services 
    FOR SELECT USING (is_active = true);

-- Politique pour insérer des réservations (publique)
CREATE POLICY "Allow public insert bookings" ON public.bookings 
    FOR INSERT WITH CHECK (true);

-- Politique pour lire ses propres réservations (basé sur l'email ou authentification admin si besoin)
CREATE POLICY "Allow admin read bookings" ON public.bookings 
    FOR SELECT USING (true); -- Note : à restreindre en production avec un rôle admin ou clé secrète
```
