import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | CoreSites-Studio",
  description: "Datenschutzerklärung von CoreSites-Studio",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-bg-base px-6 py-24">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-blue-400 transition-colors mb-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Zurück zur Startseite
        </Link>

        <h1 className="font-heading font-black text-4xl text-text-primary mb-2">
          Datenschutzerklärung
        </h1>
        <div className="w-12 h-1 rounded-full mb-10" style={{ background: "linear-gradient(90deg, #109de6, #308fb8)" }} />

        <div
          className="rounded-2xl p-8 flex flex-col gap-8 text-sm text-text-muted leading-relaxed"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="font-semibold text-text-primary mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              2. Datenerfassung auf dieser Website
            </h2>
            <h3 className="font-semibold text-text-primary mb-2">Wer ist verantwortlich für die Datenerfassung?</h3>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
            <h3 className="font-semibold text-text-primary mt-4 mb-2">Wie erfassen wir Ihre Daten?</h3>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen — z. B. über das Kontaktformular. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z. B. Internetbrowser, Betriebssystem, Uhrzeit des Seitenaufrufs).
            </p>
            <h3 className="font-semibold text-text-primary mt-4 mb-2">Wofür nutzen wir Ihre Daten?</h3>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              3. Hosting
            </h2>
            <p>
              Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten handeln.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              4. Allgemeine Hinweise und Pflichtinformationen
            </h2>
            <h3 className="font-semibold text-text-primary mb-2">Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <h3 className="font-semibold text-text-primary mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
            <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <p className="mt-2">CodeSites-Studio<br />Leon Schächtel<br />Am Mühlenteich 5<br />27404 Zeven<br />E-Mail: info@coresites-studio.de</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              5. Kontaktformular
            </h2>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-2">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              6. Ihre Rechte
            </h2>
            <p>Sie haben jederzeit das Recht:</p>
            <ul className="mt-2 flex flex-col gap-1.5 list-none">
              {[
                "Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)",
                "Die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)",
                "Die Löschung Ihrer bei uns gespeicherten Daten zu verlangen (Art. 17 DSGVO)",
                "Die Einschränkung der Datenverarbeitung zu verlangen (Art. 18 DSGVO)",
                "Der Verarbeitung Ihrer personenbezogenen Daten zu widersprechen (Art. 21 DSGVO)",
                "Ihre Daten in einem gängigen Format zu erhalten (Art. 20 DSGVO)",
              ].map((right, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#109de6" }} />
                  {right}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: support@coresites-studio.de
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-text-primary text-base mb-3">
              7. Beschwerderecht
            </h2>
            <p>
              Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
