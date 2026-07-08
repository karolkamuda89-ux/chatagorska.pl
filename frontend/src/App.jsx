
import BookingCalendar from './BookingCalendar' // Importujemy kalendarz z drugiego pliku
import React, { useState } from 'react'
import opisySEO from './opisy.json' // upewnij się, że ścieżka do pliku jest poprawna

// AUTOMATYCZNIE (Czysty JS, zajmuje 1 sekundę)
const JEDNA_Z_35_FOTEK = Array.from({ length: 29 }, (_, i) => `/zdjecia/${i + 1}.jpg`);

function App() {
const [wybranyTermin, setWybranyTermin] = useState("");
const [dataStart, setDataStart] = useState("");
const [dataEnd, setDataEnd] = useState("");
const [imie, setImie] = useState("");
const [email, setEmail] = useState("");
const [telefon, setTelefon] = useState("");
const [goscie, setGoscie] = useState("1"); // Domyślnie 1 osoba
const [currentIndex, setCurrentIndex] = useState(0);
const handleDatesChange = (start, end) => {
  setDataStart(start);
  setDataEnd(end);
  if (start && !end) {
    setWybranyTermin(`Przyjazd: ${start} (Wybierz wyjazd...)`);
  } else if (start && end) {
    setWybranyTermin(`${start} do ${end}`);
  } else {
    setWybranyTermin("");
  }
};

const nextSlide = () => {
  setCurrentIndex((prev) => (prev === JEDNA_Z_35_FOTEK.length - 1 ? 0 : prev + 1));
};

const prevSlide = () => {
  setCurrentIndex((prev) => (prev === 0 ? JEDNA_Z_35_FOTEK.length - 1 : prev - 1));
};
const handleSubmit = async (e) => {
  e.preventDefault(); // Blokujemy przeładowanie strony

  if (!dataStart || !dataEnd) {
    alert("Proszę wybrać termin w kalendarzu!");
    return;
  }

  // Pakujemy dane do formatu, który rozumie nasz plik PHP
  const daneRezerwacji = {
    imie_nazwisko: imie,
    email: email,
    telefon: telefon,
    data_przyjazdu: dataStart,
    data_wyjazdu: dataEnd,
    liczba_gosci: goscie
  };

  try {
    // Wysyłamy paczkę kurierem (fetch) pod adres lokalnego Apache
    const response = await fetch("http://localhost/chatagorska-backend/zapisz.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(daneRezerwacji)
    });

    const rezultat = await response.json();

    if (rezultat.status === "success") {
      alert("Sukces! " + rezultat.message);
      // Opcjonalnie: czyścimy formularz po sukcesie
      setImie("");
      setEmail("");
      setTelefon("");
    } else {
      alert("Błąd: " + rezultat.message);
    }
  } catch (error) {
    console.error("Błąd wysyłania:", error);
    alert("Nie udało się połączyć z serwerem spróbój ponownie.");
  }
};
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased scroll-smooth">
      
      {/* 1. DUŻY GÓRNY PASEK (NAVBAR) */}
      <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xl font-light tracking-widest text-white uppercase">Chata Górska</span>
          <div className="hidden md:flex space-x-8 text-sm font-light tracking-wider text-neutral-300">
            <a href="#o-nas" className="hover:text-amber-500 transition-colors">O nas</a>
            <a href="#galeria" className="hover:text-amber-500 transition-colors">Galeria</a>
            <a href="#rezerwacja" className="hover:text-amber-500 transition-colors">Rezerwacja</a>
            <a href="#kontakt" className="hover:text-amber-500 transition-colors">Kontakt</a>
          </div>
          <a href="#rezerwacja" className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-medium tracking-wider uppercase transition-all">
            Zarezerwuj
          </a>
        </div>
      </nav>

      {/* 2. WIELKIE ZDJĘCIE WIZERUNKOWE (HERO) */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/zdjecia/zdjecie1.jpg"
          alt="Chata Górska w zimie" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000 object-bottom"
        />
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Ekskluzywny wypoczynek</span>
          <h1 className="mt-3 text-5xl sm:text-6xl font-extralight tracking-tight text-white uppercase">Chata Górska</h1>
          <p className="mt-4 text-neutral-300 font-light leading-relaxed">
            Dom w górach z jacuzzi i sauną – Beskid Mały.
          </p>
          <a href="#rezerwacja" className="inline-block mt-8 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-medium text-sm transition-all shadow-xl shadow-amber-500/10">
            Sprawdź wolne terminy
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent"></div>
      </header>

      {/* 3. STREFA O NAS / O MIEJSCU */}
<section id="o-nas" className="py-20 px-6 max-w-6xl mx-auto flex flex-col gap-16">
  
  {/* RZĄD 1: NAGŁÓWEK, PIERWSZY OPIS (LEWO) + 2 ZDJĘCIA (PRAWO) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Lewa strona: Tekst */}
    <div>
      <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Strefa Komfortu</span>
      <h2 className="mt-2 text-3xl font-light text-white tracking-tight">Oaza ciszy i luksusu</h2>
      <p className="mt-6 text-neutral-400 font-light leading-relaxed">
        Nasz obiekt położony jest w otoczeniu lasu, ciszy i górskiej natury, tworząc idealne warunki dla osób szukających komfortu z dala od zgiełku miasta. Dom pomieści od 8 do 12 osób w 4 dwuosobowych sypialniach (dodatkowe miejsca noclegowe znajdują się w salonie). To doskonałe miejsce na rodzinne wyjazdy, weekendy z przyjaciółmi czy kameralne spotkania.
      </p>
    </div>
    
    {/* Prawa strona: Zdjęcia */}
    <div className="grid grid-cols-2 gap-4 items-end">
      <img src="/zdjecia/zdjeciezakrzaka.jpg" alt="Zdjęcie sprzed domu" className="blur-[0.4px] contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-80 object-cover" />
      <img src="/zdjecia/zdjeciedron.jpg" alt="Widok z drona" className="blur-[0.4px] contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-64 object-cover" />
    </div>
  </div>

  {/* RZĄD 2: ZDJĘCIA (LEWO) + DRUGI OPIS (PRAWO) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Opis (W kodzie jest wyżej, ale klasa "md:order-last" przesunie go na prawo na komputerze) */}
    <div className="md:order-last">
      <p className="text-neutral-400 font-light leading-relaxed">
        Do dyspozycji gości oddajemy przestronne wnętrza, w pełni wyposażoną kuchnię oraz bogatą strefę rozrywki (bilard, ping-pong, piłkarzyki, głośnik). Po dniu spędzonym na szlaku możesz zrelaksować się w jacuzzi z widokiem na naturę, skorzystać z sauny lub spędzić wieczór w altanie przy grillu lub ognisku.
      </p>
    </div>
    
    {/* Zdjęcia (W kodzie są niżej, ale klasa "md:order-first" wrzuci je na lewą stronę na komputerze) */}
    <div className="grid grid-cols-2 gap-4 items-start md:order-first">
      <img src="/zdjecia/wannaokno.jpg" alt="Wanna przy oknie" className="contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-64 object-cover" />
      <img src="/zdjecia/saunajacuzzi.jpg" alt="Sauna i Jacuzzi" className="contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-80 object-cover" />
    </div>
  </div>

    {/* RZĄD 3: NAGŁÓWEK, TRZECI OPIS (LEWO) + 2 ZDJĘCIA (PRAWO) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Lewa strona: Tekst */}
      <div>
        <p className="mt-6 text-neutral-400 font-light leading-relaxed">
          Okolica zachwyca spokojem i pięknymi widokami, które można podziwiać, pijąc kawę na przestronnym tarasie przy wschodzie słońca. To idealne miejsce na odpoczynek o każdej porze roku – zarówno dla miłośników aktywnego wypoczynku, jak i błogiego relaksu w górskim klimacie. Położenie domu stanowi doskonałą bazę wypadową na liczne trasy piesze i rowerowe oraz wycieczki do okolicznych atrakcji, takich jak Góra Żar, Kocierz, Czarny Groń, Park Miniatur czy Energylandia. Zapraszamy do miejsca, w którym natura i cisza spotykają się z prawdziwym komfortem.
        </p>
      </div>
    
      {/* Prawa strona: Zdjęcia */}
      <div className="grid grid-cols-2 gap-4 items-end">
        <img src="/zdjecia/taraskawa.jpg" alt="Kawa na tarasie" className="contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-80 object-cover" />
        <img src="/zdjecia/zdjecieokno.jpg" alt="Zdjecie przez okno" className="contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-64 object-cover" />
      </div>
    </div>

</section>

      {/* 4. GALERIA */}
{/* 4. GALERIA Z OPTYMALIZACJĄ */}
<section id="galeria" className="py-20 bg-neutral-900/40 border-y border-neutral-900 px-6 overflow-hidden">
  <div className="max-w-6xl mx-auto relative">
    
    <div className="text-center mb-16">
      <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Galeria zdjęć</span>
      <h2 className="mt-2 text-3xl font-light text-white tracking-tight">Zobacz naszą przestrzeń</h2>
    </div>

    {/* KONTENER KARUZELI */}
    <div className="flex items-center justify-center gap-4 sm:gap-8 min-h-[350px] relative px-12">
      
      {/* STRZAŁKA W LEWO */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 z-30 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:text-amber-500 hover:bg-neutral-800 transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* TRZY FILARY KARUZELI (Wyświetlamy tylko 3 zdjęcia naraz dla super-wydajności) */}
      {[-1, 0, 1].map((offset) => {
        // Magiczna matematyka, żeby karuzela zapętlała się w nieskończoność
        let index = currentIndex + offset;
        if (index < 0) index = JEDNA_Z_35_FOTEK.length - 1;
        if (index >= JEDNA_Z_35_FOTEK.length) index = 0;

        const isCenter = offset === 0;

        return (
          <div 
            key={offset}
            className={`transition-all duration-500 ease-in-out transform flex-1 h-64 sm:h-80 md:h-[400px] 
              ${isCenter ? 'scale-105 z-20 opacity-100' : 'scale-90 z-10 opacity-45 hidden sm:block'}
            `}
          >
            <img 
              src={JEDNA_Z_35_FOTEK[index]} 
              // Wyciągamy numer zdjęcia (index + 1), żeby pasował do nazw 1, 2, 3 w JSON-ie. 
              // Jeśli dla jakiegoś numeru zapomnisz dać opisu, rezygnujemy ze standardowego tekstu zapasowego.
              alt={opisySEO[index + 1] || `Ekskluzywna Chata Górska - zdjęcie nr ${index + 1}`} 
              className={`w-full h-full object-cover rounded-2xl ...`}
              loading="lazy" 
            />
          </div>
        );
      })}

      {/* STRZAŁKA W PRAWO */}
      <button 
        onClick={nextSlide}
        className="absolute right-0 z-30 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:text-amber-500 hover:bg-neutral-800 transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

    </div>

    {/* LICZNIK ZDJĘĆ PREMIUM */}
    <div className="text-center mt-8 text-xs font-light tracking-widest text-neutral-500">
      <span className="text-neutral-300">{currentIndex + 1}</span> / {JEDNA_Z_35_FOTEK.length}
    </div>

  </div>
</section>

{/* 5. STREFA REZERWACJI I KONTAKTU */}
      <section id="rezerwacja" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Rezerwacja Online</span>
          <h2 className="mt-2 text-3xl font-light text-white tracking-tight">Zaplanuj swój pobyt</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Formularz */}
          <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-light text-white mb-4">Dane rezerwacji</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
  
          {/* 1. Termin */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Wybrany termin</label>
              <input type="text" readOnly value={wybranyTermin} placeholder="Kliknij dzień przyjazdu i wyjazdu w kalendarzu" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-amber-500 font-medium focus:outline-none" />
          </div>

          {/* 2. Imię i nazwisko */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Imię i Nazwisko</label>
            <input type="text" required value={imie} onChange={(e) => setImie(e.target.value)} placeholder="Jan Kowalski" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none" />
          </div>

          {/* 3. Adres E-mail */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Adres E-mail</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jan@kowalski.pl" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none" />
          </div>

          {/* 4. Numer telefonu */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Numer telefonu</label>
            <input type="tel" required value={telefon} onChange={(e) => setTelefon(e.target.value)} placeholder="+48 123 456 789" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none" />
          </div>

          {/* 5. Liczba gości */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Liczba gości</label>
              <div className="relative">
                <select value={goscie} onChange={(e) => setGoscie(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none appearance-none cursor-pointer">
                  <option value="1">1 osoba</option>
                  <option value="2">2 osoby</option>
                  <option value="4">4 osoby</option>
                  <option value="6">6 osób</option>
                  <option value="8">+8 osób</option>
                </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
              </div>
          </div>

          <button type="submit" className="w-full mt-4 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-medium text-sm transition-all shadow-lg uppercase tracking-wider">
            Zapytaj o rezerwację
          </button>

</form>
          </div>

          {/* Kalendarz (Zajmuje 2 kolumny po prawej stronie na dużych ekranach) */}
          <div className="lg:col-span-2">
            <BookingCalendar onDatesChange={handleDatesChange} />
          </div>
        </div>
      </section>

      {/* FOOTER / KONTAKT */}
      <footer id="kontakt" className="bg-neutral-950 border-t border-neutral-900 py-12 px-6 text-center text-sm text-neutral-500 font-light">
        <div className="max-w-6xl mx-auto">
          <p className="text-neutral-400 font-normal">Chata Górska Sp. z o.o.</p>
          <p className="mt-1">Kontakt: kontakt@chatagorska.pl | +48 123 456 789</p>
          <p className="mt-6 text-xs text-neutral-600">&copy; 2026 Chata Górska. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>

    </div>
  )
}

export default App