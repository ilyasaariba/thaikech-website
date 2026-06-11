-- Site Settings table for dynamic contact info
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read site_settings" ON public.site_settings;
CREATE POLICY "Allow public read site_settings" ON public.site_settings
    FOR SELECT USING (true);

INSERT INTO public.site_settings (key, value) VALUES
('phone', '+212 771-610656'),
('phone_raw', '212771610656'),
('email', 'contact@thaikech.com'),
('hours', '24h/7'),
('area', 'Marrakech, Palmeraie, Agdal, Gueliz & Environs'),
('whatsapp_message', 'Bonjour Thai Kech, je souhaite réserver un massage à domicile à Marrakech.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
