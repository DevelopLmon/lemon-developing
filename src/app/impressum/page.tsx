import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Lemon-Developing",
  description: "Impressum von Lemon-Developing",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-bg-base px-6 py-24">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-lemon transition-colors mb-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Zurück zur Startseite
        </Link>

        <h1 className="font-heading font-black text-4xl text-text-primary mb-2">
          Impressum
        </h1>
        <p className="text-sm text-muted-foreground mb-10">Angaben gemäß § 5 TMG / § 18 Abs. 2 MStV</p>
        <div className="w-12 h-1 rounded-full mb-10" style={{ background: "linear-gradient(90deg, #E8E440, #7C3AED)" }} />

        <div
          className="rounded-2xl p-8 flex flex-col gap-8 text-sm text-text-muted leading-relaxed"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              Unternehmensangaben
            </h2>
            <p>CoreSites-Studio</p>
            <p>Leon Schächtel</p>
            <p>Am Mühlenteich 5</p>
            <p>27404 Zeven</p>
            <p>Deutschland</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              Kontakt
            </h2>
            <p>
              Telefon:{" "}
              <a href="tel:+4917684066170" className="hover:text-lemon transition-colors">
                +49 176 84066170
              </a>
            </p>
            <p>
              E-Mail:{" "}
              <a href="mailto:info@coresites-studio.de" className="hover:text-lemon transition-colors">
                info@coresites-studio.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              Steuerliche Angaben
            </h2>
            <p>
              Kleinunternehmer gemäß § 19 UStG — es wird keine Umsatzsteuer ausgewiesen.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p>Leon Schächtel</p>
            <p>Am Mühlenteich 5</p>
            <p>27404 Zeven</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Das Kopieren und Downdloaden dieser Seiten ist ausschließlich für den privaten Gebrauch gestattet.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
