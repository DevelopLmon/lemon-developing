import { prisma } from "@/lib/prisma";
import ContentEditor from "@/components/admin/ContentEditor";

const DEFAULT_CONTENT = [
  { key: "hero_title", label: "Hero: Haupttitel", section: "Hero", value: "Wir bauen Websites,\ndie begeistern." },
  { key: "hero_subtitle", label: "Hero: Untertitel", section: "Hero", value: "Modernes Webdesign & Development aus einer Hand." },
  { key: "services_title", label: "Services: Titel", section: "Services", value: "Was wir für dich tun" },
  { key: "pricing_starter_price", label: "Paket Starter: Preis", section: "Preise", value: "499" },
  { key: "pricing_pro_price", label: "Paket Pro: Preis", section: "Preise", value: "999" },
  { key: "pricing_premium_price", label: "Paket Premium: Preis", section: "Preise", value: "1999" },
  { key: "contact_phone", label: "Kontakt: Telefon", section: "Kontakt", value: "+49 176 84066170" },
  { key: "contact_email", label: "Kontakt: E-Mail", section: "Kontakt", value: "support@coresites-studio.de" },
];

export default async function AdminInhalt() {
  // Ensure defaults exist in DB
  for (const item of DEFAULT_CONTENT) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: {},
      create: item,
    });
  }

  const contents = await prisma.siteContent.findMany({ orderBy: { section: "asc" } });

  const grouped = contents.reduce<Record<string, typeof contents>>((acc, c) => {
    if (!acc[c.section]) acc[c.section] = [];
    acc[c.section].push(c);
    return acc;
  }, {});

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-white">Inhalte bearbeiten</h1>
        <p className="text-sm mt-1" style={{ color: "#8892A4" }}>Texte und Preise der Website anpassen</p>
      </div>

      <div className="flex flex-col gap-6">
        {Object.entries(grouped).map(([section, items]) => (
          <div key={section} className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="font-heading font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full inline-block" style={{ background: "linear-gradient(180deg, #3a96ed, #7C3AED)" }} />
              {section}
            </h2>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <ContentEditor key={item.id} id={item.id} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
