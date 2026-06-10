import { supabase } from "@/lib/supabase";

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  image_path: string;
}

export interface SiteSettings {
  phone: string;
  phone_raw: string;
  email: string;
  hours: string;
  area: string;
  whatsapp_message: string;
}

const defaultSettings: SiteSettings = {
  phone: "+212 771-610656",
  phone_raw: "212771610656",
  email: "iliassaariba01@gmail.com",
  hours: "24h/7",
  area: "Marrakech, Palmeraie, Agdal, Gueliz & Environs",
  whatsapp_message:
    "Bonjour Thai Kech, je souhaite réserver un massage à domicile à Marrakech.",
};

export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("price", { ascending: true });

    if (error || !data || data.length === 0) {
      return [];
    }
    return data;
  } catch {
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error || !data || data.length === 0) {
      return defaultSettings;
    }

    const settings = { ...defaultSettings };
    for (const row of data) {
      if (row.key in settings) {
        (settings as Record<string, string>)[row.key] = row.value;
      }
    }
    return settings;
  } catch {
    return defaultSettings;
  }
}
