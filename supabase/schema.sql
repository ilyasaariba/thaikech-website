-- 1. Table des Services (pour stocker le catalogue de massages et hammams)
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY, -- ex: 'massage-berbere', 'hammam-royal'
    name TEXT NOT NULL,
    price NUMERIC NOT NULL, -- Prix en MAD
    description TEXT NOT NULL,
    image_path TEXT NOT NULL, -- Chemin de l'image
    duration TEXT, -- ex: '1H', '1H15'
    category TEXT DEFAULT 'massage', -- 'massage' ou 'hammam'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activer la RLS sur la table services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Supprimer la politique existante si elle existe et la recréer
DROP POLICY IF EXISTS "Allow public read services" ON public.services;
CREATE POLICY "Allow public read services" ON public.services 
    FOR SELECT USING (is_active = true);

-- Insérer les 7 nouveaux services de démonstration (massages et hammams)
INSERT INTO public.services (id, name, price, description, image_path, duration, category) VALUES
-- Massages
('massage-berbere', 'Massage Berbère Traditionnel', 450, 'Une immersion sensorielle authentique à l''huile d''argan marocaine bio. Ce soin ancestral combine pressions glissées et étirements doux pour harmoniser le corps et libérer l''esprit.', '/assets/massage-berbere.png', '1H', 'massage'),
('massage-thai', 'Massage Thaï Impérial & Serviettes Chaudes', 550, 'Un protocole thermique exclusif combinant pressions ciblées et étirements inspirés du Nuad Boran. L''application de serviettes chaudes favorise une relaxation musculaire absolue et dénoue les tensions en profondeur.', '/assets/massage-thai-luxe.png', '1H15', 'massage'),
('massage-sportif', 'Massage Sportif Récupération', 500, 'Un soin profond et tonique ciblant les tensions musculaires accumulées. Idéal pour drainer les toxines, restaurer la souplesse musculaire et revitaliser le corps après l''effort.', '/assets/massage-sportif.png', '1H', 'massage'),
('massage-future-maman', 'Massage Douceur Future Maman', 550, 'Un massage enveloppant et sécurisant adapté aux femmes enceintes. Des mouvements fluides à l''huile d''argan neutre pour soulager les tensions lombaires et offrir un pur moment de sérénité.', '/assets/massage-future-maman.png', '1H30', 'massage'),
('massage-4-mains', 'Massage Royal à 4 Mains', 650, 'Une chorégraphie de relaxation ultime orchestrée par deux thérapeutes en parfaite synergie. Des mouvements synchronisés pour induire un lâcher-prise total et immédiat.', '/assets/massage-4-mains.png', '1H15', 'massage'),
-- Hammams
('hammam-berbere', 'Hammam Berbère Traditionnel', 550, 'Rituel de purification marocain à domicile : application de savon noir à l''eucalyptus, gommage vigoureux au gant de kessa, enveloppement détoxifiant au rassoul de l''Atlas et modelage relaxant du corps de 20 minutes à l''huile d''argan.', '/assets/hammam-berbere.png', '1H15', 'hammam'),
('hammam-royal', 'Hammam Royal Éclat & Fleur d''Oranger', 650, 'Le summum de la purification. Gommage au savon noir, soin exfoliant aux cristaux de sel et fleur d''oranger aux huiles essentielles, râpe des pieds, suivi d''un masque sublimateur corps et visage à l''argan.', '/assets/hammam-royal.png', '1H30', 'hammam')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, 
    price = EXCLUDED.price, 
    description = EXCLUDED.description, 
    image_path = EXCLUDED.image_path,
    duration = EXCLUDED.duration,
    category = EXCLUDED.category;

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
