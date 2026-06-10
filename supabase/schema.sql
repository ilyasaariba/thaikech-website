-- 1. Table des Services (pour stocker le catalogue de massages)
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY, -- ex: 'massage-thai', 'massage-huiles'
    name TEXT NOT NULL,
    price NUMERIC NOT NULL, -- Prix en MAD
    description TEXT NOT NULL,
    image_path TEXT NOT NULL, -- Chemin de l'image
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activer la RLS sur la table services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Supprimer la politique existante si elle existe et la recréer
DROP POLICY IF EXISTS "Allow public read services" ON public.services;
CREATE POLICY "Allow public read services" ON public.services 
    FOR SELECT USING (is_active = true);

-- Insérer les 4 services de démonstration
INSERT INTO public.services (id, name, price, description, image_path) VALUES
('massage-thai', 'Massage Thaï Traditionnel (Nuad Boran)', 450, 'Massage thaïlandais ancestral effectué au sol sur futon. Étirements dynamiques et pressions ciblées pour libérer les tensions musculaires et rééquilibrer l''énergie.', '/assets/massage-thai.webp'),
('massage-huiles', 'Massage Aromatique aux Huiles Précieuses', 500, 'Soin relaxant combinant les techniques de pétrissage thaïlandaises et les bienfaits de l''huile d''argan bio marocaine. Idéal pour décompresser.', '/assets/massage-huiles.webp'),
('massage-signature', 'Rituel Signature du Riad', 600, 'Notre soin d''exception. Un massage complet du corps aux huiles chaudes de fleur d''oranger, accompagné d''une réflexologie crânienne pour une relaxation profonde.', '/assets/massage-signature.webp'),
('massage-dos-tete', 'Massage Relaxant Dos & Tête (Express)', 350, 'Un massage concentré sur le haut du corps pour évacuer le stress accumulé. Idéal pour soulager les tensions de la nuque, des épaules et du cuir chevelu.', '/assets/massage-dos-tete.webp')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, 
    price = EXCLUDED.price, 
    description = EXCLUDED.description, 
    image_path = EXCLUDED.image_path;

-- 2. Table des Réservations
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id TEXT REFERENCES public.services(id),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    number_of_clients INTEGER NOT NULL DEFAULT 1,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    riad_name TEXT,
    room_number TEXT,
    status TEXT DEFAULT 'pending'::text NOT NULL, -- 'pending', 'confirmed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activer la RLS sur la table bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes si elles existent et les recréer
DROP POLICY IF EXISTS "Allow public insert bookings" ON public.bookings;
CREATE POLICY "Allow public insert bookings" ON public.bookings 
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin read bookings" ON public.bookings;
CREATE POLICY "Allow admin read bookings" ON public.bookings 
    FOR SELECT USING (true); -- Note : à restreindre ou filtrer si nécessaire
