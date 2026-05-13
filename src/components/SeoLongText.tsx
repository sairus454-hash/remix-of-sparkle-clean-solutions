/**
 * Long-form SEO content block (~1000 words, Polish) targeting key phrases:
 * - pranie kanap Wrocław
 * - czyszczenie tapicerki Wrocław
 * - mycie okien Wrocław
 * - sprzątanie mieszkań Wrocław
 *
 * Rendered on the homepage. Uses semantic tokens and strict H2 → H3 hierarchy
 * (page already has H1). Kept text-focused so Google reads it as content,
 * not as a styled marketing banner.
 */
const SeoLongText = () => {
  return (
    <section
      aria-labelledby="seo-long-text-title"
      className="py-12 sm:py-16 bg-background"
    >
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto prose-like text-foreground">
          <h2
            id="seo-long-text-title"
            className="font-serif text-2xl sm:text-3xl font-bold mb-6 text-foreground"
          >
            Pranie kanap Wrocław, czyszczenie tapicerki, mycie okien i sprzątanie mieszkań
          </h2>

          <p className="mb-5 text-muted-foreground leading-relaxed">
            MasterClean to lokalna firma sprzątająca działająca we Wrocławiu i okolicach
            (Smolec, Bielany Wrocławskie, Kiełczów, Oława, Jelcz-Laskowice, Sobótka,
            Strzegom). Specjalizujemy się w usługach takich jak <strong>pranie kanap Wrocław</strong>,
            <strong> czyszczenie tapicerki Wrocław</strong>, <strong>mycie okien Wrocław</strong>
            oraz kompleksowe <strong>sprzątanie mieszkań Wrocław</strong>. Pracujemy
            profesjonalnym sprzętem ekstrakcyjnym i hipoalergicznymi środkami, które są
            bezpieczne dla dzieci, alergików oraz zwierząt domowych. Przyjeżdżamy z całym
            wyposażeniem — klient nie musi niczego przygotowywać poza dostępem do gniazdka
            i wody.
          </p>

          <h3 className="font-serif text-xl font-semibold mt-8 mb-3 text-foreground">
            Pranie kanap Wrocław — głębokie czyszczenie mebli tapicerowanych
          </h3>
          <p className="mb-5 text-muted-foreground leading-relaxed">
            <strong>Pranie kanap Wrocław</strong> wykonujemy metodą ekstrakcyjną z użyciem
            profesjonalnych maszyn marek Karcher i Pro-Team. Proces polega na wstępnym
            odkurzeniu, naniesieniu środka piorącego dopasowanego do rodzaju tkaniny
            (welur, alkantara, mikrofibra, len, tkaniny syntetyczne), wzburzeniu włókien
            szczotką oraz wypłukaniu zabrudzeń pod ciśnieniem wraz z jednoczesnym
            odsysaniem wody. Dzięki temu z kanapy usuwamy nie tylko widoczne plamy z
            kawy, wina, tłuszczu czy długopisu, ale też kurz, roztocza, sierść zwierząt
            i alergeny zalegające w głębi tapicerki. Standardowe pranie dwuosobowej sofy
            we Wrocławiu trwa około 60–90 minut, a mebel jest gotowy do normalnego
            użytkowania po 4–8 godzinach schnięcia. Realizujemy zamówienia również w
            soboty i niedziele oraz w godzinach wieczornych — bez dopłat za weekend.
          </p>

          <h3 className="font-serif text-xl font-semibold mt-8 mb-3 text-foreground">
            Czyszczenie tapicerki Wrocław — meble, krzesła, materace, fotele biurowe
          </h3>
          <p className="mb-5 text-muted-foreground leading-relaxed">
            <strong>Czyszczenie tapicerki Wrocław</strong> obejmuje nie tylko kanapy i
            narożniki, ale również materace, krzesła tapicerowane, fotele biurowe, pufy,
            zagłówki łóżek, wózki dziecięce oraz fotele samochodowe. Każdy materiał
            wymaga indywidualnego doboru chemii i temperatury — błędne dobranie środka
            może spowodować zacieki lub odbarwienia, dlatego przed praniem zawsze
            wykonujemy test na niewidocznym fragmencie. Czyszczenie tapicerki zalecamy
            wykonywać raz na 6–12 miesięcy w gospodarstwach z dziećmi i zwierzętami oraz
            raz na 12–18 miesięcy w pozostałych przypadkach. Regularne pranie tapicerki
            wydłuża żywotność mebli o kilka lat, eliminuje nieprzyjemne zapachy oraz
            zmniejsza ryzyko reakcji alergicznych domowników.
          </p>

          <h3 className="font-serif text-xl font-semibold mt-8 mb-3 text-foreground">
            Mycie okien Wrocław — bez smug, na każdej wysokości
          </h3>
          <p className="mb-5 text-muted-foreground leading-relaxed">
            <strong>Mycie okien Wrocław</strong> realizujemy w mieszkaniach, domach
            jednorodzinnych, lokalach usługowych i biurach. Używamy wody demineralizowanej
            oraz profesjonalnych ściągaczek, dzięki czemu okna pozostają czyste i bez
            smug nawet po wyschnięciu. Standardowo myjemy szyby z obu stron, ramy oraz
            parapety. Dla okien dachowych, balkonowych oraz przeszkleń tarasowych
            stosujemy specjalne uchwyty teleskopowe sięgające do 6 metrów — bez potrzeby
            stawiania rusztowań. Cennik mycia okien we Wrocławiu zaczyna się od 40 PLN
            za okno jednoskrzydłowe; przy zamówieniu od 4 sztuk klient otrzymuje
            automatyczny rabat 10%, a od 6 sztuk — 15%. Minimalna wartość zamówienia w
            Wrocławiu i Smolcu wynosi 160 PLN.
          </p>

          <h3 className="font-serif text-xl font-semibold mt-8 mb-3 text-foreground">
            Sprzątanie mieszkań Wrocław — generalne, po remoncie, regularne
          </h3>
          <p className="mb-5 text-muted-foreground leading-relaxed">
            <strong>Sprzątanie mieszkań Wrocław</strong> obejmuje trzy podstawowe
            warianty: sprzątanie standardowe (utrzymaniowe), sprzątanie generalne
            (głębokie, z myciem okien, kuchni i łazienki w pełnym zakresie) oraz
            sprzątanie po remoncie i po budowie (usuwanie pyłu cementowego, resztek
            farby, kleju, silikonu i folii ochronnej). Cena uzależniona jest od metrażu,
            stopnia zabrudzenia oraz zakresu prac dodatkowych — np. mycia okien,
            czyszczenia piekarnika, lodówki czy prasowania. Dla klientów regularnych
            (sprzątanie raz w tygodniu lub co dwa tygodnie) oferujemy stałe stawki oraz
            tę samą ekipę, dzięki czemu klient zawsze wie, kto przyjedzie do jego
            mieszkania. Wszystkie ekipy są zweryfikowane, ubezpieczone i przeszkolone z
            zakresu obsługi sprzętu oraz chemii profesjonalnej.
          </p>

          <h3 className="font-serif text-xl font-semibold mt-8 mb-3 text-foreground">
            Dlaczego klienci z Wrocławia wybierają MasterClean
          </h3>
          <p className="mb-5 text-muted-foreground leading-relaxed">
            Działamy ponad 3 lata, mamy ponad 1000 zrealizowanych zleceń i średnią ocenę
            4,9/5 w opiniach klientów. Wycena jest zawsze darmowa i niezobowiązująca —
            podajemy konkretną kwotę przed rozpoczęciem pracy, bez ukrytych kosztów ani
            dopłat za dojazd w obrębie Wrocławia i Smolca. Płatność akceptujemy
            gotówką, BLIK-iem, kartą oraz przelewem; firmom wystawiamy fakturę VAT.
            Pracujemy 7 dni w tygodniu, również w święta. Zamówienia można złożyć przez
            formularz na stronie, telefonicznie pod numerem +48 575 211 401 lub przez
            czat z konsultantem dostępny w prawym dolnym rogu serwisu — odpowiadamy
            zwykle w ciągu kilku minut. Zapraszamy do skorzystania z usług
            <strong> pranie kanap Wrocław</strong>, <strong>czyszczenie tapicerki Wrocław</strong>,
            <strong> mycie okien Wrocław</strong> oraz <strong>sprzątanie mieszkań Wrocław</strong>
            — gwarantujemy efekt lub wracamy bezpłatnie i poprawiamy.
          </p>
        </article>
      </div>
    </section>
  );
};

export default SeoLongText;
